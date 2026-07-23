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
      images: [{ url: "/images/og-about.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const isAr = locale === "ar";

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
            <div className="aspect-[4/3] rounded-xl bg-charcoal-100 flex items-center justify-center">
              <span className="text-charcoal-300 text-lg">RRC Saudi</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold">{t("title")}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{t("description")}</p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                {(["years", "projects", "partners", "expertise"] as const).map((key) => (
                  <div key={key} className="text-center p-4 rounded-lg bg-gradient-light">
                    <div className="text-2xl font-bold text-gold-600">
                      {key === "years" && "15+"}
                      {key === "projects" && "50+"}
                      {key === "partners" && "30+"}
                      {key === "expertise" && "5"}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{t(`stats.${key}`)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center">Our Team</h2>
          <p className="mt-4 text-muted-foreground text-center max-w-xl mx-auto">
            Meet the experts behind our success
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-white shadow-sm">
                <div className="mx-auto h-24 w-24 rounded-full bg-charcoal-100 flex items-center justify-center">
                  <span className="text-charcoal-300 text-lg">Photo</span>
                </div>
                <h3 className="mt-4 font-semibold">Team Member {i}</h3>
                <p className="text-sm text-muted-foreground">Position</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
