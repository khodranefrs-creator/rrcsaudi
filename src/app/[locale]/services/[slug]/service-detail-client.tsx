"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, TrendingUp, Shield, ClipboardCheck, HardHat, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SampleService } from "@/data/services";

const serviceIcons: Record<string, React.ReactNode> = {
  Building2: <Building2 className="h-12 w-12" />,
  TrendingUp: <TrendingUp className="h-12 w-12" />,
  Shield: <Shield className="h-12 w-12" />,
  ClipboardCheck: <ClipboardCheck className="h-12 w-12" />,
  HardHat: <HardHat className="h-12 w-12" />,
};

type Props = {
  service: SampleService;
  locale: string;
};

export function ServiceDetailClient({ service, locale }: Props) {
  const t = useTranslations();
  const isAr = locale === "ar";
  const title = isAr ? service.titleAr : service.titleEn;
  const description = isAr ? service.descriptionAr : service.descriptionEn;

  return (
    <>
      <div className="bg-gradient-navy py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center text-sm text-white/60 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className={cn("h-4 w-4 me-2", isAr && "rotate-180")} />
            {t("common.back")}
          </Link>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gold-500/20 text-gold-500">
              {serviceIcons[service.icon ?? ""] || <Building2 className="h-10 w-10" />}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">{title}</h1>
            </div>
          </div>
        </div>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
            {service.featuresEn && service.featuresEn.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">{t("services.items.0.title")}</h2>
                <ul className="space-y-3">
                  {(isAr ? service.featuresAr : service.featuresEn).map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="space-y-6">
            <div className="rounded-xl bg-gradient-light p-8">
              <h3 className="text-xl font-semibold mb-4">{t("contact.title")}</h3>
              <p className="text-muted-foreground mb-6">{t("contact.subtitle")}</p>
              <Button asChild variant="gold" size="lg" className="w-full">
                <Link href={`/${locale}/contact`}>{t("contact.form.submit")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
