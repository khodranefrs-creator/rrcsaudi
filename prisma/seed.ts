import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Site Settings
  await prisma.siteSetting.upsert({
    where: { key: "contact" },
    update: {},
    create: {
      key: "contact",
      value: {
        phone: "+966 11 400 1495",
        email: "info@rrcsaudi.com",
        addressEn: "PJCG+XR7, King Saud University, Riyadh 12372, Saudi Arabia",
        addressAr: "PJCG+XR7، جامعة الملك سعود، الرياض 12372، المملكة العربية السعودية",
      },
      description: "Contact information displayed on the public website. Leave empty to hide fields.",
    },
  });

  await prisma.siteSetting.upsert({
    where: { key: "seo" },
    update: {},
    create: {
      key: "seo",
      value: {
        defaultTitle: "RRC Saudi - Real Estate Development & Investment",
        defaultDescription: "RRC Saudi delivers world-class real estate development and investment solutions across KSA.",
        ogImage: "/images/og-default.svg",
      },
      description: "Default SEO meta tags for the public website.",
    },
  });

  // Demo Projects (isDemo = true, not published)
  await prisma.project.upsert({
    where: { slug: "al-nakheel-residences" },
    update: {},
    create: {
      titleEn: "Al Nakheel Residences",
      titleAr: "فلل النخيل السكنية",
      slug: "al-nakheel-residences",
      descriptionEn: "A luxury residential compound featuring 150 modern villas with contemporary architecture, landscaped gardens, and premium community amenities.",
      descriptionAr: "مجمع سكني فاخر يضم 150 فيلا عصرية بتصميم معماري حديث وحدائق طبيعية ومرافق مجتمعية راقية.",
      locationEn: "Al Nakheel District, Riyadh",
      locationAr: "حي النخيل، الرياض",
      category: "RESIDENTIAL",
      status: "COMPLETED",
      amenities: ["Swimming Pool", "Gym", "Park", "Security", "Parking"],
      totalArea: "250,000 sqm",
      featured: true,
      isDemo: true,
      published: false,
    },
  });

  await prisma.project.upsert({
    where: { slug: "olaya-business-tower" },
    update: {},
    create: {
      titleEn: "Olaya Business Tower",
      titleAr: "برج العليا للأعمال",
      slug: "olaya-business-tower",
      descriptionEn: "A 35-story Grade A commercial tower in the prestigious Olaya district, offering flexible office spaces, retail outlets, and world-class corporate amenities.",
      descriptionAr: "برج تجاري من الفئة الأولى بارتفاع 35 طابقاً في حي العليا المرموق.",
      locationEn: "Olaya District, Riyadh",
      locationAr: "حي العليا، الرياض",
      category: "COMMERCIAL",
      status: "UNDER_CONSTRUCTION",
      amenities: ["Conference Rooms", "Food Court", "Valet Parking", "Security", "Smart Building Systems"],
      availableSpaces: 45,
      totalArea: "85,000 sqm",
      featured: true,
      isDemo: true,
      published: false,
    },
  });

  // Demo Services (not published)
  const serviceSlugs = [
    "real-estate-development",
    "investment-advisory",
    "property-management",
    "feasibility-studies",
    "project-management",
  ];

  for (let i = 0; i < serviceSlugs.length; i++) {
    await prisma.service.upsert({
      where: { slug: serviceSlugs[i] },
      update: {},
      create: {
        titleEn: "",
        titleAr: "",
        slug: serviceSlugs[i],
        descriptionEn: "",
        descriptionAr: "",
        featuresEn: [],
        featuresAr: [],
        order: i + 1,
        published: false,
      },
    });
  }

  // Demo Partners (not published, not verified)
  const partnerSlugs = [
    { nameEn: "Saudi Binladin Group", nameAr: "مجموعة بن لادن السعودية", type: "DEVELOPER" as const, website: "https://sbg.com.sa" },
    { nameEn: "Al Rajhi Bank", nameAr: "مصرف الراجحي", type: "STRATEGIC" as const, website: "https://alrajhibank.com.sa" },
    { nameEn: "Siemens", nameAr: "سيمنز", type: "BRAND" as const, website: "https://siemens.com" },
  ];

  for (const p of partnerSlugs) {
    await prisma.partner.upsert({
      where: { id: p.nameEn.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: {
        id: p.nameEn.toLowerCase().replace(/\s+/g, "-"),
        nameEn: p.nameEn,
        nameAr: p.nameAr,
        logo: "",
        website: p.website,
        type: p.type,
        published: false,
        verified: false,
      },
    });
  }

  console.log("Seed completed successfully.");
  console.log("Note: All content is created as unpublished/not-verified demo data.");
  console.log("Use the admin panel to publish and verify content before going live.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
