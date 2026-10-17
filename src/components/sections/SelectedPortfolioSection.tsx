"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Maximize2, MoveUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PORTFOLIO_ITEMS } from "@/data/gallery";
import type { PortfolioCategory } from "@/types";
import LightboxModal from "@/components/gallery/LightboxModal";
import { AnimatePresence, motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CATEGORIES: PortfolioCategory[] = [
  "All",
  "Fashion",
  "Streetwear",
  "Lifestyle",
  "Portraiture",
  "Cinematic Frames",
];

const DESKTOP_LAYOUTS = [
  "lg:col-span-7 lg:col-start-1",
  "lg:col-span-4 lg:col-start-9 lg:mt-36",
  "lg:col-span-4 lg:col-start-2",
  "lg:col-span-6 lg:col-start-7 lg:mt-20",
  "lg:col-span-5 lg:col-start-1",
  "lg:col-span-5 lg:col-start-8 lg:mt-24",
];

export default function SelectedPortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? PORTFOLIO_ITEMS
        : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        section.querySelectorAll(".work-reveal"),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const openLightbox = (index: number) => setActiveLightboxIndex(index);
  const closeLightbox = () => setActiveLightboxIndex(null);

  const nextLightbox = () => {
    if (activeLightboxIndex === null || filteredItems.length < 2) return;
    setActiveLightboxIndex((current) => ((current ?? 0) + 1) % filteredItems.length);
  };

  const prevLightbox = () => {
    if (activeLightboxIndex === null || filteredItems.length < 2) return;
    setActiveLightboxIndex((current) =>
      (current ?? 0) === 0 ? filteredItems.length - 1 : (current ?? 0) - 1,
    );
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="selected-work-heading"
      className="relative isolate overflow-hidden border-t border-black/10 bg-[#f0eee8] px-5 py-24 text-[#171715] dark:border-white/10 dark:bg-[#090909] dark:text-[#f3f0e9] sm:px-8 md:px-12 md:py-32 lg:px-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_12%,rgba(169,138,96,0.10),transparent_35%),radial-gradient(ellipse_at_90%_60%,rgba(169,138,96,0.06),transparent_34%)] dark:bg-[radial-gradient(ellipse_at_10%_12%,rgba(198,173,131,0.06),transparent_35%),radial-gradient(ellipse_at_90%_60%,rgba(198,173,131,0.035),transparent_34%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-8rem] top-40 -z-10 h-80 w-80 rounded-full border border-black/[0.045] dark:border-white/[0.035] sm:right-[-5rem] sm:h-[28rem] sm:w-[28rem]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-3rem] top-52 -z-10 h-64 w-64 rounded-full border border-black/[0.04] dark:border-white/[0.03] sm:right-0 sm:h-80 sm:w-80" />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end lg:mb-20">
          <div className="max-w-4xl">
            <div className="work-reveal mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#a98a60] dark:bg-[#c6ad83]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#78664d] dark:text-[#c6ad83]">
                02 / Selected work
              </span>
            </div>
            <h2
              id="selected-work-heading"
              className="work-reveal max-w-4xl text-[clamp(2.8rem,8vw,7.5rem)] font-semibold uppercase leading-[0.84] tracking-[-0.075em] text-[#171715] dark:text-[#f3f0e9]"
            >
              A STUDY
              <br />
              IN <span className="font-serif-editorial font-normal italic text-[#806b4e] dark:text-[#c6ad83]">form.</span>
            </h2>
          </div>

          <div className="work-reveal max-w-xs md:pb-2">
            <p className="text-sm leading-7 text-[#64615b] dark:text-white/55 md:text-[15px]">
              Selected portraits, personal style and cinematic frames. A collection of moments shaped by light, character and perspective.
            </p>
            <div className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#78664d] dark:text-[#c6ad83]">
              <span aria-live="polite">{String(filteredItems.length).padStart(2, "0")} frames</span>
              <span className="h-px w-8 bg-[#b9a17c] dark:bg-[#c6ad83]/60" />
              <span>Visual archive</span>
            </div>
          </div>
        </div>

        <div className="work-reveal mb-10 flex flex-wrap gap-2 border-y border-black/10 py-4 dark:border-white/10 md:mb-14">
          {CATEGORIES.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setActiveLightboxIndex(null);
                }}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-[9px] uppercase tracking-[0.15em] transition-colors duration-300 sm:px-5 sm:text-[10px] ${
                  active
                    ? "border-[#171715] bg-[#171715] text-[#f0eee8] dark:border-[#f3f0e9] dark:bg-[#f3f0e9] dark:text-[#11110f]"
                    : "border-black/15 text-[#69665f] hover:border-[#a98a60] hover:text-[#171715] dark:border-white/15 dark:text-white/55 dark:hover:border-[#c6ad83] dark:hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {filteredItems.length === 0 ? (
          <div className="border-y border-black/10 py-20 text-center dark:border-white/10">
            <p className="font-serif-editorial text-2xl italic text-[#64615b] dark:text-white/50">
              No frames in this collection yet.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-24"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const layoutClass = DESKTOP_LAYOUTS[index % DESKTOP_LAYOUTS.length];
                const isWide = index % 3 === 0;

                return (
                  <motion.article
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className={`group min-w-0 ${layoutClass}`}
                  >
                    <button
                      type="button"
                      onClick={() => openLightbox(index)}
                      aria-label={`View ${item.title} in full screen`}
                      className="relative block w-full cursor-zoom-in overflow-hidden bg-[#dcd8cf] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a98a60] dark:bg-[#1a1a18]"
                      data-cursor-image="true"
                    >
                      <div className={`relative w-full ${isWide ? "aspect-[5/4] sm:aspect-[4/5]" : "aspect-[4/5]"}`}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 65vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                        <div className="absolute left-4 top-4 flex items-center gap-2 sm:left-5 sm:top-5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#d5b78a]" />
                          <span className="text-[9px] uppercase tracking-[0.2em] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
                            {item.category}
                          </span>
                        </div>
                        <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/15 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-[#f0eee8] group-hover:bg-[#f0eee8] group-hover:text-[#11110f] sm:bottom-5 sm:right-5">
                          <Maximize2 className="h-4 w-4" />
                        </span>
                      </div>
                    </button>

                    <div className="flex items-start justify-between gap-4 border-b border-black/15 py-4 dark:border-white/15 sm:py-5">
                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] uppercase tracking-[0.17em] text-[#777168] dark:text-white/40">
                          <span>{item.location || "Islamabad"}</span>
                          <span className="h-1 w-1 rounded-full bg-[#a98a60] dark:bg-[#c6ad83]" />
                          <span>{item.year}</span>
                        </div>
                        <h3 className="font-serif-editorial text-xl leading-tight text-[#171715] dark:text-white/90 sm:text-2xl">
                          {item.title}
                        </h3>
                        {item.caption && (
                          <p className="mt-2 max-w-md text-xs leading-6 text-[#716d65] dark:text-white/50">
                            {item.caption}
                          </p>
                        )}
                        {item.credits && (
                          <p className="mt-3 text-[9px] uppercase tracking-[0.17em] text-[#8a775b] dark:text-[#c6ad83]">
                            {item.credits}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => openLightbox(index)}
                        aria-label={`Open ${item.title}`}
                        className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/15 transition-all duration-300 hover:border-[#a98a60] hover:bg-[#171715] hover:text-white dark:border-white/20 dark:hover:border-[#c6ad83] dark:hover:bg-[#c6ad83] dark:hover:text-black"
                      >
                        <MoveUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="mt-16 flex flex-col gap-4 border-t border-black/15 pt-5 dark:border-white/15 sm:flex-row sm:items-center sm:justify-between md:mt-24">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#777168] dark:text-white/40">
            Fashion / Film / Identity
          </p>
          <a
            href="#contact"
            className="group inline-flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.17em] text-[#171715] dark:text-white/80"
          >
            Discuss a project
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 transition-all duration-300 group-hover:border-[#171715] group-hover:bg-[#171715] group-hover:text-white dark:border-white/20 dark:group-hover:border-[#c6ad83] dark:group-hover:bg-[#c6ad83] dark:group-hover:text-black">
              <ArrowDownRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>

      <LightboxModal
        items={filteredItems}
        currentIndex={activeLightboxIndex}
        onClose={closeLightbox}
        onNext={nextLightbox}
        onPrev={prevLightbox}
      />
    </section>
  );
}
