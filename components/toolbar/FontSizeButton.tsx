"use client";

import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link2Icon, MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = ~~newSize;
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(size);
      setInputValue(size);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (~~e.target.value > 0 && ~~e.target.value <= 50) {
      setInputValue(e.target.value);
    }
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    if (~~fontSize + 1 <= 50) {
      const newSize = ~~fontSize + 1;
      updateFontSize((([] as unknown as string) + newSize) as string); //ahahahhah
    }
  };

  const decrement = () => {
    if (~~fontSize - 1 > 0) {
      const newSize = ~~fontSize - 1;
      updateFontSize((([] as unknown as string) + newSize) as string); //ahahahhah
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={decrement}
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-md hover:bg-neutral-200/90"
      >
        <MinusIcon className="size-4" />
      </button>
      {isEditing ? (
        <Input
          className="w-[44px] border-2 border-black focus:ring-4 focus:ring-black"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Button
          className="w-[44px]"
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          variant="outline"
        >
          {inputValue}
        </Button>
      )}
      <button
        onClick={increment}
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-md hover:bg-neutral-200/90"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};
