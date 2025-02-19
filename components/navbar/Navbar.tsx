"use client";

import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./DocumentInput";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Bold,
  FileIcon,
  FileJson,
  FilePenIcon,
  FilePlusIcon,
  FileSearch2,
  FileText,
  Globe,
  Italic,
  Printer,
  Redo2Icon,
  RemoveFormatting,
  Strikethrough,
  Table2Icon,
  Text,
  Trash2Icon,
  Underline,
  Undo2Icon,
} from "lucide-react";
import { MenubarSubContent, MenubarSubTrigger } from "@/components/ui/menubar";
import { getControlKeyEmoji } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { OrganizationSwitcher, UserButton } from "@clerk/clerk-react";
import Avatar from "../../app/documents/[documentId]/AvatarList";
import Inbox from "../Inbox";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import DocumentDeleteModal from "../home/DocumentDeleteModal";
import DocumentRenameModal from "../home/DocumentRenameModal";

const Navbar = ({ data }: { data: Doc<"documents"> }) => {
  const { editor } = useEditorStore();
  const { toast } = useToast();
  const params = useParams();
  const documentId = params?.documentId;

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
        router.push("/");
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

  const insertTable = ({ row, column }: { row: number; column: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: row, cols: column, withHeaderRow: false })
      .run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveJSON = () => {
    if (!editor) return null;

    const content = editor?.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });

    onDownload(blob, data.title + ".json");
  };

  const onSaveHTML = () => {
    if (!editor) return null;

    const content = editor?.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });

    onDownload(blob, data.title + ".html");
  };

  const onSaveText = () => {
    if (!editor) return null;

    const content = editor?.getText();
    const blob = new Blob([content], {
      type: "text/plain",
    });

    onDownload(blob, data.title + ".txt");
  };
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  console.log(isCreating);
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
    <>
      <nav className="flex items-center justify-between p-2 gap-2 bg-neutral-100 px-10">
        <div className="flex items-center justify-between  gap-2 bg-neutral-100">
          <Link href="/" className="flex justify-center items-center">
            <Image src="/logo.PNG" alt={"Logo"} width={36} height={36} />
          </Link>
          <div className="flex flex-col pl-2 rounded-md border-l-black border-l-[3px]">
            <DocumentInput data={data} />
            <div className="flex">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="hover:bg-neutral-100 cursor-pointer">
                    File
                  </MenubarTrigger>
                  <MenubarContent className="print:hidden">
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <FileIcon className="size-4 mr-2" />
                        Save
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem onClick={() => onSaveJSON()}>
                          <FileJson className="size-4 mr-2" />
                          JSON
                        </MenubarItem>
                        <MenubarItem onClick={() => onSaveHTML()}>
                          <Globe className="size-4 mr-2" />
                          HTML
                        </MenubarItem>
                        <MenubarItem onClick={() => window.print()}>
                          <FileSearch2 className="size-4 mr-2" />
                          PDF
                        </MenubarItem>
                        <MenubarItem onClick={() => onSaveText()}>
                          <FileText className="size-4 mr-2" />
                          Text
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem
                      onClick={() =>
                        handleTemplateClick({
                          title: "Untitled Document",
                          initialContent: "",
                        })
                      }
                    >
                      <FilePlusIcon className="size-4 mr-2" />
                      New Document
                    </MenubarItem>
                    <MenubarItem onClick={() => setIsRenameModalOpen(true)}>
                      <FilePenIcon className="size-4 mr-2" />
                      Rename File
                    </MenubarItem>
                    <MenubarItem onClick={() => setIsDeleteModalOpen(true)}>
                      <Trash2Icon className="size-4 mr-2" />
                      Delete File
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => window.print()}>
                      <Printer className="size-4 mr-2" />
                      Print
                      <MenubarShortcut className="bg-neutral-100 p-1 rounded-md">
                        <code>{getControlKeyEmoji()} + P</code>
                      </MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="hover:bg-neutral-100 cursor-pointer">
                    Edit
                  </MenubarTrigger>
                  <MenubarContent className="print:hidden">
                    <MenubarItem>
                      <Undo2Icon
                        className="size-4 mr-2"
                        onClick={() => editor?.chain().focus().undo().run()}
                      />
                      Undo
                      <MenubarShortcut className="bg-neutral-100 p-1 rounded-md">
                        <code>{getControlKeyEmoji()} + Z</code>
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      <Redo2Icon
                        className="size-4 mr-2"
                        onClick={() => editor?.chain().focus().redo().run()}
                      />
                      Redo
                      <MenubarShortcut className="bg-neutral-100 p-1 rounded-md">
                        <code>{getControlKeyEmoji()} + R</code>
                      </MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="hover:bg-neutral-100 cursor-pointer">
                    Insert
                  </MenubarTrigger>
                  <MenubarContent className="print:hidden">
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <Table2Icon className="size-4 mr-2" />
                        Table
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        {Array.from({ length: 4 }, (_, i) => (
                          <MenubarItem
                            key={i}
                            onClick={() =>
                              insertTable({ row: i + 1, column: i + 1 })
                            }
                          >
                            Row x Column: {i + 1}x{i + 1}
                          </MenubarItem>
                        ))}
                      </MenubarSubContent>
                    </MenubarSub>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="hover:bg-neutral-100 cursor-pointer">
                    Format
                  </MenubarTrigger>
                  <MenubarContent className="print:hidden">
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <Text className="size-4 mr-2" />
                        Text
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem
                          onClick={() =>
                            editor?.chain().focus().toggleBold().run()
                          }
                        >
                          <Bold className="size-4 mr-2" />
                          Bold
                          <MenubarShortcut className="bg-neutral-100 p-1 rounded-md">
                            <code>{getControlKeyEmoji()} + B</code>
                          </MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                          onClick={() =>
                            editor?.chain().focus().toggleItalic().run()
                          }
                        >
                          <Italic className="size-4 mr-2" />
                          Italic
                          <MenubarShortcut className="bg-neutral-100 p-1 rounded-md">
                            <code>{getControlKeyEmoji()} + I</code>
                          </MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                          onClick={() =>
                            editor?.chain().focus().toggleUnderline().run()
                          }
                        >
                          <Underline className="size-4 mr-2" />
                          Underline
                          <MenubarShortcut className="bg-neutral-100 p-1 rounded-md">
                            <code>{getControlKeyEmoji()} + U</code>
                          </MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                          onClick={() =>
                            editor?.chain().focus().toggleStrike().run()
                          }
                        >
                          <Strikethrough className="size-4 mr-2" />
                          <span
                            dangerouslySetInnerHTML={{
                              __html: "Strikethrough &nbsp;&nbsp;",
                            }}
                          />
                          <MenubarShortcut className="bg-neutral-100 p-1 rounded-md">
                            <code>{getControlKeyEmoji()} + S</code>
                          </MenubarShortcut>
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem
                      onClick={() =>
                        editor?.chain().focus().unsetAllMarks().run()
                      }
                    >
                      <RemoveFormatting className="size-4 mr-2" />
                      Remove Formatting
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </div>
        <div className="flex gap-2 p-2 items-center">
          <Avatar />
          <Inbox />
          <OrganizationSwitcher />
          <UserButton />
        </div>
      </nav>
      <DocumentDeleteModal
        title={data?.title}
        onDelete={() => onDelete()}
        isDeleting={isDeleting}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      />
      <DocumentRenameModal
        title={data?.title}
        onUpdate={onUpdate}
        isRenaming={isRenaming}
        isOpen={isRenameModalOpen}
        setIsOpen={setIsRenameModalOpen}
      />
    </>
  );
};

export default Navbar;
