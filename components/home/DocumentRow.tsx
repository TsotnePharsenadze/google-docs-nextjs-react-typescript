"use client";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { TableCell, TableRow } from "../ui/table";
import { SiGoogledocs } from "react-icons/si";
import { Building2Icon, User2Icon } from "lucide-react";
import DocumentMenu from "./DocumentMenu";

interface DocumentRowInterface {
  document: Doc<"documents"> | undefined;
}

const DocumentRow = ({ document }: DocumentRowInterface) => {
  const onNewTab = (id: Id<"documents">) => {
    window.open(`/documents/${id}`, "_blank");
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex gap-x-2 items-center">
          <SiGoogledocs className="size-6 fill-blue-500" />
          <p>{document?.title}</p>
        </div>
      </TableCell>
      <TableCell>{"\u00A0"}</TableCell>
      <TableCell className="text-muted-foreground hidden sm:flex items-center sm:gap-x-2">
        {document?.organizationId ? (
          <Building2Icon className="size-4" />
        ) : (
          <User2Icon className="size-4" />
        )}
        {document?.organizationId ? "Organization" : "Personal"}
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          {new Date(document?._creationTime!).toDateString()}
        </div>
      </TableCell>
      <TableCell className="flex justify-end">
        <DocumentMenu
          documentId={document?._id}
          onNewTab={onNewTab}
          title={document?.title}
        />
      </TableCell>
    </TableRow>
  );
};

export default DocumentRow;
