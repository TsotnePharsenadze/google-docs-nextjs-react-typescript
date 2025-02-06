"use client";

import { LucideIcon, PrinterIcon, Redo2Icon, UndoIcon } from "lucide-react";
import ToolbarButton from "@/components/toolbar/button";
import { useEditorStore } from "@/store/use-editor-store";

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
    ],
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto print:hidden">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
}
