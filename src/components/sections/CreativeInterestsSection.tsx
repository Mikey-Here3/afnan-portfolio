"use client";

import { useRef } from "react";
import Image from "next/image";
import { Gamepad2, Shirt, Camera, Film, Sparkles, Globe, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CREATIVE_INTERESTS } from "@/data/gallery";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Gamepad2,
  Shirt,
  Camera,
  Film,
  Sparkles,
  Globe,
};

const VISUALS = [
  {
    kicker: "Digital worlds",
    className: "interest-visual-gaming",
    image: "/images/editorial/monochrome-jersey-22.jpg",
  },
  {
    kicker: "Personal style",
    className: "interest-visual-fashion",
    image: "/images/editorial/streetwear-hoodie.jpg",
  },
  {
    kicker: "Behind the lens",
    className: "interest-visual-camera",
    image: "/images/editorial/behind-lens-camera.jpg",
  },
  {
    kicker: "Moving image",
    className: "interest-visual-film",
    image: "/images/editorial/formal-suit1.jpg",
  },
  {
    kicker: "Visual curiosity",
    className: "interest-visual-creative",
    image: "/images/editorial/casual-cap-shirt.jpg",
  },
];

export default function CreativeInterestsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        section.querySelectorAll(".interest-reveal"),
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        }
      );

      gsap.fromTo(
        section.querySelectorAll(".interest-card"),
        { autoAlpha: 0, y: 40, rotateX: 5, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 82%", once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="interests"
      className="relative isolate overflow-hidden border-t border-black/10 bg-[#F3F0E9] px-5 py-24 text-[#171717] transition-colors duration-500 dark:border-white/10 dark:bg-[#080808] dark:text-[#F3F0E9] sm:px-8 md:py-32 lg:px-12 lg:py-40"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-36 top-0 h-[26rem] w-[26rem] rounded-full bg-[#C6AD83]/15 blur-[110px] dark:bg-[#C6AD83]/[0.06]" />
        <div className="absolute -left-36 bottom-0 h-[22rem] w-[22rem] rounded-full bg-[#C6AD83]/10 blur-[100px] dark:bg-[#C6AD83]/[0.035]" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(currentColor_0.6px,transparent_0.6px)] [background-size:9px_9px]" />
      </div>

      <style jsx>{`
        .interest-card {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        .interest-card:hover .interest-image {
          transform: scale(1.07);
        }
        .interest-image {
          transition: transform 900ms cubic-bezier(.2,.7,.2,1);
        }
        .interest-card:hover .interest-icon {
          transform: translateY(-3px) rotate(-5deg);
        }
        .interest-icon {
          transition: transform 350ms ease;
        }
      `}</style>

      <div className="mx-auto max-w-[1440px]">
        <div className="interest-reveal mb-12 flex items-center justify-between gap-5 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#A88A5D] dark:text-[#C6AD83]">11 /</span>
            <span className="h-px w-8 bg-[#A88A5D]/60 dark:bg-[#C6AD83]/60" />
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#706D66] dark:text-[#A6A39D] sm:text-[10px]">Personal spectrum</span>
          </div>
          <span className="hidden text-[9px] uppercase tracking-[0.2em] text-[#706D66] dark:text-[#A6A39D] sm:block">Interests become influence</span>
        </div>

        <div className="mb-12 grid grid-cols-1 items-end gap-7 lg:mb-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <p className="interest-reveal mb-5 text-[9px] uppercase tracking-[0.28em] text-[#A88A5D] dark:text-[#C6AD83]">Outside the frame</p>
            <h2 className="font-serif-editorial text-[clamp(2.7rem,7vw,7rem)] leading-[0.88] tracking-[-0.06em]">
              <span className="interest-reveal block">Interests &</span>
              <span className="interest-reveal block pl-[8%] italic text-[#A88A5D] dark:text-[#C6AD83]">influences.</span>
            </h2>
          </div>
          <p className="interest-reveal max-w-md pb-2 text-sm font-light leading-[1.9] text-[#706D66] dark:text-[#A6A39D] sm:text-base lg:col-span-4">
            The creative ecosystem shaping my eye — from digital worlds and personal style to the craft of capturing a moment and turning it into a story.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5 xl:gap-4">
          {CREATIVE_INTERESTS.map((interest, index) => {
            const Icon = ICON_MAP[interest.icon] || Globe;
            const visual = VISUALS[index % VISUALS.length];

            return (
              <article
                key={interest.id}
                className="interest-card group flex min-h-full flex-col overflow-hidden border border-black/10 bg-white/40 transition-all duration-500 hover:-translate-y-1 hover:border-[#A88A5D]/45 hover:shadow-[0_24px_65px_rgba(23,23,23,0.11)] dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-[#C6AD83]/35 dark:hover:shadow-[0_24px_65px_rgba(0,0,0,0.3)]"
              >
                <div className="relative aspect-[1.08/1] overflow-hidden bg-[#E7E1D7] dark:bg-[#171717]">
                  <div className="interest-image absolute inset-0">
                    <Image
                      src={visual.image}
                      alt={visual.kicker}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10" />
                  <span className="absolute left-3 top-3 border border-white/40 bg-black/15 px-2.5 py-1.5 text-[7px] uppercase tracking-[0.16em] text-white backdrop-blur-md">{visual.kicker}</span>
                  <span className="absolute bottom-3 right-3 font-serif-editorial text-3xl italic text-white/85">0{index + 1}</span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <span className="interest-icon grid h-10 w-10 place-items-center border border-black/10 text-[#A88A5D] dark:border-white/10 dark:text-[#C6AD83]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="mt-1 text-[8px] uppercase tracking-[0.14em] text-[#706D66] dark:text-[#A6A39D]">{interest.category}</span>
                  </div>
                  <h3 className="mb-3 font-serif-editorial text-xl leading-tight tracking-[-0.025em] text-[#171717] transition-colors group-hover:text-[#A88A5D] dark:text-[#F3F0E9] dark:group-hover:text-[#C6AD83]">{interest.title}</h3>
                  <p className="text-xs font-light leading-[1.85] text-[#706D66] dark:text-[#A6A39D]">{interest.description}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-4 mt-6 dark:border-white/10">
                    <span className="text-[8px] uppercase tracking-[0.16em] text-[#A88A5D] dark:text-[#C6AD83]">Influencing craft</span>
                    <ArrowUpRight size={14} className="text-[#A88A5D] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-[#C6AD83]" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
