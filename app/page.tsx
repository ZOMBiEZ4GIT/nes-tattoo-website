"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Parallax from "@/components/Parallax";
import ScrollReveal from "@/components/ScrollReveal";

export default function HomePage() {
  const processStepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll reveal for process steps
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 100); // Stagger animation
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all process steps
    if (processStepsRef.current) {
      const steps = processStepsRef.current.querySelectorAll(".process-step");
      steps.forEach((step) => {
        observer.observe(step);
      });
    }

    return () => observer.disconnect();
  }, []);

  const portfolioItems = [
    { category: "Custom Work", title: "Geometric Sleeve" },
    { category: "Cover-Up", title: "Floral Cover-Up" },
    { category: "Custom Work", title: "Minimalist Linework" },
    { category: "Custom Work", title: "Abstract Art" },
    { category: "Cover-Up", title: "Script Transformation" },
    { category: "Custom Work", title: "Botanical Design" },
  ];

  const homeImages = [
    "/images/buu.jpg",
    "/images/peacock.jpg",
    "/images/snail.jpg",
    "/images/two-birds.jpg",
    "/images/flower-heart.jpg",
  ];

  const processSteps = [
    {
      number: 1,
      title: "Book Consultation",
      description:
        "Start by booking a free consultation. I'll discuss your ideas, placement, size, and style preferences with you.",
    },
    {
      number: 2,
      title: "Design Review",
      description:
        "I'll create a custom design based on our discussion. I'll refine it with you until it's exactly what you want.",
    },
    {
      number: 3,
      title: "Schedule Session",
      description:
        "Once the design is approved, I'll schedule your tattoo session and confirm all details including deposit.",
    },
    {
      number: 4,
      title: "Get Tattooed",
      description:
        "On the day of your session, I'll bring your design to life with precision and care in a professional environment.",
    },
  ];

  return (
    <>
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-8 py-24 relative">
          <Parallax speed={0.3} direction="up">
            <div className="text-xs font-semibold tracking-[0.3em] uppercase text-black mb-24 opacity-0 animate-[fadeIn_0.6s_ease_0.1s_forwards]">
              NES TATTOO
            </div>
          </Parallax>

          <Parallax speed={0.6} direction="up">
            <div className="mb-20 opacity-0 animate-[fadeInUp_0.8s_ease_0.3s_forwards]">
              <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] font-light tracking-[-0.01em] leading-[1.1] mb-2 text-black">
                Your Vision,
              </h1>
              <div className="font-serif text-[clamp(3rem,8vw,6rem)] font-light tracking-[-0.01em] leading-[1.1] text-gray">
                My Art
              </div>
            </div>
          </Parallax>

          <Parallax speed={0.5} direction="up">
            <div className="opacity-0 animate-[fadeIn_0.6s_ease_0.6s_forwards]">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-12 py-5 text-sm font-medium tracking-wider uppercase bg-black text-white border-2 border-black hover:opacity-90 active:scale-[0.98] transition-all duration-200"
              >
                Book Consultation
              </Link>
            </div>
          </Parallax>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 animate-bounce">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </section>

        {/* Featured Work Section */}
        <section className="py-28 px-8 bg-white" id="featured-work">
          <div className="max-w-[1280px] mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-normal mb-4 text-black">
                  Featured Work
                </h2>
                <p className="text-lg text-gray max-w-[600px] mx-auto">
                  A selection of recent custom pieces
                </p>
              </div>
            </ScrollReveal>

            {/* Asymmetric Portfolio Grid */}
            <ScrollReveal delay={0.2} duration={1.0}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 auto-rows-[250px]">
                {portfolioItems.map((item, index) => {
                  const src = homeImages[index % homeImages.length];
                  return (
                    <div
                      key={index}
                      className={`bg-white border border-gray-light rounded overflow-hidden cursor-pointer group relative ${
                        index === 0 || index === 3 ? "md:row-span-2" : ""
                      }`}
                    >
                      <div className="w-full h-full relative overflow-hidden">
                        <Image
                          src={src}
                          alt={item.title}
                          title=""
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-400"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/98 via-white/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-xs text-gray uppercase tracking-wider mb-2 font-medium">
                          {item.category}
                        </p>
                        <h3 className="text-lg font-semibold text-black leading-snug">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            <div className="text-center pt-16">
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-transparent text-black border-2 border-black hover:bg-black hover:text-white active:scale-[0.98] transition-all duration-200"
              >
                View Full Portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-8 bg-white" id="about">
          <div className="max-w-[900px] mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-normal mb-4 text-black">
                  Custom Tattoo Art
                </h2>
                <p className="text-lg text-gray max-w-[700px] mx-auto leading-relaxed">
                  I specialise in creating unique, custom pieces that bring your vision to life.
                  Whether it&apos;s delicate floral designs, natural elements, or something entirely your own,
                  every tattoo is crafted with precision and care to tell your story.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-28 px-8 bg-white" id="process">
          <div className="max-w-[1280px] mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-normal mb-4 text-black">
                  How It Works
                </h2>
                <p className="text-lg text-gray">
                  A simple process from consultation to finished art
                </p>
              </div>
            </ScrollReveal>

            <div className="max-w-[800px] mx-auto" ref={processStepsRef}>
              {processSteps.map((step, index) => (
                <ScrollReveal key={index} delay={index * 0.15} distance={50}>
                  <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-24">
                    <div className="flex-shrink-0 w-[60px] h-[60px] rounded-full border-2 border-black flex items-center justify-center font-serif text-2xl font-semibold text-black">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-black">
                        {step.title}
                      </h3>
                      <p className="text-base text-gray leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-28 px-8 bg-black text-white text-center">
          <div className="max-w-[1280px] mx-auto">
            <ScrollReveal duration={0.8}>
              <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal mb-8">
                Ready to Start Your Tattoo Journey?
              </h2>
              <p className="text-lg text-gray-light mb-16 max-w-[600px] mx-auto">
                Book a free consultation to discuss your custom piece.
              </p>
              <div className="flex gap-8 justify-center flex-wrap">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-white text-black border-2 border-white hover:bg-gray-light active:scale-[0.98] transition-all duration-200"
                >
                  Book Now
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-transparent text-white border-2 border-white hover:bg-white hover:text-black active:scale-[0.98] transition-all duration-200"
                >
                  Learn More
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
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

        .process-step.visible {
          opacity: 1;
          transform: translateY(0);
        }

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
