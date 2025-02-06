import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    {
      label: "Arial",
      value: "Arial",
    },
    {
      label: "Times New Roman",
      value: "Times New Roman",
    },
    {
      label: "Courier New",
      value: "Courier New",
    },
    {
      label: "Georgia",
      value: "Georgia",
    },
    {
      label: "Verdana",
      value: "Verdana",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 w-[120px] shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-500/90 hover:text-white">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Ariel"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map((font) => (
          <button
            className={cn(
              "px-2 py-1 hover:bg-neutral-500/90 text-sm rounded-sm flex justify-center items-center hover:text-white",
              editor?.getAttributes("textStyle").fontFamily === font.value &&
                "bg-neutral-500/90 text-white"
            )}
            key={font.label}
            style={{
              fontFamily: font.value,
            }}
            onClick={() =>
              editor?.chain().focus().setFontFamily(font.value).run()
            }
          >
            {font.label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
