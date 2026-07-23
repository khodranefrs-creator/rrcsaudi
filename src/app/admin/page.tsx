"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, FileText, Users, MessageSquare, TrendingUp, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useAdminFetch } from "@/lib/use-admin-fetch";

interface IncomingInquiry {
  name: string;
  email: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  if (!session) redirect("/en/admin/login");

  const { data: projects, loading: pl, error: pe } = useAdminFetch<{ id: string }>("/api/projects");
  const { data: services, loading: sl, error: se } = useAdminFetch<{ id: string }>("/api/services");
  const { data: partners, loading: ptl, error: pte } = useAdminFetch<{ id: string }>("/api/partners");
  const { data: inquiries, loading: il, error: ie } = useAdminFetch<IncomingInquiry>("/api/inquiries");

  const loading = pl || sl || ptl || il;
  const error = pe || se || pte || ie;

  const statCards = [
    { label: "Projects", value: projects?.length ?? "--", icon: Building2, href: "/en/admin/projects", color: "text-blue-600" },
    { label: "Inquiries", value: inquiries?.length ?? "--", icon: MessageSquare, href: "/en/admin/inquiries", color: "text-green-600" },
    { label: "Partners", value: partners?.length ?? "--", icon: Users, href: "/en/admin/partners", color: "text-purple-600" },
    { label: "Services", value: services?.length ?? "--", icon: FileText, href: "/en/admin/services", color: "text-gold-600" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {session.user?.name || "Admin"}</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Some data failed to load. Check each section for details.</span>
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6 flex items-center justify-center h-24">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((item) => (
            <Link key={item.label} href={item.href}>
              <Card className="transition-all hover:shadow-lux cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <item.icon className={`h-8 w-8 ${item.color}`} />
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="mt-4 text-2xl font-bold">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Add New Project", href: "/en/admin/projects" },
              { label: "Manage Services", href: "/en/admin/services" },
              { label: "View Inquiries", href: "/en/admin/inquiries" },
              { label: "Site Settings", href: "/en/admin/settings" },
            ].map((action) => (
              <Link key={action.href} href={action.href}>
                <Button variant="outline" className="w-full justify-between">
                  {action.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            {inquiries.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No inquiries yet.</p>
            ) : (
              <div className="space-y-4">
                {inquiries.slice(0, 3).map((inq, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium">{inq.name}</p>
                      <p className="text-xs text-muted-foreground">{inq.email}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
