import { Doc } from "@/convex/_generated/dataModel";
import { PaginationStatus, useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import Loading from "../Loading";
import DocumentRow from "./DocumentRow";

interface DocumentsTableInterface {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export const DocumentsTable = ({
  documents,
  loadMore,
  status,
}: DocumentsTableInterface) => {
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleTemplateClick = ({
    title,
    initialContent,
  }: {
    title: string;
    initialContent: string;
  }) => {
    setIsCreating(true);
    create({
      title,
      initialContent,
    })
      .then((documentId) => {
        router.push(`/documents/${documentId}`);
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  return (
    <div className="max-w-screen-xl px-16 py-6 mx-auto">
      <h1 className="font-bold text-2xl mb-4">Your latest DOCS</h1>
      {documents === undefined || isCreating ? (
        <div className="flex justify-center items-center h-24">
          <Loader2Icon className="animate-spin size-5" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>
                <span>{"\u00A0"}</span>
              </TableHead>
              <TableHead className="hidden sm:table-cell">Shared</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No documents found{" "}
                  <span
                    className="text-blue-500 underline hover:no-underline cursor-pointer"
                    onClick={() => {
                      handleTemplateClick({
                        title: "Blank Document",
                        initialContent: "",
                      });
                    }}
                  >
                    Start by creating Blank Document
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map((document) => (
                <DocumentRow key={document._id} document={document} />
              ))}
            </TableBody>
          )}
        </Table>
      )}
    </div>
  );
};
