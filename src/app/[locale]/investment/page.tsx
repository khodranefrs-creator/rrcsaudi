import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "investment" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [{ url: "/images/og-investment.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function InvestmentPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "investment" });
  const commonT = await getTranslations({ locale, namespace: "common" });
  const contactT = await getTranslations({ locale, namespace: "contact" });
  const benefits = t.raw("benefits") as string[];

  return (
    <>
      <section className="bg-gradient-navy py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">{t("title")}</h1>
            <p className="mt-4 text-lg text-white/70">{t("description")}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Market Insights</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Saudi Arabia&apos;s real estate market is experiencing unprecedented growth driven by Vision 2030 initiatives,
                population growth, and economic diversification. With mega-projects like NEOM, Red Sea Project, and Qiddiya
                transforming the landscape, now is the ideal time to invest.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gradient-light">
                  <div className="text-2xl font-bold text-gold-600">$1.3T+</div>
                  <div className="text-sm text-muted-foreground">Vision 2030 Projects</div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-light">
                  <div className="text-2xl font-bold text-gold-600">7%</div>
                  <div className="text-sm text-muted-foreground">Annual GDP Growth</div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-light">
                  <div className="text-2xl font-bold text-gold-600">35M+</div>
                  <div className="text-sm text-muted-foreground">Population by 2030</div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-light">
                  <div className="text-2xl font-bold text-gold-600">12%</div>
                  <div className="text-sm text-muted-foreground">Avg. ROI Real Estate</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{commonT("featured")}</h2>
              <ul className="mt-6 space-y-4">
                {benefits.map((benefit: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-gold-500 shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-light">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">{contactT("title")}</h2>
            <p className="mt-2 text-muted-foreground">{t("cta")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
