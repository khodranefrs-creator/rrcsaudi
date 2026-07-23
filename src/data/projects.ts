export type SampleProject = {
  id: string
  titleEn: string
  titleAr: string
  slug: string
  descriptionEn: string
  descriptionAr: string
  locationEn: string
  locationAr: string
  category: "RESIDENTIAL" | "COMMERCIAL" | "MIXED_USE" | "MASTER_PLANNED" | "LUXURY"
  status: "PLANNING" | "UNDER_CONSTRUCTION" | "COMPLETED" | "LAUNCHED" | "SOLD_OUT"
  images: string[]
  amenities: string[]
  availableSpaces: number | null
  totalArea: string | null
  completionDate: string | null
  featured: boolean
  investmentInfo?: Record<string, unknown>
}

export const projects: SampleProject[] = [
  {
    id: "proj-1",
    titleEn: "Al Nakheel Residences",
    titleAr: "فلل النخيل السكنية",
    slug: "al-nakheel-residences",
    descriptionEn: "A luxury residential compound featuring 150 modern villas with contemporary architecture, landscaped gardens, and premium community amenities in the heart of Riyadh.",
    descriptionAr: "مجمع سكني فاخر يضم 150 فيلا عصرية بتصميم معماري حديث وحدائق طبيعية ومرافق مجتمعية راقية في قلب الرياض.",
    locationEn: "Al Nakheel District, Riyadh",
    locationAr: "حي النخيل، الرياض",
    category: "RESIDENTIAL",
    status: "COMPLETED",
    images: [
      "/images/projects/al-nakheel-1.jpg",
      "/images/projects/al-nakheel-2.jpg",
    ],
    amenities: ["Swimming Pool", "Gym", "Park", "Security", "Parking"],
    availableSpaces: null,
    totalArea: "250,000 sqm",
    completionDate: "2024-06-15",
    featured: true,
  },
  {
    id: "proj-2",
    titleEn: "Olaya Business Tower",
    titleAr: "برج العليا للأعمال",
    slug: "olaya-business-tower",
    descriptionEn: "A 35-story Grade A commercial tower in the prestigious Olaya district, offering flexible office spaces, retail outlets, and world-class corporate amenities.",
    descriptionAr: "برج تجاري من الفئة الأولى بارتفاع 35 طابقاً في حي العليا المرموق، يقدم مساحات مكتبية مرنة ومنافذ بيع بالتجزئة ومرافق مؤسسية عالمية المستوى.",
    locationEn: "Olaya District, Riyadh",
    locationAr: "حي العليا، الرياض",
    category: "COMMERCIAL",
    status: "UNDER_CONSTRUCTION",
    images: [
      "/images/projects/olaya-tower-1.jpg",
      "/images/projects/olaya-tower-2.jpg",
    ],
    amenities: ["Conference Rooms", "Food Court", "Valet Parking", "Security", "Smart Building Systems"],
    availableSpaces: 45,
    totalArea: "85,000 sqm",
    completionDate: "2026-03-01",
    featured: true,
  },
  {
    id: "proj-3",
    titleEn: "Jeddah Waterfront Development",
    titleAr: "تطوير واجهة جدة البحرية",
    slug: "jeddah-waterfront-development",
    descriptionEn: "A mixed-use waterfront destination combining luxury residences, retail, dining, and entertainment along the Jeddah Corniche.",
    descriptionAr: "وجهة ساحلية متعددة الاستخدامات تجمع بين السكن الفاخر والتجزئة والمطاعم والترفيه على طول كورنيش جدة.",
    locationEn: "Corniche, Jeddah",
    locationAr: "الكورنيش، جدة",
    category: "MIXED_USE",
    status: "LAUNCHED",
    images: [
      "/images/projects/jeddah-waterfront-1.jpg",
      "/images/projects/jeddah-waterfront-2.jpg",
    ],
    amenities: ["Marina", "Beach Access", "Retail Promenade", "Restaurants", "Hotel", "Spa"],
    availableSpaces: 80,
    totalArea: "320,000 sqm",
    completionDate: "2027-09-01",
    featured: true,
  },
  {
    id: "proj-4",
    titleEn: "Al Khobar Smart City",
    titleAr: "الخبر المدينة الذكية",
    slug: "al-khobar-smart-city",
    descriptionEn: "A master-planned smart city integrating IoT infrastructure, sustainable design, and mixed-use zones for a future-ready community.",
    descriptionAr: "مدينة ذكية مخططة بشكل متكامل تدمج البنية التحتية لإنترنت الأشياء والتصميم المستدام والمناطق متعددة الاستخدامات لمجتمع مستقبلي.",
    locationEn: "Al Khobar, Eastern Province",
    locationAr: "الخبر، المنطقة الشرقية",
    category: "MASTER_PLANNED",
    status: "PLANNING",
    images: [
      "/images/projects/khobar-smart-city-1.jpg",
      "/images/projects/khobar-smart-city-2.jpg",
    ],
    amenities: ["Smart Infrastructure", "Green Spaces", "Schools", "Healthcare", "Sports Complex", "Community Center"],
    availableSpaces: null,
    totalArea: "1,500,000 sqm",
    completionDate: "2030-12-01",
    featured: false,
  },
  {
    id: "proj-5",
    titleEn: "The Signature Residences",
    titleAr: "فلل السيغنيتشر الفاخرة",
    slug: "signature-residences",
    descriptionEn: "An exclusive collection of 30 ultra-luxury villas with bespoke interiors, private pools, and panoramic views in the most prestigious part of Riyadh.",
    descriptionAr: "مجموعة حصرية من 30 فيلا فائقة الفخامة مع تصاميم داخلية مخصصة ومسابح خاصة وإطلالات بانورامية في أرقى أحياء الرياض.",
    locationEn: "Al Safarat District, Riyadh",
    locationAr: "حي السفارات، الرياض",
    category: "LUXURY",
    status: "SOLD_OUT",
    images: [
      "/images/projects/signature-1.jpg",
      "/images/projects/signature-2.jpg",
    ],
    amenities: ["Private Pool", "Home Theater", "Smart Home", "Maid Room", "Driver Room", "Landscaped Garden"],
    availableSpaces: null,
    totalArea: "45,000 sqm",
    completionDate: "2023-12-01",
    featured: true,
  },
  {
    id: "proj-6",
    titleEn: "King Abdullah Financial District Plaza",
    titleAr: "بلازا حي الملك عبدالله المالي",
    slug: "kafd-plaza",
    descriptionEn: "A premier commercial complex within KAFD featuring modern office towers, a luxury hotel, and a vibrant retail plaza with direct metro access.",
    descriptionAr: "مجمع تجاري متميز داخل حي الملك عبدالله المالي يضم أبراج مكاتب عصرية وفندقاً فاخراً وساحة تجارية نابضة بالحياة مع وصول مباشر للمترو.",
    locationEn: "King Abdullah Financial District, Riyadh",
    locationAr: "حي الملك عبدالله المالي، الرياض",
    category: "COMMERCIAL",
    status: "UNDER_CONSTRUCTION",
    images: [
      "/images/projects/kafd-plaza-1.jpg",
      "/images/projects/kafd-plaza-2.jpg",
    ],
    amenities: ["Metro Link", "Conference Center", "Rooftop Garden", "Fitness Center", "Restaurants", "Underground Parking"],
    availableSpaces: 120,
    totalArea: "180,000 sqm",
    completionDate: "2026-09-01",
    featured: false,
  },
  {
    id: "proj-7",
    titleEn: "Mountain View Resort",
    titleAr: "منتجع ماونتن فيو",
    slug: "mountain-view-resort",
    descriptionEn: "A luxury resort community in the Asir mountains featuring chalets, a boutique hotel, and recreational facilities set against stunning mountain scenery.",
    descriptionAr: "منتجع سكني فاخر في جبال عسير يضم شاليهات وفندقاً بوتيكياً ومرافق ترفيهية على خلفية من المناظر الجبلية الخلابة.",
    locationEn: "Abha, Asir Region",
    locationAr: "أبها، منطقة عسير",
    category: "LUXURY",
    status: "LAUNCHED",
    images: [
      "/images/projects/mountain-view-1.jpg",
      "/images/projects/mountain-view-2.jpg",
    ],
    amenities: ["Chalets", "Boutique Hotel", "Restaurant", "Hiking Trails", "Spa", "Infinity Pool"],
    availableSpaces: 35,
    totalArea: "120,000 sqm",
    completionDate: "2027-06-01",
    featured: false,
  },
]
