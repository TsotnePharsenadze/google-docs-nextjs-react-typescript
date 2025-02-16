import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(`min-h-screen flex justify-center items-center`, className)}
    >
      <Loader2Icon className="animate-spin h-9 w-9" />
    </div>
  );
};

export default Loading;
