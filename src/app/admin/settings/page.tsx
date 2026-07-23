"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

type ContactSettings = {
  phone: string;
  email: string;
  addressEn: string;
  addressAr: string;
};

type SeoSettings = {
  defaultTitle: string;
  defaultDescription: string;
  ogImage: string;
};

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  if (!session) redirect("/en/admin/login");

  const [contact, setContact] = useState<ContactSettings>({
    phone: "",
    email: "",
    addressEn: "",
    addressAr: "",
  });
  const [seo, setSeo] = useState<SeoSettings>({
    defaultTitle: "",
    defaultDescription: "",
    ogImage: "/images/og-home.jpg",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          if (res.data.contact) {
            setContact(res.data.contact as ContactSettings);
          }
          if (res.data.seo) {
            setSeo(res.data.seo as SeoSettings);
          }
        }
      })
      .catch(() => toast.error("Failed to load settings"))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, seo }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Settings saved successfully");
      } else {
        toast.error("Failed to save settings");
      }
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Site Settings</h1>
          <p className="text-muted-foreground">Manage site configuration</p>
        </div>
        <Button variant="gold" onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Save Settings
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                placeholder="+966 XX XXX XXXX"
              />
              <p className="text-xs text-muted-foreground mt-1">Leave empty to hide phone on public pages</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                placeholder="info@rrcsaudi.com"
              />
              <p className="text-xs text-muted-foreground mt-1">Leave empty to hide email on public pages</p>
            </div>
            <div>
              <label className="text-sm font-medium">Address (English)</label>
              <Input
                value={contact.addressEn}
                onChange={(e) => setContact({ ...contact, addressEn: e.target.value })}
                placeholder="Riyadh, Saudi Arabia"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Address (Arabic)</label>
              <Input
                value={contact.addressAr}
                onChange={(e) => setContact({ ...contact, addressAr: e.target.value })}
                placeholder="الرياض، المملكة العربية السعودية"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Default Meta Title</label>
              <Input
                value={seo.defaultTitle}
                onChange={(e) => setSeo({ ...seo, defaultTitle: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Default Meta Description</label>
              <Input
                value={seo.defaultDescription}
                onChange={(e) => setSeo({ ...seo, defaultDescription: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">OG Image URL</label>
              <Input
                value={seo.ogImage}
                onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
