"use client";

import { useRef, useState } from "react";
import { SOCIAL_LINKS, LOCATION_LABEL, CONTACT_EMAIL } from "@/data/social-links";
import {
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { InstagramIcon, TikTokIcon } from "@/components/ui/Icons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const INQUIRY_CATEGORIES = [
  "Modeling",
  "Photography",
  "Videography",
  "Brand collaboration",
  "Content creation",
  "Other",
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collaborationType: "Modeling",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const instagram = SOCIAL_LINKS.find((s) => s.id === "instagram") || SOCIAL_LINKS[0];
  const tiktok = SOCIAL_LINKS.find((s) => s.id === "tiktok") || SOCIAL_LINKS[1];

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        section.querySelectorAll(".contact-reveal"),
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        }
      );

      gsap.fromTo(
        ".contact-form-panel",
        { autoAlpha: 0, y: 34, rotateX: 2 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form-panel",
            start: "top 82%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!formData.name.trim()) {
      setStatusMessage({ type: "error", text: "Please provide your name." });
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatusMessage({ type: "error", text: "Please provide a valid email address." });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatusMessage({
        type: "error",
        text: "Please provide a message with at least 10 characters.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMessage({
          type: "success",
          text: data.message || "Thank you. Your collaboration inquiry was received successfully.",
        });
        setFormData({
          name: "",
          email: "",
          collaborationType: "Modeling",
          message: "",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "Failed to submit inquiry. Please try reaching out directly on Instagram.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Network error. Please check your connection or message directly via Instagram.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative isolate overflow-hidden border-t border-black/10 bg-[#F3F0E9] px-5 py-24 text-[#171717] transition-colors duration-500 dark:border-white/10 dark:bg-[#0A0A0A] dark:text-[#F3F0E9] sm:px-8 md:py-32 lg:px-12 lg:py-40"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-[#C6AD83]/15 blur-[120px] dark:bg-[#C6AD83]/[0.06]" />
        <div className="absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#C6AD83]/10 blur-[120px] dark:bg-[#C6AD83]/[0.04]" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(currentColor_0.6px,transparent_0.6px)] [background-size:9px_9px]" />
      </div>

      <div className="mx-auto max-w-[1440px]">
        <div className="contact-reveal mb-12 flex items-center justify-between gap-5 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#A88A5D] dark:text-[#C6AD83]">15 /</span>
            <span className="h-px w-8 bg-[#A88A5D]/60 dark:bg-[#C6AD83]/60" />
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#706D66] dark:text-[#A6A39D] sm:text-[10px]">
              Direct inquiries
            </span>
          </div>
          <span className="hidden items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#706D66] dark:text-[#A6A39D] sm:flex">
            <Sparkles size={13} className="text-[#A88A5D] dark:text-[#C6AD83]" />
            Available for select projects
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-5">
            <p className="contact-reveal mb-5 text-[9px] uppercase tracking-[0.28em] text-[#A88A5D] dark:text-[#C6AD83]">
              Have an idea? Let&apos;s give it a frame.
            </p>
            <h2 className="contact-reveal mb-8 font-serif-editorial text-[clamp(2.8rem,6vw,6.2rem)] font-normal leading-[0.9] tracking-[-0.06em]">
              Let&apos;s create
              <span className="mt-2 block pl-[7%] italic text-[#A88A5D] dark:text-[#C6AD83]">
                something worth remembering.
              </span>
            </h2>

            <p className="contact-reveal mb-9 max-w-xl text-sm font-light leading-[1.9] text-[#706D66] dark:text-[#A6A39D] sm:text-base">
              Whether it&apos;s a fashion editorial, an apparel campaign, a visual content series, or a collaborative shoot, I&apos;d love to hear what you have in mind.
            </p>

            <div className="contact-reveal mb-10 space-y-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-4 border-y border-black/10 py-4 transition-colors hover:border-[#A88A5D]/50 dark:border-white/10 dark:hover:border-[#C6AD83]/40"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-black/10 text-[#A88A5D] transition-colors group-hover:bg-[#171717] group-hover:text-white dark:border-white/15 dark:text-[#C6AD83] dark:group-hover:bg-[#C6AD83] dark:group-hover:text-[#0A0A0A]">
                  <Mail size={17} strokeWidth={1.4} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[8px] uppercase tracking-[0.22em] text-[#706D66] dark:text-[#A6A39D]">Direct email</span>
                  <span className="mt-1 block break-all text-sm text-[#171717] dark:text-[#F3F0E9] sm:text-base">{CONTACT_EMAIL}</span>
                </span>
                <ArrowUpRight size={16} className="shrink-0 text-[#A88A5D] dark:text-[#C6AD83]" />
              </a>

              <div className="flex items-center gap-4 border-b border-black/10 py-4 dark:border-white/10">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-black/10 text-[#A88A5D] dark:border-white/15 dark:text-[#C6AD83]">
                  <MapPin size={17} strokeWidth={1.4} />
                </span>
                <span>
                  <span className="block text-[8px] uppercase tracking-[0.22em] text-[#706D66] dark:text-[#A6A39D]">Location & travel</span>
                  <span className="mt-1 block text-sm text-[#171717] dark:text-[#F3F0E9]">{LOCATION_LABEL} · Available for select travel</span>
                </span>
              </div>
            </div>

            <div className="contact-reveal mt-auto border-t border-black/10 pt-7 dark:border-white/10">
              <span className="mb-4 block text-[9px] uppercase tracking-[0.23em] text-[#706D66] dark:text-[#A6A39D]">
                Follow the visual diary
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-black/15 px-4 py-3 text-[9px] uppercase tracking-[0.13em] text-[#171717] transition-all hover:border-[#A88A5D] hover:bg-[#171717] hover:text-white dark:border-white/15 dark:text-[#F3F0E9] dark:hover:border-[#C6AD83] dark:hover:bg-[#C6AD83] dark:hover:text-[#0A0A0A]"
                >
                  <InstagramIcon className="h-4 w-4" />
                  Instagram <span className="normal-case tracking-normal">({instagram.handle})</span>
                  <ArrowUpRight size={13} />
                </a>
                <a
                  href={tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-black/15 px-4 py-3 text-[9px] uppercase tracking-[0.13em] text-[#171717] transition-all hover:border-[#A88A5D] hover:bg-[#171717] hover:text-white dark:border-white/15 dark:text-[#F3F0E9] dark:hover:border-[#C6AD83] dark:hover:bg-[#C6AD83] dark:hover:text-[#0A0A0A]"
                >
                  <TikTokIcon className="h-4 w-4" />
                  TikTok <span className="normal-case tracking-normal">({tiktok.handle})</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-panel relative overflow-hidden border border-black/10 bg-white/45 p-5 shadow-[0_24px_80px_rgba(23,23,23,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035] dark:shadow-[0_24px_80px_rgba(0,0,0,0.25)] sm:p-8 lg:col-span-7 lg:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#C6AD83]/10 blur-3xl" />
            <div className="relative mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-[8px] uppercase tracking-[0.25em] text-[#A88A5D] dark:text-[#C6AD83]">Project inquiry / 01</p>
                <h3 className="font-serif-editorial text-3xl tracking-[-0.035em] text-[#171717] dark:text-[#F3F0E9] sm:text-4xl">Tell me about it.</h3>
                <p className="mt-3 max-w-md text-xs leading-[1.8] text-[#706D66] dark:text-[#A6A39D]">Share a little about your project, timeline, and the kind of story you want to create.</p>
              </div>
              <span className="hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-black/10 text-[#A88A5D] dark:border-white/15 dark:text-[#C6AD83] sm:grid">
                <ArrowUpRight size={18} />
              </span>
            </div>

            <form onSubmit={handleSubmit} className="relative space-y-6">
              <fieldset>
                <legend className="mb-3 text-[9px] uppercase tracking-[0.2em] text-[#706D66] dark:text-[#A6A39D]">
                  Collaboration category <span className="text-[#A88A5D] dark:text-[#C6AD83]">*</span>
                </legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {INQUIRY_CATEGORIES.map((cat) => {
                    const selected = formData.collaborationType === cat;
                    return (
                      <button
                        type="button"
                        key={cat}
                        aria-pressed={selected}
                        onClick={() => setFormData((current) => ({ ...current, collaborationType: cat }))}
                        className={`min-h-11 border px-3 py-3 text-left text-[10px] leading-snug transition-all duration-200 ${
                          selected
                            ? "border-[#A88A5D] bg-[#A88A5D] text-white dark:border-[#C6AD83] dark:bg-[#C6AD83] dark:text-[#0A0A0A]"
                            : "border-black/10 bg-transparent text-[#4F4C46] hover:border-[#A88A5D]/60 dark:border-white/10 dark:text-[#C7C3BB] dark:hover:border-[#C6AD83]/50"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-[9px] uppercase tracking-[0.18em] text-[#706D66] dark:text-[#A6A39D]">
                    Your name / brand <span className="text-[#A88A5D] dark:text-[#C6AD83]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((current) => ({ ...current, name: e.target.value }))}
                    placeholder="Your name or brand"
                    className="w-full rounded-none border border-black/15 bg-transparent px-4 py-3.5 text-sm text-[#171717] outline-none transition-colors placeholder:text-[#99938A] focus:border-[#A88A5D] dark:border-white/15 dark:text-[#F3F0E9] dark:placeholder:text-white/30 dark:focus:border-[#C6AD83]"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-[9px] uppercase tracking-[0.18em] text-[#706D66] dark:text-[#A6A39D]">
                    Email address <span className="text-[#A88A5D] dark:text-[#C6AD83]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((current) => ({ ...current, email: e.target.value }))}
                    placeholder="you@company.com"
                    className="w-full rounded-none border border-black/15 bg-transparent px-4 py-3.5 text-sm text-[#171717] outline-none transition-colors placeholder:text-[#99938A] focus:border-[#A88A5D] dark:border-white/15 dark:text-[#F3F0E9] dark:placeholder:text-white/30 dark:focus:border-[#C6AD83]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-[9px] uppercase tracking-[0.18em] text-[#706D66] dark:text-[#A6A39D]">
                  Project details / location / scope <span className="text-[#A88A5D] dark:text-[#C6AD83]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  minLength={10}
                  value={formData.message}
                  onChange={(e) => setFormData((current) => ({ ...current, message: e.target.value }))}
                  placeholder="Tell me about the concept, dates, location, mood, or production requirements..."
                  className="w-full resize-y rounded-none border border-black/15 bg-transparent px-4 py-3.5 text-sm leading-relaxed text-[#171717] outline-none transition-colors placeholder:text-[#99938A] focus:border-[#A88A5D] dark:border-white/15 dark:text-[#F3F0E9] dark:placeholder:text-white/30 dark:focus:border-[#C6AD83]"
                />
              </div>

              {statusMessage && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`flex items-start gap-3 border p-4 text-xs leading-relaxed ${
                    statusMessage.type === "success"
                      ? "border-[#A88A5D]/40 bg-[#C6AD83]/15 text-[#4F4C46] dark:text-[#F3F0E9]"
                      : "border-red-500/30 bg-red-500/5 text-red-700 dark:text-red-300"
                  }`}
                >
                  {statusMessage.type === "success" ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A88A5D] dark:text-[#C6AD83]" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group inline-flex min-h-14 w-full items-center justify-between gap-4 bg-[#171717] px-5 py-4 text-[9px] uppercase tracking-[0.19em] text-white transition-colors hover:bg-[#A88A5D] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#F3F0E9] dark:text-[#0A0A0A] dark:hover:bg-[#C6AD83] sm:px-6"
              >
                <span className="inline-flex items-center gap-3">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "Sending inquiry..." : "Send collaboration inquiry"}
                </span>
                {!loading && <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
              </button>
              <p className="text-center text-[8px] leading-relaxed text-[#706D66] dark:text-[#A6A39D]">
                Your details are used to respond to this project inquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
