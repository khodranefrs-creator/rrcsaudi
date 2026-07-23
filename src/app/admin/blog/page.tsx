"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, FileText } from "lucide-react";

const blogPosts = [
  { id: "1", titleEn: "Saudi Real Estate Market Outlook 2026", status: "PUBLISHED", date: "2026-06-15" },
  { id: "2", titleEn: "Investing in Vision 2030 Mega Projects", status: "PUBLISHED", date: "2026-05-28" },
  { id: "3", titleEn: "Sustainable Real Estate Development", status: "DRAFT", date: "2026-05-10" },
];

export default function AdminBlogPage() {
  const { data: session } = useSession();
  if (!session) redirect("/en/admin/login");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Manage blog content</p>
        </div>
        <Button variant="gold">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
        </CardHeader>
        <CardContent>
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
                {blogPosts.map((post) => (
                  <tr key={post.id} className="border-b last:border-0">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{post.titleEn}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge variant={post.status === "PUBLISHED" ? "gold" : "secondary"}>{post.status}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">{post.date}</td>
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
