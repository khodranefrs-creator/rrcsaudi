"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Check, ArrowUpRight, TrendingUp, Building2, Users, BarChart3, BarChartBig } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"

type Metric = {
  id: string
  titleEn: string
  titleAr: string
  value: string
  descriptionEn: string | null
  descriptionAr: string | null
  icon: string | null
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp, Building2, Users, BarChart3, BarChartBig,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
} as const

export default function Investment() {
  const locale = useLocale()
  const t = useTranslations("investment")
  const benefits = t.raw("benefits") as string[]
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch("/api/investment-metrics")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setMetrics(res.data)
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  return (
    <Section className="bg-white">
      <motion.div
        className="grid items-center gap-12 lg:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="space-y-8">
            <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl" dir={locale === "ar" ? "rtl" : "ltr"}>
              {t("highlightsTitle")}
            </h2>
          </motion.div>

          <motion.p
            className="text-lg leading-relaxed text-charcoal-600"
            variants={itemVariants}
          >
            {t("description")}
          </motion.p>

          {loaded && metrics.length === 0 && (
            <motion.div
              className="rounded-xl border border-dashed border-gold-500/30 bg-cream/50 p-8 text-center"
              variants={itemVariants}
            >
              <BarChartBig className="mx-auto h-10 w-10 text-gold-400/60" />
              <p className="mt-3 text-sm text-charcoal-500">{t("emptyState")}</p>
            </motion.div>
          )}

          {metrics.length > 0 && (
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={itemVariants}
            >
              {metrics.map((m, i) => {
                const Icon = m.icon ? iconMap[m.icon] : iconMap[Object.keys(iconMap)[i % 4]]
                const label = locale === "ar" ? m.titleAr : m.titleEn
                const detail = locale === "ar" ? m.descriptionAr : m.descriptionEn
                return (
                  <div
                    key={m.id}
                    className="rounded-xl border border-gold-500/20 bg-cream p-4"
                  >
                    {Icon && <Icon className="mb-2 h-5 w-5 text-gold-500" />}
                    <div className="text-2xl font-bold text-navy-900" dir="ltr">{m.value}</div>
                    <div className="text-xs text-charcoal-500">{label}</div>
                    {detail && <div className="text-xs text-gold-600">{detail}</div>}
                  </div>
                )
              })}
            </motion.div>
          )}

          <motion.ul className="space-y-3" variants={itemVariants}>
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100">
                  <Check className="h-3 w-3 text-gold-600" />
                </span>
                <span className="text-sm text-charcoal-700">{benefit}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={itemVariants}>
            <Button variant="gold" size="lg" className="text-base font-semibold" asChild>
              <Link href="/contact">
                {t("ctaDetailed")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative aspect-[3/4] overflow-hidden rounded-2xl"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-linear-to-br from-navy-900 via-navy-800 to-navy-700" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(201,169,110,0.12) 1px, transparent 1px),
                linear-gradient(0deg, rgba(201,169,110,0.12) 1px, transparent 1px),
                radial-gradient(circle at 30% 50%, rgba(201,169,110,0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 30%, rgba(201,169,110,0.06) 0%, transparent 50%)
              `,
              backgroundSize: "50px 50px, 50px 50px, 100% 100%, 100% 100%",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-4 text-center">
              <div className="text-5xl font-bold text-white/10">RRC</div>
              <div className="text-lg text-gold-500/60">Investment</div>
              <div className="mx-auto h-px w-16 bg-gold-500/30" />
              <div className="text-xs text-white/20">Strategic Retail Opportunities</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  )
}
