"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Parallax from "@/components/Parallax";

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

  const services = [
    {
      number: "01",
      title: "Custom Work",
      description:
        "I craft unique designs specifically for you, bringing your vision to life with precision and artistry. From concept to completion, every detail is tailored to your story.",
    },
    {
      number: "02",
      title: "Cover-Ups",
      description:
        "I transform existing tattoos into beautiful new artwork with expert techniques and creative solutions. We'll work together to reimagine your piece with fresh perspective.",
    },
    {
      number: "03",
      title: "Touch-Ups",
      description:
        "I restore and refresh your existing tattoos, maintaining their original beauty and vibrancy over time. Professional care to keep your art looking its best.",
    },
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
                Custom Art &
              </h1>
              <div className="font-serif text-[clamp(3rem,8vw,6rem)] font-light tracking-[-0.01em] leading-[1.1] text-gray">
                Cover-Ups
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
            <Parallax speed={0.5} direction="up">
              <div className="text-center mb-16">
                <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-normal mb-4 text-black">
                  Featured Work
                </h2>
                <p className="text-lg text-gray max-w-[600px] mx-auto">
                  A selection of recent custom pieces and cover-ups
                </p>
              </div>
            </Parallax>

            {/* Asymmetric Portfolio Grid */}
            <Parallax speed={0.5} direction="up">
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
                        <img
                          src={src}
                          alt={item.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-400"
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
            </Parallax>
            </div>

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

        {/* Services Section */}
        <section className="py-20 px-8 bg-white" id="services">
          <div className="max-w-[900px] mx-auto">
            <Parallax speed={0.5} direction="up">
              <div className="text-center mb-16">
                <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-normal mb-4 text-black">
                  Services
                </h2>
                <p className="text-lg text-gray">What I offer</p>
              </div>
            </Parallax>

            <Parallax speed={0.5} direction="up">
              <div className="flex flex-col gap-[4.5rem]">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`pb-16 group ${
                      index < services.length - 1
                        ? "border-b border-gray-light"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-6">
                      <span className="font-serif text-xl text-gray font-light min-w-[40px]">
                        {service.number}
                      </span>
                      <h3 className="font-serif text-4xl md:text-[2.25rem] font-normal text-black tracking-[-0.01em] transition-all duration-300 group-hover:tracking-[0.02em]">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-[1.0625rem] text-gray leading-[1.8] max-w-[700px] md:ml-[calc(40px+2rem)]">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </Parallax>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-28 px-8 bg-white" id="process">
          <div className="max-w-[1280px] mx-auto">
            <Parallax speed={0.5} direction="up">
              <div className="text-center mb-16">
                <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-normal mb-4 text-black">
                  How It Works
                </h2>
                <p className="text-lg text-gray">
                  A simple process from consultation to finished art
                </p>
              </div>
            </Parallax>

            <Parallax speed={0.5} direction="up">
              <div className="max-w-[800px] mx-auto" ref={processStepsRef}>
                {processSteps.map((step, index) => (
                  <div
                    key={index}
                    className="process-step flex flex-col md:flex-row gap-8 md:gap-16 mb-24 opacity-0 translate-y-5 transition-all duration-600"
                  >
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
                ))}
              </div>
            </Parallax>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-28 px-8 bg-black text-white text-center">
          <div className="max-w-[1280px] mx-auto">
            <Parallax speed={0.5} direction="up">
              <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal mb-8">
                Ready to Start Your Tattoo Journey?
              </h2>
              <p className="text-lg text-gray-light mb-16 max-w-[600px] mx-auto">
                Book a free consultation to discuss your custom piece or cover-up
                project.
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
            </Parallax>
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
