"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

const sampleContacts = [
  { id: "1", name: "John Smith", email: "john@example.com", message: "Interested in your services.", date: "2026-07-23" },
  { id: "2", name: "Fatima Al-Harbi", email: "fatima@example.com", message: "Please send me the brochure.", date: "2026-07-22" },
];

export default function AdminContactsPage() {
  const { data: session } = useSession();
  if (!session) redirect("/en/admin/login");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Contact Requests</h1>
        <p className="text-muted-foreground">Messages from the contact form</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleContacts.map((c) => (
              <div key={c.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-sm text-muted-foreground">{c.email}</p>
                    <p className="text-sm mt-1">{c.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{c.date}</p>
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
