import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignVerticalDistributeStartIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const TextAlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeft,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenter,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRight,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustify,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 min-w-7 shrink-0 flex flex-col p-2 items-center justify-center rounded-sm hover:bg-neutral-500/90 hover:text-white">
          <AlignVerticalDistributeStartIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {alignments.map(({ label, value, icon: Icon }) => (
          <Button
            key={value}
            variant="outline"
            className={cn(
              editor?.isActive({ textAlign: value }) && "bg-gray-300 hover:bg-gray-300"
            )}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
          >
            <Icon />
            <span>{label}</span>
          </Button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
