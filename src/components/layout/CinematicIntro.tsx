"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CinematicIntro() {
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setVisible(false);
      return;
    }

    const context = gsap.context(() => {
      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setVisible(false),
      });

      timelineRef.current = timeline;

      timeline
        .to(lineRef.current, {
          scaleX: 1,
          duration: 0.65,
          ease: "power2.inOut",
        })
        .fromTo(
          eyebrowRef.current,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.45 },
          0.18
        )
        .fromTo(
          titleRef.current,
          { autoAlpha: 0, y: 24, letterSpacing: "0.16em" },
          { autoAlpha: 1, y: 0, letterSpacing: "0.08em", duration: 0.7 },
          0.48
        )
        .fromTo(
          subtitleRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.4 },
          0.95
        )
        .to(
          overlay,
          {
            autoAlpha: 0,
            duration: 0.55,
            ease: "power2.inOut",
          },
          1.45
        );
    }, overlay);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      context.revert();
    };
  }, []);

  const skipIntro = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    timelineRef.current?.kill();
    timelineRef.current = null;

    gsap.to(overlay, {
      autoAlpha: 0,
      duration: 0.22,
      ease: "power2.out",
      onComplete: () => setVisible(false),
    });
  };

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cinematic-intro-title"
      className="fixed inset-0 z-[10001] flex items-center justify-center overflow-hidden bg-[#080808] text-[#F3F0E9]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,173,131,0.09),transparent_55%)]"
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <p
          ref={eyebrowRef}
          className="mb-7 text-[9px] uppercase tracking-[0.35em] text-[#C6AD83] sm:text-[10px] sm:tracking-[0.42em]"
        >
          An independent creative identity
        </p>

        <h2
          id="cinematic-intro-title"
          ref={titleRef}
          className="font-serif-editorial text-3xl font-medium uppercase leading-tight sm:text-5xl md:text-6xl"
        >
          Afnan Abbasi
        </h2>

        <p
          ref={subtitleRef}
          className="mt-4 text-[9px] uppercase tracking-[0.2em] text-[#A6A39D] sm:text-[10px] sm:tracking-[0.32em]"
        >
          Model · Photographer · Visual Creator
        </p>

        <div
          ref={lineRef}
          aria-hidden="true"
          className="mt-9 h-px w-32 bg-[#C6AD83] sm:w-44"
        />
      </div>

      <button
        type="button"
        onClick={skipIntro}
        className="absolute bottom-7 right-6 z-20 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-[#A6A39D] transition-colors hover:text-[#F3F0E9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C6AD83] sm:bottom-9 sm:right-10"
      >
        Skip intro <span aria-hidden="true">↗</span>
      </button>

      <span
        aria-hidden="true"
        className="absolute bottom-9 left-6 text-[9px] tracking-[0.2em] text-[#66635E] sm:left-10"
      >
        AA / 001
      </span>
    </div>
  );
}
