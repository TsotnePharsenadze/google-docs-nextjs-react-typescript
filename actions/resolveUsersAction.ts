"use server";

import { Id } from "@/convex/_generated/dataModel";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getDocuments(id: Id<"documents">) {
  return await convex;
}

export default async function resolveUsersAction() {
  const { sessionClaims } = await auth();
  const clerk = await clerkClient();

  const res = await clerk.users.getUserList({
    organizationId: [sessionClaims?.org_id as string],
  });

  const users = res.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user?.primaryEmailAddress?.emailAddress ?? "Anon-user",
    avatar: user.imageUrl,
  }));

  console.log(users);

  return users;
}
