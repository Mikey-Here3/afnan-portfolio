"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowDownRight, ArrowUpRight, Camera, Contrast } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
import { SITE_CONFIG } from "@/data/site";

export default function MonochromeSection() {
  const { monochromeStory } = SITE_CONFIG;
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const image = imageRef.current;
      if (!section || !image) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      gsap.fromTo(
        section.querySelectorAll(".mono-reveal"),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        image,
        { clipPath: "inset(7% 5% 7% 5%)", scale: 1.035 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: image,
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.to(image.querySelector("img"), {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="monochrome"
      aria-labelledby="monochrome-heading"
      className="relative isolate overflow-hidden border-t border-black/10 bg-[#f1efe9] px-5 py-24 text-[#171714] dark:border-white/10 dark:bg-[#080808] dark:text-[#f3f0e9] sm:px-8 sm:py-28 md:px-12 md:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_82%_40%,rgba(168,138,93,0.10),transparent_38%)] dark:bg-[radial-gradient(ellipse_at_82%_40%,rgba(198,173,131,0.07),transparent_38%)]"
      />

      <div className="mx-auto max-w-7xl">
        <div className="mono-reveal mb-10 flex items-center gap-3 md:mb-14">
          <span className="font-mono text-[10px] tracking-[0.24em] text-[#96774d] dark:text-[#c6ad83]">05</span>
          <span className="h-px w-10 bg-[#a88a5d]/55" />
          <span className="text-[10px] uppercase tracking-[0.26em] text-black/50 dark:text-white/45">Monochrome stories</span>
          <span className="ml-auto hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-black/40 dark:text-white/35 sm:flex">
            <Contrast className="h-3.5 w-3.5" /> A study in contrast
          </span>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-5">
            <p className="mono-reveal mb-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[#96774d] dark:text-[#c6ad83]">
              <Camera className="h-3.5 w-3.5" />
              Jersey No. 22 <span className="text-black/30 dark:text-white/25">/</span> High-contrast study
            </p>

            <h2
              id="monochrome-heading"
              className="mono-reveal mb-7 max-w-xl font-serif-editorial text-5xl font-normal leading-[0.98] tracking-[-0.045em] text-[#171714] dark:text-[#f3f0e9] sm:text-6xl lg:text-7xl"
            >
              {monochromeStory.title}
              <span className="mt-3 block font-sans-clean text-[10px] font-medium uppercase tracking-[0.25em] text-black/45 dark:text-white/40 sm:text-xs">
                Light disappears. Character remains.
              </span>
            </h2>

            <p className="mono-reveal mb-5 max-w-lg text-base font-light leading-8 text-black/65 dark:text-white/65">
              {monochromeStory.caption}
            </p>

            <p className="mono-reveal mb-9 max-w-lg text-sm font-light leading-7 text-black/50 dark:text-white/45">
              When chromatic distractions fall away, the frame focuses on texture — the mesh of the jersey, the tension in the shoulders, and the clarity of the eyes.
            </p>

            <div className="mono-reveal grid grid-cols-3 gap-3 border-t border-black/15 pt-5 font-mono text-[10px] dark:border-white/15 sm:gap-5 sm:pt-6">
              <div>
                <span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-black/40 dark:text-white/35">Tone</span>
                <span className="block leading-5 text-black/80 dark:text-white/80">Deep Obsidian</span>
              </div>
              <div>
                <span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-black/40 dark:text-white/35">Medium</span>
                <span className="block leading-5 text-black/80 dark:text-white/80">Monochrome study</span>
              </div>
              <div>
                <span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-black/40 dark:text-white/35">Subject</span>
                <span className="block leading-5 text-black/80 dark:text-white/80">Jersey No. 22</span>
              </div>
            </div>

            <a
              href="#modeling"
              className="mono-reveal group mt-8 inline-flex w-fit items-center gap-3 border-b border-[#a88a5d]/50 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-black/75 transition-colors hover:text-[#96774d] dark:text-white/75 dark:hover:text-[#c6ad83]"
            >
              Explore the model book
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="group relative mx-auto w-full max-w-3xl lg:ml-auto">
              <div className="absolute -inset-3 border border-black/10 dark:border-white/10 sm:-inset-4" />
              <div
                ref={imageRef}
                className="relative aspect-[4/5] w-full overflow-hidden bg-[#d7d4cd] dark:bg-[#171717] sm:aspect-[5/5] lg:aspect-[4/5]"
              >
                <Image
                  src="/images/editorial/monochrome-jersey-22.jpg"
                  alt="Muhammad Afnan Abbasi in a number 22 jersey, photographed in monochrome"
                  fill
                  priority={false}
                  sizes="(max-width: 1023px) 100vw, 58vw"
                  className="object-cover object-center grayscale contrast-125 transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10 opacity-70 transition-opacity duration-500 group-hover:opacity-50" />
                <div className="absolute right-4 top-4 flex items-center gap-2 border border-white/25 bg-black/45 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-md sm:right-6 sm:top-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c6ad83]" />
                  Frame / #22
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
                  <div>
                    <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/65">Visual archive / 05</p>
                    <p className="font-serif-editorial text-2xl text-white sm:text-3xl">Beyond the colour</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/35 text-white transition-all duration-300 group-hover:border-[#c6ad83] group-hover:bg-[#c6ad83] group-hover:text-black">
                    <ArrowDownRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
