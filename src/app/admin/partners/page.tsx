"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { useAdminFetch } from "@/lib/use-admin-fetch";

interface Partner {
  id: string;
  nameEn: string;
  type: string;
  website: string | null;
  published: boolean;
  verified: boolean;
}

export default function AdminPartnersPage() {
  const { data: session } = useSession();
  if (!session) redirect("/en/admin/login");

  const { data: partners, loading, error, refetch } = useAdminFetch<Partner>("/api/partners");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Partners</h1>
          <p className="text-muted-foreground">Manage strategic partners</p>
        </div>
        <div />
      </div>

      <DataTable
        data={partners}
        isLoading={loading}
        error={error}
        title="All Partners"
        onRetry={refetch}
        emptyMessage="No partners yet. Add your first strategic partner."
      >
        {(data) => (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Website</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((partner) => (
                  <tr key={partner.id} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium">{partner.nameEn}</td>
                    <td className="py-3 pr-4">
                      <span className="text-xs bg-charcoal-100 px-2 py-1 rounded">
                        {partner.type}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex gap-1">
                        {partner.published ? (
                          <Badge variant="gold" className="text-xs">Published</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">Draft</Badge>
                        )}
                        {partner.verified && (
                          <Badge variant="default" className="text-xs">Verified</Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      {partner.website ? (
                        <a
                          href={partner.website}
                          target="_blank"
                          className="text-blue-600 hover:underline inline-flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" /> Visit
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-3">
                      <div />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DataTable>
    </div>
  );
}
