"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, Shield, ClipboardCheck, HardHat, Loader2, AlertCircle, Inbox } from "lucide-react";
import { useAdminFetch } from "@/lib/use-admin-fetch";

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  ClipboardCheck: <ClipboardCheck className="h-5 w-5" />,
  HardHat: <HardHat className="h-5 w-5" />,
};

interface Service {
  id: string;
  titleEn: string;
  descriptionEn: string;
  icon: string | null;
  order: number;
}

export default function AdminServicesPage() {
  const { data: session } = useSession();
  if (!session) redirect("/en/admin/login");

  const { data: services, loading, error, refetch } = useAdminFetch<Service>("/api/services");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <div />
      </div>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6 flex items-center justify-center h-32">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <AlertCircle className="h-8 w-8 mb-2 text-red-500" />
          <p className="text-sm mb-4">{error}</p>
          <Button variant="outline" size="sm" onClick={refetch}>Try Again</Button>
        </div>
      )}

      {!loading && !error && services.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Inbox className="h-8 w-8 mb-2" />
          <p className="text-sm mb-4">No services yet. Create your first service.</p>
          <div />
        </div>
      )}

      {!loading && !error && services.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-gold-600">
                    {iconMap[service.icon ?? ""] || <Building2 className="h-5 w-5" />}
                  </div>
                  <h3 className="font-semibold">{service.titleEn}</h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{service.descriptionEn}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Order: {service.order}</span>
                  <div />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
