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
} as const

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
} as const

export default function Services() {
  const locale = useLocale()
  const t = useTranslations("services")

  return (
    <Section
      className="bg-warm-gray"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {services
          .sort((a, b) => a.order - b.order)
          .map((service) => {
            const Icon = iconMap[service.icon ?? ""] || Building2
            return (
              <motion.div key={service.id} variants={cardVariants}>
                <Card className="group h-full border border-transparent bg-white shadow-lux transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-lux-lg">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-100 text-gold-600 transition-colors group-hover:bg-gold-500 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl text-navy-900">
                      {locale === "ar" ? service.titleAr : service.titleEn}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed text-charcoal-600">
                      {locale === "ar" ? service.descriptionAr : service.descriptionEn}
                    </p>
                    <ul className="space-y-2">
                      {(locale === "ar" ? service.featuresAr : service.featuresEn).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-charcoal-600"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                          {feature}
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
