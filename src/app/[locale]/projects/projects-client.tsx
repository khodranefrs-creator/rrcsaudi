"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, MapPin, Search, Building2 } from "lucide-react";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

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

const categories = [...new Set(projects.map((p) => p.category))];
const statuses = [...new Set(projects.map((p) => p.status))];

export function ProjectsClient() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const isAr = locale === "ar";
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const title = isAr ? p.titleAr : p.titleEn;
      const desc = isAr ? p.descriptionAr : p.descriptionEn;
      const matchesSearch = !search || title.toLowerCase().includes(search.toLowerCase()) || desc.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, categoryFilter, statusFilter, isAr]);

  return (
    <Section title={t("projects.title")} subtitle={t("projects.subtitle")}>
      <div className={cn("mb-8 flex flex-col sm:flex-row gap-4", isAr ? "sm:flex-row-reverse" : "")}>
        <div className="relative flex-1">
          <Search className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-500 start-3" />
          <Input
            placeholder={t("admin.common.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ps-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder={t("admin.common.filter")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("admin.common.all")}</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{t(`projects.categories.${cat}`)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder={t("admin.common.status")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("admin.common.all")}</SelectItem>
            {statuses.map((st) => (
              <SelectItem key={st} value={st}>{t(statusLabelKey[st])}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Building2 className="mx-auto h-12 w-12 text-charcoal-500" />
          <p className="mt-4 text-charcoal-500">{t("common.noResults")}</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Link key={project.id} href={`/${locale}/projects/${project.slug}`}>
              <Card className="group overflow-hidden h-full transition-all duration-300 hover:shadow-lux-lg hover:-translate-y-1 cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-100">
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent z-10" />
                  <div className="absolute top-3 left-3 z-20">
                    <Badge variant={statusVariant[project.status]}>{t(statusLabelKey[project.status])}</Badge>
                  </div>
                  <div className="w-full h-full flex items-center justify-center text-charcoal-300">
                    <Building2 className="h-12 w-12" />
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold">{isAr ? project.titleAr : project.titleEn}</h3>
                  <div className="mt-2 flex items-center text-sm text-charcoal-500">
                    <MapPin className="h-3.5 w-3.5 me-1" />
                    {isAr ? project.locationAr : project.locationEn}
                  </div>
                  <p className="mt-2 text-sm text-charcoal-500 line-clamp-2">
                    {isAr ? project.descriptionAr : project.descriptionEn}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-gold-600">
                    {t("common.learnMore")}
                    <ArrowRight className={cn("ms-1 h-3 w-3", isAr && "rotate-180")} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}
