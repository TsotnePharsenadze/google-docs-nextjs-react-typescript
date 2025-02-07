import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { type Level } from "@tiptap/extension-heading";
import { ChevronDownIcon } from "lucide-react";
import { useEditorStore } from "@/store/use-editor-store";
import { cn } from "@/lib/utils";

export const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    {
      label: "Normal text",
      value: 0,
      fontSize: "16px",
    },
    {
      label: "Heading 1",
      value: 1,
      fontSize: "32px",
    },
    {
      label: "Heading 2",
      value: 2,
      fontSize: "24px",
    },
    {
      label: "Heading 3",
      value: 3,
      fontSize: "20px",
    },
    {
      label: "Heading 4",
      value: 4,
      fontSize: "18px",
    },
    {
      label: "Heading 5",
      value: 5,
      fontSize: "16px",
    },
  ];

  const getCurrentHeadng = () => {
    const heading = headings.find((heading) =>
      editor?.isActive("heading", { level: heading.value })
    );

    return heading ? `Heading: ${heading.value}` : "Normal Text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 min-w-7 shrink-0 flex p-2 items-center justify-center rounded-sm hover:bg-neutral-500/90 hover:text-white">
          <span className="truncate">{getCurrentHeadng()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map(({ label, value, fontSize }) => (
          <button
            className={cn(
              "px-2 py-1 hover:bg-neutral-500/90 text-sm rounded-sm flex justify-center items-center hover:text-white",
              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value }) &&
                  "bg-neutral-500/90 text-white")
            )}
            key={label}
            style={{
              fontSize,
            }}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
