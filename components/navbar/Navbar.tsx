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

const Navbar = () => {
  return (
    <nav className="flex items-center p-2 gap-2 bg-neutral-100 pl-10">
      <Link href="/" className="flex justify-center items-center">
        <Image src="/logo.PNG" alt={"Logo"} width={36} height={36} />
      </Link>
      <div className="flex flex-col pl-2 rounded-md border-l-black border-l-[3px]">
        <DocumentInput />
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
                    <MenubarItem>
                      <FileJson className="size-4 mr-2" />
                      JSON
                    </MenubarItem>
                    <MenubarItem>
                      <Globe className="size-4 mr-2" />
                      HTML
                    </MenubarItem>
                    <MenubarItem>
                      <FileSearch2 className="size-4 mr-2" />
                      PDF
                    </MenubarItem>
                    <MenubarItem>
                      <FileText className="size-4 mr-2" />
                      Text
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>
                  <FilePlusIcon className="size-4 mr-2" />
                  New Document
                </MenubarItem>
                <MenubarItem>
                  <FilePenIcon className="size-4 mr-2" />
                  Rename File
                </MenubarItem>
                <MenubarItem>
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
                  <Undo2Icon className="size-4 mr-2" />
                  Undo
                  <MenubarShortcut className="bg-neutral-100 p-1 rounded-md">
                    <code>{getControlKeyEmoji()} + Z</code>
                  </MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <Redo2Icon className="size-4 mr-2" />
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
                      <MenubarItem key={i}>
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
                    <MenubarItem>
                      <Bold className="size-4 mr-2" />
                      Bold
                      <MenubarShortcut className="bg-neutral-100 p-1 rounded-md">
                        <code>{getControlKeyEmoji()} + B</code>
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      <Italic className="size-4 mr-2" />
                      Italic
                      <MenubarShortcut className="bg-neutral-100 p-1 rounded-md">
                        <code>{getControlKeyEmoji()} + I</code>
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      <Underline className="size-4 mr-2" />
                      Underline
                      <MenubarShortcut className="bg-neutral-100 p-1 rounded-md">
                        <code>{getControlKeyEmoji()} + U</code>
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
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
                <MenubarItem>
                  <RemoveFormatting className="size-4 mr-2" />
                  Remove Formatting
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
