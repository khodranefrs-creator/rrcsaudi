import type { MetadataRoute } from "next";

const locales = ["en", "ar"] as const;

const staticRoutes = [
  "", "/about", "/services", "/projects", "/investment",
  "/partners", "/blog", "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `https://rrcsaudi.com/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `https://rrcsaudi.com/en${route}`,
            ar: `https://rrcsaudi.com/ar${route}`,
          },
        },
      });
    }
  }

  return entries;
}
