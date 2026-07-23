export type SamplePartner = {
  id: string
  nameEn: string
  nameAr: string
  logo: string
  website: string | null
  type: "DEVELOPER" | "BRAND" | "STRATEGIC"
}

export const partners: SamplePartner[] = [
  {
    id: "prt-1",
    nameEn: "Saudi Binladin Group",
    nameAr: "مجموعة بن لادن السعودية",
    logo: "/images/partners/binladin.png",
    website: "https://www.sbg.com.sa",
    type: "DEVELOPER",
  },
  {
    id: "prt-2",
    nameEn: "Al Rajhi Bank",
    nameAr: "مصرف الراجحي",
    logo: "/images/partners/alrajhi.png",
    website: "https://www.alrajhibank.com.sa",
    type: "STRATEGIC",
  },
  {
    id: "prt-3",
    nameEn: "Siemens",
    nameAr: "سيمنز",
    logo: "/images/partners/siemens.png",
    website: "https://www.siemens.com",
    type: "BRAND",
  },
  {
    id: "prt-4",
    nameEn: "SABIC",
    nameAr: "سابك",
    logo: "/images/partners/sabic.png",
    website: "https://www.sabic.com",
    type: "STRATEGIC",
  },
  {
    id: "prt-5",
    nameEn: "Honeywell",
    nameAr: "هانيويل",
    logo: "/images/partners/honeywell.png",
    website: "https://www.honeywell.com",
    type: "BRAND",
  },
  {
    id: "prt-6",
    nameEn: "Foster + Partners",
    nameAr: "فوستر آند بارتنرز",
    logo: "/images/partners/foster.png",
    website: "https://www.fosterandpartners.com",
    type: "STRATEGIC",
  },
  {
    id: "prt-7",
    nameEn: "Schneider Electric",
    nameAr: "شنايدر إلكتريك",
    logo: "/images/partners/schneider.png",
    website: "https://www.se.com",
    type: "BRAND",
  },
  {
    id: "prt-8",
    nameEn: "Zaha Hadid Architects",
    nameAr: "زها حديد للعمارة",
    logo: "/images/partners/zaha.png",
    website: "https://www.zaha-hadid.com",
    type: "STRATEGIC",
  },
  {
    id: "prt-9",
    nameEn: "Linde",
    nameAr: "ليند",
    logo: "/images/partners/linde.png",
    website: null,
    type: "BRAND",
  },
]
