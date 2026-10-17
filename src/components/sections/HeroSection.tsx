"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, MoveDownRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONFIG } from "@/data/site";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const outlineTitleRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const portraitImageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const outlineTitle = outlineTitleRef.current;
    const portraitImage = portraitImageRef.current;
    if (!section || !title || !outlineTitle || !portraitImage) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(eyebrowRef.current, { autoAlpha: 0, y: 10, duration: 0.45 })
          .from([title, portraitImage], { autoAlpha: 0, y: 16, duration: 0.7, stagger: 0.08 }, "-=0.15")
          .from([copyRef.current, footerRef.current], { autoAlpha: 0, y: 8, duration: 0.4, stagger: 0.06 }, "-=0.2");
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const trigger = {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.65,
          invalidateOnRefresh: true,
        };

        gsap.to([title, outlineTitle], {
          scale: 1.025,
          yPercent: -2,
          ease: "none",
          scrollTrigger: trigger,
        });

        gsap.to(portraitImage, {
          scale: 1.075,
          yPercent: -1.5,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.65,
          },
        });

        gsap.to([eyebrowRef.current, copyRef.current, footerRef.current], {
          autoAlpha: 0,
          y: -6,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.65,
          },
        });

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.to(portraitImage, {
          scale: 1.035,
          ease: "none",
          scrollTrigger: {
            trigger: portraitImage,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate h-[100svh] min-h-[680px] w-full overflow-hidden bg-[#efede8] text-[#0a0a0a] max-sm:min-h-[640px]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_37%,rgba(255,255,255,0.98),transparent_62%),linear-gradient(180deg,#f3f1ec_0%,#e9e6df_100%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(rgba(0,0,0,0.8)_0.5px,transparent_0.7px)] [background-size:4px_4px]" />
        <div className="absolute left-1/2 top-[18%] h-[34vw] w-[34vw] -translate-x-1/2 rounded-full border border-black/[0.045]" />
        <div className="absolute left-1/2 top-[18%] h-[27vw] w-[27vw] -translate-x-1/2 rounded-full border border-[#a88a5d]/[0.08]" />
      </div>

      <div
        ref={eyebrowRef}
        className="absolute left-5 right-5 top-[88px] z-30 flex items-center justify-between gap-3 border-b border-black/15 pb-3 sm:left-8 sm:right-8 sm:top-[96px] lg:left-12 lg:right-12"
      >
        <div className="flex min-w-0 items-center gap-2 text-[7px] font-semibold uppercase tracking-[0.14em] sm:gap-3 sm:text-[8px] sm:tracking-[0.2em]">
          <span className="h-px w-5 shrink-0 bg-black sm:w-8" />
          <span className="shrink-0">Islamabad, Pakistan</span>
          <span className="text-black/30">•</span>
          <span className="hidden sm:inline">Model / Image-maker / Storyteller</span>
        </div>
        <span className="shrink-0 text-[7px] uppercase tracking-[0.16em] text-black/45 sm:text-[8px]">AF / 2026</span>
      </div>

      <div className="pointer-events-none absolute left-5 top-[20%] z-20 hidden text-[8px] font-semibold uppercase leading-[1.8] tracking-[0.18em] text-black/50 sm:block lg:left-12">
        <p>Presence.</p>
        <p>Form.</p>
        <p>Expression.</p>
        <span className="mt-2 block h-px w-7 bg-[#a88a5d]" />
      </div>

      {/* Condensed editorial display face: title extends across the viewport. */}
      <div className="pointer-events-none absolute inset-x-0 top-[43%] z-[2] -translate-y-1/2 overflow-visible">
        <h1
          ref={titleRef}
          id="hero-title"
          className="whitespace-nowrap text-center font-sans-clean text-[15.8vw] font-black uppercase leading-[0.78] tracking-[-0.105em] text-[#080808] sm:text-[15vw] lg:text-[clamp(7rem,14.5vw,17rem)]"
          style={{ fontStretch: "condensed", transformOrigin: "center center" }}
        >
          AFNAN ABBASI<span className="text-[#ad8d60]">.</span>
        </h1>
      </div>

      {/* Portrait sits in front of the solid title. */}
      <div
        ref={portraitRef}
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[61svh] w-[min(94vw,470px)] -translate-x-1/2 overflow-visible sm:h-[69svh] sm:w-[min(80vw,550px)] lg:h-[84svh] lg:w-[min(48vw,720px)]"
      >
        <div ref={portraitImageRef} className="absolute inset-0">
          <Image
            src="/images/editorial/hero-cutout.png"
            alt="Afnan Abbasi in a monochrome editorial portrait"
            fill
            priority
            sizes="(max-width: 639px) 94vw, (max-width: 1023px) 80vw, 48vw"
            className="object-contain object-bottom"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[8%] bg-gradient-to-t from-[#efede8]/75 to-transparent" />
      </div>

      {/* Clean outline lettering on top of the portrait: no clipped glyph fragments or arrow-like artifacts. */}
      <div className="pointer-events-none absolute inset-x-0 top-[43%] z-20 -translate-y-1/2 overflow-hidden" aria-hidden="true">
        <h2
          ref={outlineTitleRef}
          className="whitespace-nowrap text-center font-sans-clean text-[15.8vw] font-black uppercase leading-[0.78] tracking-[-0.105em] text-transparent sm:text-[15vw] lg:text-[clamp(7rem,14.5vw,17rem)]"
          style={{
            fontStretch: "condensed",
            transformOrigin: "center center",
            WebkitTextStroke: "1.25px rgba(239,237,232,0.9)",
            opacity: 0.95,
          }}
        >
          AFNAN ABBASI<span style={{ WebkitTextStroke: "1.25px rgba(173,141,96,0.95)" }}>.</span>
        </h2>
      </div>

      <div
        ref={copyRef}
        className="absolute bottom-[14%] left-5 right-5 z-30 flex flex-col gap-4 sm:bottom-[13%] sm:left-8 sm:right-8 sm:flex-row sm:items-end sm:justify-between lg:bottom-[12%] lg:left-12 lg:right-12"
      >
        <div className="max-w-[300px] border-l border-[#a88a5d]/70 pl-3 sm:max-w-[320px] sm:pl-4">
          <p className="mb-1.5 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#96774d]">Independent creative portfolio</p>
          <p className="text-[10px] leading-[1.75] text-black/70 sm:text-[11px] lg:text-xs">
            {SITE_CONFIG.heroSubtitle}
          </p>
        </div>
        <div className="hidden items-end gap-3 sm:flex">
          <span className="mb-1 h-px w-7 bg-[#a88a5d]" />
          <p className="text-right text-[7px] font-semibold uppercase leading-[1.8] tracking-[0.2em] text-black/55 lg:text-[8px]">
            Fashion / Film / Identity
          </p>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 z-30 flex items-center justify-between sm:bottom-6 sm:left-8 sm:right-8 lg:bottom-7 lg:left-12 lg:right-12">
        <p className="max-w-[68%] text-[7px] uppercase tracking-[0.14em] text-black/40 sm:text-[8px] sm:tracking-[0.2em]">
          {SITE_CONFIG.tagline}
        </p>
        <a
          href="#about"
          aria-label="Discover the About section"
          className="group flex shrink-0 items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.17em] text-black/70 transition-colors hover:text-black sm:gap-3 sm:text-[9px]"
        >
          <span>Discover</span>
          <span className="grid h-8 w-8 place-items-center rounded-full border border-black/25 transition-all duration-300 group-hover:border-black/70 group-hover:bg-black/[0.04] sm:h-9 sm:w-9">
            <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </span>
        </a>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-40 h-px bg-black/15">
        <span ref={progressRef} className="block h-full origin-left scale-x-0 bg-black/80" />
      </div>
    </section>
  );
}
