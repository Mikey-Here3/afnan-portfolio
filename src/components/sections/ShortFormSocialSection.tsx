"use client";

import { useRef } from "react";
import Image from "next/image";
import { Play, ArrowUpRight, Camera, Clapperboard } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { InstagramIcon, TikTokIcon } from "@/components/ui/Icons";
import { VIDEO_REELS } from "@/data/gallery";
import { SOCIAL_LINKS } from "@/data/social-links";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ShortFormSocialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const instagram = SOCIAL_LINKS.find((s) => s.id === "instagram") || SOCIAL_LINKS[0];
  const tiktok = SOCIAL_LINKS.find((s) => s.id === "tiktok") || SOCIAL_LINKS[1];

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        section.querySelectorAll(".social-reveal"),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        section.querySelectorAll(".social-reel"),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector(".social-reel-grid"),
            start: "top 86%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="social"
      aria-labelledby="social-heading"
      className="relative isolate overflow-hidden border-t border-black/10 bg-[#f1efe9] px-5 py-24 text-[#171714] dark:border-white/10 dark:bg-[#0a0a0a] dark:text-[#f3f0e9] sm:px-8 sm:py-28 md:px-12 md:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_8%_12%,rgba(168,138,93,0.10),transparent_35%),radial-gradient(ellipse_at_92%_70%,rgba(168,138,93,0.06),transparent_36%)] dark:bg-[radial-gradient(ellipse_at_8%_12%,rgba(198,173,131,0.06),transparent_35%),radial-gradient(ellipse_at_92%_70%,rgba(198,173,131,0.035),transparent_36%)]"
      />

      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-7 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="social-reveal mb-5 flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.24em] text-[#96774d] dark:text-[#c6ad83]">10</span>
              <span className="h-px w-10 bg-[#a88a5d]/60" />
              <span className="text-[10px] uppercase tracking-[0.26em] text-black/50 dark:text-white/45">Social & short-form</span>
            </div>
            <h2
              id="social-heading"
              className="social-reveal font-serif-editorial text-4xl font-normal leading-[0.98] tracking-[-0.045em] text-[#171714] dark:text-[#f3f0e9] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              REELS &amp; TIKTOK
              <span className="block text-[#96774d] dark:text-[#c6ad83]">ARCHIVE.</span>
            </h2>
          </div>

          <div className="social-reveal max-w-md border-l border-black/15 pl-5 dark:border-white/15 sm:pl-6">
            <div className="mb-3 flex items-center gap-2 text-[#96774d] dark:text-[#c6ad83]">
              <Clapperboard className="h-4 w-4" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em]">Made for the vertical frame</span>
            </div>
            <p className="text-sm leading-7 text-black/60 dark:text-white/55">
              Short-form experiments, visual moments and platform-native stories shaped for the pace of mobile viewing.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Instagram ${instagram.handle}`}
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/40 px-4 py-2.5 text-xs text-black/75 transition-all duration-300 hover:border-[#a88a5d]/60 hover:text-[#80633e] dark:border-white/15 dark:bg-white/[0.035] dark:text-white/75 dark:hover:border-[#c6ad83]/50 dark:hover:text-[#c6ad83]"
              >
                <InstagramIcon className="h-3.5 w-3.5 text-[#96774d] dark:text-[#c6ad83]" />
                <span className="font-mono">{instagram.handle}</span>
                <ArrowUpRight className="h-3 w-3 opacity-60" />
              </a>
              <a
                href={tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit TikTok ${tiktok.handle}`}
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/40 px-4 py-2.5 text-xs text-black/75 transition-all duration-300 hover:border-[#a88a5d]/60 hover:text-[#80633e] dark:border-white/15 dark:bg-white/[0.035] dark:text-white/75 dark:hover:border-[#c6ad83]/50 dark:hover:text-[#c6ad83]"
              >
                <TikTokIcon className="h-3.5 w-3.5 text-[#96774d] dark:text-[#c6ad83]" />
                <span className="font-mono">{tiktok.handle}</span>
                <ArrowUpRight className="h-3 w-3 opacity-60" />
              </a>
            </div>
          </div>
        </div>

        <div className="social-reel-grid grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
          {VIDEO_REELS.map((reel, index) => (
            <a
              key={reel.id}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch ${reel.title} on ${reel.platform}`}
              className="social-reel group relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-black/10 bg-white/45 transition-all duration-500 hover:-translate-y-1 hover:border-[#a88a5d]/50 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-[#c6ad83]/40"
            >
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#d8d5ce] dark:bg-[#171717]">
                <Image
                  src={reel.thumbnail}
                  alt={reel.title}
                  fill
                  sizes="(max-width: 639px) 50vw, (max-width: 767px) 45vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-black/25 opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                <div className="absolute left-3 right-3 top-3 flex items-start justify-between gap-2 sm:left-4 sm:right-4 sm:top-4">
                  <span className="max-w-[72%] truncate border border-white/20 bg-black/45 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-white/90 backdrop-blur-md sm:text-[9px]">
                    {reel.platform}
                  </span>
                  {reel.duration && (
                    <span className="shrink-0 bg-black/55 px-2 py-1 font-mono text-[8px] text-white/90 backdrop-blur-sm sm:text-[9px]">
                      {reel.duration}
                    </span>
                  )}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-black/35 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-[#c6ad83] group-hover:bg-[#c6ad83] group-hover:text-black sm:h-14 sm:w-14">
                    <Play className="ml-0.5 h-4 w-4 fill-current sm:h-5 sm:w-5" />
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.17em] text-[#e1c99f] sm:text-[9px]">
                    {reel.category}
                  </span>
                  <h3 className="line-clamp-2 font-serif-editorial text-base leading-tight text-white transition-colors duration-300 group-hover:text-[#e1c99f] sm:text-xl">
                    {reel.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3 text-[9px] text-white/65">
                    <span>Watch on {reel.platform.split(" ")[0]}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#e1c99f] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
              <span className="h-[2px] w-0 bg-[#a88a5d] transition-all duration-500 group-hover:w-full dark:bg-[#c6ad83]" />
            </a>
          ))}
        </div>

        <div className="social-reveal mt-10 flex items-center justify-between border-t border-black/10 pt-5 dark:border-white/10">
          <p className="text-[9px] uppercase tracking-[0.18em] text-black/40 dark:text-white/40">Short stories / Vertical frames / Digital culture</p>
          <span className="font-mono text-[10px] text-[#96774d] dark:text-[#c6ad83]">
            {String(VIDEO_REELS.length).padStart(2, "0")} clips
          </span>
        </div>
      </div>
    </section>
  );
}
