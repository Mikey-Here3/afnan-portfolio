import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import FilmGrain from "@/components/ui/FilmGrain";
import CinematicIntro from "@/components/layout/CinematicIntro";
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://afnanabbasi.com"),
  title: "Muhammad Afnan Abbasi | Model, Photographer & Content Creator",
  description:
    "Explore the portfolio of Muhammad Afnan Abbasi, an aspiring model and visual creator from Islamabad with a passion for photography, videography, fashion, and content creation.",
  keywords: [
    "Muhammad Afnan Abbasi",
    "Afnan Abbasi",
    "Model Islamabad",
    "Fashion Editorial Pakistan",
    "Photographer Islamabad",
    "Visual Creator",
    "Streetwear Editorial",
    "Content Creator",
  ],
  authors: [{ name: "Muhammad Afnan Abbasi" }],
  creator: "Muhammad Afnan Abbasi",
  openGraph: {
    title: "Muhammad Afnan Abbasi | Model, Photographer & Content Creator",
    description:
      "Explore the portfolio of Muhammad Afnan Abbasi, an aspiring model and visual creator from Islamabad with a passion for photography, videography, fashion, and content creation.",
    url: "https://afnanabbasi.com",
    siteName: "Afnan Abbasi Portfolio",
    images: [
      {
        url: "/images/editorial/hero-portrait.jpg",
        width: 1200,
        height: 1600,
        alt: "Muhammad Afnan Abbasi Editorial Portrait",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Afnan Abbasi | Model, Photographer & Content Creator",
    description:
      "Model, photographer and visual creator exploring the space between fashion, film and personal expression.",
    images: ["/images/editorial/hero-portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth bg-[#0A0A0A]`}
    >
     <body className="relative min-h-screen bg-[#0A0A0A] font-sans antialiased text-[#F3F0E9] selection:bg-[#C6AD83] selection:text-[#0A0A0A]">
  <FilmGrain />
  <SmoothScroll>{children}</SmoothScroll>
  <CustomCursor />
  <CinematicIntro />
</body>
    </html>
  );
}
