import { Doc } from "@/convex/_generated/dataModel";
import { ShieldCheck } from "lucide-react";

export function DocumentInput({ data }: { data: Doc<"documents"> }) {
  return (
    <div className="flex items-center gap-1">
      <h1 className="text-lg px-1.5 cursor-pointer truncate font-bold">
        {data?.title}
      </h1>
      <ShieldCheck className="size-4" />
    </div>
  );
}
