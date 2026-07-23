import type { NavItem, Locale } from "@/types"

export const mainNavigation: Record<Locale, NavItem[]> = {
  en: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Investment", href: "/investment" },
    { label: "Partners", href: "/partners" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ],
  ar: [
    { label: "الرئيسية", href: "/" },
    { label: "من نحن", href: "/about" },
    { label: "خدماتنا", href: "/services" },
    { label: "مشاريعنا", href: "/projects" },
    { label: "الاستثمار", href: "/investment" },
    { label: "شركاؤنا", href: "/partners" },
    { label: "المدونة", href: "/blog" },
    { label: "اتصل بنا", href: "/contact" },
  ],
}

export const adminNavigation: NavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Services", href: "/admin/services" },
  { label: "Partners", href: "/admin/partners" },
  { label: "Blog Posts", href: "/admin/blog" },
  { label: "Inquiries", href: "/admin/inquiries" },
  { label: "Contact Requests", href: "/admin/contacts" },
  { label: "Media", href: "/admin/media" },
  { label: "Site Settings", href: "/admin/settings" },
  { label: "Users", href: "/admin/users" },
]
