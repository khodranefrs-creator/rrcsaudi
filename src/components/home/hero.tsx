import Link from "next/link"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
} as const

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, delay: 0.8, ease: "easeOut" as const } },
} as const

export default function Hero() {
  const t = useTranslations("hero")

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-900">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 25% 40%, rgba(201,169,110,0.15) 0%, transparent 50%),
            radial-gradient(circle at 75% 60%, rgba(201,169,110,0.1) 0%, transparent 50%),
            repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px),
            repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 41px)
          `,
          backgroundSize: "60px 60px, 60px 60px, 100% 100%, 100% 100%, 100% 100%, 100% 100%",
        }}
      />

      <div className="absolute inset-0 bg-linear-to-b from-navy-900/90 via-navy-900/75 to-navy-900/60" />

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
          className="mx-auto mt-4 h-1 w-24 rounded-full bg-linear-to-r from-gold-400 to-gold-600"
          variants={lineVariants}
        />

        <motion.p
          className="mx-auto mt-6 max-w-3xl text-lg text-white/70 sm:text-xl"
          variants={itemVariants}
          dir="rtl"
        >
          نصنع مستقبل العقارات التجارية في المملكة
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
            <Link href="/projects">{t("cta1")}</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white/30 px-8 text-base text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/contact">{t("cta2")}</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-white/40 uppercase">Scroll</span>
          <ChevronDown className="h-5 w-5 text-gold-400" />
        </div>
      </motion.div>
    </section>
  )
}
