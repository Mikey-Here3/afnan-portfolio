"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { InstagramIcon, TikTokIcon } from "@/components/ui/Icons";
import {
  SOCIAL_LINKS,
  CONTACT_EMAIL,
  LOCATION_LABEL,
} from "@/data/social-links";
import { SITE_CONFIG } from "@/data/site";

const footerLinks = [
  { href: "#work", label: "Visual work" },
  { href: "#about", label: "About Afnan" },
  { href: "#modeling", label: "Model book" },
  { href: "#photography", label: "Photography" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const instagram =
    SOCIAL_LINKS.find((social) => social.id === "instagram") ?? SOCIAL_LINKS[0];
  const tiktok =
    SOCIAL_LINKS.find((social) => social.id === "tiktok") ?? SOCIAL_LINKS[1];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-[#F5F1E9] px-5 py-14 text-[#191815] dark:border-white/10 dark:bg-[#050505] dark:text-[#F3F0E9] sm:px-8 sm:py-16 lg:px-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C6AD83]/10 blur-3xl dark:bg-[#C6AD83]/[0.06]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 border-b border-black/10 pb-12 dark:border-white/10 md:grid-cols-12 md:gap-10 md:pb-16">
          <div className="flex flex-col justify-between md:col-span-6">
            <div>
              <a
                href="#hero"
                className="inline-block font-serif-editorial text-3xl font-medium tracking-[0.12em] text-[#191815] transition-colors hover:text-[#96794B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6AD83] dark:text-[#F3F0E9] dark:hover:text-[#C6AD83] sm:text-4xl"
              >
                AFNAN ABBASI
              </a>
              <p className="mb-4 mt-4 text-[10px] uppercase tracking-[0.25em] text-[#96794B] dark:text-[#C6AD83]">
                {SITE_CONFIG.positioning}
              </p>
              <p className="max-w-sm text-sm font-light leading-7 text-[#6F6A62] dark:text-[#A6A39D]">
                {SITE_CONFIG.tagline}
              </p>
            </div>

            <p className="mt-8 text-xs text-[#77736B] dark:text-[#737373]">
              Based in {LOCATION_LABEL}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="md:col-span-3">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#96794B] dark:text-[#C6AD83]">
              Sections
            </p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[11px] uppercase tracking-[0.16em] text-[#6F6A62] transition-colors hover:text-[#191815] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6AD83] dark:text-[#A6A39D] dark:hover:text-[#F3F0E9]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col justify-between gap-10 md:col-span-3">
            <div>
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#96794B] dark:text-[#C6AD83]">
                Connect
              </p>
              <ul className="space-y-4 text-xs text-[#6F6A62] dark:text-[#A6A39D]">
                {instagram && (
                  <li>
                    <a
                      href={instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex max-w-full items-center gap-2 transition-colors hover:text-[#96794B] dark:hover:text-[#C6AD83]"
                    >
                      <InstagramIcon className="h-4 w-4 shrink-0" />
                      <span>Instagram {instagram.handle}</span>
                    </a>
                  </li>
                )}
                {tiktok && (
                  <li>
                    <a
                      href={tiktok.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex max-w-full items-center gap-2 transition-colors hover:text-[#96794B] dark:hover:text-[#C6AD83]"
                    >
                      <TikTokIcon className="h-4 w-4 shrink-0" />
                      <span>TikTok {tiktok.handle}</span>
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex max-w-full items-center gap-2 transition-colors hover:text-[#96794B] dark:hover:text-[#C6AD83]"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="break-all">{CONTACT_EMAIL}</span>
                  </a>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#6F6A62] transition-colors hover:text-[#191815] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6AD83] dark:text-[#A6A39D] dark:hover:text-[#F3F0E9]"
            >
              Back to top
              <span className="grid h-10 w-10 place-items-center rounded-full border border-black/10 transition-colors group-hover:border-[#C6AD83] group-hover:bg-[#C6AD83] group-hover:text-[#171510] dark:border-white/10">
                <ArrowUp className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 font-mono text-[9px] tracking-[0.08em] text-[#77736B] dark:text-[#737373] sm:flex-row sm:items-center sm:justify-between sm:text-[10px]">
          <span>
            © {year} {SITE_CONFIG.name}. All editorial rights reserved.
          </span>
          <span>Crafted with Next.js · Lenis · GSAP</span>
        </div>
      </div>
    </footer>
  );
}
