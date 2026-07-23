import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectDetailClient } from "./project-detail-client";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  const t = await getTranslations({ locale, namespace: "projects" });
  const title = locale === "ar" ? project.titleAr : project.titleEn;
  return {
    title: `${title} | ${t("title")}`,
    description: locale === "ar" ? project.descriptionAr : project.descriptionEn,
    openGraph: {
      title,
      description: locale === "ar" ? project.descriptionAr : project.descriptionEn,
      images: [{ url: project.images[0] || "/images/og-default.svg", width: 1200, height: 630 }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectDetailClient project={project} locale={locale} />;
}
