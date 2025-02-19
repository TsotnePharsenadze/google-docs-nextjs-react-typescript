import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ListIcon,
  ListOrderedIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const ListButton = () => {
  const { editor } = useEditorStore();

  const Lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 min-w-7 shrink-0 flex flex-col p-2 items-center justify-center rounded-sm hover:bg-neutral-500/90 hover:text-white">
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {Lists.map(({ label, icon: Icon, isActive, onClick }) => (
          <Button
            key={label}
            variant="outline"
            className={cn(isActive() && "bg-gray-300 hover:bg-gray-300")}
            onClick={() => onClick()}
          >
            <Icon />
            <span>{label}</span>
          </Button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
