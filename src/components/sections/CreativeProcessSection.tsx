"use client";

import { useRef } from "react";
import { CREATIVE_PROCESS_STEPS } from "@/data/gallery";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CreativeProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        section.querySelectorAll(".process-reveal"),
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 74%", once: true },
        }
      );

      gsap.fromTo(
        section.querySelectorAll(".process-step"),
        { autoAlpha: 0, y: 42, rotateX: 5, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.querySelector(".process-progress"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative isolate overflow-hidden border-t border-black/10 bg-[#F3F0E9] px-5 py-24 text-[#171717] transition-colors duration-500 dark:border-white/10 dark:bg-[#0A0A0A] dark:text-[#F3F0E9] sm:px-8 md:py-32 lg:px-12 lg:py-40"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-36 top-0 h-[28rem] w-[28rem] rounded-full bg-[#C6AD83]/15 blur-[110px] dark:bg-[#C6AD83]/[0.06]" />
        <div className="absolute -left-36 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[#C6AD83]/10 blur-[100px] dark:bg-[#C6AD83]/[0.035]" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(currentColor_0.6px,transparent_0.6px)] [background-size:9px_9px]" />
      </div>

      <div className="mx-auto max-w-[1440px]">
        <div className="process-reveal mb-12 flex items-center justify-between gap-5 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#A88A5D] dark:text-[#C6AD83]">09 /</span>
            <span className="h-px w-8 bg-[#A88A5D]/60 dark:bg-[#C6AD83]/60" />
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#706D66] dark:text-[#A6A39D] sm:text-[10px]">Creative philosophy</span>
          </div>
          <span className="hidden items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#706D66] dark:text-[#A6A39D] sm:flex">
            <Sparkles size={13} className="text-[#A88A5D] dark:text-[#C6AD83]" /> Thoughtful by design
          </span>
        </div>

        <div className="mb-12 grid grid-cols-1 items-end gap-7 lg:mb-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <p className="process-reveal mb-5 text-[9px] uppercase tracking-[0.28em] text-[#A88A5D] dark:text-[#C6AD83]">From first thought to final frame</p>
            <h2 className="font-serif-editorial text-[clamp(2.7rem,7vw,7rem)] leading-[0.88] tracking-[-0.06em]">
              <span className="process-reveal block">The editorial</span>
              <span className="process-reveal block pl-[8%] italic text-[#A88A5D] dark:text-[#C6AD83]">process.</span>
            </h2>
          </div>
          <p className="process-reveal max-w-md pb-2 text-sm font-light leading-[1.9] text-[#706D66] dark:text-[#A6A39D] sm:text-base lg:col-span-4">
            A flexible creative workflow built through observation, experimentation, and respect for natural light. Every stage leaves room for instinct while keeping the story in focus.
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-0 right-0 top-0 hidden h-px bg-black/10 dark:bg-white/10 md:block" />
          <div className="process-progress absolute left-0 right-0 top-0 hidden h-px origin-left bg-[#A88A5D] dark:bg-[#C6AD83] md:block" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 xl:gap-3">
            {CREATIVE_PROCESS_STEPS.map((step, idx) => (
              <article
                key={step.step}
                className="process-step group relative flex min-h-[270px] flex-col border border-black/10 bg-white/35 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#A88A5D]/45 hover:bg-white/65 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-[#C6AD83]/35 dark:hover:bg-white/[0.06] sm:p-6"
              >
                <div className="mb-9 flex items-start justify-between gap-3">
                  <span className="font-serif-editorial text-5xl leading-none tracking-[-0.05em] text-[#A88A5D] transition-transform duration-500 group-hover:translate-x-1 dark:text-[#C6AD83]">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-black/10 text-[#A88A5D] transition-all duration-300 group-hover:rotate-45 group-hover:border-[#A88A5D]/50 dark:border-white/10 dark:text-[#C6AD83]">
                    {idx === CREATIVE_PROCESS_STEPS.length - 1 ? <Check size={15} /> : <ArrowUpRight size={15} />}
                  </span>
                </div>

                <span className="mb-2 text-[8px] uppercase tracking-[0.2em] text-[#706D66] dark:text-[#A6A39D]">{step.tagline}</span>
                <h3 className="mb-3 font-serif-editorial text-xl leading-tight tracking-[-0.025em] text-[#171717] transition-colors group-hover:text-[#A88A5D] dark:text-[#F3F0E9] dark:group-hover:text-[#C6AD83]">
                  {step.title}
                </h3>
                <p className="text-xs font-light leading-[1.85] text-[#706D66] dark:text-[#A6A39D]">{step.description}</p>

                <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-4 mt-7 dark:border-white/10">
                  <span className="text-[8px] uppercase tracking-[0.18em] text-[#706D66] dark:text-[#A6A39D]">Phase {idx + 1}</span>
                  <span className="h-1 w-1 rounded-full bg-[#A88A5D] dark:bg-[#C6AD83]" />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="process-reveal mt-10 flex flex-col justify-between gap-4 border-t border-black/10 pt-5 text-[8px] uppercase tracking-[0.2em] text-[#706D66] dark:border-white/10 dark:text-[#A6A39D] sm:flex-row sm:items-center">
          <span>Observe · Compose · Create · Refine</span>
          <span className="inline-flex items-center gap-2"><Sparkles size={12} className="text-[#A88A5D] dark:text-[#C6AD83]" /> Stay curious. Make with intention.</span>
        </div>
      </div>
    </section>
  );
}
