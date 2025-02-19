"use server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getDocumentsByIdsAction(ids: Id<"documents">[]) {
  return await convex.query(api.documents.getDocumentsByIds, { ids });
}
