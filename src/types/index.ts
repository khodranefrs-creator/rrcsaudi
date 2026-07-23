export type Locale = "en" | "ar"

export type NavItem = {
  label: string
  href: string
  children?: NavItem[]
}

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  CONTENT_MANAGER = "CONTENT_MANAGER",
  PROJECT_MANAGER = "PROJECT_MANAGER",
}

export enum InquiryType {
  INVESTOR = "INVESTOR",
  BRAND = "BRAND",
  GENERAL = "GENERAL",
}

export enum InquiryStatus {
  NEW = "NEW",
  READ = "READ",
  REPLIED = "REPLIED",
  CLOSED = "CLOSED",
}

export enum MediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  DOCUMENT = "DOCUMENT",
}

export enum PartnerType {
  DEVELOPER = "DEVELOPER",
  BRAND = "BRAND",
  STRATEGIC = "STRATEGIC",
}

export enum ProjectCategory {
  RESIDENTIAL = "RESIDENTIAL",
  COMMERCIAL = "COMMERCIAL",
  MIXED_USE = "MIXED_USE",
  MASTER_PLANNED = "MASTER_PLANNED",
  LUXURY = "LUXURY",
}

export enum ProjectStatus {
  PLANNING = "PLANNING",
  UNDER_CONSTRUCTION = "UNDER_CONSTRUCTION",
  COMPLETED = "COMPLETED",
  LAUNCHED = "LAUNCHED",
  SOLD_OUT = "SOLD_OUT",
}

export type Account = {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token: string | null
  access_token: string | null
  expires_at: number | null
  token_type: string | null
  scope: string | null
  id_token: string | null
  session_state: string | null
}

export type Session = {
  id: string
  sessionToken: string
  userId: string
  expires: Date
}

export type User = {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  role: Role
  passwordHash: string | null
  createdAt: Date
  updatedAt: Date
}

export type VerificationToken = {
  identifier: string
  token: string
  expires: Date
}

export type Project = {
  id: string
  titleEn: string
  titleAr: string
  slug: string
  descriptionEn: string
  descriptionAr: string
  locationEn: string
  locationAr: string
  category: ProjectCategory
  status: ProjectStatus
  images: unknown
  amenities: unknown
  availableSpaces: number | null
  totalArea: string | null
  completionDate: Date | null
  featured: boolean
  investmentInfo: unknown
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export type Service = {
  id: string
  titleEn: string
  titleAr: string
  slug: string
  descriptionEn: string
  descriptionAr: string
  icon: string | null
  order: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export type Partner = {
  id: string
  nameEn: string
  nameAr: string
  logo: string
  website: string | null
  type: PartnerType
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export type BlogPost = {
  id: string
  titleEn: string
  titleAr: string
  slug: string
  contentEn: string
  contentAr: string
  excerptEn: string | null
  excerptAr: string | null
  coverImage: string | null
  author: string | null
  tags: unknown
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export type Inquiry = {
  id: string
  type: InquiryType
  name: string
  company: string | null
  email: string
  phone: string | null
  message: string
  interestArea: string | null
  status: InquiryStatus
  createdAt: Date
  updatedAt: Date
}

export type ContactRequest = {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  message: string
  service: string | null
  createdAt: Date
  updatedAt: Date
}

export type Media = {
  id: string
  url: string
  altEn: string | null
  altAr: string | null
  type: MediaType
  projectId: string | null
  createdAt: Date
}

export type SiteSetting = {
  id: string
  key: string
  value: unknown
  description: string | null
}

export type ProjectWithMedia = Project & { media: Media[] }
