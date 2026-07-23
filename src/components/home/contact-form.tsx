"use client"

import { useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  interest: z.string().min(1, "Please select an area of interest"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactFormSchema>

const interestOptions = [
  { value: "Investment", labelEn: "Investment", labelAr: "استثمار" },
  { value: "Leasing", labelEn: "Leasing", labelAr: "تأجير" },
  { value: "Development", labelEn: "Development", labelAr: "تطوير" },
  { value: "Partnership", labelEn: "Partnership", labelAr: "شراكة" },
  { value: "General", labelEn: "General", labelAr: "عام" },
]

type ContactSettings = {
  phone: string
  email: string
  addressEn: string
  addressAr: string
}

export default function ContactForm() {
  const locale = useLocale()
  const isRtl = locale === "ar"
  const t = useTranslations("contact")

  const contactT = useTranslations("contact.info")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contactSettings, setContactSettings] = useState<ContactSettings | null>(null)
  const resolvedPhone = contactSettings?.phone || contactT("phone")
  const resolvedEmail = contactSettings?.email || contactT("email")

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data?.contact) {
          setContactSettings(res.data.contact as ContactSettings)
        }
      })
      .catch(() => {})
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed")
      toast.success(t("form.success"))
      reset()
    } catch {
      toast.error(t("form.error"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section className="bg-cream" title={t("title")} subtitle={t("subtitle")}>
      <motion.div
        className="grid gap-10 lg:grid-cols-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-3 space-y-5"
          dir={isRtl ? "rtl" : "ltr"}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">{t("form.name")}</Label>
              <Input
                id="name"
                placeholder={t("form.name")}
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">{t("form.company")}</Label>
              <Input
                id="company"
                placeholder={t("form.company")}
                {...register("company")}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">{t("form.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("form.email")}
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t("form.phone")}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t("form.phone")}
                {...register("phone")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest">{t("form.service")}</Label>
            <Select
              onValueChange={(val) => setValue("interest", val)}
            >
              <SelectTrigger id="interest">
                <SelectValue placeholder={t("form.service")} />
              </SelectTrigger>
              <SelectContent>
                {interestOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {isRtl ? opt.labelAr : opt.labelEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.interest && (
              <p className="text-xs text-red-500">{errors.interest.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t("form.message")}</Label>
            <textarea
              id="message"
              rows={5}
              placeholder={t("form.message")}
              {...register("message")}
              className={`flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                errors.message ? "border-red-500" : "border-input"
              }`}
            />
            {errors.message && (
              <p className="text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            disabled={isSubmitting}
            className="w-full text-base font-semibold sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("form.sending")}
              </>
            ) : (
              <>
                {t("form.submit")}
                <Send className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="lg:col-span-2 space-y-6" dir={isRtl ? "rtl" : "ltr"}>
          <div className="rounded-xl bg-white p-6 shadow-lux space-y-6">
            <h3 className="text-lg font-semibold text-navy-900">
              {t("title")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                <div>
                  <p className="text-sm font-medium text-charcoal-900">
                    {contactT("addressLabel")}
                  </p>
                  <p className="text-sm text-charcoal-500">
                    {contactSettings?.addressAr && isRtl ? contactSettings.addressAr : contactSettings?.addressEn ? contactSettings.addressEn : contactT("address")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                <div>
                  <p className="text-sm font-medium text-charcoal-900">
                    {contactT("phoneLabel")}
                  </p>
                  <p className="text-sm text-charcoal-500" dir="ltr" style={{ unicodeBidi: "isolate" }}>
                    {resolvedPhone}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                <div>
                  <p className="text-sm font-medium text-charcoal-900">
                    {contactT("emailLabel")}
                  </p>
                  <p className="text-sm text-charcoal-500">{resolvedEmail}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-navy-900 p-6 text-center">
            <p className="text-sm text-gold-400">
              {contactT("availability")}
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
