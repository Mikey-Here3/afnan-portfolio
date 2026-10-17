"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, User, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { SpotlightCard, RevealText } from "@/components/motion/ReactBits";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

type PanelId = "behind" | "front";

const cardVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 42,
    y: 12,
    scale: 0.985,
  }),
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.48,
      // Named easing avoids the tuple being widened to number[] by TypeScript.
      ease: "easeOut",
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -32,
    y: -8,
    scale: 0.99,
    transition: { duration: 0.22, ease: "easeIn" },
  }),
};

const PANELS = [
  {
    id: "behind",
    icon: Camera,
    label: "Behind the lens",
    tag: "The creator dimension",
    num: "01",
    img: "/images/editorial/behind-lens-camera.jpg",
    imgAlt: "Afnan Abbasi composing a photograph",
    imgCaption: "Viewfinder awareness · 35mm",
    headline: "The geometry of light & patience",
    paras: [
      "Behind the viewfinder, every millimeter counts: the line of a jaw against a concrete beam, the falloff of natural daylight, and the breathing room left in the frame.",
      "Observing people through a lens teaches you how easily a subject can stiffen under scrutiny — and how much a calm, reassuring direction can change the image.",
    ],
    footer: "Composition · Pacing · Direction",
    footerRight: "3–4+ years",
  },
  {
    id: "front",
    icon: User,
    label: "In front of camera",
    tag: "The model dimension",
    num: "02",
    img: "/images/editorial/hero-portrait.jpg",
    imgAlt: "Afnan Abbasi in an editorial portrait",
    imgCaption: "Stillness & posture · Editorial",
    headline: "Composure, posture & authentic presence",
    paras: [
      "Stepping in front of the lens turns technical knowledge into instinct. Understanding focal lengths and light makes it easier to find an angle, hold a silhouette, and work with the frame.",
      "The goal is natural, unforced modeling: presence grounded in confidence, quiet concentration, and respect for the photographer’s vision.",
    ],
    footer: "Silhouette · Eye contact · Expression",
    footerRight: "Modeling potential",
  },
] as const;

