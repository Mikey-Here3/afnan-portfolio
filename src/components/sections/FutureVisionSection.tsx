"use client";

import { Suspense, lazy, useRef } from "react";
import { SITE_CONFIG } from "@/data/site";
import { Compass, Sparkles, TrendingUp, Layers, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const FloatingOrb = lazy(() => import("@/components/canvas/FloatingOrb"));

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MILESTONES = [
  {
    icon: Layers,
    title: "Fashion editorial campaigns",
    desc: "Collaborating with apparel brands to create considered, expressive campaign imagery.",
    num: "01",
    label: "Image-making",
  },
  {
    icon: Sparkles,
    title: "Filmmaker collaborations",
    desc: "Growing from short-form storytelling into music videos and cinematic short pieces.",
    num: "02",
    label: "Moving image",
  },
  {
    icon: TrendingUp,
    title: "A recognizable visual identity",
    desc: "Developing a consistent visual language shaped by restraint, atmosphere, and character.",
    num: "03",
    label: "Long-term vision",
  },
];

export default function FutureVisionSection() {
  const { futureVision } = SITE_CONFIG;
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        section.querySelectorAll(".vision-reveal"),
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.075,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 74%", once: true },
        }
      );

      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          y: -36,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      gsap.fromTo(
        section.querySelectorAll(".vision-card"),
        { autoAlpha: 0, x: 34, rotateY: -4 },
        {
          autoAlpha: 1,
          x: 0,
          rotateY: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: milestonesRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="future-vision"
      className="relative isolate overflow-hidden border-t border-black/10 bg-[#F3F0E9] px-5 py-24 text-[#171717] transition-colors duration-500 dark:border-white/10 dark:bg-[#0A0A0A] dark:text-[#F3F0E9] sm:px-8 md:py-32 lg:px-12 lg:py-40"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-36 -top-20 h-[32rem] w-[32rem] rounded-full bg-[#C6AD83]/15 blur-[120px] dark:bg-[#C6AD83]/[0.07]" />
        <div className="absolute -left-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-[#C6AD83]/10 blur-[110px] dark:bg-[#C6AD83]/[0.04]" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(currentColor_0.6px,transparent_0.6px)] [background-size:9px_9px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="vision-reveal mb-12 flex items-center justify-between gap-5 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#A88A5D] dark:text-[#C6AD83]">12 /</span>
            <span className="h-px w-8 bg-[#A88A5D]/60 dark:bg-[#C6AD83]/60" />
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#706D66] dark:text-[#A6A39D] sm:text-[10px]">
              Trajectory &amp; aspiration
            </span>
          </div>
          <span className="hidden items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#706D66] dark:text-[#A6A39D] sm:flex">
            <Compass size={13} className="text-[#A88A5D] dark:text-[#C6AD83]" />
            Looking beyond the frame
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <div ref={headlineRef} className="relative lg:col-span-7">
            <div className="vision-reveal mb-5 flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-[#A88A5D] dark:text-[#C6AD83]">
              <Sparkles size={13} /> A direction, not a destination
            </div>
            <h2 className="font-serif-editorial text-[clamp(2.8rem,7.5vw,7.4rem)] leading-[0.86] tracking-[-0.065em]">
              <span className="vision-reveal block">The frame</span>
              <span className="vision-reveal block pl-[8%] italic text-[#A88A5D] dark:text-[#C6AD83]">is only the</span>
              <span className="vision-reveal block">beginning.</span>
            </h2>

            <div className="vision-reveal relative mt-9 max-w-xl border-l border-[#A88A5D]/50 py-1 pl-5 dark:border-[#C6AD83]/40 sm:pl-7">
              <p className="text-sm font-light leading-[1.95] text-[#706D66] dark:text-[#A6A39D] sm:text-base">
                {futureVision.body}
              </p>
            </div>

            <p className="vision-reveal mt-6 max-w-lg text-xs font-light leading-[1.9] text-[#706D66]/90 dark:text-[#A6A39D]/90 sm:text-sm">
              A practice built through curiosity, consistency, and care for the people behind every project — allowing the work to grow without losing its point of view.
            </p>

            <div className="vision-reveal mt-8 flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-[#706D66] dark:text-[#A6A39D]">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-black/15 dark:border-white/15">
                <ArrowUpRight size={15} />
              </span>
              Keep exploring. Keep evolving.
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div aria-hidden="true" className="pointer-events-none absolute -right-5 -top-10 z-0 h-44 w-44 opacity-70 sm:-right-8 sm:-top-12 sm:h-56 sm:w-56">
              <Suspense fallback={null}>
                <FloatingOrb className="h-full w-full" />
              </Suspense>
            </div>

            <div ref={milestonesRef} className="relative z-10 space-y-4 pt-6 sm:pt-10">
              {MILESTONES.map((milestone) => {
                const Icon = milestone.icon;
                return (
                  <article
                    key={milestone.num}
                    className="vision-card group border border-black/10 bg-white/40 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#A88A5D]/45 hover:bg-white/65 hover:shadow-[0_22px_55px_rgba(23,23,23,0.08)] dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-[#C6AD83]/35 dark:hover:bg-white/[0.06] dark:hover:shadow-[0_22px_55px_rgba(0,0,0,0.25)] sm:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center border border-black/10 text-[#A88A5D] transition-all duration-300 group-hover:rotate-[-5deg] group-hover:border-[#A88A5D]/45 dark:border-white/10 dark:text-[#C6AD83]">
                        <Icon size={20} strokeWidth={1.35} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="text-[8px] uppercase tracking-[0.2em] text-[#A88A5D] dark:text-[#C6AD83]">{milestone.label}</span>
                          <span className="font-mono text-[9px] text-[#706D66] dark:text-[#A6A39D]">{milestone.num}</span>
                        </div>
                        <h3 className="mb-2 font-serif-editorial text-xl leading-tight tracking-[-0.02em] text-[#171717] transition-colors group-hover:text-[#A88A5D] dark:text-[#F3F0E9] dark:group-hover:text-[#C6AD83] sm:text-2xl">
                          {milestone.title}
                        </h3>
                        <p className="text-xs font-light leading-[1.85] text-[#706D66] dark:text-[#A6A39D]">{milestone.desc}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="vision-reveal relative z-10 mt-5 flex items-center justify-between border-t border-black/10 pt-4 text-[8px] uppercase tracking-[0.18em] text-[#706D66] dark:border-white/10 dark:text-[#A6A39D]">
              <span>Long view / 2026 onward</span>
              <span>Built one frame at a time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
