"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MARQUEE_ITEMS = [
  "MODEL",
  "PHOTOGRAPHER",
  "VIDEOGRAPHER",
  "CONTENT CREATOR",
  "VISUAL STORYTELLER",
  "ISLAMABAD",
  "KASHMIR HERITAGE",
];

const REPEAT_COUNT = 4;

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      const stopMotion = () => {
        tweenRef.current?.kill();
        tweenRef.current = null;
        gsap.set(track, { x: 0 });
      };

      const startMotion = () => {
        tweenRef.current?.kill();
        tweenRef.current = null;

        if (reduceMotion.matches) {
          gsap.set(track, { x: 0 });
          return;
        }

        // Four identical groups make one quarter of the track a seamless loop.
        tweenRef.current = gsap.to(track, {
          xPercent: -25,
          duration: 32,
          ease: "none",
          repeat: -1,
        });
      };

      startMotion();
      reduceMotion.addEventListener("change", startMotion);

      return () => {
        reduceMotion.removeEventListener("change", startMotion);
        stopMotion();
      };
    },
    { scope: sectionRef },
  );

  const pauseMarquee = () => tweenRef.current?.pause();
  const resumeMarquee = () => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tweenRef.current?.resume();
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Creative disciplines and location"
      className="relative z-10 isolate overflow-hidden border-y border-black/10 bg-[#f1efe9] text-[#171714] dark:border-white/10 dark:bg-[#10100f] dark:text-[#f2efe8]"
    >
      {/* Soft editorial light, kept subtle so the typography stays in focus. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(168,138,93,0.09),transparent_32%,transparent_68%,rgba(168,138,93,0.07))] dark:bg-[linear-gradient(105deg,rgba(198,173,131,0.07),transparent_32%,transparent_68%,rgba(198,173,131,0.04))]"
      />

      <div className="relative flex min-h-[82px] items-center sm:min-h-[96px] lg:min-h-[108px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#f1efe9] to-transparent dark:from-[#10100f] sm:w-20 lg:w-28"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#f1efe9] to-transparent dark:from-[#10100f] sm:w-20 lg:w-28"
        />

        <div
          ref={trackRef}
          className="flex w-max will-change-transform"
          onMouseEnter={pauseMarquee}
          onMouseLeave={resumeMarquee}
          onFocusCapture={pauseMarquee}
          onBlurCapture={resumeMarquee}
        >
          {Array.from({ length: REPEAT_COUNT }, (_, loopIdx) => (
            <div
              key={loopIdx}
              aria-hidden={loopIdx !== 0}
              className="flex shrink-0 items-center"
            >
              {MARQUEE_ITEMS.map((item, idx) => (
                <div
                  key={`${loopIdx}-${item}`}
                  className="group flex shrink-0 items-center gap-5 px-5 sm:gap-7 sm:px-7 lg:gap-9 lg:px-9"
                >
                  <span className="whitespace-nowrap font-serif-editorial text-[18px] uppercase tracking-[0.11em] text-black/75 transition-colors duration-300 group-hover:text-[#96774d] dark:text-white/75 dark:group-hover:text-[#c6ad83] sm:text-[22px] sm:tracking-[0.15em] lg:text-[26px]">
                    {item}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 shrink-0 rotate-45 border border-[#a88a5d]/80 transition-all duration-300 group-hover:scale-125 group-hover:bg-[#a88a5d] dark:border-[#c6ad83]/80 dark:group-hover:bg-[#c6ad83] ${
                      idx % 3 === 1 ? "rounded-full" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#a88a5d]/60 to-transparent dark:via-[#c6ad83]/60"
      />
    </section>
  );
}
