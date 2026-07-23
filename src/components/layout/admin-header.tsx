"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale } from "next-intl"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

const breadcrumbLabels: Record<string, { en: string; ar: string }> = {
  admin: { en: "Dashboard", ar: "لوحة التحكم" },
  projects: { en: "Projects", ar: "المشاريع" },
  services: { en: "Services", ar: "الخدمات" },
  partners: { en: "Partners", ar: "الشركاء" },
  blog: { en: "Blog Posts", ar: "المقالات" },
  inquiries: { en: "Inquiries", ar: "الاستفسارات" },
  contacts: { en: "Contact Requests", ar: "طلبات الاتصال" },
  media: { en: "Media", ar: "الوسائط" },
  settings: { en: "Site Settings", ar: "إعدادات الموقع" },
  users: { en: "Users", ar: "المستخدمون" },
}

const user = {
  name: "Admin User",
  email: "admin@rrcsaudi.com",
  avatar: null,
}

interface AdminHeaderProps {
  onMenuToggle: () => void
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname()
  const locale = useLocale()
  const isRtl = locale === "ar"
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/")
    const label =
      breadcrumbLabels[seg]?.[locale === "ar" ? "ar" : "en"] || seg
    return { label, href }
  })

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header
      dir={isRtl ? "rtl" : "ltr"}
      className="sticky top-0 z-30 h-16 bg-navy-900 border-b border-gold-500/10 flex items-center justify-between px-4 lg:px-6"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="p-2 text-white/60 hover:text-gold-400 transition-colors lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumb */}
        <nav className="hidden sm:flex items-center gap-1.5 text-sm">
          <Link
            href="/admin"
            className="text-white/40 hover:text-gold-400 transition-colors"
          >
            {isRtl ? "الرئيسية" : "Home"}
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {isRtl ? (
                <ChevronRight className="h-3.5 w-3.5 text-white/20" />
              ) : (
                <ChevronLeft className="h-3.5 w-3.5 text-white/20" />
              )}
              {i === breadcrumbs.length - 1 ? (
                <span className="text-gold-400 font-medium">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-white/40 hover:text-gold-400 transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* User menu */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 p-1.5 pr-3 rounded-lg hover:bg-white/5 transition-colors"
        >
          <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 text-sm font-bold">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-white/40">{user.email}</p>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              dropdownOpen && "rotate-180"
            )}
          />
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "absolute top-full mt-2 w-56 bg-navy-800 rounded-xl border border-gold-500/10 shadow-lux-xl overflow-hidden",
                isRtl ? "left-0" : "right-0"
              )}
            >
              <div className="p-2 space-y-1">
                <div className="px-3 py-2.5 border-b border-white/5 mb-1">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-white/40">{user.email}</p>
                </div>
                <Link
                  href="/admin/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  {isRtl ? "الإعدادات" : "Settings"}
                </Link>
                <button
                  onClick={() => {
                    setDropdownOpen(false)
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  {isRtl ? "تسجيل الخروج" : "Logout"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
