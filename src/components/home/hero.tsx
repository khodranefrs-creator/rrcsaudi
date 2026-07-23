import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { ChevronDown, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
}

export default function Hero() {
  const locale = useLocale()
  const t = useTranslations("hero")

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-900">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px),
            radial-gradient(circle at 20% 30%, rgba(201,169,110,0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(201,169,110,0.08) 0%, transparent 50%),
            repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(255,255,255,0.02) 60px, rgba(255,255,255,0.02) 61px),
            repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(255,255,255,0.015) 60px, rgba(255,255,255,0.015) 61px)
          `,
          backgroundSize: "80px 80px, 80px 80px, 100% 100%, 100% 100%, 100% 100%, 100% 100%",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-navy-900/95 via-navy-900/80 to-navy-900/60" />

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          variants={itemVariants}
        >
          {t("title")}
        </motion.h1>

        <motion.div
          className="mx-auto mt-6 h-1 w-20 rounded-full bg-linear-to-r from-gold-500 to-gold-300"
          variants={itemVariants}
        />

        <motion.p
          className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/60 sm:text-xl"
          variants={itemVariants}
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          {locale === "ar" ? t("subtitleAr") : t("subtitle")}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={itemVariants}
        >
          <Button
            variant="gold"
            size="lg"
            className="px-8 text-base font-semibold"
            asChild
          >
            <Link href="/projects">
              {t("cta1")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white/30 bg-transparent px-8 text-base text-white/80 hover:border-white/60 hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/contact">{t("cta2")}</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 start-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-white/30 uppercase">{t("scroll")}</span>
          <ChevronDown className="h-5 w-5 text-gold-400/60" />
        </div>
      </motion.div>
    </section>
  )
}
