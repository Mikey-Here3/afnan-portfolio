"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LightboxItem {
  id: string;
  title: string;
  category?: string;
  image: string;
  caption?: string;
  location?: string;
  year?: string;
}

interface LightboxModalProps {
  items: LightboxItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function LightboxModal({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxModalProps) {
  const isOpen = currentIndex !== null;
  const currentItem = isOpen ? items[currentIndex] : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A]/95 backdrop-blur-2xl p-4 md:p-8"
          onClick={onClose}
        >
          {/* Top Bar Controls */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 pointer-events-auto">
            <div className="flex items-center space-x-3">
              <span className="text-[11px] font-mono text-[#C6AD83] tracking-widest">
                {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
              <span className="text-xs text-[#A6A39D] hidden sm:inline">•</span>
              <span className="text-xs uppercase tracking-widest text-[#F3F0E9] hidden sm:inline">
                {currentItem.title}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-3 rounded-full bg-[#171717] hover:bg-[#262626] text-[#F3F0E9] hover:text-[#C6AD83] border border-[#F3F0E9]/10 transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-[#171717]/80 hover:bg-[#262626] text-[#F3F0E9] hover:text-[#C6AD83] border border-[#F3F0E9]/10 transition-colors z-20"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-[#171717]/80 hover:bg-[#262626] text-[#F3F0E9] hover:text-[#C6AD83] border border-[#F3F0E9]/10 transition-colors z-20"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <motion.div
            key={currentItem.id}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
          >
            <div className="relative w-full h-[65vh] md:h-[72vh] rounded-xl overflow-hidden border border-[#F3F0E9]/10 shadow-[0_30px_90px_rgba(0,0,0,0.9)]">
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                fill
                priority
                sizes="(max-width: 1200px) 90vw, 1000px"
                className="object-contain"
              />
            </div>

            {/* Bottom Caption */}
            <div className="mt-4 text-center max-w-xl">
              <p className="text-sm md:text-base font-serif-editorial text-[#F3F0E9] tracking-wide">
                {currentItem.title}
              </p>
              {currentItem.caption && (
                <p className="text-xs text-[#A6A39D] mt-1 font-light">
                  {currentItem.caption}
                </p>
              )}
              {currentItem.location && (
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#C6AD83] mt-1">
                  {currentItem.location} {currentItem.year ? `• ${currentItem.year}` : ""}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
