"use client";

import Image from "next/image";
import { useRef } from "react";
import { Check, ArrowUpRight, MoveUpRight, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { COLLABORATION_SERVICES } from "@/data/gallery";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERVICE_VISUALS = [
  {
    src: "/images/editorial/formal-suit.jpg",
    alt: "Formal fashion editorial portrait",
    index: "01",
    eyebrow: "In front of the lens",
  },
  {
    src: "/images/editorial/behind-lens-camera.jpg",
    alt: "Photography production and behind-the-scenes view",
    index: "02",
    eyebrow: "Behind the lens",
  },
  {
    src: "/images/editorial/streetwear-hoodie.jpg",
    alt: "Contemporary streetwear editorial",
    index: "03",
    eyebrow: "Campaigns & content",
  },
];

export default function CollaborationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        section.querySelectorAll(".collab-reveal"),
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.075,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 74%",
            once: true,
          },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>(".collab-card");
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 48, rotateX: 4, scale: 0.975 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.95,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
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
      id="services"
      className="relative isolate overflow-hidden border-t border-black/10 bg-[#F3F0E9] px-5 py-24 text-[#171717] transition-colors duration-500 dark:border-white/10 dark:bg-[#0A0A0A] dark:text-[#F3F0E9] sm:px-8 md:py-32 lg:px-12 lg:py-40"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-36 top-0 h-[28rem] w-[28rem] rounded-full bg-[#C6AD83]/15 blur-[110px] dark:bg-[#C6AD83]/[0.06]" />
        <div className="absolute -left-40 bottom-0 h-[25rem] w-[25rem] rounded-full bg-[#C6AD83]/10 blur-[110px] dark:bg-[#C6AD83]/[0.035]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(currentColor_0.6px,transparent_0.6px)] [background-size:9px_9px]" />
      </div>

      <div className="mx-auto max-w-[1440px]">
        <div className="collab-reveal mb-12 flex items-center justify-between gap-5 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#A88A5D] dark:text-[#C6AD83]">13 /</span>
            <span className="h-px w-8 bg-[#A88A5D]/60 dark:bg-[#C6AD83]/60" />
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#706D66] dark:text-[#A6A39D] sm:text-[10px]">
              Creative synergies
            </span>
          </div>
          <span className="hidden items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#706D66] dark:text-[#A6A39D] sm:flex">
            <Sparkles size={13} className="text-[#A88A5D] dark:text-[#C6AD83]" />
            Open for select projects
          </span>
        </div>

        <div className="mb-12 grid grid-cols-1 items-end gap-7 lg:mb-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <p className="collab-reveal mb-5 text-[9px] uppercase tracking-[0.28em] text-[#A88A5D] dark:text-[#C6AD83]">
              Good work begins with a good connection
            </p>
            <h2 className="font-serif-editorial text-[clamp(2.8rem,7vw,7rem)] leading-[0.88] tracking-[-0.06em]">
              <span className="collab-reveal block">Let&apos;s make</span>
              <span className="collab-reveal block pl-[8%] italic text-[#A88A5D] dark:text-[#C6AD83]">
                something matter.
              </span>
            </h2>
          </div>
          <p className="collab-reveal max-w-md pb-2 text-sm font-light leading-[1.9] text-[#706D66] dark:text-[#A6A39D] sm:text-base lg:col-span-4">
            Working with brands, photographers, designers, and creative directors to build imagery with character, intention, and a point of view.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {COLLABORATION_SERVICES.map((collab, index) => {
            const visual = SERVICE_VISUALS[index % SERVICE_VISUALS.length];

            return (
              <article
                key={collab.id}
                className="collab-card group flex min-h-full flex-col overflow-hidden border border-black/10 bg-white/35 transition-all duration-500 hover:-translate-y-1 hover:border-[#A88A5D]/45 hover:shadow-[0_24px_65px_rgba(23,23,23,0.10)] dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-[#C6AD83]/35 dark:hover:shadow-[0_24px_65px_rgba(0,0,0,0.28)]"
              >
                <div className="relative aspect-[1.6/1] overflow-hidden bg-[#E5DED2] dark:bg-[#171717]">
                  <Image
                    src={visual.src}
                    alt={visual.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-black/10" />
                  <div className="absolute left-4 top-4 flex items-center gap-2 border border-white/40 bg-black/15 px-3 py-2 backdrop-blur-md">
                    <span className="text-[8px] uppercase tracking-[0.18em] text-white">{visual.eyebrow}</span>
                  </div>
                  <span className="absolute bottom-4 right-4 font-serif-editorial text-4xl italic text-white/85">
                    {visual.index}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7 lg:p-8">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#A88A5D] dark:text-[#C6AD83]">
                      {collab.role}
                    </span>
                    <ArrowUpRight size={15} className="text-[#A88A5D] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 dark:text-[#C6AD83]" />
                  </div>

                  <h3 className="mb-4 font-serif-editorial text-2xl leading-tight tracking-[-0.025em] text-[#171717] transition-colors group-hover:text-[#A88A5D] dark:text-[#F3F0E9] dark:group-hover:text-[#C6AD83] sm:text-3xl">
                    {collab.title}
                  </h3>

                  <p className="mb-7 text-sm font-light leading-[1.85] text-[#706D66] dark:text-[#A6A39D]">
                    {collab.description}
                  </p>

                  <div className="mt-auto border-t border-black/10 pt-5 dark:border-white/10">
                    <span className="mb-4 block text-[8px] uppercase tracking-[0.22em] text-[#706D66] dark:text-[#A6A39D]">
                      Key deliverables
                    </span>
                    <ul className="space-y-3">
                      {collab.deliverables.map((deliv, idx) => (
                        <li key={`${collab.id}-${idx}`} className="flex items-start gap-2.5 text-xs leading-relaxed text-[#4F4C46] dark:text-[#C7C3BB]">
                          <Check size={14} className="mt-0.5 shrink-0 text-[#A88A5D] dark:text-[#C6AD83]" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#contact"
                    className="mt-8 inline-flex w-full items-center justify-between gap-3 border border-black/15 px-4 py-3.5 text-[9px] uppercase tracking-[0.16em] text-[#171717] transition-all duration-300 hover:border-[#A88A5D] hover:bg-[#171717] hover:text-white dark:border-white/15 dark:text-[#F3F0E9] dark:hover:border-[#C6AD83] dark:hover:bg-[#C6AD83] dark:hover:text-[#0A0A0A]"
                  >
                    <span>{collab.ctaLabel}</span>
                    <MoveUpRight size={14} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="collab-reveal mt-10 flex flex-col justify-between gap-4 border-t border-black/10 pt-5 text-[8px] uppercase tracking-[0.2em] text-[#706D66] dark:border-white/10 dark:text-[#A6A39D] sm:flex-row sm:items-center">
          <span>Independent creative collaborations</span>
          <a href="#contact" className="group inline-flex items-center gap-2 text-[#171717] transition-colors hover:text-[#A88A5D] dark:text-[#F3F0E9] dark:hover:text-[#C6AD83]">
            Have a project in mind?
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
