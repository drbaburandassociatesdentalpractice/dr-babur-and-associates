"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Phone,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    image: "/assets/images/dental-smile.png",
    eyebrow: "Dr. Babur & Associates",
    title: "Your smile deserves care.",
    description:
      "Modern dentistry, advanced treatments and personalized care designed around you.",
  },
  {
    image: "/assets/images/aligners-ban.jpg",
    eyebrow: "Clear Aligners",
    title: "A straighter smile, made simple.",
    description:
      "Discreet clear aligners designed to gradually transform your smile with confidence.",
  },
  {
    image: "/assets/images/implant-ban.jpg",
    eyebrow: "Dental Implants",
    title: "Restore your smile with confidence.",
    description:
      "Advanced implant solutions designed to restore function, comfort and a natural-looking smile.",
  },
  {
    image: "/assets/images/braces-ban.jpg",
    eyebrow: "Orthodontic Care",
    title: "Build a smile you'll love.",
    description:
      "Modern braces and personalized orthodontic care for healthier, beautifully aligned teeth.",
  },
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-svh overflow-hidden bg-black text-white">

      {/* ─────────────────────────────────────────
          BACKGROUND SLIDER
      ───────────────────────────────────────── */}

      <div className="absolute inset-0">

        <AnimatePresence mode="sync">

          <motion.div
            key={slide.image}
            initial={{
              opacity: 0,
              scale: 1.06,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.02,
            }}
            transition={{
              opacity: {
                duration: 1.4,
                ease: "easeInOut",
              },
              scale: {
                duration: 10,
                ease: "linear",
              },
            }}
            className="absolute inset-0"
          >

            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={currentSlide === 0}
              sizes="100vw"
              className="object-cover object-center"
            />

          </motion.div>

        </AnimatePresence>


        {/* Main overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Left darkness */}
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/30 to-transparent" />

        {/* Bottom darkness */}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/10" />

      </div>


      {/* ─────────────────────────────────────────
          HERO CONTENT
      ───────────────────────────────────────── */}

      <div className="relative z-10 mx-auto flex min-h-svh max-w-375 flex-col px-5 sm:px-8 lg:px-12 mt-10 sm:mt-0 lg:mt-0">

        <div className="flex flex-1 items-end pb-10 pt-20 sm:pb-14 lg:pb-16">

          <div className="grid w-full grid-cols-1 items-end gap-8 lg:grid-cols-[300px_1fr]">


            {/* ─────────────────────────────────
                STATIC GLASS CARD
                Only text changes
            ───────────────────────────────── */}

            <div className="order-2 lg:order-1">

              <div className="rounded-2xl border border-white/20 bg-black/20 p-5 shadow-2xl backdrop-blur-xl sm:p-6">

                {/* Static mark */}
                <div className="mb-7 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10">

                  <span className="h-2 w-2 rounded-full bg-dental-yellow shadow-[0_0_15px_rgba(247,247,0,0.9)]" />

                </div>


                {/* Changing card content */}

                <div className="relative min-h-36">

                  <AnimatePresence mode="wait">

                    <motion.div
                      key={currentSlide}
                      initial={{
                        opacity: 0,
                        filter: "blur(6px)",
                      }}
                      animate={{
                        opacity: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        filter: "blur(4px)",
                      }}
                      transition={{
                        duration: 0.65,
                        ease: "easeOut",
                      }}
                    >

                      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                        {slide.eyebrow}
                      </p>


                      <h2 className="max-w-57.5 text-xl font-medium leading-tight sm:text-2xl">
                        {slide.title}
                      </h2>


                      <p className="mt-4 max-w-60 text-xs leading-relaxed text-white/60">
                        {slide.description}
                      </p>

                    </motion.div>

                  </AnimatePresence>

                </div>


                {/* Static button */}

                <Link
                  href="/services"
                  className="group mt-6 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-wider"
                >

                  Explore Services

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:translate-x-1">

                    <ArrowUpRight className="h-3.5 w-3.5" />

                  </span>

                </Link>

              </div>

            </div>


            {/* ─────────────────────────────────
                STATIC MAIN HEADLINE
            ───────────────────────────────── */}

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="order-1 lg:order-2 lg:pl-8"
            >

              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/60 sm:text-xs">
                Advanced Dental Care · Karachi
              </p>


              {/* STATIC TITLE */}

              <h1 className="max-w-5xl text-[15vw] font-light leading-[0.89] tracking-[-0.065em] sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem]">

                <span className="block">
                  Confident
                </span>

                <span className="block">

                  <span className="text-white/90">
                    Smiles
                  </span>

                  <span className="text-dental-yellow">
                    {" "}Matter.
                  </span>

                </span>

              </h1>


              {/* ─────────────────────────────
                  STATIC STATS
              ───────────────────────────── */}

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-9">

                <div className="flex items-center gap-2">

                  <div className="flex">

                    {[1, 2, 3, 4, 5].map((star) => (

                      <Star
                        key={star}
                        className="h-3 w-3 fill-dental-yellow text-dental-yellow"
                      />

                    ))}

                  </div>

                  <span className="text-xs text-white/75">
                    4.9 · 211 Reviews
                  </span>

                </div>


                <span className="hidden h-4 w-px bg-white/25 sm:block" />


                <span className="text-xs text-white/65">
                  10,000+ Happy Patients
                </span>


                <span className="hidden h-4 w-px bg-white/25 sm:block" />


                <span className="text-xs text-white/65">
                  15+ Years Experience
                </span>

              </div>


              {/* ─────────────────────────────
                  STATIC CTA
              ───────────────────────────── */}

              <div className="mt-7">

                <Link
                  href="/book-appointment"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-xs font-medium text-black transition-all hover:bg-dental-yellow"
                >

                  Book Appointment

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:translate-x-1">

                    <ArrowUpRight className="h-3 w-3" />

                  </span>

                </Link>

              </div>

            </motion.div>

          </div>

        </div>


        {/* ─────────────────────────────────────────
            BOTTOM INFO — STATIC
        ───────────────────────────────────────── */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
            duration: 0.6,
          }}
          className="flex items-center justify-between border-t border-white/20 py-4"
        >

          <div className="flex items-center gap-3">

            <span className="h-1.5 w-1.5 rounded-full bg-dental-yellow shadow-[0_0_10px_rgba(247,247,0,0.9)]" />

            <span className="text-[10px] text-white/60 sm:text-xs">
              11-C, 9th 3rd Zamzama Commercial Lane, behind OKRA restaurant, DHA Phase 5 Karachi, Pakistan
            </span>

          </div>


          <a
            href="tel:+923348222296"
            className="group flex items-center gap-2 text-[10px] text-white/65 transition hover:text-white sm:text-xs"
          >

            <Phone className="h-3.5 w-3.5" />

            <span>
              +92 334 8222296
            </span>

            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />

          </a>

        </motion.div>

      </div>


      {/* ─────────────────────────────────────────
          SLIDE INDICATORS
      ───────────────────────────────────────── */}

      <div className="absolute bottom-20 right-5 z-20 flex items-center gap-2 sm:right-8 lg:right-12">

        {slides.map((_, index) => (

          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="group relative h-5 w-8"
          >

            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/30" />

            {index === currentSlide && (

              <motion.span
                layoutId="activeSlide"
                className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-dental-yellow"
                transition={{
                  duration: 0.4,
                }}
              />

            )}

          </button>

        ))}

      </div>

    </section>
  );
};