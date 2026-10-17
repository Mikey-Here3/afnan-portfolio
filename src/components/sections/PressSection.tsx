"use client";

import { useRef } from "react";
import { ArrowUpRight, Newspaper, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Keep this section hidden until authentic, client-approved material is available.
// Never invent publications, testimonials, endorsements, awards, or press logos.
const SHOW_PRESS_SECTION = false;

interface PressItem {
  id: string;
  publication: string;
  headline: string;
  date: string;
  url?: string;
}

const AUTHENTIC_PRESS: PressItem[] = [];

export default function PressSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        section.querySelectorAll(".press-reveal"),
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  if (!SHOW_PRESS_SECTION || AUTHENTIC_PRESS.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="press-heading"
      className="relative isolate overflow-hidden border-t border-black/10 bg-[#f1efe9] px-5 py-20 text-[#171714] dark:border-white/10 dark:bg-[#0a0a0a] dark:text-[#f3f0e9] sm:px-8 md:px-12 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_0%,rgba(168,138,93,0.08),transparent_40%)] dark:bg-[radial-gradient(ellipse_at_10%_0%,rgba(198,173,131,0.05),transparent_40%)]"
      />
      <div className="mx-auto max-w-7xl">
        <div className="press-reveal mb-8 flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.24em] text-[#96774d] dark:text-[#c6ad83]">14</span>
          <span className="h-px w-10 bg-[#a88a5d]/55" />
          <Newspaper className="h-3.5 w-3.5 text-[#96774d] dark:text-[#c6ad83]" />
          <span className="text-[10px] uppercase tracking-[0.26em] text-black/50 dark:text-white/45">Press & features</span>
        </div>

        <div className="press-reveal mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="press-heading" className="font-serif-editorial text-4xl leading-tight tracking-[-0.035em] text-black/90 dark:text-white/90 sm:text-5xl">
            In the conversation<span className="text-[#96774d] dark:text-[#c6ad83]">.</span>
          </h2>
          <p className="max-w-sm text-sm leading-6 text-black/50 dark:text-white/45">
            Selected coverage and features, shared only when verified and approved.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {AUTHENTIC_PRESS.map((item) => (
            <article
              key={item.id}
              className="press-reveal group flex min-h-48 flex-col rounded-xl border border-black/10 bg-white/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#a88a5d]/50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-[#c6ad83]/40"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.17em] text-[#80633e] dark:text-[#c6ad83]">
                  {item.publication}
                </span>
                <Sparkles className="h-3.5 w-3.5 text-[#96774d]/65 dark:text-[#c6ad83]/65" />
              </div>
              <h3 className="mt-4 font-serif-editorial text-xl leading-snug text-black/85 transition-colors group-hover:text-[#96774d] dark:text-white/85 dark:group-hover:text-[#c6ad83]">
                {item.headline}
              </h3>
              <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40 dark:text-white/40">{item.date}</span>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read ${item.headline} at ${item.publication}`}
                    className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-black/65 transition-colors hover:text-[#96774d] dark:text-white/65 dark:hover:text-[#c6ad83]"
                  >
                    Read feature
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
