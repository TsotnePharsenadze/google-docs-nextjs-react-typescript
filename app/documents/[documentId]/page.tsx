import { Id } from "@/convex/_generated/dataModel";
import Document from "./document";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export default async function DocumentsByIdPage({
  params,
}: {
  params: Promise<{
    documentId: string;
  }>;
}) {
  const { documentId } = await params;
  const { getToken } = await auth();
  const token =
    (await getToken({
      template: "convex",
    })) ?? undefined;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const preloadedDocument = await preloadQuery(
    api.documents.getDocumentById,
    { id: documentId as Id<"documents"> },
    { token }
  );

  return <Document preLoadedDocument={preloadedDocument} />;
}
