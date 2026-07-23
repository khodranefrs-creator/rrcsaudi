import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    slug: "saudi-real-estate-market-2026",
    titleEn: "Saudi Real Estate Market Outlook 2026",
    titleAr: "نظرة على سوق العقارات السعودي 2026",
    contentEn: "<p>The Saudi real estate market continues to show remarkable growth driven by Vision 2030 initiatives. With mega projects transforming the landscape, investors and developers alike are finding unprecedented opportunities.</p><p>Key trends include increased foreign investment, sustainable development practices, and smart city innovations. The residential sector remains strong, while commercial and mixed-use developments are gaining momentum.</p><p>RRC Saudi is at the forefront of this transformation, delivering projects that set new standards for quality and innovation in the Kingdom.</p>",
    contentAr: "<p>يواصل سوق العقارات السعودي نموه الملحوظ بفضل مبادرات رؤية 2030. مع تحول المشاريع العملاقة للمشهد، يجد المستثمرون والمطورون فرصاً غير مسبوقة.</p><p>تشمل الاتجاهات الرئيسية زيادة الاستثمار الأجنبي وممارسات التطوير المستدام وابتكارات المدن الذكية. لا يزال القطاع السكني قوياً، بينما تكتسب التطورات التجارية ومتعددة الاستخدامات زخماً.</p><p>آر آر سي السعودية في طليعة هذا التحول، تقدم مشاريع تضع معايير جديدة للجودة والابتكار في المملكة.</p>",
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
    contentEn: "<p>Saudi Arabia's Vision 2030 has opened up unprecedented investment opportunities across multiple sectors. From NEOM to the Red Sea Project, these giga-projects are reshaping the economic landscape.</p><p>Investors can participate through direct investment, real estate funds, or partnerships with established developers like RRC Saudi. The key is to align with projects that offer strong fundamentals and clear regulatory frameworks.</p>",
    contentAr: "<p>فتحت رؤية السعودية 2030 فرصاً استثمارية غير مسبوقة عبر قطاعات متعددة. من نيوم إلى مشروع البحر الأحمر، تعيد هذه المشاريع العملاقة تشكيل المشهد الاقتصادي.</p><p>يمكن للمستثمرين المشاركة من خلال الاستثمار المباشر أو صناديق العقارات أو الشراكات مع مطورين راسخين مثل آر آر سي السعودية. المفتاح هو التوافق مع المشاريع التي تقدم أسساً قوية وأطراً تنظيمية واضحة.</p>",
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
    contentEn: "<p>Sustainability has become a cornerstone of modern real estate development in Saudi Arabia. With green building standards and energy efficiency becoming mandatory, developers are innovating to meet these requirements.</p><p>RRC Saudi is committed to sustainable practices, incorporating energy-efficient systems, water conservation, and environmentally friendly materials in all our projects.</p>",
    contentAr: "<p>أصبحت الاستدامة حجر الزاوية في التطوير العقاري الحديث في المملكة العربية السعودية. مع معايير البناء الأخضر وكفاءة الطاقة التي أصبحت إلزامية، يبتكر المطورون لتلبية هذه المتطلبات.</p><p>آر آر سي السعودية ملتزمة بالممارسات المستدامة، وتدمج أنظمة موفرة للطاقة والحفاظ على المياه والمواد الصديقة للبيئة في جميع مشاريعنا.</p>",
    excerptEn: "How green building practices are shaping the future of real estate in Saudi Arabia.",
    excerptAr: "كيف تشكل ممارسات البناء الأخضر مستقبل العقارات في المملكة العربية السعودية.",
    coverImage: null,
    author: "RRC Saudi",
    publishedAt: "2026-05-10",
  },
];

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  const title = locale === "ar" ? post.titleAr : post.titleEn;
  const excerpt = locale === "ar" ? post.excerptAr : post.excerptEn;
  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      images: [{ url: "/images/og-blog.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const isAr = locale === "ar";
  const title = isAr ? post.titleAr : post.titleEn;
  const content = isAr ? post.contentAr : post.contentEn;

  return (
    <article className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-gold-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {isAr ? "العودة إلى المدونة" : "Back to Blog"}
        </Link>
        <h1 className="mt-6 text-3xl sm:text-4xl font-bold">{title}</h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(post.publishedAt).toLocaleDateString(isAr ? "ar-SA" : "en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {post.author}
          </span>
        </div>
        <div className="mt-8 prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </article>
  );
}
