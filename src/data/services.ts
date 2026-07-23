export type SampleService = {
  id: string
  titleEn: string
  titleAr: string
  slug: string
  descriptionEn: string
  descriptionAr: string
  icon: string | null
  order: number
  featuresEn: string[]
  featuresAr: string[]
}

export const services: SampleService[] = [
  {
    id: "svc-1",
    titleEn: "Real Estate Development",
    titleAr: "التطوير العقاري",
    slug: "real-estate-development",
    descriptionEn: "End-to-end development services from land acquisition and feasibility studies to design, construction, and handover. We deliver residential, commercial, and mixed-use projects that meet the highest standards of quality and innovation.",
    descriptionAr: "خدمات تطوير شاملة من الاستحواذ على الأراضي ودراسات الجدوى إلى التصميم والبناء والتسليم. نقدم مشاريع سكنية وتجارية ومتعددة الاستخدامات تلبي أعلى معايير الجودة والابتكار.",
    icon: "Building2",
    order: 1,
    featuresEn: ["Land acquisition & due diligence", "Architectural & engineering design", "Construction management", "Quality assurance & handover"],
    featuresAr: ["الاستحواذ على الأراضي والعناية الواجبة", "التصميم المعماري والهندسي", "إدارة البناء", "ضمان الجودة والتسليم"],
  },
  {
    id: "svc-2",
    titleEn: "Investment Advisory",
    titleAr: "الاستشارات الاستثمارية",
    slug: "investment-advisory",
    descriptionEn: "Strategic investment consulting services including market analysis, portfolio optimization, risk assessment, and opportunity identification across the Saudi real estate market.",
    descriptionAr: "خدمات استشارات استثمارية استراتيجية تشمل تحليل السوق وتحسين المحفظة وتقييم المخاطر وتحديد الفرص في سوق العقارات السعودي.",
    icon: "TrendingUp",
    order: 2,
    featuresEn: ["Market research & analysis", "Portfolio strategy", "Risk assessment", "ROI forecasting"],
    featuresAr: ["أبحاث السوق والتحليل", "استراتيجية المحفظة", "تقييم المخاطر", "التنبؤ بالعائد على الاستثمار"],
  },
  {
    id: "svc-3",
    titleEn: "Property Management",
    titleAr: "إدارة الممتلكات",
    slug: "property-management",
    descriptionEn: "Comprehensive property management solutions covering leasing, maintenance, tenant relations, and asset optimization to maximize the value of your real estate investments.",
    descriptionAr: "حلول شاملة لإدارة الممتلكات تشمل التأجير والصيانة وعلاقات المستأجرين وتعظيم الأصول لزيادة قيمة استثماراتك العقارية.",
    icon: "Shield",
    order: 3,
    featuresEn: ["Leasing & tenant management", "Maintenance & operations", "Financial reporting", "Asset optimization"],
    featuresAr: ["إدارة التأجير والمستأجرين", "الصيانة والعمليات", "التقارير المالية", "تعظيم الأصول"],
  },
  {
    id: "svc-4",
    titleEn: "Feasibility Studies",
    titleAr: "دراسات الجدوى",
    slug: "feasibility-studies",
    descriptionEn: "In-depth feasibility analysis including financial modeling, market research, regulatory compliance review, and project viability assessments to support informed decision-making.",
    descriptionAr: "تحليل جدوى متعمق يشمل النمذجة المالية وأبحاث السوق ومراجعة الامتثال التنظيمي وتقييمات جدوى المشروع لدعم اتخاذ القرارات المستنيرة.",
    icon: "ClipboardCheck",
    order: 4,
    featuresEn: ["Financial modeling", "Market demand analysis", "Regulatory review", "Viability assessment"],
    featuresAr: ["النمذجة المالية", "تحليل الطلب في السوق", "المراجعة التنظيمية", "تقييم الجدوى"],
  },
  {
    id: "svc-5",
    titleEn: "Project Management",
    titleAr: "إدارة المشاريع",
    slug: "project-management",
    descriptionEn: "Professional project management services encompassing planning, procurement, construction supervision, quality control, and timely delivery of complex real estate projects.",
    descriptionAr: "خدمات إدارة مشاريع احترافية تشمل التخطيط والمشتريات والإشراف على البناء ومراقبة الجودة والتسليم في الوقت المحدد للمشاريع العقارية المعقدة.",
    icon: "HardHat",
    order: 5,
    featuresEn: ["Project planning & scheduling", "Procurement & contracts", "Site supervision", "Quality control & safety"],
    featuresAr: ["تخطيط المشروع وجدولته", "المشتريات والعقود", "الإشراف الميداني", "مراقبة الجودة والسلامة"],
  },
]
