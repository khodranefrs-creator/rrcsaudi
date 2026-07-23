import { getTranslations } from "next-intl/server";
import { ServicesClient } from "./services-client";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      images: [{ url: "/images/og-services.jpg", width: 1200, height: 630 }],
    },
  };
}

export default function ServicesPage() {
  return <ServicesClient />;
}
