import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F0E9] flex flex-col items-center justify-center p-6 text-center">
      <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C6AD83] mb-4">
        Error 404 // Frame Not Found
      </span>
      <h1 className="font-serif-editorial text-4xl sm:text-6xl font-normal text-[#F3F0E9] mb-6">
        BEYOND THE COMPOSITION
      </h1>
      <p className="text-xs sm:text-sm text-[#A6A39D] max-w-md font-light leading-relaxed mb-8">
        The frame you are looking for has shifted out of focus or does not exist in this editorial archive.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F3F0E9] hover:bg-[#C6AD83] text-[#0A0A0A] text-xs uppercase tracking-[0.2em] font-medium transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Portfolio</span>
      </Link>
    </div>
  );
}
