export interface SocialLink {
  id: string;
  name: string;
  url: string;
  handle: string;
  icon: string;
  primary?: boolean;
}

export type PortfolioCategory =
  | "All"
  | "Fashion"
  | "Streetwear"
  | "Lifestyle"
  | "Portraiture"
  | "Cinematic Frames";

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  year: string;
  image: string;
  aspectRatio: "portrait" | "landscape" | "square";
  caption: string;
  location?: string;
  credits?: string;
  featured?: boolean;
}

export interface ModelBookItem {
  id: string;
  title: string;
  type: "Portrait" | "Full-Length" | "Streetwear" | "Natural Light" | "Monochrome";
  image: string;
  aspectRatio: "3/4" | "4/5" | "16/9" | "1/1";
  year: string;
  caption: string;
  details?: {
    setting?: string;
    lighting?: string;
    mood?: string;
  };
}

export interface VideoReel {
  id: string;
  title: string;
  platform: "Instagram Reels" | "TikTok";
  category: "Fashion Motion" | "Behind The Lens" | "Visual Story" | "Islamabad Mood";
  url: string;
  thumbnail: string;
  aspectRatio: "9/16";
  duration?: string;
}

export interface CreativeProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
}

export interface CollaborationService {
  id: string;
  title: string;
  role: string;
  description: string;
  deliverables: string[];
  ctaLabel: string;
}
