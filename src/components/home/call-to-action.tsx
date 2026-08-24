"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const CallToAction = () => {
  return (
    <section className="relative">

      {/* ─────────────────────────────────────────
          CTA
      ───────────────────────────────────────── */}

      <div className="mx-auto px-5 py-24 border-t">

        <div className="relative overflow-hidden rounded-[28px] bg-[#6E9CCE] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">

          {/* Decorative circles */}

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/15" />

          <div className="pointer-events-none absolute -bottom-32 right-20 h-80 w-80 rounded-full border border-white/10" />

          <div className="pointer-events-none absolute -bottom-40 -left-32 h-72 w-72 rounded-full border border-white/10" />


          {/* Content */}

          <div className="relative z-10 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

            {/* Heading */}

            <div>

              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.3em] text-white/60">
                Ready when you are
              </p>

              <h2 className="max-w-3xl text-5xl font-light leading-[0.9] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
                Your best
                <br />
                smile starts here.
              </h2>

            </div>


            {/* CTA Button */}

            <Link
              href="/appointments"
              className="group inline-flex w-fit shrink-0 items-center gap-4 rounded-full bg-white px-6 py-3.5 text-xs font-medium text-black transition-all duration-300 hover:bg-black hover:text-white"
            >

              Book Appointment

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">

                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />

              </span>

            </Link>

          </div>

        </div>

      </div>

    </section>
  );
};