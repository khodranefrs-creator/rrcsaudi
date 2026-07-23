"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Phone, Mail, MapPin } from "lucide-react";

type ContactSettings = {
  phone: string;
  email: string;
  addressEn: string;
  addressAr: string;
};

export default function Footer() {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");
  const params = useParams();
  const locale = params.locale as string;
  const [contactSettings, setContactSettings] = useState<ContactSettings | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data?.contact) {
          setContactSettings(res.data.contact as ContactSettings);
        }
      })
      .catch(() => {});
  }, []);

  const phone = contactSettings?.phone || t("phone");
  const email = contactSettings?.email || t("email");
  const address = locale === "ar"
    ? contactSettings?.addressAr || t("address")
    : contactSettings?.addressEn || t("address");

  const hasContactInfo = phone || email || address;

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
            {hasContactInfo ? (
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                {address && <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 shrink-0 text-gold-400" />{address}</li>}
                {email && <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 shrink-0 text-gold-400" />{email}</li>}
                {phone && <li className="flex items-center gap-2" dir="ltr" style={{ unicodeBidi: "isolate" }}><Phone className="h-3.5 w-3.5 shrink-0 text-gold-400" />{phone}</li>}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-white/40 italic">Contact information coming soon</p>
            )}
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
