import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [{ url: "/images/og-default.svg", width: 1200, height: 630 }],
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return (
    <>
      <section className="bg-gradient-navy py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">{t("title")}</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-navy flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(90deg, rgba(201,169,110,0.12) 1px, transparent 1px),
                    linear-gradient(0deg, rgba(201,169,110,0.12) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px, 40px 40px",
                }}
              />
              <span className="relative text-2xl font-bold text-white/40">RRC Saudi</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold">{t("title")}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{t("description")}</p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {(["years", "projects", "partners", "expertise"] as const).map((key) => (
                  <div key={key} className="rounded-lg bg-gradient-light p-4 text-center">
                    <div className="text-sm font-semibold text-charcoal-700">
                      {t(`stats.${key}`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-light py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900">{t("teamTitle")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            {t("teamDescription")}
          </p>
        </div>
      </section>
    </>
  );
}
