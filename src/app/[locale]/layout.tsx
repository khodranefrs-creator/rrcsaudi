import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-sans-arabic",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const siteT = await getTranslations({ locale, namespace: "footer" });

  return {
    title: {
      default: `${siteT("copyright")} - ${t("title")}`,
      template: `%s | ${siteT("copyright")}`,
    },
    description: t("subtitle"),
    openGraph: {
      title: `${siteT("copyright")} - ${t("title")}`,
      description: t("subtitle"),
      locale: locale === "ar" ? "ar_SA" : "en_US",
      siteName: siteT("copyright"),
      images: [{ url: "/images/og-default.svg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteT("copyright")} - ${t("title")}`,
      description: t("subtitle"),
      images: ["/images/og-default.svg"],
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    },
    alternates: {
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();
  const schemaT = await getTranslations({ locale, namespace: "footer" });
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${playfair.variable} ${notoSansArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateBusiness",
              name: "RRC Saudi",
              alternateName: locale === "ar" ? "آر آر سي السعودية" : "Retail Real Estate Co.",
              description: schemaT("description"),
              url: `https://rrcsaudi.com/${locale}`,
              image: "https://rrcsaudi.com/images/og-default.svg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "PJCG+XR7, King Saud University",
                addressLocality: "Riyadh",
                postalCode: "12372",
                addressCountry: "SA",
              },
              sameAs: [],
              knowsLanguage: locale === "ar" ? "ar" : "en",
            }),
          }}
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            richColors
            position={locale === "ar" ? "top-left" : "top-right"}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
