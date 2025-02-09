"use client";

import HomeNavbar from "@/components/home/HomeNavbar";
import TemplateGallery from "@/components/home/TemplateGallery";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const documents = useQuery(api.documents.listDocuments);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 bottom-0 right-0 z-10 h-16 bg-white p-4">
        <HomeNavbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        {documents?.map((document) => <h1>{document.title}</h1>)}
      </div>
    </div>
  );
}
