"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, ExternalLink } from "lucide-react";
import { partners } from "@/data/partners";

export default function AdminPartnersPage() {
  const { data: session } = useSession();
  if (!session) redirect("/en/admin/login");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Partners</h1>
          <p className="text-muted-foreground">Manage strategic partners</p>
        </div>
        <Button variant="gold">
          <Plus className="h-4 w-4 mr-2" />
          Add Partner
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Partners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Website</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((partner) => (
                  <tr key={partner.id} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium">{partner.nameEn}</td>
                    <td className="py-3 pr-4">
                      <span className="text-xs bg-charcoal-100 px-2 py-1 rounded">{partner.type}</span>
                    </td>
                    <td className="py-3 pr-4">
                      {partner.website ? (
                        <a href={partner.website} target="_blank" className="text-blue-600 hover:underline inline-flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" /> Link
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-3">
                      <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
