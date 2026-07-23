"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center text-muted-foreground max-w-md">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
        <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
        <p className="text-sm mb-4">{error.message || "An unexpected error occurred."}</p>
        <Button variant="outline" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
