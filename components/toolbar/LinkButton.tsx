"use client";

import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const LinkButton = () => {
  const { editor } = useEditorStore();

  const [link, setLink] = useState("");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setLink("");
  };

  return (
    <DropdownMenu
      onOpenChange={(o) => {
        if (o) {
          setLink(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 min-w-7 shrink-0 flex flex-col p-2 items-center justify-center rounded-sm hover:bg-neutral-500/90 hover:text-white">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex gap-x-1 items-center">
        <Input
          placeholder="https://example.com"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button onClick={() => onChange(link)}>Attach</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
