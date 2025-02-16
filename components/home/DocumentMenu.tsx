import { Id } from "@/convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVertical, PenIcon, Trash2Icon, WebhookIcon } from "lucide-react";
import DocumentDeleteModal from "./DocumentDeleteModal";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DocumentRenameModal from "./DocumentRenameModal";

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

  const renameDocument = useMutation(api.documents.updateDocument);
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false);

  const onDelete = () => {
    setIsDeleting(true);
    deleteDocument({ documentId: documentId as Id<"documents"> })
      .then(() => {
        toast({
          variant: "default",
          title: "Document deleted successfully ✔",
        });
        setIsDeleteModalOpen(false);
        setTimeout(() => {
          const button = document.querySelector("[toast-close]");
          if (button) {
            (button as HTMLButtonElement).click();
          }
        }, 2500);
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Unauthorized action ❌",
        });
        setIsDeleteModalOpen(false);
        setTimeout(() => {
          const button = document.querySelector("[toast-close]");
          if (button) {
            (button as HTMLButtonElement).click();
          }
        }, 2500);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const onUpdate = (newTitle: string) => {
    setIsRenaming(true);
    renameDocument({
      documentId: documentId as Id<"documents">,
      documentTitle: newTitle as string,
    })
      .then(() => {
        toast({
          variant: "default",
          title: "Document renamed successfully ✔",
        });
        setIsRenameModalOpen(false);
        setTimeout(() => {
          const button = document.querySelector("[toast-close]");
          if (button) {
            (button as HTMLButtonElement).click();
          }
        }, 2500);
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Unauthorized action ❌",
        });
        setIsDeleteModalOpen(false);
        setTimeout(() => {
          const button = document.querySelector("[toast-close]");
          if (button) {
            (button as HTMLButtonElement).click();
          }
        }, 2500);
      })
      .finally(() => {
        setIsRenaming(false);
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
          <Button
            variant="ghost"
            onClick={() => onNewTab(documentId!)}
            className="flex justify-between flex-1"
          >
            <span>Open this in new tab</span> <WebhookIcon />
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="ghost"
            onClick={() => setIsRenameModalOpen(true)}
            className="flex justify-between flex-1"
          >
            <span>Rename this document</span> <PenIcon />
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="destructive"
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex justify-between flex-1"
          >
            <span>Delete this document</span> <Trash2Icon />
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
      <DocumentRenameModal
        title={title}
        onUpdate={onUpdate}
        isRenaming={isRenaming}
        isOpen={isRenameModalOpen}
        setIsOpen={setIsRenameModalOpen}
      />
    </DropdownMenu>
  );
};

export default DocumentMenu;
