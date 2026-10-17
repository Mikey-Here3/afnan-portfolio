"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Maximize2, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import { MODEL_BOOK_ITEMS } from "@/data/gallery";
import LightboxModal from "@/components/gallery/LightboxModal";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { MagneticButton, SpotlightCard, RevealText } from "@/components/motion/ReactBits";

type FilterType = "All" | "Portrait" | "Streetwear" | "Natural Light" | "Monochrome";
const FILTERS: FilterType[] = ["All", "Portrait", "Streetwear", "Natural Light", "Monochrome"];

export default function ModelingBookSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const sectionRef = useScrollReveal<HTMLDivElement>({
    selector: ".model-reveal",
    stagger: 0.08,
  });

  const filteredItems = useMemo(
    () =>
      activeFilter === "All"
        ? MODEL_BOOK_ITEMS
        : MODEL_BOOK_ITEMS.filter((item) => item.type === activeFilter),
    [activeFilter],
  );

  const openLightbox = (index: number) => setActiveLightboxIndex(index);
  const closeLightbox = () => setActiveLightboxIndex(null);
  const nextLightbox = () => {
    if (activeLightboxIndex === null || filteredItems.length === 0) return;
    setActiveLightboxIndex((prev) => ((prev ?? 0) + 1) % filteredItems.length);
  };
  const prevLightbox = () => {
    if (activeLightboxIndex === null || filteredItems.length === 0) return;
    setActiveLightboxIndex((prev) =>
      (prev ?? 0) === 0 ? filteredItems.length - 1 : (prev ?? 0) - 1,
    );
  };

  const itemCount = String(filteredItems.length).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="modeling"
      aria-labelledby="modeling-heading"
      className="relative isolate overflow-hidden border-t border-black/10 bg-[#f1efe9] px-5 py-24 text-[#171714] dark:border-white/10 dark:bg-[#0a0a0a] dark:text-[#f3f0e9] sm:px-8 sm:py-28 md:px-12 md:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_8%_8%,rgba(168,138,93,0.10),transparent_38%),radial-gradient(ellipse_at_95%_55%,rgba(168,138,93,0.07),transparent_35%)] dark:bg-[radial-gradient(ellipse_at_8%_8%,rgba(198,173,131,0.07),transparent_38%),radial-gradient(ellipse_at_95%_55%,rgba(198,173,131,0.05),transparent_35%)]"
      />
      <div className="mx-auto max-w-7xl">
        {/* Editorial section heading */}
        <div className="mb-10 flex flex-col gap-7 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <div className="model-reveal mb-5 flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.24em] text-[#96774d] dark:text-[#c6ad83]">06 / PORTFOLIO</span>
              <span className="h-px w-10 bg-[#a88a5d]/60" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-black/50 dark:text-white/45">The Model Book</span>
            </div>
            <h2
              id="modeling-heading"
              className="model-reveal max-w-4xl font-serif-editorial text-4xl font-normal leading-[0.98] tracking-[-0.045em] text-[#171714] dark:text-[#f3f0e9] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <RevealText text="EDITORIAL MODEL PORTFOLIO" />
              <span className="mt-3 block font-sans-clean text-[10px] font-medium uppercase tracking-[0.25em] text-black/45 dark:text-white/40 sm:text-xs">
                Form · Presence · Perspective
              </span>
            </h2>
          </div>

          <div className="model-reveal grid grid-cols-2 gap-5 border-l border-black/15 pl-5 text-xs dark:border-white/15 sm:gap-8 sm:pl-7 md:min-w-[260px]">
            <div>
              <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.2em] text-[#96774d] dark:text-[#c6ad83]">Availability</span>
              <span className="block text-sm text-black/80 dark:text-white/80">Independent creator</span>
            </div>
            <div>
              <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.2em] text-[#96774d] dark:text-[#c6ad83]">Based in</span>
              <span className="block text-sm text-black/80 dark:text-white/80">Islamabad, PK</span>
            </div>
          </div>
        </div>

        {/* Casting callout */}
        <SpotlightCard className="model-reveal mb-10 block overflow-hidden rounded-2xl border border-black/10 bg-white/55 p-5 dark:border-white/10 dark:bg-white/[0.035] sm:mb-12 sm:p-7 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-2 text-[#96774d] dark:text-[#c6ad83]">
                <Sparkles className="h-3.5 w-3.5" />
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em]">
                  For casting directors, brands & stylists
                </h3>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-black/60 dark:text-white/55 sm:text-[15px]">
                Available for fashion campaigns, streetwear lookbooks, commercial shoots, and lifestyle editorials.
                Bring natural camera empathy, calm composure, and contemporary aesthetic awareness.
              </p>
            </div>
            <MagneticButton
              href="#contact"
              className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-[#171714] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#f7f4ee] transition-colors duration-300 hover:bg-[#a88a5d] dark:bg-[#f3f0e9] dark:text-[#0a0a0a] dark:hover:bg-[#c6ad83]"
            >
              <span>Book for a shoot</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </MagneticButton>
          </div>
        </SpotlightCard>

        {/* Filters */}
        <div className="model-reveal mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.24em] text-black/45 dark:text-white/40">Explore the collection</p>
            <p className="font-serif-editorial text-2xl text-black/85 dark:text-white/85 sm:text-3xl">Selected frames<span className="text-[#96774d] dark:text-[#c6ad83]">.</span></p>
          </div>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter model portfolio by category">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <motion.button
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveFilter(filter);
                    setActiveLightboxIndex(null);
                  }}
                  className={`relative overflow-hidden rounded-full border px-3.5 py-2 text-[9px] uppercase tracking-[0.14em] transition-colors duration-300 sm:px-4 sm:text-[10px] sm:tracking-[0.17em] ${
                    isActive
                      ? "border-[#171714] text-[#f7f4ee] dark:border-[#f3f0e9] dark:text-[#0a0a0a]"
                      : "border-black/15 bg-transparent text-black/60 hover:border-[#a88a5d]/60 hover:text-black dark:border-white/15 dark:text-white/55 dark:hover:text-white"
                  }`}
                  whileTap={{ scale: 0.96 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="model-filter-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-[#171714] dark:bg-[#f3f0e9]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{filter}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Image gallery */}
        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, y: 24, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.985 }}
                transition={{ duration: 0.38, delay: Math.min(idx * 0.035, 0.18), ease: [0.22, 1, 0.36, 1] }}
                className="group relative min-w-0 overflow-hidden rounded-xl border border-black/10 bg-white/40 transition-colors duration-300 hover:border-[#a88a5d]/55 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-[#c6ad83]/45"
              >
                <button
                  type="button"
                  aria-label={`Open ${item.title} image`}
                  onClick={() => openLightbox(idx)}
                  className="relative block aspect-[3/4] w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#a88a5d]"
                  data-cursor-image="true"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/15 opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c6ad83]" />
                    {item.type}
                  </div>
                  <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-black/35 text-white opacity-100 backdrop-blur-md transition-all duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:scale-100 sm:scale-90">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="mb-2 flex items-end justify-between gap-3">
                      <h3 className="font-serif-editorial text-2xl leading-tight text-white transition-colors duration-300 group-hover:text-[#e1c99f] sm:text-[27px]">
                        {item.title}
                      </h3>
                      <span className="shrink-0 font-mono text-[9px] tracking-[0.15em] text-white/65">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="line-clamp-2 max-w-[90%] text-xs leading-5 text-white/65">{item.caption}</p>
                    {item.details && (
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/20 pt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-white/55">
                        <span>{item.details.setting}</span>
                        <span className="text-[#e1c99f]">{item.details.lighting}</span>
                      </div>
                    )}
                  </div>
                  <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-[#c6ad83] transition-all duration-500 group-hover:w-full" />
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Collection footer */}
        <div className="model-reveal mt-8 flex items-center justify-between border-t border-black/10 pt-5 dark:border-white/10 sm:mt-10">
          <p className="text-[10px] uppercase tracking-[0.16em] text-black/45 dark:text-white/40">
            A living collection <span className="mx-2 text-[#96774d] dark:text-[#c6ad83]">/</span> updated as new stories unfold
          </p>
          <div className="flex items-center gap-2 font-mono text-[10px] text-black/55 dark:text-white/50">
            <span className="text-[#96774d] dark:text-[#c6ad83]">{itemCount}</span>
            <span>frames</span>
            <ArrowDownRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      <LightboxModal
        items={filteredItems.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.type,
          image: item.image,
          caption: item.caption,
          location: item.details?.setting,
          year: item.year,
        }))}
        currentIndex={activeLightboxIndex}
        onClose={closeLightbox}
        onNext={nextLightbox}
        onPrev={prevLightbox}
      />
    </section>
  );
}
