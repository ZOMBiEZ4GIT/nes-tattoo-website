"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

type FilterCategory = "all" | "custom" | "cover-up" | "minimal";

interface PortfolioItem {
  id: number;
  title: string;
  tags: string[];
  category: FilterCategory[];
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const portfolioImages = [
    "/images/buu.jpg",
    "/images/peacock.jpg",
    "/images/snail.jpg",
    "/images/two-birds.jpg",
    "/images/flower-heart.jpg",
  ];

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "Geometric Sleeve",
      tags: ["Custom", "Geometric"],
      category: ["all", "custom"],
    },
    {
      id: 2,
      title: "Floral Cover-Up",
      tags: ["Cover-Up", "Floral"],
      category: ["all", "cover-up"],
    },
    {
      id: 3,
      title: "Minimalist Linework",
      tags: ["Custom", "Minimal"],
      category: ["all", "custom", "minimal"],
    },
    {
      id: 4,
      title: "Abstract Art",
      tags: ["Custom", "Abstract"],
      category: ["all", "custom"],
    },
    {
      id: 5,
      title: "Script Transformation",
      tags: ["Cover-Up", "Script"],
      category: ["all", "cover-up"],
    },
    {
      id: 6,
      title: "Botanical Design",
      tags: ["Custom", "Nature"],
      category: ["all", "custom"],
    },
    {
      id: 7,
      title: "Mandala Piece",
      tags: ["Custom", "Geometric"],
      category: ["all", "custom"],
    },
    {
      id: 8,
      title: "Watercolor Cover",
      tags: ["Cover-Up", "Watercolor"],
      category: ["all", "cover-up"],
    },
    {
      id: 9,
      title: "Fine Line Portrait",
      tags: ["Custom", "Minimal"],
      category: ["all", "custom", "minimal"],
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category.includes(activeFilter));

  return (
    <>
      <Navigation />

      <main className="pt-20">
        {/* Portfolio Hero */}
        <section className="pt-48 pb-32 px-12 text-center bg-white">
          <ScrollReveal>
            <h1 className="font-serif text-[clamp(3.5rem,7vw,5rem)] font-light tracking-[-0.01em] mb-10 text-black">
              Portfolio
            </h1>
            <p className="text-xl leading-relaxed text-gray max-w-[700px] mx-auto mb-20">
              A collection of custom tattoo work showcasing clean lines,
              natural elements, and timeless design.
            </p>
          </ScrollReveal>

          {/* Filter Navigation */}
          <ScrollReveal delay={0.2}>
            <div className="flex justify-center gap-4 flex-wrap">
              {[
                { label: "All Work", value: "all" as FilterCategory },
                { label: "Custom", value: "custom" as FilterCategory },
                { label: "Cover-Ups", value: "cover-up" as FilterCategory },
                { label: "Minimal", value: "minimal" as FilterCategory },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`text-sm font-medium tracking-wider uppercase px-8 py-4 border transition-all duration-200 active:scale-[0.98] ${
                    activeFilter === filter.value
                      ? "bg-black text-white border-black"
                      : "bg-transparent text-gray border-gray-light hover:border-black hover:text-black"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Portfolio Grid */}
        <section className="px-12 pb-40 bg-white">
          <ScrollReveal delay={0.2} duration={1.0}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-[1400px] mx-auto">
              {filteredItems.map((item, index) => {
                const src = portfolioImages[index % portfolioImages.length];
                return (
                  <div
                    key={item.id}
                    className={`relative overflow-hidden bg-white border border-gray-light cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      index === 0 || index === 3
                        ? "md:row-span-2 aspect-[1/2]"
                        : "aspect-square"
                    }`}
                  >
                    <img
                      src={src}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-400"
                    />

                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black/95 to-transparent text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-serif text-2xl font-normal mb-4">
                        {item.title}
                      </h3>
                      <div className="flex gap-3 flex-wrap">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs px-4 py-1.5 border border-white/30 text-white/90 tracking-wider uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
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
