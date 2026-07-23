"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
} as const

export default function About() {
  const t = useTranslations("about")

  return (
    <Section className="bg-cream">
      <motion.div
        className="grid items-center gap-12 lg:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="space-y-6">
          <motion.h2
            className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl"
            variants={itemVariants}
          >
            {t("title")}
          </motion.h2>
          <motion.p
            className="text-lg leading-relaxed text-charcoal-600"
            variants={itemVariants}
          >
            {t("description")}
          </motion.p>

          <motion.div
            className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4"
            variants={itemVariants}
          >
            {(["years", "projects", "partners", "expertise"] as const).map((key) => (
              <div key={key} className="rounded-lg bg-white/60 p-4 text-center shadow-sm">
                <div className="text-sm font-semibold leading-relaxed text-charcoal-700">
                  {t(`stats.${key}`)}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-2xl"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-linear-to-br from-navy-900 via-navy-800 to-navy-700" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(201,169,110,0.15) 1px, transparent 1px),
                linear-gradient(0deg, rgba(201,169,110,0.15) 1px, transparent 1px),
                linear-gradient(135deg, transparent 30%, rgba(201,169,110,0.08) 50%, transparent 70%)
              `,
              backgroundSize: "40px 40px, 40px 40px, 100% 100%",
            }}
          />
          <div
            className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-gold-500/10 to-transparent"
          />
          <div className="absolute bottom-6 inset-x-6">
            <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="h-10 w-1 rounded-full bg-gold-500" />
              <div>
                <p className="text-sm font-semibold text-white">RRC Saudi</p>
                <p className="text-xs text-gold-300">{t("subtitle")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  )
}
