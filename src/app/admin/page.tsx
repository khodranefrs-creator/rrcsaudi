"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, FileText, Users, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  if (!session) redirect("/en/admin/login");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {session.user?.name || "Admin"}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Projects", value: "6", icon: Building2, href: "/admin/projects", color: "text-blue-600" },
          { label: "Inquiries", value: "12", icon: MessageSquare, href: "/admin/inquiries", color: "text-green-600" },
          { label: "Partners", value: "9", icon: Users, href: "/admin/partners", color: "text-purple-600" },
          { label: "Services", value: "5", icon: FileText, href: "/admin/services", color: "text-gold-600" },
        ].map((item) => (
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

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Add New Project", href: "/admin/projects" },
              { label: "Manage Services", href: "/admin/services" },
              { label: "View Inquiries", href: "/admin/inquiries" },
              { label: "Site Settings", href: "/admin/settings" },
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
            <div className="space-y-4">
              {[
                { name: "Ahmed Al-Rashid", email: "ahmed@example.com", date: "2 hours ago" },
                { name: "Sara Al-Otaibi", email: "sara@example.com", date: "5 hours ago" },
                { name: "Khalid Al-Ghamdi", email: "khalid@example.com", date: "1 day ago" },
              ].map((inq, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{inq.name}</p>
                    <p className="text-xs text-muted-foreground">{inq.email}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{inq.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
