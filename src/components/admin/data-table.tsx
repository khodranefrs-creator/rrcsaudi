"use client";

import { Loader2, AlertCircle, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataTableProps<T> {
  data: T[] | undefined;
  isLoading: boolean;
  error: string | null;
  title: string;
  onRetry: () => void;
  emptyMessage?: string;
  emptyAction?: React.ReactNode;
  children: (data: T[]) => React.ReactNode;
}

export function DataTable<T>({
  data,
  isLoading,
  error,
  title,
  onRetry,
  emptyMessage = "No data found.",
  emptyAction,
  children,
}: DataTableProps<T>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p className="text-sm">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <AlertCircle className="h-8 w-8 mb-2 text-red-500" />
            <p className="text-sm mb-4">{error}</p>
            <Button variant="outline" size="sm" onClick={onRetry}>
              Try Again
            </Button>
          </div>
        ) : !data || data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Inbox className="h-8 w-8 mb-2" />
            <p className="text-sm mb-4">{emptyMessage}</p>
            {emptyAction}
          </div>
        ) : (
          children(data)
        )}
      </CardContent>
    </Card>
  );
}
