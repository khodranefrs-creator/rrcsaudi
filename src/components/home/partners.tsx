"use client"

import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { partners } from "@/data/partners"
import { cn } from "@/lib/utils"

const types = ["ALL", "DEVELOPER", "BRAND", "STRATEGIC"] as const

export default function Partners() {
  const locale = useLocale()
  const t = useTranslations("partners")
  const [filter, setFilter] = useState<string>("ALL")

  const filtered = filter === "ALL" ? partners : partners.filter((p) => p.type === filter)

  return (
    <Section className="bg-white" title={t("title")} subtitle={t("subtitle")}>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              filter === type
                ? "bg-navy-900 text-white"
                : "bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200"
            )}
          >
            {t(`filters.${type}`)}
          </button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {filtered.map((partner, i) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            viewport={{ once: true }}
            className="group flex aspect-[3/2] items-center justify-center rounded-xl border border-charcoal-100 bg-cream p-6 transition-all hover:border-gold-500/30 hover:shadow-lux"
          >
            <span className="text-center text-sm font-semibold text-charcoal-500 transition-colors group-hover:text-navy-900">
              {locale === "ar" ? partner.nameAr : partner.nameEn}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
