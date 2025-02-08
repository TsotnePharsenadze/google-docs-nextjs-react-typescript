import { Cloud, ShieldCheck } from "lucide-react";

export function DocumentInput() {
  return (
    <div className="flex items-center gap-1">
      <h1 className="text-lg px-1.5 cursor-pointer truncate font-bold">
        Untitled Document
      </h1>
      <ShieldCheck className="size-4"/>
    </div>
  );
}
