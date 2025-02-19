"use client";

import * as React from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading,
  AlignJustify,
  Link,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";

export function KeySheet() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Tiptap Shortcuts">
            <CommandItem>
              <Bold />
              <span>Bold</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Italic />
              <span>Italic</span>
              <CommandShortcut>⌘I</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Underline />
              <span>Underline</span>
              <CommandShortcut>⌘U</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Heading />
              <span>Heading 1</span>
              <CommandShortcut>⌘1</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Heading />
              <span>Heading 2</span>
              <CommandShortcut>⌘2</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Heading />
              <span>Heading 3</span>
              <CommandShortcut>⌘3</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <AlignJustify />
              <span>Justify Text</span>
              <CommandShortcut>⌘J</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Link />
              <span>Insert Link</span>
              <CommandShortcut>⌘K</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
