"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { useAdminFetch } from "@/lib/use-admin-fetch";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  type: string;
  status: string;
  message: string;
}

const statusColors: Record<string, "default" | "secondary" | "gold" | "outline"> = {
  NEW: "default",
  READ: "secondary",
  REPLIED: "gold",
  CLOSED: "outline",
};

export default function AdminInquiriesPage() {
  const { data: session } = useSession();
  if (!session) redirect("/en/admin/login");

  const { data: inquiries, loading, error, refetch } = useAdminFetch<Inquiry>("/api/inquiries");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Inquiries</h1>
        <p className="text-muted-foreground">Manage investor and partner inquiries</p>
      </div>

      <DataTable
        data={inquiries}
        isLoading={loading}
        error={error}
        title="All Inquiries"
        onRetry={refetch}
        emptyMessage="No inquiries received yet. They will appear here once users submit the inquiry form."
      >
        {(data) => (
          <div className="space-y-4">
            {data.map((inq) => (
              <div key={inq.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{inq.name}</p>
                      <p className="text-sm text-muted-foreground">{inq.email}</p>
                      <p className="text-sm mt-1 line-clamp-2">{inq.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={statusColors[inq.status] || "outline"}>{inq.status}</Badge>
                    <span className="text-xs text-muted-foreground">{inq.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </DataTable>
    </div>
  );
}
