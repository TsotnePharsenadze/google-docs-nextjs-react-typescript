"use client";

import { DocumentsTable } from "@/components/home/DocumentsTable";
import HomeNavbar from "@/components/home/HomeNavbar";
import TemplateGallery from "@/components/home/TemplateGallery";
import { api } from "@/convex/_generated/api";
import { useSearchParam } from "@/hooks/use-search-param";
import { usePaginatedQuery } from "convex/react";

export default function Home() {
  const [search] = useSearchParam("search");
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.listDocuments,
    { title: search as unknown as string },
    {
      initialNumItems: 5,
    }
  );

  results.sort((a, b) => b._creationTime - a._creationTime);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 bottom-0 right-0 z-10 h-16 bg-white p-4">
        <HomeNavbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
}
