"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Building2, TrendingUp, Shield, ClipboardCheck, HardHat } from "lucide-react";
import { services } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  ClipboardCheck: <ClipboardCheck className="h-5 w-5" />,
  HardHat: <HardHat className="h-5 w-5" />,
};

export default function AdminServicesPage() {
  const { data: session } = useSession();
  if (!session) redirect("/en/admin/login");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Button variant="gold">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-gold-600">{iconMap[service.icon ?? ""] || <Building2 className="h-5 w-5" />}</div>
                <h3 className="font-semibold">{service.titleEn}</h3>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{service.descriptionEn}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Order: {service.order}</span>
                <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
