"use client";

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

// Global interaction/scroll components are mounted in src/app/layout.tsx:
// SmoothScroll and CustomCursor. Do not mount them a second time here.
import CinematicIntro from "@/components/layout/CinematicIntro";

import HeroSection from "@/components/sections/HeroSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import AboutSection from "@/components/sections/AboutSection";
import SelectedPortfolioSection from "@/components/sections/SelectedPortfolioSection";
import SignatureEditorialSection from "@/components/sections/SignatureEditorialSection";
import StreetwearSection from "@/components/sections/StreetwearSection";
import ModelingBookSection from "@/components/sections/ModelingBookSection";
import SplitStorySection from "@/components/sections/SplitStorySection";
import PhotographyVideographySection from "@/components/sections/PhotographyVideographySection";
import CollaborationSection from "@/components/sections/CollaborationSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-clip bg-[#F5F1E9] text-[#191815] selection:bg-[#C6AD83] selection:text-[#171510] dark:bg-[#0A0A0A] dark:text-[#F3F0E9]">
      <Navigation />
      <CinematicIntro />

      <main className="flex w-full flex-1 flex-col">
        {/* 01 — Cinematic introduction */}
        <HeroSection />

        {/* 02 — Creative identity ticker */}
        <MarqueeSection />

        {/* 03 — A concise introduction */}
        <AboutSection />

        {/* 04 — Curated visual portfolio */}
        <SelectedPortfolioSection />

        {/* 05 — Featured editorial campaign */}
        <SignatureEditorialSection />

        {/* 06 — Streetwear and lifestyle editorial */}
        <StreetwearSection />

        {/* 07 — Modeling portfolio */}
        <ModelingBookSection />

        {/* 08 — A dual perspective: creator and model */}
        <SplitStorySection />

        {/* 09 — Photography and video */}
        <PhotographyVideographySection />

        {/* 10 — Collaboration opportunities */}
        <CollaborationSection />

        {/* 11 — Contact and enquiries */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
