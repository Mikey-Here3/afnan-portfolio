"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Modeling", href: "#modeling" },
  { label: "Photography", href: "#photography" },
  { label: "Contact", href: "#contact" },
] as const;

const THEME_KEY = "afnan-portfolio-theme";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

export default function Navigation() {
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let savedTheme: Theme | null = null;

    try {
      const saved = window.localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") savedTheme = saved;
    } catch {
      // Storage can be unavailable in privacy-restricted browsing modes.
    }

    // Default to light so the first visit matches the intended editorial palette.
    const initialTheme = savedTheme ?? "light";
    applyTheme(initialTheme);
    setTheme(initialTheme);

    const updateScroll = () => setScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    const sectionIds = ["work", "about", "modeling", "photography", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    let observer: IntersectionObserver | null = null;

    if ("IntersectionObserver" in window && sections.length) {
      observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) =>
                b.intersectionRatio - a.intersectionRatio
            );

          if (visibleEntries[0]) {
            setActiveSection(`#${visibleEntries[0].target.id}`);
          }
        },
        {
          rootMargin: "-25% 0px -55% 0px",
          threshold: [0, 0.15, 0.35, 0.6],
        }
      );

      sections.forEach((section) => observer?.observe(section));
    }

    return () => {
      window.removeEventListener("scroll", updateScroll);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    setTheme(nextTheme);

    try {
      window.localStorage.setItem(THEME_KEY, nextTheme);
    } catch {
      // Theme still changes for this page view if storage is unavailable.
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const scrollToSection = (href: string) => {
    closeMenu();

    if (href === "#hero") {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
      return;
    }

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  const isLight = theme === "light";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled
            ? "border-black/[0.08] bg-[#F5F1E9]/90 shadow-[0_8px_35px_rgba(35,28,18,0.06)] backdrop-blur-2xl dark:border-white/[0.09] dark:bg-[#0A0A0A]/85 dark:shadow-black/20"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[72px] w-full max-w-[1920px] items-center justify-between gap-3 px-4 sm:h-[82px] sm:px-8 lg:px-12"
        >
          <Link
            href="#hero"
            aria-label="Afnan Abbasi home"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("#hero");
            }}
            className="group flex min-w-0 shrink-0 flex-col leading-none"
          >
            <span
              className={`font-serif-editorial text-[18px] tracking-[0.09em] transition-colors duration-300 group-hover:text-[#96794B] dark:group-hover:text-[#C6AD83] sm:text-[23px] ${
                isLight
                  ? "text-[#171510]"
                  : "text-[#F3F0E9]"
              }`}
            >
              AFNAN ABBASI
            </span>
            <span
              className={`mt-1.5 text-[7px] uppercase tracking-[0.18em] sm:text-[9px] sm:tracking-[0.24em] ${
                isLight ? "text-black/60" : "text-white/60"
              }`}
            >
              Model & Visual Creator
            </span>
          </Link>

          <div
            className={`hidden items-center gap-5 rounded-full border px-5 py-2.5 backdrop-blur-xl transition-colors duration-300 md:flex lg:gap-7 lg:px-7 ${
              scrolled
                ? "border-black/10 bg-white/55 dark:border-white/10 dark:bg-white/[0.04]"
                : "border-black/10 bg-white/45 dark:border-white/20 dark:bg-black/10"
            }`}
          >
            {links.map((link, index) => {
              const active = activeSection === link.href;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(link.href);
                  }}
                  aria-current={active ? "location" : undefined}
                  className={`group relative flex items-center gap-1.5 py-1 text-[10px] uppercase tracking-[0.14em] transition-colors lg:text-[11px] ${
                    active
                      ? "text-[#96794B] dark:text-[#C6AD83]"
                      : isLight
                        ? "text-black/65 hover:text-black"
                        : "text-white/70 hover:text-white"
                  }`}
                >
                  <span className="absolute -left-2 text-[6px] tracking-normal text-[#96794B] opacity-0 transition-opacity group-hover:opacity-100 dark:text-[#C6AD83]">
                    0{index + 1}
                  </span>
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#96794B] transition-all duration-300 dark:bg-[#C6AD83] ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
              title={isLight ? "Switch to dark theme" : "Switch to light theme"}
              className={`group grid h-9 w-9 place-items-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6AD83] sm:h-10 sm:w-10 ${
                isLight
                  ? "border-black/15 bg-white/60 text-[#171510] hover:bg-white"
                  : "border-white/20 bg-white/[0.06] text-[#F3F0E9] hover:bg-white/10"
              }`}
            >
              <span className="transition-transform duration-500 group-hover:rotate-[-12deg]">
                {isLight ? (
                  <Moon size={16} strokeWidth={1.5} />
                ) : (
                  <Sun size={16} strokeWidth={1.5} />
                )}
              </span>
            </button>

            <a
              href="https://instagram.com/afnx7n"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Instagram profile"
              className={`hidden h-10 w-10 place-items-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6AD83] sm:grid ${
                isLight
                  ? "border-black/15 bg-white/60 text-[#171510] hover:bg-white"
                  : "border-white/20 bg-white/[0.06] text-[#F3F0E9] hover:bg-white/10"
              }`}
            >
              <Camera size={16} strokeWidth={1.5} />
            </a>

            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("#contact");
              }}
              className={`group hidden items-center gap-2 rounded-full border px-4 py-3 text-[10px] uppercase tracking-[0.13em] transition-all duration-300 hover:border-[#C6AD83] hover:bg-[#C6AD83] hover:text-[#171510] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6AD83] sm:inline-flex lg:px-5 ${
                isLight
                  ? "border-[#191815] bg-[#191815] text-[#F5F1E9] hover:text-[#171510]"
                  : "border-[#F3F0E9] bg-[#F3F0E9] text-[#0A0A0A] hover:text-[#171510]"
              }`}
            >
              Collaborate
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors hover:border-[#C6AD83] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6AD83] md:hidden sm:h-10 sm:w-10 ${
                isLight
                  ? "border-black/15 bg-white/60 text-[#171510]"
                  : "border-white/20 bg-white/[0.06] text-[#F3F0E9]"
              }`}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-[99] bg-[#F5F1E9] px-6 pb-10 pt-[100px] dark:bg-[#0A0A0A] sm:pt-[110px] md:hidden"
        >
          <div className="flex h-full flex-col">
            <div className="mb-6 flex items-center justify-between text-[8px] uppercase tracking-[0.24em] text-[#77736B] dark:text-[#A6A39D]">
              <span>Explore</span>
              <span>AF / 2026</span>
            </div>

            <nav aria-label="Mobile navigation" className="flex flex-col">
              {links.map((link, index) => {
                const active = activeSection === link.href;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(link.href);
                    }}
                    aria-current={active ? "location" : undefined}
                    className={`flex items-center justify-between border-b py-5 text-[clamp(1.7rem,7vw,2.4rem)] font-light tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6AD83] ${
                      active
                        ? "text-[#96794B] dark:text-[#C6AD83]"
                        : "text-[#191815] hover:text-[#96794B] dark:text-[#F3F0E9] dark:hover:text-[#C6AD83]"
                    }`}
                    style={{ borderColor: "var(--border-subtle, rgba(0,0,0,0.12))" }}
                  >
                    <span className="font-serif-editorial">{link.label}</span>
                    <span className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#96794B] dark:text-[#C6AD83]">
                      0{index + 1}
                      <ArrowDownRight size={14} />
                    </span>
                  </a>
                );
              })}
            </nav>

            <div className="mt-auto flex items-center justify-between gap-4 pt-8">
              <a
                href="https://instagram.com/afnx7n"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#77736B] dark:text-[#A6A39D]"
              >
                <Camera size={15} /> Instagram
              </a>
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("#contact");
                }}
                className="inline-flex items-center gap-2 rounded-full bg-[#191815] px-5 py-3 text-[10px] uppercase tracking-[0.14em] text-[#F5F1E9] dark:bg-[#F3F0E9] dark:text-[#0A0A0A]"
              >
                Collaborate <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
