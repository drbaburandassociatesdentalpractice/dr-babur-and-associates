"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 border-b border-gray-100">

      {/* ───────────────── BACKGROUND ───────────────── */}

      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#6E9CCE]/10 blur-3xl" />

      {/* ───────────────── CONTAINER ───────────────── */}

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

        {/* ───────────────── TOP ───────────────── */}

        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-end">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#6E9CCE]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-500">
                About Dr. Babur & Associates
              </span>
            </div>

            <h2 className="max-w-5xl text-[13vw] font-light leading-[0.82] tracking-[-0.065em] text-[#111827] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem]">
              Dentistry with
              <br />
              <span className="text-[#6E9CCE]">purpose.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="lg:pb-2"
          >
            <p className="text-sm leading-7 text-gray-500 sm:text-base">
              Where modern dentistry meets genuine care. We believe
              exceptional dental treatment should feel personal,
              comfortable and built around you.
            </p>
          </motion.div>

        </div>

        {/* ───────────────── MAIN CONTENT ───────────────── */}

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-[1.15fr_0.85fr]">

          {/* ───────────── IMAGE ───────────── */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-200 sm:aspect-[16/9]">
              <Image
                src="/assets/images/about-dental.jpg"
                alt="Dr. Babur & Associates Dental Practice"
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover transition-transform duration-1000 hover:scale-[1.025]"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Experience badge */}
              <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
                <div className="border border-white/20 bg-black/20 px-5 py-4 backdrop-blur-xl sm:px-6">
                  <p className="text-3xl font-light tracking-[-0.04em] text-white sm:text-4xl">
                    15+
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/60">
                    Years of experience
                  </p>
                </div>
              </div>
            </div>

            {/* Small decorative number */}
            <span className="absolute -bottom-7 right-0 hidden text-[8rem] font-light leading-none tracking-[-0.08em] text-[#6E9CCE]/10 lg:block">
              01
            </span>
          </motion.div>

          {/* ───────────── CONTENT ───────────── */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="flex flex-col justify-between lg:pl-8"
          >
            <div>
              <p className="max-w-xl text-xl font-light leading-relaxed tracking-[-0.02em] text-gray-800 sm:text-2xl lg:text-[2rem] lg:leading-[1.3]">
                Your smile is more than just an appearance. It's part
                of how you communicate, connect and experience life.
              </p>

              <div className="mt-8 space-y-5 text-sm leading-7 text-gray-500">
                <p>
                  At Dr. Babur &amp; Associates Dental Practice, we combine
                  advanced dental techniques with a patient-first
                  approach to create treatment experiences that are
                  precise, comfortable and personalized.
                </p>
                <p>
                  From routine preventive care to advanced restorative,
                  cosmetic and surgical treatments, our team brings
                  together multiple areas of dental expertise under
                  one roof.
                </p>
              </div>
            </div>

            {/* ───────────── CTA ───────────── */}

            <div className="mt-10">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 rounded-full bg-[#111827] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#6E9CCE]"
              >
                Discover our story
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ───────────────── VALUES ───────────────── */}

        <div className="mt-16 border-t border-gray-200 lg:mt-24">
          <div className="grid sm:grid-cols-3">

            {/* Item 01 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="border-b py-7 sm:border-b-0 sm:border-r sm:pr-8"
            >
              <span className="text-[10px] tracking-[0.2em] text-[#6E9CCE]">
                01
              </span>
              <h3 className="mt-4 text-lg font-medium text-[#111827]">
                Patient First
              </h3>
              <p className="mt-2 max-w-xs text-xs leading-6 text-gray-500">
                Every treatment begins by understanding you,
                your needs and your goals.
              </p>
            </motion.div>

            {/* Item 02 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="border-b py-7 sm:border-b-0 sm:border-r sm:px-8"
            >
              <span className="text-[10px] tracking-[0.2em] text-[#6E9CCE]">
                02
              </span>
              <h3 className="mt-4 text-lg font-medium text-[#111827]">
                Modern Dentistry
              </h3>
              <p className="mt-2 max-w-xs text-xs leading-6 text-gray-500">
                Advanced techniques and modern treatment
                approaches for better outcomes.
              </p>
            </motion.div>

            {/* Item 03 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="py-7 sm:pl-8"
            >
              <span className="text-[10px] tracking-[0.2em] text-[#6E9CCE]">
                03
              </span>
              <h3 className="mt-4 text-lg font-medium text-[#111827]">
                Complete Care
              </h3>
              <p className="mt-2 max-w-xs text-xs leading-6 text-gray-500">
                Multiple dental specialties working together
                for comprehensive care.
              </p>
            </motion.div>

          </div>
        </div>

      </div>

    </section>
  );
};