"use client";

"use client";

import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/constants/nav-links";

export const Map = () => {
  return (
    <section className="relative overflow-hidden bg-[#080808]">

      {/* ───────────────── HEADER ───────────────── */}

      <div className="mx-auto max-w-375 px-5 pb-10 pt-20 sm:px-8 sm:pb-12 sm:pt-24 lg:px-12 lg:pb-14 lg:pt-28">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>

            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/35 sm:text-xs">
              Find Us
            </p>

            <h2 className="max-w-3xl text-5xl font-light leading-[0.9] tracking-tighter text-white sm:text-6xl lg:text-8xl">
              Visit our
              <span className="text-white/35"> practice.</span>
            </h2>

          </div>

          <p className="max-w-xs text-xs leading-relaxed text-white/40 md:pb-2">
            Conveniently located in DHA Phase 5, Karachi.
            We are here when your smile needs us.
          </p>

        </div>

      </div>


      {/* ───────────────── MAP ───────────────── */}

      <div className="relative w-full px-3 pb-3 sm:px-5 sm:pb-5 lg:px-8 lg:pb-8">

        <div className="relative h-125 overflow-hidden rounded-[24px] sm:h-137.5g:h-[600px]">

          {/* Google Map */}

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1881.7551793190971!2d67.03997056566175!3d24.818062198569056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33db1fab11417%3A0x3d597b0590de18b4!2sDr.%20Babur%20%26%20Associates%20Dental%20Practice!5e0!3m2!1sen!2s!4v1786893994760!5m2!1sen!2s"
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />


          {/* Dark edge gradient */}

          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-black/20" />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/60 to-transparent" />


          {/* ───────────── LOCATION CARD ───────────── */}

          <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-auto">

            

          </div>

        </div>

      </div>



    </section>
  );
};