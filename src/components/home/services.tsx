"use client"

import { useLocale, useTranslations } from "next-intl"
import { motion } from "framer-motion"
import {
  Building2,
  TrendingUp,
  Shield,
  ClipboardCheck,
  HardHat,
  type LucideIcon,
} from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { services } from "@/data/services"

const iconMap: Record<string, LucideIcon> = {
  Building2,
  TrendingUp,
  Shield,
  ClipboardCheck,
  HardHat,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export default function Services() {
  const locale = useLocale()
  const t = useTranslations("services")
  const sorted = [...services].sort((a, b) => a.order - b.order)
  const featured = sorted[0]
  const rest = sorted.slice(1)

  return (
    <Section
      className="bg-warm-gray"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      {featured && (
        <motion.div
          className="mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.div variants={cardVariants}>
            <Card className="relative overflow-hidden border-gold-500/20 bg-white shadow-lux-lg transition-all duration-300 hover:shadow-lux-xl">
              <div className="absolute inset-y-0 start-0 w-1 bg-linear-to-b from-gold-500 to-gold-300" />
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gold-500 text-white">
                    {(() => {
                      const Icon = iconMap[featured.icon ?? ""] || Building2
                      return <Icon className="h-7 w-7" />
                    })()}
                  </div>
                  <div>
                    <div className="mb-1 inline-block rounded-full bg-gold-100 px-3 py-0.5 text-xs font-medium text-gold-700">
                      Featured Service
                    </div>
                    <CardTitle className="text-2xl text-navy-900">
                      {locale === "ar" ? featured.titleAr : featured.titleEn}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-charcoal-600">
                  {locale === "ar" ? featured.descriptionAr : featured.descriptionEn}
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {(locale === "ar" ? featured.featuresAr : featured.featuresEn).map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-sm text-charcoal-600"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {rest.map((service) => {
          const Icon = iconMap[service.icon ?? ""] || Building2
          return (
            <motion.div key={service.id} variants={cardVariants}>
              <Card className="group h-full border border-transparent bg-white shadow-lux transition-all duration-300 hover:-translate-y-1 hover:shadow-lux-lg hover:border-gold-500/40">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-100 text-gold-600 transition-colors group-hover:bg-gold-500 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg text-navy-900">
                    {locale === "ar" ? service.titleAr : service.titleEn}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed text-charcoal-600">
                    {locale === "ar" ? service.descriptionAr : service.descriptionEn}
                  </p>
                  <ul className="space-y-2">
                    {(locale === "ar" ? service.featuresAr : service.featuresEn).map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-sm text-charcoal-600"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
