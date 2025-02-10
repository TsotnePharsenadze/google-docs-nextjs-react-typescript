"use client";

import { Loader2Icon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface DocumentRenameModal {
  title: string | undefined;
  onUpdate: (newTitle: string) => void;
  isRenaming: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DocumentRenameModal = ({
  title,
  onUpdate,
  isRenaming,
  isOpen,
  setIsOpen,
}: DocumentRenameModal) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleOnUpdate = () => {
    try {
      onUpdate(value);
    } catch (e) {
      console.error(e);
      setError("Incorrect keyword");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle>
          <b>{title}</b>
        </DialogTitle>
        <span>New title:</span>
        {error && (
          <p className="text-red-500 text-sm font-semibold">
            Something went wrong! try again later!
          </p>
        )}
        <Input
          type="text"
          className={`${error && "border-red-500"} -mt-4`}
          onChange={(e) => handleOnChange(e)}
        />
        <Separator />
        <DialogFooter>
          <Button
            variant="default"
            className={cn(isRenaming && "bg-opacity-70 cursor-none")}
            onClick={() => handleOnUpdate()}
          >
            {isRenaming ? (
              <Loader2Icon className="animate-spin h-4 w-4" />
            ) : (
              "UPDATE"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentRenameModal;
