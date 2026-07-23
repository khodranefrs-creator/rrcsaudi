"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, TrendingUp, Shield, ClipboardCheck, HardHat } from "lucide-react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const serviceIcons: Record<string, React.ReactNode> = {
  Building2: <Building2 className="h-10 w-10" />,
  TrendingUp: <TrendingUp className="h-10 w-10" />,
  Shield: <Shield className="h-10 w-10" />,
  ClipboardCheck: <ClipboardCheck className="h-10 w-10" />,
  HardHat: <HardHat className="h-10 w-10" />,
};

export function ServicesClient() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const isAr = locale === "ar";

  const sorted = [...services].sort((a, b) => a.order - b.order);

  return (
    <Section title={t("services.title")} subtitle={t("services.subtitle")} className="bg-gradient-light">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((service) => (
          <Link key={service.id} href={`/${locale}/services/${service.slug}`}>
            <Card className="group h-full transition-all duration-300 hover:shadow-lux-lg hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-navy-900 text-gold-500 transition-colors group-hover:bg-gold-500 group-hover:text-navy-900">
                  {serviceIcons[service.icon ?? ""] || <Building2 className="h-10 w-10" />}
                </div>
                <h3 className="text-xl font-semibold">{isAr ? service.titleAr : service.titleEn}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {isAr ? service.descriptionAr : service.descriptionEn}
                </p>
                {service.featuresEn && (
                  <ul className="mt-4 space-y-1.5">
                    {(isAr ? service.featuresAr : service.featuresEn).map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-gold-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 flex items-center text-sm font-medium text-gold-600">
                  {t("common.learnMore")}
                  <ArrowRight className={cn("ms-1 h-3 w-3", isAr && "rotate-180")} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
