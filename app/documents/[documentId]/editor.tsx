"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import ImageResize from "tiptap-extension-resize-image";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import { LineHeightExtension } from "@/extentions/line-height";
import { useEditorStore } from "@/store/use-editor-store";
import Link from "@tiptap/extension-link";
import { FontSizeExtension } from "@/extentions/font-size";
import {
  useLiveblocksExtension,
  FloatingComposer,
} from "@liveblocks/react-tiptap";
import { Threads } from "./Threads";
import { useStorage } from "@liveblocks/react";
import Ruler from "@/components/Ruler";

export default function Editor({
  initialContent,
}: {
  initialContent?: string | undefined;
}) {
  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);

  const { setEditor } = useEditorStore();
  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true,
  });

  const editor = useEditor({
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin ?? "56"}px; padding-right: ${rightMargin ?? "56"}px`,
        class:
          "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    immediatelyRender: false,
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
      Table,
      FontSizeExtension,
      TableRow,
      TableCell,
      TableHeader,
      Image,
      LineHeightExtension.configure({
        types: ["paragraph", "heading"],
        defaultLineHeight: "normal",
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
      }),
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      ImageResize,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      FontFamily,
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
    ],
    content: ``,
  });

  if (!editor) return null;

  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] p-4 print:p-0 pring:Bg-white print:overflow-visible">
      <Ruler />
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 print:w-full mx-auto print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
        <FloatingComposer editor={editor} />
      </div>
    </div>
  );
}
