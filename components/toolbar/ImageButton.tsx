"use client";

import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Image, Link2Icon, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";

export const ImageButton = () => {
  const { editor } = useEditorStore();

  const [isDialongOpen, setIsDialogOpen] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };

    input.click();
  };

  const handleImageSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-sm h-7 min-w-7 shrink-0 flex flex-col p-2 items-center justify-center rounded-sm hover:bg-neutral-500/90 hover:text-white">
            <Image className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex gap-x-1 items-center">
          <DropdownMenuItem>
            <Button onClick={() => onUpload()}>
              <Upload className="size-4 mr-2" />
              Upload image
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Link2Icon className="size-4 mr-2" />
              Attach via link
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialongOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Image link</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Paste image URL"
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageSubmit}>Attach</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
