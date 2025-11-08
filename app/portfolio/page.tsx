"use client";

import { useState } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

interface PortfolioItem {
  id: number;
  src: string;
  category: "custom" | "fingernail" | "coverup";
  title: string;
}

type Category = "custom" | "fingernail" | "coverup";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("custom");
  const [loadedCount, setLoadedCount] = useState(12);

  // Portfolio data organized by actual image content from image-seo-descriptions.md
  const portfolioItems: PortfolioItem[] = [
    // Custom Work - portfolios 1-10, 13-45, 48-50, 51, 53-56
    { id: 1, src: '/images/portfolio/portfolio-01.jpg', category: "custom", title: "Disney Character in Pink Peony" },
    { id: 2, src: '/images/portfolio/portfolio-02.jpg', category: "custom", title: "Micro-realistic Honeybee" },
    { id: 3, src: '/images/portfolio/portfolio-03.jpg', category: "custom", title: "Hummingbird in Flight" },
    { id: 4, src: '/images/portfolio/portfolio-04.jpg', category: "custom", title: "Abstract Minimalist Flowing Lines" },
    { id: 5, src: '/images/portfolio/portfolio-05.jpg', category: "custom", title: "Rose and Daisy Botanical" },
    { id: 6, src: '/images/portfolio/portfolio-06.jpg', category: "custom", title: "Pomegranate Branch" },
    { id: 7, src: '/images/portfolio/portfolio-07.jpg', category: "custom", title: "Detailed Honeybee" },
    { id: 8, src: '/images/portfolio/portfolio-08.jpg', category: "custom", title: "Flowing Botanical Wreath" },
    { id: 9, src: '/images/portfolio/portfolio-09.jpg', category: "custom", title: "Circular Floral Wreath" },
    { id: 10, src: '/images/portfolio/portfolio-10.jpg', category: "custom", title: "Circular Floral Wreath Detail" },
    { id: 13, src: '/images/portfolio/portfolio-13.jpg', category: "custom", title: "Hummingbird and Red Hibiscus" },
    { id: 14, src: '/images/portfolio/portfolio-14.jpg', category: "custom", title: "Hummingbird Head Detail" },
    { id: 15, src: '/images/portfolio/portfolio-15.jpg', category: "custom", title: "Realistic Empanada" },
    { id: 16, src: '/images/portfolio/portfolio-16.jpg', category: "custom", title: "Barn Swallow with Red Orchid" },
    { id: 17, src: '/images/portfolio/portfolio-17.jpg', category: "custom", title: "Red Orchid Detail" },
    { id: 18, src: '/images/portfolio/portfolio-18.jpg', category: "custom", title: "Red Orchid Close-up" },
    { id: 19, src: '/images/portfolio/portfolio-19.jpg', category: "custom", title: "Exotic Crested Hummingbird" },
    { id: 20, src: '/images/portfolio/portfolio-20.jpg', category: "custom", title: "Delicate Red Poppy" },
    { id: 21, src: '/images/portfolio/portfolio-21.jpg', category: "custom", title: "Hot Air Balloon with Wildflowers" },
    { id: 22, src: '/images/portfolio/portfolio-22.jpg', category: "custom", title: "Hot Air Balloon Detail" },
    { id: 23, src: '/images/portfolio/portfolio-23.jpg', category: "custom", title: "Wildflower Details" },
    { id: 24, src: '/images/portfolio/portfolio-24.jpg', category: "custom", title: "Scattered Botanical Elements" },
    { id: 25, src: '/images/portfolio/portfolio-25.jpg', category: "custom", title: "Yellow Dandelion" },
    { id: 26, src: '/images/portfolio/portfolio-26.jpg', category: "custom", title: "Dandelion Seed Head" },
    { id: 27, src: '/images/portfolio/portfolio-27.jpg', category: "custom", title: "Pink Lotus Petal Detail" },
    { id: 28, src: '/images/portfolio/portfolio-28.jpg', category: "custom", title: "Trailing Violet or Pansy" },
    { id: 29, src: '/images/portfolio/portfolio-29.jpg', category: "custom", title: "Double Lavender Sprigs" },
    { id: 30, src: '/images/portfolio/portfolio-30.jpg', category: "custom", title: "Lavender Detail" },
    { id: 31, src: '/images/portfolio/portfolio-31.jpg', category: "custom", title: "Sturt's Desert Pea" },
    { id: 32, src: '/images/portfolio/portfolio-32.jpg', category: "custom", title: "Desert Pea Detail" },
    { id: 33, src: '/images/portfolio/portfolio-33.jpg', category: "custom", title: "Desert Pea Close-up" },
    { id: 34, src: '/images/portfolio/portfolio-34.jpg', category: "custom", title: "Desert Pea Branch" },
    { id: 35, src: '/images/portfolio/portfolio-35.jpg', category: "custom", title: "Australian Magpie in Orchid Wreath" },
    { id: 36, src: '/images/portfolio/portfolio-36.jpg', category: "custom", title: "Mixed Style Swallow" },
    { id: 37, src: '/images/portfolio/portfolio-37.jpg', category: "custom", title: "Large Tiger Lily" },
    { id: 38, src: '/images/portfolio/portfolio-38.jpg', category: "custom", title: "Tiger Lily Detail" },
    { id: 39, src: '/images/portfolio/portfolio-39.jpg', category: "custom", title: "Tiger Lily Close-up" },
    { id: 40, src: '/images/portfolio/portfolio-40.jpg', category: "custom", title: "Tiger Lily Stamens" },
    { id: 41, src: '/images/portfolio/portfolio-41.jpg', category: "custom", title: "Pomegranate and Sunflower WIP" },
    { id: 42, src: '/images/portfolio/portfolio-42.jpg', category: "custom", title: "Peacock with Wildflower Garden" },
    { id: 43, src: '/images/portfolio/portfolio-43.jpg', category: "custom", title: "Pink Peony Shoulder Piece" },
    { id: 44, src: '/images/portfolio/portfolio-44.jpg', category: "custom", title: "Whimsical Nautilus Shell" },
    { id: 45, src: '/images/portfolio/portfolio-45.jpg', category: "custom", title: "Pair of Songbirds" },
    { id: 48, src: '/images/portfolio/portfolio-48.jpg', category: "custom", title: "Australian Finches Pair" },
    { id: 49, src: '/images/portfolio/portfolio-49.jpg', category: "custom", title: "Pink Protea Flower" },
    { id: 50, src: '/images/portfolio/portfolio-50.jpg', category: "custom", title: "Colorful Gouldian Finches" },
    { id: 51, src: '/images/portfolio/portfolio-51.jpg', category: "custom", title: "Whimsical Mushroom Garden" },
    { id: 52, src: '/images/portfolio/portfolio-52.jpg', category: "custom", title: "Micro Realistic Tree" },
    { id: 53, src: '/images/portfolio/portfolio-53.jpg', category: "custom", title: "Ornate Chest Piece with Hummingbird" },
    { id: 54, src: '/images/portfolio/portfolio-54.jpg', category: "custom", title: "Gray Tabby Cat Portrait" },
    { id: 55, src: '/images/portfolio/portfolio-55.jpg', category: "custom", title: "Purple Line Work Parrot" },
    { id: 56, src: '/images/portfolio/portfolio-56.jpg', category: "custom", title: "Delicate Olive Branch" },

    // Fingernail Tattoos - portfolios 11, 12, 57, 58
    { id: 11, src: '/images/portfolio/portfolio-11.jpg', category: "fingernail", title: "Micro Avocado on Fingertip" },
    { id: 12, src: '/images/portfolio/portfolio-12.jpg', category: "fingernail", title: "Micro Fruit Collection" },
    { id: 57, src: '/images/portfolio/portfolio-57.jpg', category: "fingernail", title: "Micro Cherry on Thumb" },
    { id: 58, src: '/images/portfolio/portfolio-58.jpg', category: "fingernail", title: "Micro Cherry Detail" },

    // Cover-ups and Touch-ups - portfolios 46, 47
    { id: 46, src: '/images/portfolio/portfolio-46.jpg', category: "coverup", title: "Exotic Hummingbird Touch-up" },
    { id: 47, src: '/images/portfolio/portfolio-47.jpg', category: "coverup", title: "Barn Swallow Cover-up" },
  ];

  const categories = [
    {
      id: "custom" as Category,
      name: "Custom Work",
      description: "Custom botanical and nature tattoos, designed just for you",
      count: portfolioItems.filter(item => item.category === "custom").length,
    },
    {
      id: "fingernail" as Category,
      name: "Fingernail Tattoo",
      description: "Delicate micro tattoos on the fingernail area, showcasing precision and artistry",
      count: portfolioItems.filter(item => item.category === "fingernail").length,
    },
    {
      id: "coverup" as Category,
      name: "Cover-Ups & Touch-Ups",
      description: "Transformative cover-ups and refreshed designs bringing new life to existing tattoos",
      count: portfolioItems.filter(item => item.category === "coverup").length,
    },
  ];

  const filteredItems = portfolioItems.filter(item => item.category === activeCategory);
  const visibleItems = filteredItems.slice(0, loadedCount);
  const hasMore = loadedCount < filteredItems.length;

  const loadMore = () => {
    setLoadedCount(prev => Math.min(prev + 12, filteredItems.length));
  };

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setLoadedCount(12);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentCategory = categories.find(cat => cat.id === activeCategory);

  return (
    <>
      <Navigation />

      <main className="pt-20 bg-white">
        {/* Portfolio Hero */}
        <section className="pt-32 pb-20 px-6 text-center">
          <ScrollReveal>
            <h1 className="font-serif text-[clamp(3rem,6vw,5rem)] font-light tracking-[-0.02em] mb-6 text-black">
              Portfolio
            </h1>
            <p className="text-lg leading-relaxed text-gray-600 max-w-[700px] mx-auto mb-4">
              Some of my favourite pieces I&apos;ve been lucky enough to create
            </p>
          </ScrollReveal>
        </section>

        {/* Category Navigation */}
        <section className="px-6 pb-12">
          <ScrollReveal delay={0.1}>
            <div className="max-w-[1400px] mx-auto">
              {/* Subtle Category Tabs */}
              <div className="flex justify-center items-center gap-1 mb-16 border-b border-gray-200">
                {categories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`
                      relative px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300
                      ${activeCategory === category.id
                        ? 'text-black'
                        : 'text-gray-400 hover:text-gray-600'
                      }
                    `}
                  >
                    {category.name}
                    <span className="ml-2 text-xs">({category.count})</span>

                    {/* Active Underline Indicator */}
                    {activeCategory === category.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Active Category Info */}
              <div className="text-center mb-12">
                <h2 className="font-serif text-2xl md:text-3xl font-light text-black mb-3">
                  {currentCategory?.name}
                </h2>
                <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                  {currentCategory?.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Portfolio Grid */}
        <section className="px-6 pb-24">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-auto">
              {visibleItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative overflow-hidden bg-white group transition-all duration-500 hover:shadow-2xl w-full"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.title}
                      title=""
                      width={600}
                      height={600}
                      priority={index < 12}
                      quality={80}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="w-full h-auto grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                    </div>

                    {/* Optional: Image number indicator */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      #{item.id}
                    </div>
                  </div>
                ))}
              </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-16">
                <button
                  onClick={loadMore}
                  className="group relative inline-flex items-center justify-center px-16 py-5 text-sm font-medium tracking-widest uppercase overflow-hidden transition-all duration-300"
                >
                  {/* Button Background */}
                  <span className="absolute inset-0 bg-black transition-transform duration-300 group-hover:scale-105"></span>

                  {/* Button Border */}
                  <span className="absolute inset-0 border-2 border-black"></span>

                  {/* Button Text */}
                  <span className="relative text-white flex items-center gap-3">
                    Load More
                    <svg
                      className="w-4 h-4 transform group-hover:translate-y-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
              </div>
            )}

            {/* No More Items Message */}
            {!hasMore && filteredItems.length > 12 && (
              <div className="text-center mt-16 py-8 border-t border-gray-200">
                <p className="text-gray-500 text-sm tracking-wider uppercase">
                  You&apos;ve viewed all {filteredItems.length} pieces in {currentCategory?.name}
                </p>
              </div>
            )}
          </div>
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

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
