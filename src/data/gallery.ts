import {
  PortfolioItem,
  ModelBookItem,
  VideoReel,
  CollaborationService,
  CreativeProcessStep,
} from "@/types";

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "formal-editorial",
    title: "Presence & Silhouette",
    category: "Fashion",
    year: "2026",
    image: "/images/editorial/formal-suit.jpg",
    aspectRatio: "portrait",
    caption:
      "Bespoke black tailored suit editorial exploring architectural brutalism and clean lines.",
    location: "Islamabad",
    credits: "Personal Fashion Editorial",
    featured: true,
  },
  {
    id: "streetwear-hoodie",
    title: "Concrete Reverie",
    category: "Streetwear",
    year: "2026",
    image: "/images/editorial/streetwear-hoodie.jpg",
    aspectRatio: "portrait",
    caption:
      "Oversized charcoal washed hoodie study set against raw concrete textures and overcast light.",
    location: "F-7 Islamabad",
    credits: "Contemporary Streetwear Study",
    featured: true,
  },
  {
    id: "casual-cap-shirt",
    title: "Golden Hour Solitude",
    category: "Lifestyle",
    year: "2026",
    image: "/images/editorial/casual-cap-shirt.jpg",
    aspectRatio: "portrait",
    caption:
      "Relaxed textured open shirt and washed cap under warm afternoon architectural light.",
    location: "Islamabad Cafe Quarter",
    credits: "Lifestyle Series",
    featured: true,
  },
  {
    id: "monochrome-22",
    title: "Story in Grayscale (No. 22)",
    category: "Cinematic Frames",
    year: "2026",
    image: "/images/editorial/monochrome-jersey-22.jpg",
    aspectRatio: "portrait",
    caption:
      "High-contrast black & white portrait with athletic jersey No. 22 exploring rim light and gaze.",
    location: "Studio Minimal",
    credits: "Monochrome Study",
    featured: true,
  },
  {
    id: "editorial-turtleneck",
    title: "Quiet Intensity",
    category: "Portraiture",
    year: "2026",
    image: "/images/editorial/hero-portrait.jpg",
    aspectRatio: "portrait",
    caption:
      "Fine knit turtleneck and sharp blazer framed with subtle warm champagne backlighting.",
    location: "Creative Studio",
    credits: "Signature Portrait Study",
    featured: true,
  },
  {
    id: "creative-lensman",
    title: "Frame Within Frame",
    category: "Cinematic Frames",
    year: "2026",
    image: "/images/editorial/behind-lens-camera.jpg",
    aspectRatio: "portrait",
    caption:
      "Behind the viewfinder — composing human gesture and light through a 35mm lens.",
    location: "Studio Islamabad",
    credits: "Visual Creator Series",
    featured: true,
  },
];

