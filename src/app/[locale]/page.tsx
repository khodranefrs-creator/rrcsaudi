import { getTranslations } from "next-intl/server";
import HomeContent from "@/components/home/home-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [{ url: "/images/og-default.svg", width: 1200, height: 630 }],
    },
  };
}

export default function HomePage() {
  return <HomeContent />;
}
