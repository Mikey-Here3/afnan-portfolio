"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isImageHover, setIsImageHover] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorX = useSpring(mouseX, { damping: 28, stiffness: 350, mass: 0.5 });
  const cursorY = useSpring(mouseY, { damping: 28, stiffness: 350, mass: 0.5 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    setEnabled(true);

    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);

      const target = event.target instanceof Element ? event.target : null;
      setIsPointer(
        !!target?.closest(
          "a, button, input, textarea, select, summary, [role='button'], [tabindex]:not([tabindex='-1'])"
        )
      );
      setIsImageHover(!!target?.closest("img, [data-cursor-image]"));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY]);

  if (!enabled || !visible) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99999] grid place-items-center rounded-full mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isImageHover ? 76 : isPointer ? 46 : 26,
          height: isImageHover ? 76 : isPointer ? 46 : 26,
          backgroundColor: isImageHover
            ? "rgba(198,173,131,0.22)"
            : isPointer
              ? "rgba(243,240,233,0.14)"
              : "transparent",
          border: isImageHover
            ? "1px solid rgba(198,173,131,0.75)"
            : "1px solid rgba(243,240,233,0.45)",
        }}
        transition={{ duration: 0.16, ease: "easeOut" }}
      >
        {isImageHover && (
          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.18em] text-[#F3F0E9]">
            View
          </span>
        )}
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99999] h-1.5 w-1.5 rounded-full bg-[#C6AD83]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: isPointer ? 0 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
