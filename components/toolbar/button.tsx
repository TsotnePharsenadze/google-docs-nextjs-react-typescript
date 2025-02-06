import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

export default function ToolbarButton({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-500/90",
        isActive && "bg-neutral-500/80 text-white"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}
