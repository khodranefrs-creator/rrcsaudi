"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "", label: "home" },
  { href: "/about", label: "about" },
  { href: "/services", label: "services" },
  { href: "/projects", label: "projects" },
  { href: "/investment", label: "investment" },
  { href: "/blog", label: "blog" },
  { href: "/contact", label: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string;
  const isAr = locale === "ar";
  const [open, setOpen] = useState(false);

  const otherLocale = isAr ? "en" : "ar";

  return (
    <header className="sticky top-0 z-50 nav-blur border-b border-gold-500/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-xl font-bold text-navy-900">
              RRC <span className="text-gold-500">Saudi</span>
            </span>
          </Link>

          <nav className={cn("hidden md:flex items-center gap-1", isAr && "flex-row-reverse")}>
            {navLinks.map((link) => {
              const fullHref = `/${locale}${link.href}`;
              const isActive = pathname === fullHref || (link.href !== "" && pathname.startsWith(fullHref));
              return (
                <Link
                  key={link.href}
                  href={fullHref}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-gold-600 bg-gold-500/10"
                      : "text-charcoal-600 hover:text-navy-900 hover:bg-charcoal-100"
                  )}
                >
                  {t(link.label)}
                </Link>
              );
            })}
          </nav>

          <div className={cn("flex items-center gap-3", isAr && "flex-row-reverse")}>
            <Link
              href={`/${otherLocale}${pathname.replace(/^\/(en|ar)/, "") || "/"}`}
              className="text-sm font-medium text-charcoal-500 hover:text-navy-900 transition-colors"
            >
              {t(isAr ? "localeEn" : "localeAr")}
            </Link>

            <Button asChild variant="gold" size="sm" className="hidden sm:inline-flex">
              <Link href={`/${locale}/contact`}>{t("contact")}</Link>
            </Button>

            <button
              className="md:hidden p-2 text-charcoal-600"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gold-500/10 bg-white">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => {
              const fullHref = `/${locale}${link.href}`;
              return (
                <Link
                  key={link.href}
                  href={fullHref}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-charcoal-600 hover:text-navy-900 hover:bg-charcoal-100 rounded-md"
                >
                  {t(link.label)}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
