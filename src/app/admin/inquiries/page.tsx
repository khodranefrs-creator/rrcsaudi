"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

const sampleInquiries = [
  { id: "1", name: "Ahmed Al-Rashid", email: "ahmed@example.com", type: "INVESTOR", status: "NEW", message: "I am interested in investment opportunities in Riyadh.", date: "2026-07-23" },
  { id: "2", name: "Sara Al-Otaibi", email: "sara@example.com", type: "GENERAL", status: "READ", message: "Please send me information about your services.", date: "2026-07-22" },
  { id: "3", name: "Khalid Al-Ghamdi", email: "khalid@example.com", type: "BRAND", status: "REPLIED", message: "Partnership inquiry for our brand.", date: "2026-07-20" },
];

const statusColors: Record<string, "default" | "secondary" | "gold" | "outline"> = {
  NEW: "default",
  READ: "secondary",
  REPLIED: "gold",
  CLOSED: "outline",
};

export default function AdminInquiriesPage() {
  const { data: session } = useSession();
  if (!session) redirect("/en/admin/login");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Inquiries</h1>
        <p className="text-muted-foreground">Manage investor and partner inquiries</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleInquiries.map((inq) => (
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
                    <Badge variant={statusColors[inq.status]}>{inq.status}</Badge>
                    <span className="text-xs text-muted-foreground">{inq.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
