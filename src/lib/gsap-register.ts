/**
 * GSAP Registration Module
 * Single source of truth for all GSAP plugin registrations.
 * Import this once at the top level (layout or SmoothScroll).
 * Responsibility: timelines, scroll-triggered reveals, pinned sections.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger };
