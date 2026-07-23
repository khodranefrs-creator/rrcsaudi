import { getTranslations } from "next-intl/server";
import { partners } from "@/data/partners";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { ExternalLink } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partners" });
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      images: [{ url: "/images/og-default.svg", width: 1200, height: 630 }],
    },
  };
}

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partners" });
  const isAr = locale === "ar";

  return (
    <Section title={t("title")} subtitle={t("subtitle")}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <Card key={partner.id} className="group transition-all duration-300 hover:shadow-lux-lg">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-charcoal-100 flex items-center justify-center mb-4">
                <span className="text-xs text-charcoal-300">Logo</span>
              </div>
              <h3 className="font-semibold">{isAr ? partner.nameAr : partner.nameEn}</h3>
              <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">{partner.type}</p>
              {partner.website && (
                <Link
                  href={partner.website}
                  target="_blank"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-gold-600 hover:text-gold-700"
                >
                  <ExternalLink className="h-3 w-3" />
                  Website
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
