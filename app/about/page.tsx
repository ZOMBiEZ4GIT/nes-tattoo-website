"use client";

import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Parallax from "@/components/Parallax";
import ImageCarousel from "@/components/ImageCarousel";

export default function AboutPage() {
  const profileImages = [
    "/images/profile/profile-01.jpg",
    "/images/profile/profile-02.jpg",
  ];

  const inspirationImages = [
    "/images/inspiration/inspiration-01.jpg",
    "/images/inspiration/inspiration-02.jpg",
    "/images/inspiration/inspiration-03.jpg",
    "/images/inspiration/inspiration-04.jpg",
    "/images/inspiration/inspiration-05.jpg",
    "/images/inspiration/inspiration-06.jpg",
  ];

  const specialties = [
    {
      number: "01",
      title: "Custom Designs",
      description:
        "Original artwork crafted specifically for you. I'll work with your ideas to create a one-of-a-kind piece that reflects your vision and fits your body perfectly.",
    },
    {
      number: "02",
      title: "Floral & Botanical",
      description:
        "Delicate flowers, leaves, and natural elements that flow beautifully with your body. Each piece is thoughtfully composed to capture organic beauty.",
    },
    {
      number: "03",
      title: "Nature Inspired",
      description:
        "From fauna to landscapes, I bring the natural world to life with detailed, elegant designs that celebrate the beauty found in nature.",
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
              {/* Image Carousel */}
              <Parallax speed={0.4} direction="up">
                <ImageCarousel
                  images={profileImages}
                  alt="NES Tattoo Artist"
                  autoPlayInterval={5000}
                />
              </Parallax>

              {/* Text */}
              <Parallax speed={0.55} direction="up">
                <div>
                  <h2 className="font-serif text-[clamp(2.25rem,4vw,3rem)] font-normal mb-8 text-black">
                    My Story
                  </h2>
                  <p className="text-[1.0625rem] leading-relaxed text-gray mb-7">
                    With 8 years of professional tattooing and a Bachelor of Fine Art,
                    I&apos;ve developed a practice rooted in artistic integrity and technical skill.
                    What began as a passion for creating beautiful, meaningful art has evolved into
                    a dedicated craft I refine every single day.
                  </p>
                  <p className="text-[1.0625rem] leading-relaxed text-gray mb-7">
                    I specialise in fine art colour realism, with a particular focus on botanical
                    and nature-inspired designs. Every tattoo is custom-designed for you—no flash,
                    no templates. I believe your tattoo should be as unique as you are, flowing
                    naturally with your body while telling your story.
                  </p>
                  <p className="text-[1.0625rem] leading-relaxed text-gray">
                    My approach prioritises comfort, trust, and quality. I take the time needed
                    to ensure colours are laid correctly and details are precise. Many clients
                    appreciate not just the final result, but the safe, patient, and professional
                    environment I provide throughout the entire process.
                  </p>
                </div>
              </Parallax>
            </div>
          </div>
        </section>

        {/* Inspiration Gallery */}
        <section className="py-28 px-12 bg-[#FAFAFA]">
          <div className="max-w-[1300px] mx-auto">
            <Parallax speed={0.5} direction="up">
              <div className="text-center mb-16">
                <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-normal text-black mb-6">
                  What Inspires Me
                </h2>
                <p className="text-[1.1875rem] leading-relaxed text-gray max-w-[720px] mx-auto">
                  A glimpse into the world that fuels my creativity and influences my artistic vision.
                </p>
              </div>
            </Parallax>

            <Parallax speed={0.5} direction="up">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {inspirationImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden border border-gray-light group"
                  >
                    <Image
                      src={image}
                      alt={`Inspiration ${index + 1}`}
                      title=""
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-400 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </Parallax>
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

            <Parallax speed={0.5} direction="up">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-16">
                {specialties.map((specialty) => (
                  <div key={specialty.number} className="text-center">
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
                ))}
              </div>
            </Parallax>
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
                      href="mailto:nes@nestattoo.com"
                      className="border-b border-transparent hover:border-black transition-colors duration-200"
                    >
                      nes@nestattoo.com
                    </a>
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3.5">
                  <span className="text-[0.8125rem] font-semibold tracking-wider uppercase text-gray">
                    Phone
                  </span>
                  <span className="text-[1.3125rem] text-black">
                    <a
                      href="tel:+61447955182"
                      className="border-b border-transparent hover:border-black transition-colors duration-200"
                    >
                      0447 955 182
                    </a>
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-7 mb-14">
                <a
                  href="https://instagram.com/nesrinkaraa_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium tracking-wider uppercase text-gray px-8 py-3.5 border border-gray-light hover:text-black hover:border-black transition-all duration-200 md:min-w-0 min-w-[200px]"
                >
                  Instagram
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
