"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  if (!session) redirect("/en/admin/login");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground">Manage site configuration</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Site Name</label>
              <Input defaultValue="RRC Saudi" />
            </div>
            <div>
              <label className="text-sm font-medium">Site Description</label>
              <Input defaultValue="Real Estate Development & Investment" />
            </div>
            <div>
              <label className="text-sm font-medium">Contact Email</label>
              <Input defaultValue="info@rrcsaudi.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Contact Phone</label>
              <Input defaultValue="+966 XX XXX XXXX" />
            </div>
            <Button variant="gold">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Default Meta Title</label>
              <Input defaultValue="RRC Saudi - Real Estate Development & Investment" />
            </div>
            <div>
              <label className="text-sm font-medium">Default Meta Description</label>
              <Input defaultValue="RRC Saudi delivers world-class real estate development and investment solutions across KSA." />
            </div>
            <div>
              <label className="text-sm font-medium">OG Image URL</label>
              <Input defaultValue="/images/og-home.jpg" />
            </div>
            <Button variant="gold">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
