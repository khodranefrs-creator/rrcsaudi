"use client"

import { useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Handshake } from "lucide-react"
import { Section } from "@/components/ui/section"
import { cn } from "@/lib/utils"

type Partner = {
  id: string
  nameEn: string
  nameAr: string
  logo: string
  website: string | null
  type: "DEVELOPER" | "BRAND" | "STRATEGIC"
}

const types = ["ALL", "DEVELOPER", "BRAND", "STRATEGIC"] as const

export default function Partners() {
  const locale = useLocale()
  const t = useTranslations("partners")
  const [filter, setFilter] = useState<string>("ALL")
  const [partners, setPartners] = useState<Partner[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch("/api/partners?public=true")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setPartners(res.data)
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  const filtered = filter === "ALL" ? partners : partners.filter((p) => p.type === filter)

  return (
    <Section className="bg-white" title={t("title")} subtitle={t("subtitle")}>
      {loaded && partners.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-gold-500/10 bg-linear-to-br from-cream via-beige to-warm-gray p-12 text-center"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(201,169,110,0.08) 1px, transparent 1px),
                linear-gradient(0deg, rgba(201,169,110,0.08) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px, 40px 40px",
            }}
          />
          <div className="relative">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-900 shadow-lux">
              <Handshake className="h-7 w-7 text-gold-400" />
            </div>
            <h3 className="text-xl font-semibold text-navy-900">
              {locale === "ar" ? "شراكات استراتيجية قادمة" : "Strategic Partnerships Forthcoming"}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-charcoal-500">
              {locale === "ar"
                ? "سيتم الإعلان عن شراكاتنا الاستراتيجية قريباً. تابعونا لتحديثات حول التعاون القادم."
                : "Our strategic partnerships will be announced in due course. Stay tuned for updates on our upcoming collaborations."}
            </p>
          </div>
        </motion.div>
      )}

      {partners.length > 0 && (
        <>
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
        </>
      )}
    </Section>
  )
}
