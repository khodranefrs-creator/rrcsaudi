"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { useAdminFetch } from "@/lib/use-admin-fetch";

interface BlogPost {
  id: string;
  titleEn: string;
  slug: string;
  published: boolean;
  createdAt: string;
}

export default function AdminBlogPage() {
  const { data: session } = useSession();
  if (!session) redirect("/en/admin/login");

  const { data: posts, loading, error, refetch } = useAdminFetch<BlogPost>("/api/blog");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Manage blog content</p>
        </div>
        <div />
      </div>

      <DataTable
        data={posts}
        isLoading={loading}
        error={error}
        title="All Posts"
        onRetry={refetch}
        emptyMessage="No blog posts yet. Create your first post to get started."
      >
        {(data) => (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((post) => (
                  <tr key={post.id} className="border-b last:border-0">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{post.titleEn}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge variant={post.published ? "gold" : "secondary"}>
                        {post.published ? "PUBLISHED" : "DRAFT"}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        {post.published && (
                          <a href={`/en/blog/${post.slug}`} target="_blank">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </a>
                        )}
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
