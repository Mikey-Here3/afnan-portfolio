"use client";

import Image from "next/image";
import { ArrowUpRight, Compass, SunMedium } from "lucide-react";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

const LOOKS = [
  {
    id: "hoodie",
    number: "01",
    label: "Brutalist streetwear",
    title: "The Heavy Washed Hoodie",
    description:
      "A relaxed drop-shoulder silhouette set against raw concrete. Subdued charcoal tones, strong lines, and a distinctly contemporary attitude.",
    image: "/images/editorial/streetwear-hoodie.jpg",
    alt: "Muhammad Afnan Abbasi wearing an oversized washed hoodie",
    series: "F-7 / URBAN SERIES",
    icon: Compass,
    imagePosition: "object-center",
    layout: "feature",
  },
  {
    id: "daylight",
    number: "02",
    label: "Lifestyle daylight",
    title: "Golden Hour Texture",
    description:
      "Washed cotton, an open collar, and the softness of late-afternoon light — an effortless look for lifestyle and apparel campaigns.",
    image: "/images/editorial/casual-cap-shirt.jpg",
    alt: "Muhammad Afnan Abbasi in a casual cap and shirt",
    series: "NATURAL LIGHT / 01",
    icon: SunMedium,
    imagePosition: "object-center",
    layout: "secondary",
  },
] as const;

export default function StreetwearSection() {
  const sectionRef = useScrollReveal<HTMLElement>({
    selector: ".streetwear-reveal",
    stagger: 0.08,
  });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="streetwear-heading"
      className="relative isolate overflow-hidden border-t border-black/10 bg-[#F5F1E9] px-5 py-24 text-[#191815] dark:border-white/10 dark:bg-[#0A0A0A] dark:text-[#F3F0E9] sm:px-8 sm:py-28 lg:px-12 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-8 h-80 w-80 rounded-full bg-[#C6AD83]/10 blur-3xl dark:bg-[#C6AD83]/[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-black/[0.025] blur-3xl dark:bg-white/[0.02]"
      />

      <div className="relative mx-auto max-w-7xl">
        <header className="streetwear-reveal mb-12 flex flex-col gap-6 sm:mb-16 md:flex-row md:items-end md:justify-between lg:mb-20">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.24em] text-[#96794B] dark:text-[#C6AD83]">
                04
              </span>
              <span className="h-px w-8 bg-[#96794B]/50 dark:bg-[#C6AD83]/45" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#77736B] dark:text-[#A6A39D] sm:text-[11px]">
                Streetwear & lifestyle
              </span>
            </div>

            <h2
              id="streetwear-heading"
              className="font-serif-editorial text-4xl font-normal leading-[1.03] tracking-[-0.04em] text-[#191815] dark:text-[#F3F0E9] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              RAW FORM
              <span className="block text-[#96794B] dark:text-[#C6AD83]">
                & CASUAL TEXTURE
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm font-light leading-7 text-[#6F6A62] dark:text-[#A6A39D] sm:text-base md:pb-1">
            Contemporary silhouettes shaped by Islamabad’s modern architecture,
            open space, and the warm falloff of afternoon light.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-8 lg:gap-14">
          {LOOKS.map((look, index) => {
            const Icon = look.icon;
            const isFeature = index === 0;

            return (
              <article
                key={look.id}
                className={`streetwear-reveal group min-w-0 ${
                  isFeature
                    ? "md:col-span-7"
                    : "md:col-span-5 md:pt-20 lg:pt-28"
                }`}
              >
                <div
                  className={`relative overflow-hidden rounded-[1.35rem] border border-black/10 bg-[#E8E1D5] shadow-[0_22px_60px_rgba(32,27,18,0.09)] dark:border-white/10 dark:bg-[#171717] dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)] ${
                    isFeature
                      ? "aspect-[4/5] sm:aspect-[3/4]"
                      : "aspect-[4/5] sm:aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={look.image}
                    alt={look.alt}
                    fill
                    sizes={
                      isFeature
                        ? "(max-width: 768px) 100vw, 60vw"
                        : "(max-width: 768px) 100vw, 42vw"
                    }
                    className={`object-cover ${look.imagePosition} transition-transform duration-700 ease-out group-hover:scale-[1.035]`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                  <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-[#E9D5AD] shadow-sm backdrop-blur-md sm:text-[10px]">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {look.label}
                    </span>
                  </div>

                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7">
                    <div>
                      <p className="mb-2 font-mono text-[9px] tracking-[0.2em] text-white/70 sm:text-[10px]">
                        LOOK {look.number}
                      </p>
                      <h3 className="max-w-md font-serif-editorial text-2xl font-normal leading-[1.05] text-white sm:text-3xl md:text-4xl">
                        {look.title}
                      </h3>
                    </div>
                    <span className="mb-1 hidden shrink-0 font-mono text-[9px] tracking-[0.16em] text-white/70 sm:block">
                      AF / STYLE
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-4 px-1 sm:mt-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-xl">
                    <p className="text-sm font-light leading-7 text-[#6F6A62] dark:text-[#A6A39D]">
                      {look.description}
                    </p>
                    <p className="mt-3 font-mono text-[9px] tracking-[0.18em] text-[#96794B] dark:text-[#C6AD83]">
                      {look.series}
                    </p>
                  </div>
                  {!isFeature && (
                    <a
                      href="#contact"
                      className="inline-flex w-fit shrink-0 items-center gap-2 border-b border-[#96794B]/40 pb-1 text-[10px] uppercase tracking-[0.16em] text-[#6F6A62] transition-colors hover:border-[#96794B] hover:text-[#191815] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6AD83] dark:border-[#C6AD83]/40 dark:text-[#A6A39D] dark:hover:border-[#C6AD83] dark:hover:text-[#F3F0E9]"
                    >
                      Brand inquiries
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="streetwear-reveal mt-14 flex items-center gap-4 border-t border-black/10 pt-5 dark:border-white/10 sm:mt-20 sm:pt-6">
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#96794B] dark:text-[#C6AD83]">
            AF / 04
          </span>
          <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#8A857B] dark:text-[#77736B] sm:text-[10px]">
            Personal style · Editorial storytelling
          </span>
        </div>
      </div>
    </section>
  );
}
