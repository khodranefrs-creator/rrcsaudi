import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { ServiceDetailClient } from "./service-detail-client";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Not Found" };
  const t = await getTranslations({ locale, namespace: "services" });
  const title = locale === "ar" ? service.titleAr : service.titleEn;
  return {
    title: `${title} | ${t("title")}`,
    description: locale === "ar" ? service.descriptionAr : service.descriptionEn,
    openGraph: {
      title,
      description: locale === "ar" ? service.descriptionAr : service.descriptionEn,
      images: [{ url: "/images/og-services.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  return <ServiceDetailClient service={service} locale={locale} />;
}
