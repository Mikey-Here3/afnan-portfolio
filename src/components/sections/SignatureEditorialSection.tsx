"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SITE_CONFIG } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SignatureEditorialSection() {
  const { signatureEditorial } = SITE_CONFIG;
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const image = imageRef.current;
      const imageInner = imageInnerRef.current;
      const copy = copyRef.current;

      if (!section || !image || !imageInner || !copy) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        image,
        { clipPath: "inset(7% 0 7% 0)", autoAlpha: 0.75 },
        {
          clipPath: "inset(0% 0 0% 0)",
          autoAlpha: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        copy.children,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: copy,
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.to(imageInner, {
        yPercent: -4,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
        },
      });

      if (indexRef.current) {
        gsap.fromTo(
          indexRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="signature-editorial"
      aria-labelledby="signature-editorial-heading"
      className="relative isolate overflow-hidden border-t border-black/10 bg-[#f1efe9] px-5 py-24 text-[#171714] dark:border-white/10 dark:bg-[#0a0a0a] dark:text-[#f3f0e9] sm:px-8 md:px-12 md:py-32 lg:px-16 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 -z-10 h-[32rem] w-[32rem] rounded-full border border-[#a88a60]/10 dark:border-[#c6ad83]/[0.08]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-44 -z-10 h-[24rem] w-[24rem] rounded-full border border-black/[0.045] dark:border-white/[0.045]"
      />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-center justify-between gap-4 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.22em] text-[#96774d] dark:text-[#c6ad83]">03</span>
            <span className="h-px w-8 bg-[#a88a5d]/60" />
            <span className="text-[9px] uppercase tracking-[0.25em] text-black/50 dark:text-white/55 sm:text-[10px]">
              Signature editorial
            </span>
          </div>
          <span className="hidden text-[9px] uppercase tracking-[0.22em] text-black/35 dark:text-white/35 sm:block">
            Islamabad · 2026
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-20">
          <div className="lg:col-span-7">
            <div
              ref={imageRef}
              className="group relative aspect-[4/5] w-full overflow-hidden bg-[#d7d4cd] dark:bg-[#171717] sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/6]"
            >
              <div ref={imageInnerRef} className="absolute inset-0 will-change-transform">
                <Image
                  src="/images/editorial/formal-suit.jpg"
                  alt="Muhammad Afnan Abbasi in a formal-suit editorial portrait"
                  fill
                  sizes="(max-width: 1023px) 100vw, (max-width: 1399px) 58vw, 55vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />
              <div className="absolute inset-4 border border-white/20 sm:inset-6" />

              <div className="absolute left-6 top-6 flex items-center gap-2 sm:left-8 sm:top-8">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c6ad83]" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/85">
                  Bespoke tailoring study
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 sm:bottom-8 sm:left-8 sm:right-8">
                <div>
                  <p className="mb-2 text-[8px] uppercase tracking-[0.22em] text-white/55">Frame no. 01</p>
                  <p className="font-serif-editorial text-2xl italic text-white sm:text-3xl">Presence in stillness.</p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/35 text-white transition-all duration-300 group-hover:border-[#c6ad83] group-hover:bg-[#c6ad83] group-hover:text-black">
                  <ArrowDownRight className="h-4 w-4" />
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 text-[8px] uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
              <span>Fashion / Portraiture</span>
              <span>01 — 01</span>
            </div>
          </div>

          <div ref={copyRef} className="flex flex-col justify-center lg:col-span-5 lg:pt-[8%]">
            <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-[#96774d] dark:text-[#c6ad83]">
              {signatureEditorial.subtitle}
            </p>

            <h2
              id="signature-editorial-heading"
              className="max-w-xl font-serif-editorial text-[clamp(2.8rem,6vw,6.5rem)] font-normal leading-[0.92] tracking-[-0.045em] text-[#171714] dark:text-[#f3f0e9]"
            >
              {signatureEditorial.title}
            </h2>

            <span ref={indexRef} className="my-7 block h-px w-20 origin-left bg-[#a88a60] dark:bg-[#c6ad83]" />

            <div className="max-w-lg space-y-5 text-sm font-light leading-7 text-black/65 dark:text-white/65 sm:text-base sm:leading-8">
              <p>{signatureEditorial.caption}</p>
              <p className="text-sm leading-7 text-black/50 dark:text-white/45">
                Clothing is not merely worn; it occupies space with restraint. In front of the camera, composure and calm posture can speak louder than theatrical movement.
              </p>
            </div>

            <div className="mt-9 grid grid-cols-2 border-y border-black/15 py-5 dark:border-white/15">
              <div className="pr-4">
                <p className="mb-2 text-[8px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Aesthetic</p>
                <p className="text-sm text-black/85 dark:text-[#f3f0e9]">Architectural elegance</p>
              </div>
              <div className="border-l border-black/15 pl-5 dark:border-white/15">
                <p className="mb-2 text-[8px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Direction</p>
                <p className="text-sm text-black/85 dark:text-[#f3f0e9]">Light &amp; composition</p>
              </div>
            </div>

            <a
              href="#modeling"
              className="group mt-8 inline-flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-[#80633e] transition-colors hover:text-black dark:text-[#c6ad83] dark:hover:text-white"
            >
              <span>Explore the model book</span>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-[#a88a60]/40 transition-all duration-300 group-hover:border-[#a88a60] group-hover:bg-[#a88a60] group-hover:text-white dark:border-[#c6ad83]/40 dark:group-hover:border-[#c6ad83] dark:group-hover:bg-[#c6ad83] dark:group-hover:text-black">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
