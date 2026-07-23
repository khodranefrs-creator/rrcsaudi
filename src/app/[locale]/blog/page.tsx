import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    slug: "saudi-real-estate-market-2026",
    titleEn: "Saudi Real Estate Market Outlook 2026",
    titleAr: "نظرة على سوق العقارات السعودي 2026",
    excerptEn: "An in-depth analysis of the Saudi real estate market trends, opportunities, and forecasts for 2026.",
    excerptAr: "تحليل متعمق لاتجاهات سوق العقارات السعودي والفرص والتوقعات لعام 2026.",
    coverImage: null,
    author: "RRC Saudi",
    publishedAt: "2026-06-15",
  },
  {
    id: "2",
    slug: "investing-in-vision-2030-projects",
    titleEn: "Investing in Vision 2030 Mega Projects",
    titleAr: "الاستثمار في المشاريع العملاقة لرؤية 2030",
    excerptEn: "Discover the investment potential of Saudi Arabia's giga-projects and how to participate.",
    excerptAr: "اكتشف الإمكانات الاستثمارية للمشاريع العملاقة في المملكة العربية السعودية وكيفية المشاركة.",
    coverImage: null,
    author: "RRC Saudi",
    publishedAt: "2026-05-28",
  },
  {
    id: "3",
    slug: "sustainable-real-estate-development",
    titleEn: "Sustainable Real Estate Development in KSA",
    titleAr: "التطوير العقاري المستدام في المملكة",
    excerptEn: "How green building practices are shaping the future of real estate in Saudi Arabia.",
    excerptAr: "كيف تشكل ممارسات البناء الأخضر مستقبل العقارات في المملكة العربية السعودية.",
    coverImage: null,
    author: "RRC Saudi",
    publishedAt: "2026-05-10",
  },
];

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: t("blog"),
    description: `${t("blog")} - RRC Saudi`,
    openGraph: {
      title: t("blog"),
      description: `${t("blog")} - RRC Saudi`,
      images: [{ url: "/images/og-blog.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <Section title={isAr ? "المدونة" : "Blog"} subtitle={isAr ? "أحدث المقالات والأخبار" : "Latest articles and news"}>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => {
          const title = isAr ? post.titleAr : post.titleEn;
          const excerpt = isAr ? post.excerptAr : post.excerptEn;
          return (
            <Link key={post.id} href={`/${locale}/blog/${post.slug}`}>
              <Card className="group overflow-hidden h-full transition-all duration-300 hover:shadow-lux-lg hover:-translate-y-1 cursor-pointer">
                <div className="aspect-[16/9] bg-charcoal-100 flex items-center justify-center">
                  <span className="text-charcoal-300 text-sm">Image</span>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.publishedAt).toLocaleDateString(isAr ? "ar-SA" : "en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
                  <div className="mt-4 flex items-center text-sm font-medium text-gold-600">
                    {isAr ? "اقرأ المزيد" : "Read More"}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
