"use client";

import Image from "next/image";
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { ArrowDownRight, ArrowUpRight, Compass, Eye, Sparkles, SlidersHorizontal } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SITE_CONFIG } from "@/data/site";
import { TiltCard, AnimatedCounter } from "@/components/motion/ReactBits";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TRAIT_ICONS = [SlidersHorizontal, Sparkles, Eye, Compass];

const GALLERY = [
  {
    src: "/images/editorial/about-portrait.jpg",
    alt: "Editorial portrait of Afnan",
    title: "The portrait",
    meta: "PERSONAL STUDY / 01",
  },
  {
    src: "/images/editorial/behind-lens-camera.jpg",
    alt: "A behind-the-scenes photography moment",
    title: "Behind the lens",
    meta: "PROCESS / 02",
  },
  {
    src: "/images/editorial/formal-suit.jpg",
    alt: "Formal fashion editorial",
    title: "Quiet confidence",
    meta: "FASHION / 03",
  },
  {
    src: "/images/editorial/streetwear-hoodie.jpg",
    alt: "Streetwear fashion portrait",
    title: "Street expression",
    meta: "STYLE / 04",
  },
  {
    src: "/images/editorial/casual-cap-shirt.jpg",
    alt: "Casual fashion portrait",
    title: "Off-duty",
    meta: "LIFESTYLE / 05",
  },
];

