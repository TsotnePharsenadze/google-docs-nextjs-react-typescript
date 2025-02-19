"use client";

import Editor from "./Editor";
import ToolbarComponent from "./Toolbar";
import Navbar from "@/components/navbar/Navbar";
import { Room } from "./Room";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

export default function Document({
  preLoadedDocument,
}: {
  preLoadedDocument: Preloaded<typeof api.documents.getDocumentById>;
}) {
  const document = usePreloadedQuery(preLoadedDocument);
  return (
    <Room>
      <div className="min-h-screen bg-[FAFBFD]">
        <div className="fixed left-0 right-0 top-0 bottom-0 z-50 h-[120px] print:hidden">
          <Navbar data={document as Doc<"documents">} />
          <ToolbarComponent />
        </div>
        <div className="pt-[125px] print:pt-0">
          <Editor initialContent={document?.initialContent} />
        </div>
      </div>
    </Room>
  );
}
