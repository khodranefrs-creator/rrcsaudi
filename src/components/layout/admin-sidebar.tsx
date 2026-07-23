"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale } from "next-intl"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Handshake,
  FileText,
  MessageSquare,
  Mail,
  Image as ImageIcon,
  Settings,
  Users,
  ChevronDown,
  LogOut,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { adminNavigation } from "@/data/navigation"

const adminIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Dashboard": LayoutDashboard,
  "Projects": FolderKanban,
  "Services": Wrench,
  "Partners": Handshake,
  "Blog Posts": FileText,
  "Inquiries": MessageSquare,
  "Contact Requests": Mail,
  "Media": ImageIcon,
  "Site Settings": Settings,
  "Users": Users,
}

const user = {
  name: "Admin User",
  email: "admin@rrcsaudi.com",
  avatar: null,
}

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const locale = useLocale()
  const isRtl = locale === "ar"
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-navy-900/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        dir={isRtl ? "rtl" : "ltr"}
        className={cn(
          "fixed top-0 bottom-0 z-50 w-64 bg-navy-900 border-e border-gold-500/10 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
          "start-0",
          open
            ? "translate-x-0"
            : isRtl
              ? "translate-x-full"
              : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-gold-500/10 shrink-0">
          <Link href="/admin" className="flex flex-col">
            <span className="text-base font-bold tracking-wider text-white">
              RRC SAUDI
            </span>
            <span className="text-[10px] text-gold-400 font-arabic">
              آر آر سي السعودية
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-gold-400 transition-colors lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {adminNavigation.map((item) => {
            const Icon = adminIcons[item.label] || LayoutDashboard
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose()
                }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative",
                  isActive
                    ? "text-gold-400 bg-gold-500/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="adminActiveIndicator"
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 w-1 h-5 bg-gold-500 rounded-full",
                      "start-0"
                    )}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {Icon && <Icon className="h-4 w-4 shrink-0" />}
                <span className="truncate">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-gold-500/10 shrink-0">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 text-sm font-bold shrink-0">
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
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-white/40 truncate">{user.email}</p>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-white/40 transition-transform duration-200",
                userMenuOpen && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-1 space-y-1">
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    {locale === "ar" ? "الإعدادات" : "Settings"}
                  </Link>
                  <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <LogOut className="h-4 w-4" />
                    {locale === "ar" ? "تسجيل الخروج" : "Logout"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>
    </>
  )
}