export default function SplitStorySection() {
  const [active, setActive] = useState<PanelId>("behind");
  const [dir, setDir] = useState(1);
  const reduceMotion = useReducedMotion();
  const sectionRef = useScrollReveal<HTMLElement>({
    selector: ".split-reveal",
    stagger: 0.075,
  });

  const toggle = (id: PanelId) => {
    if (id === active) return;
    setDir(id === "front" ? 1 : -1);
    setActive(id);
  };

  const activePanel = PANELS.find((panel) => panel.id === active)!;
  const ActiveIcon = activePanel.icon;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="split-story-title"
      className="relative isolate overflow-hidden border-t border-black/10 bg-[#F5F1E9] px-5 py-24 text-[#191815] dark:border-white/10 dark:bg-[#080808] dark:text-[#F3F0E9] sm:px-8 sm:py-28 lg:px-12 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-20 h-72 w-72 rounded-full bg-[#C6AD83]/10 blur-3xl dark:bg-[#C6AD83]/[0.07]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-black/[0.035] blur-3xl dark:bg-white/[0.025]"
      />

      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20">
          <div className="split-reveal mb-5 inline-flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.24em] text-[#96794B] dark:text-[#C6AD83]">08</span>
            <span className="h-px w-8 bg-[#96794B]/50 dark:bg-[#C6AD83]/50" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#77736B] dark:text-[#A6A39D]">Dual perspective</span>
          </div>

          <h2
            id="split-story-title"
            className="split-reveal font-serif-editorial text-4xl font-normal leading-[1.05] tracking-[-0.04em] text-[#191815] dark:text-[#F3F0E9] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block"><RevealText text="BEHIND THE LENS" /></span>
            <span className="mt-1 block">
              <span className="mr-2 italic text-[#96794B] dark:text-[#C6AD83]">&</span>
              <RevealText text="IN FRONT OF IT" delay={0.12} />
            </span>
          </h2>

          <p className="split-reveal mx-auto mt-6 max-w-xl text-sm font-light leading-7 text-[#6F6A62] dark:text-[#A6A39D] sm:text-base">
            Understanding the camera from both sides changes how a story is seen, directed, and felt.
          </p>

          <div
            className="split-reveal mx-auto mt-8 inline-flex max-w-full flex-wrap items-center justify-center gap-1 rounded-full border border-black/10 bg-white/65 p-1.5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-[#151515]/85"
            role="group"
            aria-label="Choose a perspective"
          >
            {PANELS.map((panel) => {
              const Icon = panel.icon;
              const selected = active === panel.id;
              return (
                <button
                  key={panel.id}
                  type="button"
                  onClick={() => toggle(panel.id)}
                  aria-pressed={selected}
                  className={`relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.13em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C6AD83] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E9] dark:focus-visible:ring-offset-[#080808] sm:px-5 sm:text-[11px] ${
                    selected
                      ? "bg-[#C6AD83] text-[#171510] shadow-sm"
                      : "text-[#6F6A62] hover:text-[#191815] dark:text-[#A6A39D] dark:hover:text-[#F3F0E9]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{panel.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={active}
            custom={dir}
            variants={cardVariants}
            initial={reduceMotion ? false : "enter"}
            animate="center"
            exit={reduceMotion ? undefined : "exit"}
            className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-7"
          >
            <SpotlightCard className="group relative min-w-0 overflow-hidden rounded-[1.5rem] border border-black/10 bg-white/80 p-3 shadow-[0_18px_60px_rgba(32,27,18,0.06)] dark:border-white/10 dark:bg-[#121212] dark:shadow-[0_18px_60px_rgba(0,0,0,0.22)] sm:rounded-[2rem] sm:p-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem] bg-[#E8E1D5] dark:bg-[#1A1A1A] sm:aspect-[5/4] lg:aspect-[4/3]">
                <Image
                  src={activePanel.img}
                  alt={activePanel.imgAlt}
                  fill
                  priority={false}
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 sm:inset-x-6 sm:bottom-6">
                  <div>
                    <p className="mb-2 text-[9px] uppercase tracking-[0.24em] text-white/70 sm:text-[10px]">{activePanel.tag}</p>
                    <p className="font-serif-editorial text-xl leading-tight text-white sm:text-2xl md:text-3xl">{activePanel.imgCaption}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] tracking-[0.2em] text-white/75">{activePanel.num} / 02</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-4 sm:px-3 sm:pt-5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.17em] text-[#77736B] dark:text-[#A6A39D]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#96794B] dark:bg-[#C6AD83]" />
                  <span>Selected perspective</span>
                </div>
                <span className="font-mono text-[10px] text-[#96794B] dark:text-[#C6AD83]">AF / EDITORIAL</span>
              </div>
            </SpotlightCard>

            <SpotlightCard className="flex min-w-0 flex-col justify-between rounded-[1.5rem] border border-black/10 bg-white/75 p-6 shadow-[0_18px_60px_rgba(32,27,18,0.04)] dark:border-white/10 dark:bg-[#101010] dark:shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:rounded-[2rem] sm:p-8 lg:p-10">
              <div>
                <div className="mb-8 flex items-center justify-between gap-4 sm:mb-10">
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#96794B] dark:text-[#C6AD83]">
                    <ActiveIcon className="h-4 w-4" aria-hidden="true" />
                    {activePanel.tag}
                  </span>
                  <span className="font-mono text-xs text-[#77736B] dark:text-[#A6A39D]">{activePanel.num}</span>
                </div>

                <h3 className="max-w-lg font-serif-editorial text-3xl font-normal leading-[1.08] tracking-[-0.025em] text-[#191815] dark:text-[#F3F0E9] sm:text-4xl">
                  {activePanel.headline}
                </h3>

                <div className="mt-6 space-y-4 text-sm font-light leading-7 text-[#6F6A62] dark:text-[#A6A39D] sm:mt-8 sm:text-[15px]">
                  {activePanel.paras.map((paragraph, index) => (
                    <p key={`${activePanel.id}-${index}`}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="mt-10 border-t border-black/10 pt-5 dark:border-white/10 sm:mt-12 sm:pt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[#77736B] dark:text-[#A6A39D]">Focus areas</p>
                    <p className="text-[10px] uppercase leading-5 tracking-[0.14em] text-[#96794B] dark:text-[#C6AD83] sm:text-[11px]">{activePanel.footer}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <span className="font-mono text-[10px] text-[#77736B] dark:text-[#A6A39D]">{activePanel.footerRight}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-black/10 text-[#96794B] transition-colors group-hover:border-[#C6AD83]/50 dark:border-white/10 dark:text-[#C6AD83]">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </AnimatePresence>

        <p className="split-reveal mt-7 text-center text-[9px] uppercase tracking-[0.2em] text-[#8A857B] dark:text-[#77736B] sm:mt-9 sm:text-[10px]">
          One creative practice. Two ways to see the story.
        </p>
      </div>
    </section>
  );
}
