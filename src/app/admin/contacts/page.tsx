"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Mail } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { useAdminFetch } from "@/lib/use-admin-fetch";

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  createdAt: string;
}

export default function AdminContactsPage() {
  const { data: session } = useSession();
  if (!session) redirect("/en/admin/login");

  const { data: requests, loading, error, refetch } = useAdminFetch<ContactRequest>("/api/contact-requests");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Contact Requests</h1>
        <p className="text-muted-foreground">Messages from the contact form</p>
      </div>

      <DataTable
        data={requests}
        isLoading={loading}
        error={error}
        title="All Messages"
        onRetry={refetch}
        emptyMessage="No contact messages yet. They will appear here once users submit the contact form."
      >
        {(data) => (
          <div className="space-y-4">
            {data.map((c) => (
              <div key={c.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-sm text-muted-foreground">{c.email}</p>
                    {c.phone && <p className="text-sm text-muted-foreground">{c.phone}</p>}
                    {c.company && <p className="text-sm text-muted-foreground">{c.company}</p>}
                    <p className="text-sm mt-1">{c.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </p>
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
