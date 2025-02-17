"use client";

import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

interface GlobalErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function GlobalErrorPage({
  error,
  reset,
}: GlobalErrorPageProps) {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="flex-col space-y-6">
        <div className="flex flex-col space-y-2 items-center">
          <div className="bg-rose-100 p-4 rounded-full">
            <TriangleAlert className="size-12" />
          </div>
          <h1 className="text-xl font-black">Oops! something went wrong</h1>
          <p className="text-sm text-gray-600">
            Error message: <span className="underline">{error.message}</span>
          </p>
        </div>
        <div className="flex space-x-2 items-center justify-center">
          <Button size="sm" onClick={() => reset()}>
            Try Again
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Go Back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
