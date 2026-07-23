"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useLocale } from "next-intl"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { X, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { mainNavigation } from "@/data/navigation"
import type { Locale } from "@/types"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const panelVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", damping: 25, stiffness: 200, mass: 0.8 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", damping: 30, stiffness: 300, mass: 0.8 },
  },
}

const itemVariants: Variants = {
  hidden: { x: 40, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.05, duration: 0.4, ease: "easeOut" },
  }),
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const locale = useLocale() as Locale
  const isRtl = locale === "ar"
  const navItems = mainNavigation[locale] || mainNavigation.en

  const switchLocale = (newLocale: "en" | "ar") => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`
    window.location.reload()
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            dir={isRtl ? "rtl" : "ltr"}
            className={cn(
              "absolute top-0 bottom-0 w-full max-w-sm bg-navy-900 shadow-lux-xl",
              isRtl ? "left-0" : "right-0"
            )}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-gold-500/20">
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-wider text-white">
                  RRC SAUDI
                </span>
                <span className="text-xs text-gold-400 font-arabic">
                  آر آر سي السعودية
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/70 hover:text-gold-400 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="px-6 py-8 space-y-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-3 text-white/80 hover:text-gold-400 text-lg font-medium transition-colors border-b border-white/5 hover:border-gold-500/30"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gold-500/20 space-y-4">
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => switchLocale("en")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors",
                    locale === "en"
                      ? "bg-gold-500/20 text-gold-400"
                      : "text-white/60 hover:text-white/80"
                  )}
                >
                  <Globe className="h-3.5 w-3.5" />
                  English
                </button>
                <span className="text-white/20">|</span>
                <button
                  onClick={() => switchLocale("ar")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors",
                    locale === "ar"
                      ? "bg-gold-500/20 text-gold-400"
                      : "text-white/60 hover:text-white/80"
                  )}
                >
                  العربية
                  <Globe className="h-3.5 w-3.5" />
                </button>
              </div>
              <Button
                variant="gold"
                className="w-full"
                asChild
                onClick={onClose}
              >
                <Link href="/contact">
                  {locale === "ar" ? "اتصل بنا" : "Contact Us"}
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
