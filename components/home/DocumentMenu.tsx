import { Id } from "@/convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVertical, Trash2Icon, WebhookIcon } from "lucide-react";
import DocumentDeleteModal from "./DocumentDeleteModal";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Toast } from "../ui/toast";
import { useToast } from "@/hooks/use-toast";

interface DocumentMenuInterface {
  documentId: Id<"documents"> | undefined;
  title: string | undefined;
  onNewTab: (id: Id<"documents">) => void;
}

const DocumentMenu = ({
  documentId,
  title,
  onNewTab,
}: DocumentMenuInterface) => {
  const { toast } = useToast();
  const deleteDocument = useMutation(api.documents.deleteDocument);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const onDelete = () => {
    setIsDeleting(true);
    deleteDocument({ documentId: documentId as Id<"documents"> })
      .then(() => {
        toast({
          variant: "default",
          title: "Document deleted successfully ✔",
        });
        setIsDeleteModalOpen(true);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-sm">
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button variant="ghost" onClick={() => onNewTab(documentId!)}>
            <WebhookIcon /> Open this in new tab
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="destructive"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash2Icon /> Delete this document
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <DocumentDeleteModal
        title={title}
        onDelete={() => onDelete()}
        isDeleting={isDeleting}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      />
    </DropdownMenu>
  );
};

export default DocumentMenu;
