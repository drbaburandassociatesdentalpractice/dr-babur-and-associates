import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  MapPin,
  Stethoscope,
  Plane,
  Heart,
  Compass,
} from "lucide-react";

export const metadata = {
  title: "Dr. Kashif Naqvi | Dr. Babur & Associates",
  description:
    "Learn more about Dr. Kashif Naqvi, his qualifications, clinical expertise, and approach to dental care.",
};

const expertise = [
  "Oral Surgery",
  "Dental Implants",
  "Surgical Procedures",
  "Wisdom Tooth Extraction",
  "Bone Grafting",
  "Full-Arch Rehabilitation",
];

const qualifications = [
  {
    title: "BDS (Khi)",
    description: "Bachelor of Dental Surgery, Karachi",
  },
  {
    title: "FDS RCS (UK)",
    description: "Fellow of the Royal College of Surgeons, Edinburgh, UK",
  },
];

const experience = [
  {
    period: "Present",
    role: "Consultant Oral Surgeon",
    organization: "Dr. Babur & Associates, Karachi",
  },
  {
    period: "Present",
    role: "Visiting Consultant",
    organization: "Smile Savers",
  },
  {
    period: "Post-Graduation",
    role: "Oral Surgery Training",
    organization: "United Kingdom",
  },
];

export default function DrKashifNaqviPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ───────────────── HERO ───────────────── */}
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden="true"
          className="absolute right-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-[#6E9CCE]/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[-180px] left-[-180px] h-[420px] w-[420px] rounded-full bg-[#6E9CCE]/5 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-36 lg:px-10 lg:pb-20 lg:pt-40">
          {/* Breadcrumb */}
          <div className="mb-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-black/35">
            <Link href="/" className="transition-colors hover:text-[#6E9CCE]">
              Home
            </Link>
            <span>/</span>
            <Link href="/doctors" className="transition-colors hover:text-[#6E9CCE]">
              Doctors
            </Link>
            <span>/</span>
            <span className="text-black/60">Dr. Kashif Naqvi</span>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* Doctor Image */}
            <div className="relative mx-auto w-full max-w-[480px] lg:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#EEF2F6]">
                <Image
                  src="/assets/doctors/Dr Kashif Naqvi.png"
                  alt="Dr. Kashif Naqvi"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover"
                />
              </div>

              {/* Experience badge */}
              <div className="absolute bottom-5 left-5 rounded-2xl border border-white/20 bg-black/80 px-5 py-4 text-white backdrop-blur-md">
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/50">
                  Experience
                </p>
                <p className="mt-1 text-sm font-medium">15+ Years</p>
              </div>
            </div>

            {/* Doctor Intro */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[#6E9CCE]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#6E9CCE]">
                  Meet your surgeon
                </span>
              </div>

              <h1 className="text-4xl font-light leading-[1.05] tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
                Dr. Kashif
                <br />
                Naqvi.
              </h1>

              <p className="mt-5 text-base font-medium text-black/60">
                Consultant Oral Surgeon
              </p>

              <p className="mt-5 max-w-xl text-sm leading-7 text-black/45 sm:text-base">
                A BDS from Karachi, Dr. Kashif Naqvi went to the United Kingdom 
                for post-graduation in Oral Surgery and was conferred the degree 
                of FDS RCS from Edinburgh, UK. Dr. Naqvi is specialized in 
                Implants and Surgical procedures and is a visiting Consultant 
                at Smile Savers.
              </p>

              {/* Quick information */}
              <div className="mt-8 grid grid-cols-1 border-y border-black/10 sm:grid-cols-2">
                <div className="flex items-center gap-3 border-b border-black/10 py-4 sm:border-b-0 sm:border-r sm:pr-6">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6E9CCE]/10 text-[#6E9CCE]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.18em] text-black/35">
                      Practice
                    </p>
                    <p className="mt-1 text-sm font-medium text-black">
                      DHA Phase 5, Karachi
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-4 sm:pl-6">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6E9CCE]/10 text-[#6E9CCE]">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.18em] text-black/35">
                      Availability
                    </p>
                    <p className="mt-1 text-sm font-medium text-black">
                      Mon–Sat, 11:30AM–9PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Touch */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-black/40">
                  <Plane className="h-4 w-4 text-[#6E9CCE]" />
                  <span>Loves to travel</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-black/40">
                  <Compass className="h-4 w-4 text-[#6E9CCE]" />
                  <span>Enjoys sailing</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-black/40">
                  <Heart className="h-4 w-4 text-[#6E9CCE]" />
                  <span>Family-oriented</span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/appointments"
                  className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-[#6E9CCE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E9CCE] focus-visible:ring-offset-2"
                >
                  Book an appointment
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:translate-x-1">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
                <a
                  href="#about"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 px-6 text-sm font-medium text-black transition hover:border-[#6E9CCE] hover:text-[#6E9CCE]"
                >
                  About Dr. Kashif
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── EXPERTISE ───────────────── */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#6E9CCE]">
                Clinical expertise
              </p>
              <h2 className="mt-2 text-2xl font-light tracking-[-0.035em] text-black sm:text-3xl">
                Areas of expertise
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 lg:max-w-2xl lg:justify-end">
              {expertise.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2.5 text-xs text-black/60"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#6E9CCE]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── ABOUT ───────────────── */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#6E9CCE]">
              About the surgeon
            </p>
            <h2 className="mt-3 max-w-sm text-3xl font-light leading-tight tracking-[-0.04em] text-black sm:text-4xl">
              Precision in
              <br />
              surgical care.
            </h2>
          </div>

          <div className="max-w-3xl space-y-5 text-sm leading-7 text-black/55 sm:text-base">
            <p>
              Dr. Kashif Naqvi is a highly qualified Consultant Oral Surgeon 
              with a distinguished international background. After completing 
              his BDS from Karachi, he pursued post-graduation in Oral Surgery 
              in the United Kingdom, where he was conferred the prestigious 
              FDS RCS degree from Edinburgh, UK.
            </p>
            <p>
              With specialized expertise in Dental Implants and complex 
              Surgical Procedures, Dr. Naqvi brings advanced surgical 
              techniques to his patients. He is also a visiting Consultant 
              at Smile Savers, where he continues to contribute his expertise 
              to the broader dental community.
            </p>
            <p>
              Beyond his professional life, Dr. Kashif has an easy-going and 
              candid personality. He loves to travel, enjoys spending quality 
              time with his family, and finds peace in sailing during his 
              free time.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── QUALIFICATIONS + EXPERIENCE ───────────────── */}
      <section className="border-y border-black/10 bg-[#F8F9FA]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          {/* Qualifications */}
          <div className="border-b border-black/10 px-5 py-14 sm:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-20">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6E9CCE]/10 text-[#6E9CCE]">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-black/35">
                  Education
                </p>
                <h2 className="mt-1 text-xl font-light text-black">
                  Qualifications
                </h2>
              </div>
            </div>

            <div className="space-y-0">
              {qualifications.map((item, index) => (
                <div
                  key={item.title}
                  className="flex gap-5 border-t border-black/10 py-5"
                >
                  <span className="mt-1 text-[10px] font-medium text-[#6E9CCE]">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-medium text-black">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-black/40">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6E9CCE]/10 text-[#6E9CCE]">
                <Stethoscope className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-black/35">
                  Career
                </p>
                <h2 className="mt-1 text-xl font-light text-black">
                  Professional experience
                </h2>
              </div>
            </div>

            <div>
              {experience.map((item) => (
                <div
                  key={`${item.period}-${item.role}`}
                  className="relative flex gap-5 border-t border-black/10 py-5"
                >
                  <div className="flex w-28 shrink-0 items-start">
                    <span className="text-[10px] font-medium text-[#6E9CCE]">
                      {item.period}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-black">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-xs text-black/40">
                      {item.organization}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}