function EditorialOrb() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 opacity-75 sm:-right-4 sm:-top-12 sm:h-48 sm:w-48">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3.4], fov: 42 }}>
        <ambientLight intensity={1.25} />
        <directionalLight position={[3, 3, 4]} intensity={2.1} color="#f4dfbd" />
        <pointLight position={[-3, -2, 2]} intensity={2} color="#b48b55" />
        <Suspense fallback={null}>
          <Float speed={1.25} rotationIntensity={0.28} floatIntensity={0.5}>
            <Sphere args={[1, 64, 64]} scale={0.93}>
              <MeshDistortMaterial
                color="#C6AD83"
                roughness={0.25}
                metalness={0.72}
                distort={0.22}
                speed={1.4}
              />
            </Sphere>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function AboutSection() {
  const { about } = SITE_CONFIG;
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        section.querySelectorAll(".about-reveal"),
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.065,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>(".about-gallery-card");
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 46, rotateX: 7, scale: 0.94 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      if (galleryTrackRef.current && galleryRef.current) {
        gsap.to(galleryTrackRef.current, {
          x: () => Math.min(0, galleryRef.current!.clientWidth - galleryTrackRef.current!.scrollWidth),
          ease: "none",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 70%",
            end: "bottom 25%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".about-depth-image").forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative isolate overflow-hidden bg-[#F3F0E9] px-5 py-24 text-[#171717] transition-colors duration-500 dark:bg-[#0A0A0A] dark:text-[#F3F0E9] sm:px-8 md:py-32 lg:px-12 lg:py-40"
    >
      <style jsx>{`
        .about-gallery {
          perspective: 1500px;
          background: radial-gradient(ellipse at 50% 50%, rgba(198,173,131,.18), transparent 62%);
          scrollbar-width: none;
        }
        .about-gallery::-webkit-scrollbar { display: none; }
        .about-gallery-track {
          display: flex;
          width: max-content;
          align-items: center;
          gap: clamp(12px, 2vw, 26px);
          padding: 28px max(5vw, 20px) 38px;
          transform-style: preserve-3d;
        }
        .about-gallery-card {
          position: relative;
          flex: 0 0 clamp(160px, 19vw, 260px);
          aspect-ratio: .69;
          overflow: hidden;
          border: 1px solid rgba(23,23,23,.13);
          background: #e7e2d9;
          box-shadow: 0 22px 55px rgba(23,23,23,.15);
          transform-style: preserve-3d;
          transition: transform 450ms cubic-bezier(.2,.7,.2,1), box-shadow 450ms ease;
        }
        :global(.dark) .about-gallery-card {
          border-color: rgba(243,240,233,.14);
          box-shadow: 0 22px 55px rgba(0,0,0,.38);
        }
        .about-gallery-card:hover {
          transform: translateY(-10px) rotateY(0deg) rotateZ(0deg) scale(1.035) !important;
          z-index: 10;
          box-shadow: 0 28px 70px rgba(23,23,23,.24);
        }
        @media (max-width: 767px) {
          .about-gallery-track { padding-inline: 20px; }
          .about-gallery-card { flex-basis: min(58vw, 220px); }
        }
      `}</style>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-[#C6AD83]/15 blur-[110px] dark:bg-[#C6AD83]/[0.07]" />
        <div className="absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[#C6AD83]/10 blur-[100px] dark:bg-[#C6AD83]/[0.04]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(currentColor_0.6px,transparent_0.6px)] [background-size:9px_9px]" />
      </div>

      <div className="mx-auto max-w-[1440px]">
        <div className="about-reveal mb-12 flex items-center justify-between gap-5 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#A88A5D] dark:text-[#C6AD83]">01 /</span>
            <span className="h-px w-8 bg-[#A88A5D]/60 dark:bg-[#C6AD83]/60" />
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#706D66] dark:text-[#A6A39D] sm:text-[10px]">
              The person behind the frame
            </span>
          </div>
          <span className="hidden text-[9px] uppercase tracking-[0.2em] text-[#706D66] dark:text-[#A6A39D] sm:block">
            Kashmir · Islamabad
          </span>
        </div>

        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="relative lg:col-span-8">
            <p className="about-reveal mb-5 text-[9px] uppercase tracking-[0.3em] text-[#A88A5D] dark:text-[#C6AD83] sm:text-[10px]">
              Model · Photographer · Videographer · Creator
            </p>
            <h2 className="relative z-10 font-serif-editorial text-[clamp(3rem,8vw,8rem)] font-normal leading-[0.83] tracking-[-0.065em]">
              <span className="about-reveal block">A creative</span>
              <span className="about-reveal block pb-3 pl-[8%] italic text-[#A88A5D] dark:text-[#C6AD83]">point of view.</span>
            </h2>
          </div>
          <div className="about-reveal relative pb-2 lg:col-span-4">
            <EditorialOrb />
            <p className="relative z-10 max-w-md text-sm leading-[1.9] text-[#706D66] dark:text-[#A6A39D] sm:text-base">
              Every frame has a feeling. This is the space between personal style, visual storytelling, and the details that make an image stay with you.
            </p>
            <div className="relative z-10 mt-5 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-[#171717] dark:text-[#F3F0E9]">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-black/15 dark:border-white/15">
                <ArrowDownRight size={15} />
              </span>
              Explore my visual world
            </div>
          </div>
        </div>

        <div className="about-reveal relative mt-14 overflow-hidden border-y border-black/10 dark:border-white/10 md:mt-20">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#F3F0E9] to-transparent dark:from-[#0A0A0A] sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#F3F0E9] to-transparent dark:from-[#0A0A0A] sm:w-16" />
          <div ref={galleryRef} className="about-gallery relative overflow-x-auto">
            <div ref={galleryTrackRef} className="about-gallery-track">
              {GALLERY.map((item, index) => (
                <article
                  key={item.src}
                  className="about-gallery-card"
                  style={{
                    transform: `rotateY(${(index - 2) * -5}deg) rotateZ(${(index - 2) * 0.7}deg)`,
                  }}
                >
                  <div className="about-depth-image absolute inset-0">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 767px) 58vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/10" />
                  <div className="absolute left-3 top-3 border border-white/45 bg-black/10 px-2 py-1 text-[7px] tracking-[0.16em] text-white backdrop-blur-sm">
                    {item.meta}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                    <p className="mb-1 text-[7px] uppercase tracking-[0.22em] text-white/65">AF / Visual diary</p>
                    <h3 className="font-serif-editorial text-xl italic leading-tight sm:text-2xl">{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-3 right-4 z-20 flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-[#706D66] dark:text-[#A6A39D]">
            <span>Swipe to explore</span><ArrowUpRight size={12} />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            {/* Editorial feature fills the former empty column with a visual anchor */}
            <div className="about-reveal group relative mb-8 overflow-hidden border border-black/10 bg-[#E8E2D8] dark:border-white/10 dark:bg-[#171717]">
              <div className="relative aspect-[1.12/1] overflow-hidden">
                <Image
                  src="/images/editorial/formal-suit.jpg"
                  alt="Afnan in a formal fashion editorial"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="about-depth-image object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.045]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/10" />
                <div className="absolute left-4 top-4 flex items-center gap-2 border border-white/45 bg-black/15 px-3 py-2 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D5B47D]" />
                  <span className="text-[8px] uppercase tracking-[0.22em] text-white">Personal visual archive</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <div>
                    <p className="mb-2 text-[8px] uppercase tracking-[0.25em] text-white/65">Style / perspective / story</p>
                    <p className="max-w-[17rem] font-serif-editorial text-3xl leading-[0.95] tracking-[-0.04em] text-white sm:text-4xl">
                      Behind every frame is a feeling.
                    </p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/50 text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3 text-[8px] uppercase tracking-[0.18em] text-[#706D66] dark:text-[#A6A39D]">
                <span>AF / Editorial study 01</span>
                <span>Photography · Modeling</span>
              </div>
            </div>

            <div className="about-reveal grid grid-cols-3 gap-3">
              {[
                { n: 3, suffix: "+", label: "Years creating" },
                { n: 20, suffix: "", label: "Age" },
                { n: 50, suffix: "+", label: "Sessions" },
              ].map((stat) => (
                <div key={stat.label} className="border-t border-black/15 py-4 dark:border-white/15 sm:py-5">
                  <p className="font-serif-editorial text-4xl leading-none tracking-[-0.04em] text-[#A88A5D] dark:text-[#C6AD83] sm:text-5xl">
                    <AnimatedCounter target={stat.n} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-[8px] uppercase tracking-[0.12em] text-[#706D66] dark:text-[#A6A39D] sm:text-[9px] sm:tracking-[0.18em]">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="about-reveal mt-6 flex items-center gap-4 border-y border-black/10 py-5 dark:border-white/10">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-black/15 text-[#A88A5D] dark:border-white/15 dark:text-[#C6AD83]">
                <Compass size={19} strokeWidth={1.3} />
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-[0.22em] text-[#706D66] dark:text-[#A6A39D]">Rooted in</p>
                <p className="mt-1 text-sm text-[#171717] dark:text-[#F3F0E9]">Kashmir roots · Islamabad perspective</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="about-reveal mb-8 max-w-2xl space-y-5 text-[15px] font-light leading-[1.9] text-[#706D66] dark:text-[#A6A39D] sm:text-base md:text-[17px]">
              <p>{about.bioParagraph1}</p>
              <p>{about.bioParagraph2}</p>
            </div>
            <div className="about-reveal mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-[#A88A5D] dark:text-[#C6AD83]">What shapes the work</p>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl">Creative instincts</h3>
              </div>
              <span className="pb-1 text-[8px] uppercase tracking-[0.18em] text-[#706D66] dark:text-[#A6A39D]">The approach / 04</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {about.creativeTraits.map((trait, index) => {
                const Icon = TRAIT_ICONS[index % TRAIT_ICONS.length];
                return (
                  <TiltCard
                    key={trait.title}
                    className="about-reveal group min-h-[140px] border border-black/10 bg-white/35 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#A88A5D]/50 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-[#C6AD83]/40 sm:p-6"
                  >
                    <div className="mb-7 flex items-center justify-between">
                      <Icon size={17} strokeWidth={1.4} className="text-[#A88A5D] dark:text-[#C6AD83]" />
                      <span className="font-mono text-[9px] tracking-[0.16em] text-[#706D66] dark:text-[#A6A39D]">0{index + 1}</span>
                    </div>
                    <h4 className="mb-2 text-sm font-medium tracking-wide text-[#171717] transition-colors group-hover:text-[#A88A5D] dark:text-[#F3F0E9] dark:group-hover:text-[#C6AD83]">{trait.title}</h4>
                    <p className="text-xs leading-[1.8] text-[#706D66] dark:text-[#A6A39D]">{trait.desc}</p>
                  </TiltCard>
                );
              })}
            </div>
            <a href="#work" className="about-reveal group mt-9 inline-flex items-center gap-4 text-[9px] uppercase tracking-[0.22em] text-[#171717] dark:text-[#F3F0E9]">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-black/15 transition-all duration-300 group-hover:border-[#A88A5D] group-hover:bg-[#A88A5D] group-hover:text-white dark:border-white/15 dark:group-hover:border-[#C6AD83] dark:group-hover:bg-[#C6AD83] dark:group-hover:text-[#0A0A0A]">
                <ArrowUpRight size={16} strokeWidth={1.4} />
              </span>
              <span className="border-b border-black/15 pb-1 transition-colors group-hover:border-[#A88A5D] dark:border-white/15 dark:group-hover:border-[#C6AD83]">Explore selected work</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
