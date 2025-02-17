import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Liveblocks } from "@liveblocks/node";

const ConvexClient = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_PRIVATE_KEY!,
});

export async function POST(req: Request) {
  try {
    const sessionClaim = await auth();
    if (!sessionClaim) {
      return new Response("Unauthorized Access", {
        status: 401,
      });
    }

    const user = await currentUser();
    if (!user) {
      return new Response("Unauthorized Access", {
        status: 401,
      });
    }

    const { roomId } = await req.json();
    if (!roomId) {
      return new Response("Missing room id", {
        status: 400,
      });
    }

    const document = await ConvexClient.query(api.documents.getDocumentById, {
      id: roomId!,
    });

    if (!document) {
      return new Response("Unauthorized Access", {
        status: 401,
      });
    }

    const isOwner = document.ownerId === user.id;
    const isMemberOfOrganization = !!(
      document.organizationId && document.organizationId === sessionClaim.orgId
    );

    if (!isOwner && !isMemberOfOrganization) {
      return new Response("Unauthorized Access", {
        status: 401,
      });
    }
    const session = await liveblocks.prepareSession(user.id, {
      userInfo: {
        name: user.fullName ?? "Anon-user",
        avatar: user.imageUrl,
      },
    });
    session?.allow(roomId, session?.FULL_ACCESS);
    const { body, status } = await session?.authorize();
    return new Response(body, { status });
  } catch (e: any) {
    console.error(e);
    return new Response("Internal Error at liveblocks-sync @POST", {
      status: 500,
    });
  }
}
