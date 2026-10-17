"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  Aperture,
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  Film,
  Play,
  Sparkles,
  Smartphone,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CREATIVE_SKILLS, VIDEO_REELS } from "@/data/gallery";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SKILL_ICONS = [Camera, Smartphone, Film];

export default function PhotographyVideographySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        section.querySelectorAll(".photo-reveal"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.075,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        },
      );

      gsap.fromTo(
        section.querySelectorAll(".creative-image"),
        { y: 28, rotate: (index) => (index % 2 ? 4 : -4), scale: 0.94, opacity: 0 },
        {
          y: 0,
          rotate: (index) => [-5, 3, -2, 5, -3][index % 5],
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: collageRef.current, start: "top 82%", once: true },
        },
      );

      gsap.fromTo(
        section.querySelectorAll(".reel-card"),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector(".reel-grid"),
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const collageImages = VIDEO_REELS.slice(0, 5);

  return (
    <section
      ref={sectionRef}
      id="photography"
      aria-labelledby="photography-heading"
      className="relative isolate overflow-hidden border-t border-black/10 bg-[#f7f6f2] px-5 py-20 text-[#171714] dark:border-white/10 dark:bg-[#0a0a0a] dark:text-[#f3f0e9] sm:px-8 sm:py-28 md:px-12 md:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_18%_15%,rgba(205,170,111,0.16),transparent_32%),radial-gradient(ellipse_at_88%_65%,rgba(190,190,180,0.22),transparent_30%)] dark:bg-[radial-gradient(ellipse_at_18%_15%,rgba(198,173,131,0.09),transparent_32%),radial-gradient(ellipse_at_88%_65%,rgba(198,173,131,0.04),transparent_30%)]"
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <div className="relative z-10">
            <div className="photo-reveal mb-6 flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.24em] text-[#96774d] dark:text-[#c6ad83]">
                07
              </span>
              <span className="h-px w-10 bg-[#a88a5d]/60" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-black/50 dark:text-white/45">
                Behind the lens
              </span>
            </div>

            <h2
              id="photography-heading"
              className="photo-reveal max-w-2xl font-serif-editorial text-[clamp(3.25rem,7vw,6.6rem)] font-normal leading-[0.86] tracking-[-0.065em] text-[#171714] dark:text-[#f3f0e9]"
            >
              A world
              <br />
              <span className="italic text-[#9b7b4f] dark:text-[#c6ad83]">in frames.</span>
            </h2>

            <p className="photo-reveal mt-7 max-w-md text-sm leading-7 text-black/60 dark:text-white/55 sm:text-base">
              Photography, moving images, and little details that make a story feel
              alive. Every frame is a chance to turn an ordinary moment into
              something worth remembering.
            </p>

            <div className="photo-reveal mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#171714] px-5 py-3 text-xs font-medium text-white transition hover:bg-[#96774d] dark:bg-[#f3f0e9] dark:text-[#171714] dark:hover:bg-[#c6ad83]"
              >
                Let&apos;s create together
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#selected-work"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 text-xs text-black/70 transition hover:border-[#a88a5d]/60 hover:text-[#80633e] dark:border-white/15 dark:text-white/70 dark:hover:text-[#c6ad83]"
              >
                Explore the work
                <ArrowDownRight className="h-4 w-4" />
              </a>
            </div>

            <div className="photo-reveal mt-10 flex items-center gap-3 text-[#96774d] dark:text-[#c6ad83]">
              <Aperture className="h-4 w-4" />
              <span className="font-mono text-[9px] uppercase tracking-[0.22em]">
                A practiced eye · A curious mind
              </span>
            </div>
          </div>

          {/* Playful editorial image collage inspired by the supplied reference */}
          <div
            ref={collageRef}
            className="relative mx-auto w-full max-w-[680px] pb-8 pt-4 sm:pb-12 sm:pt-8"
          >
            <div className="pointer-events-none absolute left-[9%] top-[9%] h-40 w-40 rounded-full bg-[#e4d6bc]/55 blur-3xl dark:bg-[#c6ad83]/10" />
            <div className="pointer-events-none absolute bottom-[5%] right-[6%] h-44 w-44 rounded-full bg-[#c9d2c6]/55 blur-3xl dark:bg-white/[0.04]" />

            <div className="relative mx-auto h-[300px] w-full max-w-[600px] sm:h-[390px] md:h-[430px]">
              {collageImages.map((reel, index) => {
                const positions = [
                  "left-[1%] top-[24%] z-[2] w-[27%] rotate-[-10deg]",
                  "left-[19%] top-[14%] z-[3] w-[25%] rotate-[-4deg]",
                  "left-[37%] top-[9%] z-[5] w-[26%] rotate-[2deg]",
                  "left-[56%] top-[17%] z-[4] w-[25%] rotate-[8deg]",
                  "left-[73%] top-[29%] z-[2] w-[24%] rotate-[12deg]",
                ];

                return (
                  <a
                    key={reel.id}
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${reel.title} on ${reel.platform}`}
                    className={`creative-image group absolute block aspect-[3/4] overflow-hidden rounded-[9px] border-[5px] border-white bg-white shadow-[0_18px_45px_rgba(30,25,15,0.18)] transition duration-500 hover:z-20 hover:-translate-y-3 hover:rotate-0 hover:scale-[1.06] sm:border-[7px] ${positions[index]}`}
                    style={{ transformOrigin: "50% 85%" }}
                  >
                    <Image
                      src={reel.thumbnail}
                      alt={reel.title}
                      fill
                      priority={index === 2}
                      sizes="(max-width: 639px) 30vw, 180px"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/5 opacity-80 transition group-hover:opacity-50" />
                    <span className="absolute bottom-2 left-2 right-2 line-clamp-2 text-left font-mono text-[7px] uppercase tracking-[0.12em] text-white sm:bottom-3 sm:left-3 sm:right-3 sm:text-[9px]">
                      {reel.category}
                    </span>
                    <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full border border-white/50 bg-black/20 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 sm:right-3 sm:top-3 sm:h-8 sm:w-8">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="photo-reveal absolute left-[3%] top-0 z-10 -rotate-6 rounded-full border border-[#d5c4a6] bg-[#fffdf8] px-3 py-2 text-[9px] font-medium text-[#80633e] shadow-sm sm:left-[8%] sm:px-4 sm:text-[10px]">
              <Sparkles className="mr-1 inline h-3 w-3" />
              Made to be felt
            </div>
            <div className="photo-reveal absolute bottom-2 right-[2%] z-10 rotate-6 rounded-full bg-[#dce7d9] px-3 py-2 text-[9px] font-medium text-[#42634d] shadow-sm sm:right-[8%] sm:px-4 sm:text-[10px]">
              <Aperture className="mr-1 inline h-3 w-3" />
              Stories in motion
            </div>

            <div className="photo-reveal mx-auto mt-1 flex max-w-md items-center justify-center gap-3 text-center">
              <span className="h-px flex-1 bg-black/15 dark:bg-white/15" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-black/45 dark:text-white/40">
                Scroll to explore the craft
              </span>
              <span className="h-px flex-1 bg-black/15 dark:bg-white/15" />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:mt-24 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {CREATIVE_SKILLS.map((skill, idx) => {
            const SkillIcon = SKILL_ICONS[idx % SKILL_ICONS.length];

            return (
              <article
                key={skill.tag ?? skill.title}
                className="photo-reveal group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-black/[0.09] bg-white/65 p-6 transition duration-500 hover:-translate-y-1 hover:border-[#a88a5d]/45 hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-[#c6ad83]/35 dark:hover:bg-white/[0.055] sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border border-[#a88a5d]/15 transition-transform duration-700 group-hover:scale-125 dark:border-[#c6ad83]/10"
                />
                <div>
                  <div className="mb-7 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[#a88a5d]/25 bg-[#a88a5d]/[0.08] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.17em] text-[#80633e] dark:border-[#c6ad83]/20 dark:bg-[#c6ad83]/[0.08] dark:text-[#c6ad83]">
                      {skill.tag}
                    </span>
                    <span className="font-mono text-[10px] text-black/35 dark:text-white/35">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mb-3 flex items-start gap-3">
                    <SkillIcon className="mt-1 h-4 w-4 shrink-0 text-[#96774d] transition-transform duration-300 group-hover:rotate-[-8deg] dark:text-[#c6ad83]" />
                    <h3 className="font-serif-editorial text-2xl leading-tight text-black/85 transition-colors group-hover:text-[#96774d] dark:text-white/90 dark:group-hover:text-[#c6ad83]">
                      {skill.title}
                    </h3>
                  </div>
                  <p className="max-w-sm pl-7 text-sm font-light leading-6 text-black/55 dark:text-white/50">
                    {skill.description}
                  </p>
                </div>
                <div className="mt-7 flex items-center gap-2 border-t border-black/10 pt-4 text-black/45 dark:border-white/10 dark:text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a88a5d] dark:bg-[#c6ad83]" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.17em]">
                    Active practice
                  </span>
                  <Sparkles className="ml-auto h-3.5 w-3.5 text-[#96774d]/65 dark:text-[#c6ad83]/65" />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-20 border-t border-black/15 pt-12 dark:border-white/15 md:mt-24 md:pt-16">
          <div className="photo-reveal mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-6 bg-[#a88a5d] dark:bg-[#c6ad83]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#96774d] dark:text-[#c6ad83]">
                  Motion studies
                </span>
              </div>
              <h3 className="font-serif-editorial text-3xl leading-tight tracking-[-0.025em] text-black/90 dark:text-white/90 sm:text-4xl">
                Vertical video
                <span className="text-black/35 dark:text-white/35"> &amp; mood sequences</span>
              </h3>
            </div>
            <p className="max-w-xs text-sm leading-6 text-black/50 dark:text-white/45">
              Platform-native 9:16 captures, composed for mobile-first storytelling.
            </p>
          </div>

          <div className="reel-grid grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
            {VIDEO_REELS.map((reel) => (
              <a
                key={reel.id}
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch ${reel.title} on ${reel.platform}`}
                className="reel-card group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/55 transition duration-500 hover:-translate-y-1 hover:border-[#a88a5d]/50 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-[#c6ad83]/40"
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#d8d5ce] dark:bg-[#171717]">
                  <Image
                    src={reel.thumbnail}
                    alt={reel.title}
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 767px) 45vw, (max-width: 1023px) 25vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-black/25 opacity-75 transition-opacity duration-500 group-hover:opacity-90" />
                  <div className="absolute left-3 right-3 top-3 flex items-start justify-between gap-2 sm:left-4 sm:right-4 sm:top-4">
                    <span className="max-w-[70%] truncate border border-white/20 bg-black/45 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-white/90 backdrop-blur-md sm:text-[9px]">
                      {reel.platform}
                    </span>
                    {reel.duration && (
                      <span className="shrink-0 bg-black/55 px-2 py-1 font-mono text-[8px] text-white/90 backdrop-blur-sm sm:text-[9px]">
                        {reel.duration}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-black/35 text-white backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:border-[#c6ad83] group-hover:bg-[#c6ad83] group-hover:text-black sm:h-14 sm:w-14">
                      <Play className="ml-0.5 h-4 w-4 fill-current sm:h-5 sm:w-5" />
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.17em] text-[#e1c99f] sm:text-[9px]">
                      {reel.category}
                    </span>
                    <h4 className="line-clamp-2 font-serif-editorial text-base leading-tight text-white transition-colors group-hover:text-[#e1c99f] sm:text-xl">
                      {reel.title}
                    </h4>
                    <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3 text-[9px] text-white/60">
                      <span>Watch on {reel.platform.split(" ")[0]}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#e1c99f] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
                <span className="h-[2px] w-0 bg-[#a88a5d] transition-all duration-500 group-hover:w-full dark:bg-[#c6ad83]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
