"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Parallax from "@/components/Parallax";

export default function AboutPage() {
  const specialties = [
    {
      number: "01",
      title: "Custom Work",
      description:
        "Original designs crafted specifically for you. I'll work with your ideas to create a one-of-a-kind piece that reflects your vision and fits your body perfectly.",
    },
    {
      number: "02",
      title: "Cover-Ups",
      description:
        "Transform tattoos you've outgrown into something you'll love. With careful planning and creative problem-solving, I can turn almost any piece into fresh art.",
    },
    {
      number: "03",
      title: "Blackwork",
      description:
        "Bold, graphic designs using solid black ink. From geometric patterns to illustrative pieces, I create high-contrast work that makes a statement.",
    },
  ];

  const studios = [
    {
      name: "Downtown Studio",
      address: "123 Main Street\nDowntown District\nCity, State 12345",
      hours: "Tuesday - Saturday\n12:00 PM - 8:00 PM",
      phone: "+1 (234) 567-890",
    },
    {
      name: "Westside Location",
      address: "456 Oak Avenue\nWestside Plaza\nCity, State 12346",
      hours: "Thursday - Sunday\n1:00 PM - 9:00 PM",
      phone: "+1 (234) 567-891",
    },
  ];

  return (
    <>
      <Navigation />

      <main className="pt-20">
        {/* About Hero */}
        <section className="pt-44 pb-28 px-12 text-center bg-white">
          <Parallax speed={0.5} direction="up">
            <h1 className="font-serif text-[clamp(3.5rem,7vw,4.75rem)] font-light tracking-[-0.02em] mb-8 text-black">
              About Me
            </h1>
            <p className="text-[1.1875rem] leading-relaxed text-gray max-w-[720px] mx-auto">
              Every tattoo tells a story. I&apos;m here to help you tell yours through
              ink that lasts a lifetime.
            </p>
          </Parallax>
        </section>

        {/* Bio Section - Side by Side */}
        <section className="py-28 px-12 bg-white">
          <div className="max-w-[1300px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-14 lg:gap-20 items-center">
              {/* Image */}
              <Parallax speed={0.4} direction="up">
                <div className="relative aspect-[4/5] overflow-hidden border border-gray-light group">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop"
                    alt="NES Tattoo Artist"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-400"
                  />
                </div>
              </Parallax>

              {/* Text */}
              <Parallax speed={0.55} direction="up">
                <div>
                  <h2 className="font-serif text-[clamp(2.25rem,4vw,3rem)] font-normal mb-8 text-black">
                    My Story
                  </h2>
                  <p className="text-[1.0625rem] leading-relaxed text-gray mb-7">
                    I&apos;ve been tattooing professionally for over a decade,
                    transforming skin into canvas and turning visions into art.
                    What started as a passion in my garage has evolved into a
                    craft I dedicate myself to every single day.
                  </p>
                  <p className="text-[1.0625rem] leading-relaxed text-gray mb-7">
                    I specialize in custom designs and cover-ups, believing that
                    every piece should be as unique as the person wearing it.
                    Whether you&apos;re looking to bring a new idea to life or
                    transform an old tattoo into something you&apos;ll love, I approach
                    each project with the same care and attention to detail.
                  </p>
                  <p className="text-[1.0625rem] leading-relaxed text-gray">
                    My philosophy is simple:{" "}
                    <strong>the art is the color</strong>. I let the tattoo work
                    speak for itself, using clean technique and thoughtful
                    composition to create pieces that stand the test of time.
                  </p>
                </div>
              </Parallax>
            </div>
          </div>
        </section>

        {/* Specialties Section - Horizontal */}
        <section className="py-28 px-12 bg-black text-white">
          <div className="max-w-[1300px] mx-auto">
            <Parallax speed={0.5} direction="up">
              <div className="text-center mb-20">
                <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-normal text-white">
                  What I Do Best
                </h2>
              </div>
            </Parallax>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-16">
              {specialties.map((specialty, index) => {
                const speed = 0.45 + index * 0.05;
                return (
                  <Parallax key={specialty.number} speed={speed} direction="up">
                    <div className="text-center">
                      <span className="font-serif text-[3.25rem] font-light text-gray-light mb-6 block">
                        {specialty.number}
                      </span>
                      <h3 className="text-xl font-semibold tracking-wider uppercase mb-5 text-white">
                        {specialty.title}
                      </h3>
                      <p className="text-base leading-relaxed text-gray-light">
                        {specialty.description}
                      </p>
                    </div>
                  </Parallax>
                );
              })}
            </div>
          </div>
        </section>

        {/* Studios Section */}
        <section className="py-28 px-12 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <Parallax speed={0.5} direction="up">
              <div className="text-center mb-20">
                <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-normal text-black">
                  Where to Find Me
                </h2>
              </div>
            </Parallax>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16">
              {studios.map((studio, index) => {
                const speed = index === 0 ? 0.45 : 0.55;
                return (
                  <Parallax key={index} speed={speed} direction="up">
                    <div className="border border-gray-light p-12 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                      <h3 className="font-serif text-[1.875rem] font-normal mb-9 text-black">
                        {studio.name}
                      </h3>
                      <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-6">
                          <span className="text-[0.8125rem] font-semibold tracking-wider uppercase text-gray min-w-[85px]">
                            Address
                          </span>
                          <span className="text-[1.0625rem] leading-relaxed text-black whitespace-pre-line">
                            {studio.address}
                          </span>
                        </div>
                        <div className="flex items-start gap-6">
                          <span className="text-[0.8125rem] font-semibold tracking-wider uppercase text-gray min-w-[85px]">
                            Hours
                          </span>
                          <span className="text-[1.0625rem] leading-relaxed text-black whitespace-pre-line">
                            {studio.hours}
                          </span>
                        </div>
                        <div className="flex items-start gap-6">
                          <span className="text-[0.8125rem] font-semibold tracking-wider uppercase text-gray min-w-[85px]">
                            Contact
                          </span>
                          <span className="text-[1.0625rem] leading-relaxed text-black">
                            <a
                              href={`tel:${studio.phone}`}
                              className="border-b border-transparent hover:border-black transition-colors duration-200"
                            >
                              {studio.phone}
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Parallax>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-28 px-12 bg-[#FAFAFA] text-center">
          <Parallax speed={0.5} direction="up">
            <div className="max-w-[750px] mx-auto">
              <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-normal mb-8 text-black">
                Let&apos;s Connect
              </h2>
              <p className="text-lg leading-relaxed text-gray mb-14">
                Ready to start your next piece? Have questions about the process?
                I&apos;d love to hear from you.
              </p>

              <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-16 mb-14">
                <div className="flex flex-col items-center gap-3.5">
                  <span className="text-[0.8125rem] font-semibold tracking-wider uppercase text-gray">
                    Email
                  </span>
                  <span className="text-[1.3125rem] text-black">
                    <a
                      href="mailto:contact@nestattoo.com"
                      className="border-b border-transparent hover:border-black transition-colors duration-200"
                    >
                      contact@nestattoo.com
                    </a>
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3.5">
                  <span className="text-[0.8125rem] font-semibold tracking-wider uppercase text-gray">
                    Phone
                  </span>
                  <span className="text-[1.3125rem] text-black">
                    <a
                      href="tel:+1234567890"
                      className="border-b border-transparent hover:border-black transition-colors duration-200"
                    >
                      +1 (234) 567-890
                    </a>
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-7 mb-14">
                <a
                  href="https://instagram.com/nestattoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium tracking-wider uppercase text-gray px-8 py-3.5 border border-gray-light hover:text-black hover:border-black transition-all duration-200 md:min-w-0 min-w-[200px]"
                >
                  Instagram
                </a>
                <a
                  href="https://facebook.com/nestattoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium tracking-wider uppercase text-gray px-8 py-3.5 border border-gray-light hover:text-black hover:border-black transition-all duration-200 md:min-w-0 min-w-[200px]"
                >
                  Facebook
                </a>
              </div>

              <div>
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-black text-white border-2 border-black hover:opacity-90 active:scale-[0.98] transition-all duration-200"
                >
                  Book an Appointment
                </Link>
              </div>
            </div>
          </Parallax>
        </section>
      </main>

      <Footer />

    </>
  );
}
