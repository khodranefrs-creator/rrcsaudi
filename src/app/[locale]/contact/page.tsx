"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ContactPage() {
  const t = useTranslations("contact");
  const params = useParams();
  const locale = params.locale as string;
  const isAr = locale === "ar";
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success(t("form.success"));
      setForm({ name: "", email: "", phone: "", company: "", service: "", message: "" });
    } catch {
      toast.error(t("form.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section title={t("title")} subtitle={t("subtitle")}>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={cn("grid gap-4 sm:grid-cols-2", isAr && "sm:grid-cols-2")}>
              <div>
                <label className="text-sm font-medium">{t("form.name")}</label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t("form.name")}
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t("form.email")}</label>
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t("form.email")}
                />
              </div>
            </div>
            <div className={cn("grid gap-4 sm:grid-cols-2", isAr && "sm:grid-cols-2")}>
              <div>
                <label className="text-sm font-medium">{t("form.phone")}</label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder={t("form.phone")}
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t("form.company")}</label>
                <Input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder={t("form.company")}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">{t("form.service")}</label>
              <Input
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                placeholder={t("form.service")}
              />
            </div>
            <div>
              <label className="text-sm font-medium">{t("form.message")}</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t("form.message")}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <Button type="submit" variant="gold" disabled={loading} className="w-full sm:w-auto">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? t("form.sending") : t("form.submit")}
            </Button>
          </form>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Address</h4>
                  <p className="text-sm text-muted-foreground">{t("info.address")}</p>
                </div>
              </div>
              {t("info.phone") && (
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Phone</h4>
                  <p className="text-sm text-muted-foreground">{t("info.phone")}</p>
                </div>
              </div>
              )}
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Email</h4>
                  <p className="text-sm text-muted-foreground">{t("info.email")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}