export const MODEL_BOOK_ITEMS: ModelBookItem[] = [
  {
    id: "mb-01",
    title: "Editorial Formality",
    type: "Portrait",
    image: "/images/editorial/formal-suit.jpg",
    aspectRatio: "3/4",
    year: "2026",
    caption: "Sharp jawline, bespoke collar line, poised under direct overhead skylight.",
    details: {
      setting: "Architectural Interior",
      lighting: "Diffused Top Daylight",
      mood: "Composed & Direct",
    },
  },
  {
    id: "mb-02",
    title: "Subtle Warmth",
    type: "Natural Light",
    image: "/images/editorial/about-portrait.jpg",
    aspectRatio: "3/4",
    year: "2026",
    caption: "Natural studio light, candid profile, relaxed knitwear styling.",
    details: {
      setting: "Atelier Studio",
      lighting: "Soft Window Falloff",
      mood: "Authentic & Thoughtful",
    },
  },
  {
    id: "mb-03",
    title: "Street Silhouette",
    type: "Streetwear",
    image: "/images/editorial/streetwear-hoodie.jpg",
    aspectRatio: "3/4",
    year: "2026",
    caption: "Relaxed drop-shoulder posture, brutalist background, contemporary fit.",
    details: {
      setting: "Urban Concrete",
      lighting: "Overcast Ambient",
      mood: "Grounded & Modern",
    },
  },
  {
    id: "mb-04",
    title: "High-Contrast Leica",
    type: "Monochrome",
    image: "/images/editorial/monochrome-jersey-22.jpg",
    aspectRatio: "3/4",
    year: "2026",
    caption: "Graphic athletic look, deep shadow values, intense eye connection.",
    details: {
      setting: "Dark Backdrop",
      lighting: "Dramatic Rim Key",
      mood: "Raw & Cinematic",
    },
  },
  {
    id: "mb-05",
    title: "Candid Daylight",
    type: "Natural Light",
    image: "/images/editorial/casual-cap-shirt.jpg",
    aspectRatio: "3/4",
    year: "2026",
    caption: "Lifestyle movement, casual open collar, effortless street presence.",
    details: {
      setting: "Golden Hour Exterior",
      lighting: "Warm Late Sun",
      mood: "Approachable & Effortless",
    },
  },
  {
    id: "mb-06",
    title: "Editorial Signature",
    type: "Portrait",
    image: "/images/editorial/hero-portrait.jpg",
    aspectRatio: "3/4",
    year: "2026",
    caption: "Classic three-quarter angle, clean neckline, editorial focus.",
    details: {
      setting: "Dark Studio Cyc",
      lighting: "Chiaroscuro Warm Key",
      mood: "Refined & Aspirational",
    },
  },
];

export const CREATIVE_SKILLS = [
  {
    title: "Visual Framing & Composition",
    description:
      "Deep eye for geometric balance, negative space, and leading lines shaped by 3–4 years of active shooting.",
    tag: "Photography",
  },
  {
    title: "Smartphone Cinematography",
    description:
      "Mastery of modern mobile sensor limits, manual exposure, gimbal stabilization, and quick-turn vertical video.",
    tag: "Mobile Production",
  },
  {
    title: "Atmospheric Natural Lighting",
    description:
      "Reading ambient light, directional window falloff, golden hour warmth, and moody overcast diffusion without over-lighting.",
    tag: "Lighting Direction",
  },
  {
    title: "Dual-Sided Camera Empathy",
    description:
      "Knowing how a camera perceives micro-expressions allows effortless posture adjustments in front of the lens.",
    tag: "Modeling & Direction",
  },
  {
    title: "Paced Video Storytelling",
    description:
      "Editing with rhythmic cadence, musical sync, color mood boards, and platform-native pacing for TikTok & Reels.",
    tag: "Videography",
  },
  {
    title: "Creative Concept Ideation",
    description:
      "Translating an abstract mood or song into concrete location choices, wardrobe pairings, and shot lists.",
    tag: "Creative Direction",
  },
];

export const VIDEO_REELS: VideoReel[] = [
  {
    id: "reel-01",
    title: "Islamabad Blue Hour Editorial",
    platform: "Instagram Reels",
    category: "Fashion Motion",
    url: "https://instagram.com/afnx7n",
    thumbnail: "/images/editorial/formal-suit.jpg",
    aspectRatio: "9/16",
    duration: "0:24",
  },
  {
    id: "reel-02",
    title: "Behind The 35mm Frame",
    platform: "TikTok",
    category: "Behind The Lens",
    url: "https://www.tiktok.com/@afnx7n",
    thumbnail: "/images/editorial/behind-lens-camera.jpg",
    aspectRatio: "9/16",
    duration: "0:38",
  },
  {
    id: "reel-03",
    title: "Streetwear Silhouette & Shadow",
    platform: "Instagram Reels",
    category: "Visual Story",
    url: "https://instagram.com/afnx7n",
    thumbnail: "/images/editorial/streetwear-hoodie.jpg",
    aspectRatio: "9/16",
    duration: "0:19",
  },
  {
    id: "reel-04",
    title: "Monochrome Movement Study",
    platform: "TikTok",
    category: "Islamabad Mood",
    url: "https://www.tiktok.com/@afnx7n",
    thumbnail: "/images/editorial/monochrome-jersey-22.jpg",
    aspectRatio: "9/16",
    duration: "0:30",
  },
];

