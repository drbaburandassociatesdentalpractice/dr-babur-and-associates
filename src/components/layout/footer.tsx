"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/constants/nav-links";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/#about" },
      { name: "Services", href: "/#services" },
      { name: "Doctors", href: "/#doctors" },
      { name: "Gallery", href: "/#gallery" },
    ],
  },
  {
    title: "Appointments",
    links: [{ name: "Book an Appointment", href: "/book-appointment" }],
  },
];

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-black/[0.08] bg-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#6E9CCE]/[0.07] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-40 h-[380px] w-[380px] rounded-full bg-[#6E9CCE]/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 gap-12 py-14 sm:py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12 lg:py-20">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" aria-label="Dr. Babur & Associates Dental Practice — Home" className="inline-flex outline-none focus-visible:ring-2 focus-visible:ring-[#6E9CCE] focus-visible:ring-offset-4">
              <div className="relative h-12 w-[190px]">
                <Image src="/assets/vector/Dr Babur & Associates Dental Practice.svg" alt="Dr. Babur & Associates Dental Practice" fill sizes="190px" className="object-contain object-left brightness-0" />
              </div>
            </Link>
            <p className="mt-6 text-sm leading-7 text-black/45">Modern dentistry with a focus on precision, comfort and personalized care for every smile.</p>
            <div className="mt-7 flex items-center gap-2">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:border-[#6E9CCE] hover:bg-[#6E9CCE]">
                <Image src="/assets/vector/Facebook.svg" alt="" width={17} height={17} className="object-contain" />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:border-[#6E9CCE] hover:bg-[#6E9CCE]">
                <Image src="/assets/vector/Instagram.svg" alt="" width={17} height={17} className="object-contain" />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-black/35">{group.title}</p>
              <div className="mt-5 flex flex-col items-start gap-3">
                {group.links.map((link) => (
                  <Link key={link.name} href={link.href} className="group inline-flex items-center gap-2 text-sm text-black/60 transition-colors hover:text-[#6E9CCE]">
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-black/35">Visit the Clinic</p>
            <div className="mt-5 flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6E9CCE]/10 text-[#6E9CCE]"><MapPin className="h-4 w-4" /></div>
                <div>
                  <p className="text-xs font-medium text-black">Location</p>
                  <p className="mt-1 text-xs leading-5 text-black/45">11-C, 9th 3rd Zamzama Commercial Lane, behind OKRA restaurant, DHA Phase 5<br />Karachi, Pakistan</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6E9CCE]/10 text-[#6E9CCE]"><Phone className="h-4 w-4" /></div>
                <div>
                  <p className="text-xs font-medium text-black">Phone</p>
                  <a href={`tel:${siteConfig.phone}`} className="mt-1 block text-xs text-black/45 transition-colors hover:text-[#6E9CCE]">+92 334 8222296</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6E9CCE]/10 text-[#6E9CCE]"><Mail className="h-4 w-4" /></div>
                <div>
                  <p className="text-xs font-medium text-black">Email</p>
                  <a href="mailto:info@drbaburandassociates.com" className="mt-1 block break-all text-xs text-black/45 transition-colors hover:text-[#6E9CCE]">info@drbaburandassociates.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6E9CCE]/10 text-[#6E9CCE]"><Clock3 className="h-4 w-4" /></div>
                <div>
                  <p className="text-xs font-medium text-black">Clinic Hours</p>
                  <p className="mt-1 text-xs leading-5 text-black/45">Monday – Saturday<br />4:00 PM – 7:00 PM<br /><span className="text-black/60">Sunday — Closed</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-2 border-t border-black/[0.08] py-5 text-[10px] text-black/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dr. Babur & Associates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;