"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href={`/${locale}`} className="text-xl font-bold">
              RRC <span className="text-gold-500">Saudi</span>
            </Link>
            <p className="mt-3 text-sm text-white/60 max-w-sm">{t("description")}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider">{t("quickLinks")}</h3>
            <ul className="mt-4 space-y-2">
              {(["home", "about", "services", "projects"] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={`/${locale}${key === "home" ? "" : `/${key}`}`}
                    className="text-sm text-white/60 hover:text-gold-400 transition-colors"
                  >
                    {navT(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider">{t("contact")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>{t("contact")}</li>
              <li>info@rrcsaudi.com</li>
              <li>+966 XX XXX XXXX</li>
              <li>Riyadh, Saudi Arabia</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {t("copyright")}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
