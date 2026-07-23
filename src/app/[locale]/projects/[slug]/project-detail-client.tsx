"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Maximize2, Building2, ArrowLeft, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SampleProject } from "@/data/projects";

const statusLabelKey: Record<string, string> = {
  PLANNING: "common.planning",
  UNDER_CONSTRUCTION: "common.underConstruction",
  COMPLETED: "common.completed",
  LAUNCHED: "common.new",
  SOLD_OUT: "common.soldOut",
};

const statusVariant: Record<string, "default" | "secondary" | "outline" | "gold"> = {
  PLANNING: "secondary",
  UNDER_CONSTRUCTION: "default",
  COMPLETED: "gold",
  LAUNCHED: "default",
  SOLD_OUT: "outline",
};

type Props = {
  project: SampleProject;
  locale: string;
};

export function ProjectDetailClient({ project, locale }: Props) {
  const t = useTranslations();
  const isAr = locale === "ar";
  const title = isAr ? project.titleAr : project.titleEn;
  const description = isAr ? project.descriptionAr : project.descriptionEn;
  const location = isAr ? project.locationAr : project.locationEn;

  return (
    <>
      <div className="bg-gradient-navy py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center text-sm text-white/60 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className={cn("h-4 w-4 me-2", isAr && "rotate-180")} />
            {t("common.back")}
          </Link>
          <div className={cn("mt-4 flex flex-wrap items-start gap-4 justify-between")}>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">{title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/60">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {location}
                </span>
                {project.totalArea && (
                  <span className="flex items-center gap-1">
                    <Maximize2 className="h-4 w-4" /> {project.totalArea}
                  </span>
                )}
              </div>
            </div>
            <Badge variant={statusVariant[project.status]} className="text-sm px-3 py-1">
              {t(statusLabelKey[project.status])}
            </Badge>
          </div>
        </div>
      </div>

      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-[16/9] rounded-xl bg-charcoal-100 flex items-center justify-center">
              <Building2 className="h-20 w-20 text-charcoal-300" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold">{t("about.title")}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{description}</p>
            </div>

            {project.amenities.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold">{t("services.items.0.title")}</h2>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-2 w-2 rounded-full bg-gold-500" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.completionDate && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {t("common.new")}: {new Date(project.completionDate).toLocaleDateString(isAr ? "ar-SA" : "en-US", { year: "numeric", month: "long" })}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">{t("investment.title")}</h3>
                {project.investmentInfo && Object.entries(project.investmentInfo).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span className="font-medium">{String(val)}</span>
                  </div>
                ))}
                <Button asChild variant="gold" className="w-full">
                  <Link href={`/${locale}/contact`}>{t("investment.cta")}</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold">{t("contact.title")}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                     <Phone className="h-4 w-4" /> <span dir="ltr" style={{ unicodeBidi: "isolate" }}>{t("contact.info.phone")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Mail className="h-4 w-4" /> {t("contact.info.email")}
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/${locale}/contact`}>{t("contact.subtitle")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
