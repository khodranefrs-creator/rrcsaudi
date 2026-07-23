"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Building2 } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { useAdminFetch } from "@/lib/use-admin-fetch";

interface Project {
  id: string;
  titleEn: string;
  slug: string;
  status: string;
  category: string;
  locationEn: string;
  published: boolean;
}

export default function AdminProjectsPage() {
  const { data: session } = useSession();
  if (!session) redirect("/en/admin/login");

  const { data: projects, loading, error, refetch } = useAdminFetch<Project>("/api/projects");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your real estate projects</p>
        </div>
        <div />
      </div>

      <DataTable
        data={projects}
        isLoading={loading}
        error={error}
        title="All Projects"
        onRetry={refetch}
        emptyMessage="No projects yet. Create your first project to get started."
      >
        {(data) => (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Location</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((project) => (
                  <tr key={project.id} className="border-b last:border-0">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="font-medium">{project.titleEn}</span>
                        {!project.published && (
                          <Badge variant="outline" className="text-xs">Draft</Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge
                        variant={
                          project.status === "COMPLETED" ? "gold"
                          : project.status === "UNDER_CONSTRUCTION" ? "default"
                          : "secondary"
                        }
                      >
                        {project.status.replace(/_/g, " ")}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {project.category.replace(/_/g, " ")}
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">{project.locationEn}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/en/projects/${project.slug}`} target="_blank">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
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
