"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Clear Aligners",
    icon: "/assets/vector/clear-aligners.svg",
  },
  {
    number: "02",
    title: "Braces",
    icon: "/assets/vector/braces.svg",
  },
  {
    number: "03",
    title: "Cleaning",
    icon: "/assets/vector/cleaning.svg",
  },
  {
    number: "04",
    title: "Teeth Whitening",
    icon: "/assets/vector/teeth-whitening.svg",
  },
  {
    number: "05",
    title: "Cosmetic Fillings",
    icon: "/assets/vector/cosmetic-fillings.svg",
  },
  {
    number: "06",
    title: "Implants",
    icon: "/assets/vector/implants.svg",
  },
  {
    number: "07",
    title: "Root Canals",
    icon: "/assets/vector/root-canals.svg",
  },
  {
    number: "08",
    title: "Tooth Extractions",
    icon: "/assets/vector/tooth-extractions.svg",
  },
  {
    number: "09",
    title: "Veneers",
    icon: "/assets/vector/veneers.svg",
  },
  {
    number: "10",
    title: "Crown & Bridges",
    icon: "/assets/vector/crowns-bridges.svg",
  },
  {
    number: "11",
    title: "Dentures",
    icon: "/assets/vector/dentures.svg",
  },
  {
    number: "12",
    title: "Pediatric Dentistry",
    icon: "/assets/vector/pediatric-dentistry.svg",
  },
  {
    number: "13",
    title: "Tooth Jewelry",
    icon: "/assets/vector/tooth-jewelry.svg",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="bg-white text-[#0b0b0b]">
      {/* ─────────────────────────────
          HEADER
      ───────────────────────────── */}

      <div className="mx-auto max-w-[1500px] px-5 pt-24 sm:px-8 sm:pt-28 lg:px-12 lg:pt-36">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#6E9CCE]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/40">
                Our Services
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
              className="text-[16vw] font-light leading-[0.8] tracking-[-0.07em] sm:text-7xl md:text-8xl lg:text-[9rem]"
            >
              Complete
              <br />
              <span className="text-black/20">care.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="max-w-sm lg:pb-2"
          >
            <p className="text-sm leading-7 text-black/45">
              From preventive care to advanced cosmetic and
              restorative treatments, everything your smile needs
              under one roof.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─────────────────────────────
          SERVICE LIST
      ───────────────────────────── */}

      <div className="mx-auto mt-16 max-w-[1500px] px-5 sm:mt-20 sm:px-8 lg:mt-24 lg:px-12 pb-20">
        {/* Top information line */}
        <div className="mb-3 flex items-center justify-between border-b border-black/10 pb-3">
          <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-black/30">
            Treatments
          </span>
          <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-black/30">
            {services.length} Services
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.45,
                delay: Math.min(index * 0.035, 0.3),
              }}
            >
              <Link
                href="/services"
                className="group relative flex items-center border-b border-black/10 py-5 sm:py-6 transition-colors duration-300 hover:border-[#6E9CCE]/30"
              >
                {/* NUMBER */}
                <span className="w-10 shrink-0 text-[9px] font-medium tracking-[0.15em] text-black/25 transition-colors duration-300 group-hover:text-[#6E9CCE]">
                  {service.number}
                </span>

                {/* ICON */}
                <div className="mr-5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:border-[#6E9CCE] group-hover:bg-[#6E9CCE]">
                  <Image
                    src={service.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="h-4.5 w-4.5 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                  />
                </div>

                {/* TITLE */}
                <h3 className="flex-1 text-xl font-light tracking-[-0.035em] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#6E9CCE] sm:text-2xl">
                  {service.title}
                </h3>

                {/* ARROW */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:border-[#6E9CCE] group-hover:bg-[#6E9CCE] group-hover:text-white">
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};