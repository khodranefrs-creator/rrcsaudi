"use client"

import { useState } from "react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, MapPin, Building2, Ruler } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/data/projects"

const categories = ["ALL", "RESIDENTIAL", "COMMERCIAL", "MIXED_USE", "LUXURY"] as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const projectVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export default function FeaturedProjects() {
  const locale = useLocale()
  const t = useTranslations("projects")
  const commonT = useTranslations("common")
  const [activeCategory, setActiveCategory] = useState<string>("ALL")

  const featured = projects.filter((p) => p.featured)
  const filtered =
    activeCategory === "ALL"
      ? featured
      : featured.filter((p) => p.category === activeCategory)

  return (
    <Section className="bg-navy-900" title={t("title")} subtitle={t("subtitle")}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-gold-500 text-navy-900"
                  : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
              }`}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>
        <Button variant="ghost" className="text-gold-400 hover:text-gold-300" asChild>
          <Link href="/projects" className="flex items-center gap-1">
            {commonT("viewAll")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          {filtered.map((project) => (
            <motion.div key={project.id} variants={projectVariants}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-linear-to-br from-navy-800 to-navy-900" />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(90deg, rgba(201,169,110,0.08) 1px, transparent 1px),
                        linear-gradient(0deg, rgba(201,169,110,0.08) 1px, transparent 1px)
                      `,
                      backgroundSize: "30px 30px, 30px 30px",
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />

                  <div className="absolute start-3 top-3 flex gap-2">
                    <Badge variant="gold">{t(`categories.${project.category}`)}</Badge>
                    <Badge variant="secondary" className="bg-white/10 text-white">
                      {project.status.replace(/_/g, " ")}
                    </Badge>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <div className="flex items-start gap-2 text-white/50">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span className="text-xs">
                        {locale === "ar" ? project.locationAr : project.locationEn}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-lg font-bold text-white transition-colors group-hover:text-gold-400">
                      {locale === "ar" ? project.titleAr : project.titleEn}
                    </h3>

                    <div className="mt-2 flex items-center gap-4 text-xs text-white/40">
                      {project.totalArea && (
                        <span className="flex items-center gap-1">
                          <Ruler className="h-3 w-3" />
                          {project.totalArea}
                        </span>
                      )}
                      {project.amenities.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {project.amenities.length} amenities
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="rounded-full bg-gold-500/90 p-3 text-navy-900 shadow-lg">
                      <ArrowUpRight className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  )
}
