export type SamplePartner = {
  id: string
  nameEn: string
  nameAr: string
  logo: string
  website: string | null
  type: "DEVELOPER" | "BRAND" | "STRATEGIC"
}

export const partners: SamplePartner[] = []
