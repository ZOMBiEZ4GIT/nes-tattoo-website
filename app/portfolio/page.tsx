"use client";

import { useState } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

interface PortfolioItem {
  id: number;
  title: string;
  tags: string[];
  category: string[];
}

export default function PortfolioPage() {
  const [loadedCount, setLoadedCount] = useState(12); // Start with 12 images

  const portfolioImages = Array.from({ length: 58 }, (_, i) =>
    `/images/portfolio/portfolio-${String(i + 1).padStart(2, '0')}.jpg`
  );

  const portfolioItems: PortfolioItem[] = portfolioImages.map((img, idx) => ({
    id: idx + 1,
    title: `Portfolio ${idx + 1}`,
    tags: [],
    category: ["all"],
  }));

  const visibleItems = portfolioItems.slice(0, loadedCount);
  const hasMore = loadedCount < portfolioItems.length;

  const loadMore = () => {
    setLoadedCount(prev => Math.min(prev + 12, portfolioItems.length));
  };

  return (
    <>
      <Navigation />

      <main className="pt-20">
        {/* Portfolio Hero */}
        <section className="pt-32 pb-16 px-12 text-center bg-white">
          <ScrollReveal>
            <h1 className="font-serif text-[clamp(3rem,6vw,4rem)] font-light tracking-[-0.01em] mb-6 text-black">
              Portfolio
            </h1>
            <p className="text-lg leading-relaxed text-gray max-w-[600px] mx-auto">
              A collection of custom tattoo work showcasing clean lines,
              natural elements, and timeless design.
            </p>
          </ScrollReveal>
        </section>

        {/* Portfolio Grid */}
        <section className="px-8 pb-24 bg-white">
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 max-w-[1600px] mx-auto">
            {visibleItems.map((item, index) => {
              const src = portfolioImages[index];
              return (
                <div
                  key={item.id}
                  className="relative overflow-hidden bg-white border border-gray group transition-all duration-300 hover:shadow-lg mb-4 break-inside-avoid"
                >
                  <Image
                    src={src}
                    alt={`Tattoo work ${index + 1}`}
                    title=""
                    width={600}
                    height={600}
                    loading={index < 6 ? "eager" : "lazy"}
                    quality={75}
                    className="w-full h-auto grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-400"
                  />
                </div>
              );
            })}
          </div>

          {hasMore && (
            <div className="text-center mt-16">
              <button
                onClick={loadMore}
                className="inline-flex items-center justify-center px-12 py-4 text-sm font-medium tracking-wider uppercase bg-black text-white hover:opacity-90 active:scale-[0.98] transition-all duration-200"
              >
                Load More
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}
