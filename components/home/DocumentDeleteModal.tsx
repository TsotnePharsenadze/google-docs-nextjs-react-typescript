"use client";

import { Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface DocumentDeleteModal {
  title: string | undefined;
  onDelete: () => void;
  isDeleting: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DocumentDeleteModal = ({
  title,
  onDelete,
  isDeleting,
  isOpen,
  setIsOpen,
}: DocumentDeleteModal) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleOnDelete = () => {
    if (value === "DELETE") {
      onDelete();
    } else {
      setError("Incorrect keyword");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle>
          Are you sure you want to delete &quot;<b>{title}</b>&quot; document?
        </DialogTitle>
        <DialogHeader className="text-muted-foreground italic">
          Note that you won&apos;t be able to recover deleted document
        </DialogHeader>
        <span>
          Please write{" "}
          <span className="text-red-500 uppercase font-black">&quot;DELETE&quot;</span>{" "}
          below to confirm your action
        </span>
        {error && (
          <p className="text-red-500 text-sm font-semibold">
            Incorrect keyword make sure its &quot;DELETE&quot; in uppercase
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
            variant="destructive"
            className={cn(isDeleting && "bg-opacity-70 cursor-none")}
            onClick={() => handleOnDelete()}
          >
            {isDeleting ? (
              <Loader2Icon className="animate-spin h-4 w-4" />
            ) : (
              "DELETE"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDeleteModal;
