"use client";

import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquareIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheck,
  UnderlineIcon,
  UndoIcon,
} from "lucide-react";
import ToolbarButton from "@/components/toolbar/button";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { FontFamilyButton } from "@/components/toolbar/FontFamilyButton";
import { HeadingLevelButton } from "@/components/toolbar/HeadingLevelButton";
import { TextColorButton } from "@/components/toolbar/TextColorButton";
import { HighlightColorButton } from "@/components/toolbar/HighlightColorButton";
import { LinkButton } from "@/components/toolbar/LinkButton";
import { ImageButton } from "@/components/toolbar/ImageButton";
import { TextAlignButton } from "@/components/toolbar/TextAlignButton";
import { ListButton } from "@/components/toolbar/ListButton";
import { FontSizeButton } from "@/components/toolbar/FontSizeButton";
import { LineHeightButton } from "@/components/toolbar/LineHeightButton";

export default function ToolbarComponent() {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick?: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: UndoIcon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheck,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current == "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquareIcon,
        onClick: () => console.log("TODO: Comment"),
        isActive: false,
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto print:hidden justify-center">
      {sections.map((section, index) => {
        return (
          <React.Fragment key={index}>
            {section.map((item) => (
              <ToolbarButton key={item.label} {...item} />
            ))}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {index == 0 && (
              <>
                <FontFamilyButton />
                <Separator
                  orientation="vertical"
                  className="h-6 bg-neutral-300"
                />
                <TextAlignButton />
                <Separator
                  orientation="vertical"
                  className="h-6 bg-neutral-300"
                />
                <ListButton />
                <Separator
                  orientation="vertical"
                  className="h-6 bg-neutral-300"
                />
                <FontSizeButton />
                <Separator
                  orientation="vertical"
                  className="h-6 bg-neutral-300"
                />
                <LineHeightButton />
                <Separator
                  orientation="vertical"
                  className="h-6 bg-neutral-300"
                />
              </>
            )}
            {index == 2 && (
              <>
                <HeadingLevelButton />
                <Separator
                  orientation="vertical"
                  className="h-6 bg-neutral-300"
                />
                <TextColorButton />
                <Separator
                  orientation="vertical"
                  className="h-6 bg-neutral-300"
                />
                <HighlightColorButton />
                <Separator
                  orientation="vertical"
                  className="h-6 bg-neutral-300"
                />
                <LinkButton />
                <Separator
                  orientation="vertical"
                  className="h-6 bg-neutral-300"
                />
                <ImageButton />
                <Separator
                  orientation="vertical"
                  className="h-6 bg-neutral-300"
                />
              </>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
