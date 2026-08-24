"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Doctors", href: "/#doctors" },
  { name: "Gallery", href: "/#gallery" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    if (!href.includes("#")) return;

    const [path, hash] = href.split("#");
    const isSamePage = path === "" || path === "/" || path === pathname;
    if (!isSamePage) return;

    const element = document.getElementById(hash);
    if (!element) return;

    e.preventDefault();
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav
        aria-label="Primary navigation"
        className={`h-20 w-full border-b border-gray-100 bg-white transition-all duration-300 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-12">
          {/* LOGO */}
          <Link
            href="/"
            aria-label="Dr. Babur & Associates Dental Practice — Home"
            onClick={() => setOpen(false)}
            className="group flex h-14 w-[200px] shrink-0 items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#6E9CCE] focus-visible:ring-offset-2"
          >
            <div className="relative h-12 w-[180px] sm:h-14 sm:w-[200px]">
              <Image
                src="/Assets/vector/Dr Babur & Associates Dental Practice.svg"
                alt=""
                fill
                priority
                sizes="200px"
                className="object-contain object-left transition-all duration-300 brightness-0"
              />
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navItems.map((item) => {
              const isActive = item.href === "/" && pathname === "/";
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleHashLink(e, item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2.5 text-[13px] font-medium tracking-[-0.01em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#6E9CCE] focus-visible:ring-offset-2 ${
                    isActive
                      ? "text-[#173782]"
                      : "text-gray-600 hover:text-[#173782]"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#173782]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* DESKTOP ACTION */}
          <div className="hidden lg:flex lg:items-center">
            <Link
              href="/book-appointment"
              className="group flex h-10 items-center gap-2 rounded-full bg-[#173782] px-4 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#22255C] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173782] focus-visible:ring-offset-2"
            >
              Book Appointment
              <span
                aria-hidden="true"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#173782] transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </Link>
          </div>

          {/* MOBILE MENU */}
          <div className="flex items-center lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={open}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 outline-none transition-all duration-300 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-[#173782] focus-visible:ring-offset-2"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="flex w-[min(88vw,390px)] flex-col border-l border-gray-100 bg-white p-0"
              >
                <SheetHeader className="border-b border-gray-100 px-6 pb-5 pt-6">
                  <SheetTitle className="text-left">
                    <Link
                      href="/"
                      onClick={() => setOpen(false)}
                      aria-label="Dr. Babur & Associates — Home"
                      className="inline-flex rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#173782] focus-visible:ring-offset-2"
                    >
                      <div className="relative h-12 w-[180px]">
                        <Image
                          src="/Assets/vector/Dr Babur & Associates Dental Practice.svg"
                          alt=""
                          fill
                          sizes="180px"
                          className="object-contain object-left brightness-0"
                        />
                      </div>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                {/* MOBILE LINKS */}
                <div className="flex flex-1 flex-col px-6 py-6">
                  <div className="flex flex-col">
                    {navItems.map((item) => {
                      const isActive = item.href === "/" && pathname === "/";
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={(e) => handleHashLink(e, item.href)}
                          aria-current={isActive ? "page" : undefined}
                          className={`group flex min-h-14 items-center justify-between border-b border-gray-100 text-lg font-light tracking-[-0.02em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#173782] focus-visible:ring-offset-2 ${
                            isActive
                              ? "text-[#173782]"
                              : "text-gray-600 hover:text-[#173782]"
                          }`}
                        >
                          <span>{item.name}</span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className={`h-4 w-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                              isActive
                                ? "text-[#173782]"
                                : "text-gray-300 group-hover:text-[#173782]"
                            }`}
                          />
                        </Link>
                      );
                    })}
                  </div>

                  {/* MOBILE CTA */}
                  <div className="mt-auto border-t border-gray-100 pt-6">
                    <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-gray-400">
                      Dental Practice
                    </p>
                    <p className="mt-2 text-sm text-gray-500">DHA Phase 5, Karachi</p>

                    <Link
                      href="/book-appointment"
                      onClick={() => setOpen(false)}
                      className="group mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-full bg-[#173782] text-sm font-medium text-white transition-all duration-300 hover:bg-[#22255C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173782] focus-visible:ring-offset-2"
                    >
                      Book an Appointment
                      <span
                        aria-hidden="true"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#173782] transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;