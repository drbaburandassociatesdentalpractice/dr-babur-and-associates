"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const doctors = [
  {
    number: "01",
    name: "Dr. Babur Ashraf",
    specialty: "Orthodontist & General Dentist",
    image: "/assets/doctors/Dr Babur Ashraf.png",
    href: "/doctors/drbaburashraf",
  },
  {
    number: "02",
    name: "Dr. Haroon Ashraf",
    specialty: "Endodontist & Restorative Dentist",
    image: "/assets/doctors/Dr Haroon Ashraf.png",
    href: "/doctors/drharoonashraf",
  },
  {
    number: "03",
    name: "Dr. Kashif Naqvi",
    specialty: "Oral Surgeon",
    image: "/assets/doctors/Dr Kashif Naqvi.png",
    href: "/doctors/drkashifnaqvi",
  },
  {
    number: "04",
    name: "Dr. Laiba Ishaque",
    specialty: "General Dentist",
    image: "/assets/doctors/Dr Laiba Ishaq.png",
    href: "/doctors/drlaibaishaque",
  },
  {
    number: "05",
    name: "Dr. Jannat Vohra",
    specialty: "General Dentist",
    image: "/assets/doctors/Dr Jannat Vohra.png",
    href: "/doctors/drjannatvohra",
  },
];

export const DoctorsSection = () => {
  return (
    <section
      id="doctors"
      className="relative overflow-hidden bg-gray-50 py-20 border-t border-gray-200"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#6E9CCE]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-[#6E9CCE]/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#6E9CCE]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-500">
                Our Doctors
              </span>
            </div>

            <h2 className="max-w-4xl text-[13vw] font-light leading-[0.82] tracking-[-0.065em] text-[#111827] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem]">
              Meet the
              <br />
              <span className="text-[#6E9CCE]">specialists.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              delay: 0.15,
              duration: 0.7,
            }}
            className="lg:pb-2"
          >
            <p className="max-w-md text-sm leading-7 text-gray-500 sm:text-base">
              A team of experienced dental professionals dedicated to delivering
              precise treatment, modern dentistry and care designed around every
              patient.
            </p>
          </motion.div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-5 pt-28">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-50px",
              }}
              transition={{
                delay: index * 0.08,
                duration: 0.65,
                ease: "easeOut",
              }}
              className="group border-b border-gray-200 sm:border-r lg:border-b-0"
            >
              <Link href={doctor.href} className="relative block">
                {/* Image */}
                <div className="relative aspect-[0.78] overflow-hidden bg-[#e9edf0]">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover object-center grayscale-[15%] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/5 opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                  <div className="absolute left-5 top-5">
                    <span className="text-[10px] font-medium tracking-[0.2em] text-white/70">
                      {doctor.number}
                    </span>
                  </div>

                  <div className="absolute right-4 top-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <p className="mb-2 text-[8px] font-medium uppercase tracking-[0.2em] text-[#9ec7ef]">
                      {doctor.specialty}
                    </p>
                    <h3 className="text-lg font-medium tracking-[-0.02em] text-white sm:text-xl">
                      {doctor.name}
                    </h3>
                  </div>
                </div>

                {/* Bottom Meta */}
                <div className="flex items-center justify-between px-4 py-4 sm:px-5">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-gray-400">
                    Dental Specialist
                  </span>
                  <span className="h-px w-0 bg-[#6E9CCE] transition-all duration-500 group-hover:w-8" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};