export const CREATIVE_PROCESS_STEPS: CreativeProcessStep[] = [
  {
    step: "01",
    title: "Find The Concept",
    tagline: "Mood before method",
    description:
      "Every shoot starts with an emotional frequency — a color temperature, a piece of clothing, or a musical rhythm that defines what the frame should feel like.",
  },
  {
    step: "02",
    title: "Explore Location & Light",
    tagline: "Shadows tell the story",
    description:
      "Scouting Islamabad's architectural corners, natural light falloffs, and street geometries to find backgrounds that elevate rather than overwhelm.",
  },
  {
    step: "03",
    title: "Frame The Story",
    tagline: "Angles with intent",
    description:
      "Choosing camera perspective, focal length, and breathing room. Whether shooting with a dedicated mirrorless or a phone, precision comes first.",
  },
  {
    step: "04",
    title: "Capture The Moment",
    tagline: "Calm in motion",
    description:
      "Remaining completely composed through shifting conditions. Finding the honest in-between second between posed motions.",
  },
  {
    step: "05",
    title: "Refine The Final Visual",
    tagline: "Subtle, filmic color",
    description:
      "Grading with restraint — organic film curves, warm champagne skin tones, deep blacks, and zero plastic over-processing.",
  },
];

export const COLLABORATION_SERVICES: CollaborationService[] = [
  {
    id: "fashion-campaigns",
    title: "Fashion & Lookbooks",
    role: "Editorial & Commercial Modeling",
    description:
      "Available for independent clothing labels, streetwear collections, and contemporary apparel lookbooks seeking an authentic, modern look.",
    deliverables: [
      "Lookbook & Campaign Modeling",
      "Streetwear & Contemporary Editorial",
      "Natural Posing with Creative Empathy",
      "High-energy Professional Demeanor",
    ],
    ctaLabel: "Inquire for Modeling",
  },
  {
    id: "visual-content",
    title: "Creative Content & Direction",
    role: "Photographer & Videographer",
    description:
      "Collaborating on short-form visual campaigns, behind-the-scenes film captures, and vertical storytelling for brands and lifestyle products.",
    deliverables: [
      "9:16 Vertical Video Production",
      "Smartphone & Camera Visuals",
      "Color Mood & Sequence Direction",
      "Platform-Native Video Assets",
    ],
    ctaLabel: "Inquire for Content",
  },
  {
    id: "creator-collabs",
    title: "Creator & Artist Collabs",
    role: "Creative Partner",
    description:
      "Partnering with photographers, filmmakers, fashion designers, and digital artists looking to co-create experimental visual projects.",
    deliverables: [
      "Dual In-Front / Behind Camera Support",
      "Concept Development & Co-Creation",
      "Mutual Creative Synergy",
      "Cross-Platform Feature Support",
    ],
    ctaLabel: "Start a Conversation",
  },
];

export const CREATIVE_INTERESTS = [
  {
    id: "gaming",
    title: "Gaming & Digital Culture",
    category: "Culture",
    description:
      "Passionate about competitive gaming, digital worlds, dynamic storytelling, and esports aesthetics.",
    icon: "Gamepad2",
  },
  {
    id: "fashion",
    title: "Contemporary Fashion",
    category: "Aesthetics",
    description:
      "Fascinated by tailoring, oversized streetwear silhouettes, monochrome textures, and bespoke garments.",
    icon: "Shirt",
  },
  {
    id: "photography",
    title: "Visual Framing",
    category: "Craft",
    description:
      "3–4+ years behind the lens studying light falloff, shadow density, and candid human expression.",
    icon: "Camera",
  },
  {
    id: "videography",
    title: "Motion & Rhythm",
    category: "Direction",
    description:
      "Creating seamless vertical video sequences, sound-synced cuts, and cinematic color palettes.",
    icon: "Film",
  },
  {
    id: "personal-brand",
    title: "Creator Identity",
    category: "Vision",
    description:
      "Building a timeless, recognizable personal aesthetic grounded in craft, restraint, and passion.",
    icon: "Sparkles",
  },
];
