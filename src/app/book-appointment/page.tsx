import { Metadata } from "next";
import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { AppointmentForm } from "@/components/home/appointment-form";

export const metadata: Metadata = {
  title: "Book an Appointment | Dr. Babur & Associates",
  description:
    "Book your dental appointment with Dr. Babur & Associates in DHA Phase 5, Karachi.",
};

const appointmentInfo = [
  {
    icon: Clock,
    label: "Clinic Hours",
    value: "Mon – Sat",
    detail: "9:00 AM – 9:00 PM",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "DHA Phase 5",
    detail: "Karachi, Pakistan",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+92 300 1234567",
    detail: "Available during clinic hours",
  },
];

export default function BookAppointmentPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA]">
{/* =====================================================
    HERO / BANNER
===================================================== */}

<section className="relative overflow-hidden bg-black">

  {/* Banner Image */}

  <Image
    src="/assets/images/appointment-banner.jpg"
    alt="Dental consultation and appointment"
    fill
    priority
    sizes="100vw"
    className="object-cover object-center"
  />

  {/* Dark overlay */}

  <div
    aria-hidden="true"
    className="absolute inset-0 bg-black/55"
  />

  {/* Brand tint */}

  <div
    aria-hidden="true"
    className="absolute inset-0 bg-[#6E9CCE]/10"
  />

  {/* Content */}

  <div className="
    relative
    mx-auto
    flex
    max-w-7xl
    items-center
    px-5
    pb-16
    pt-[140px]
    sm:px-8
    sm:pb-20
    sm:pt-[150px]
    lg:px-10
    lg:pb-24
    lg:pt-40
  ">

    <div className="max-w-3xl">

      {/* Eyebrow */}

      <div className="mb-4 flex items-center gap-3 sm:mb-5">

        <span className="h-px w-7 bg-[#6E9CCE] sm:w-8" />

        <span className="
          text-[9px]
          font-medium
          uppercase
          tracking-[0.25em]
          text-white/80
          sm:text-[10px]
          sm:tracking-[0.28em]
        ">
          Appointments
        </span>

      </div>


      {/* Heading */}

      <h1 className="
        max-w-3xl
        text-[2.35rem]
        font-light
        leading-[1.05]
        tracking-[-0.045em]
        text-white
        sm:text-5xl
        lg:text-6xl
      ">
        Your healthier smile{" "}
        <span className="sm:block">
          starts with a visit.
        </span>
      </h1>


      {/* Description */}

      <p className="
        mt-5
        max-w-xl
        text-sm
        leading-6
        text-white/70
        sm:mt-6
        sm:text-base
        sm:leading-7
      ">
        Schedule an appointment with our dental team at
        Dr. Babur & Associates. Choose your preferred
        dentist, treatment, date, and time — we'll take
        care of the rest.
      </p>

    </div>

  </div>

</section>

      {/* =====================================================
          APPOINTMENT AREA
      ===================================================== */}

      <section
        aria-labelledby="appointment-heading"
        className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      >
        <div
          className="
          grid
          grid-cols-1
          gap-10
          lg:grid-cols-[0.7fr_1.3fr]
          lg:items-start
          lg:gap-16
        "
        >
          {/* LEFT CONTENT */}

          <div className="lg:sticky lg:top-24">
            <p
              id="appointment-heading"
              className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#6E9CCE]"
            >
              Start here
            </p>

            <h2
              className="
              mt-3
              text-3xl
              font-light
              leading-tight
              tracking-[-0.035em]
              text-black
              sm:text-4xl
            "
            >
              Tell us how
              <br />
              we can help.
            </h2>

            <p
              className="
              mt-4
              max-w-md
              text-sm
              leading-6
              text-black/45
            "
            >
              Fill in your details and select a convenient appointment time. Our
              team will contact you to confirm your booking.
            </p>

            {/* Quick information */}

            <div className="mt-8 border-t border-black/10">
              {appointmentInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="
                      flex
                      items-start
                      gap-4
                      border-b
                      border-black/10
                      py-5
                    "
                  >
                    <div
                      className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#6E9CCE]/10
                      text-[#6E9CCE]
                    "
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.2em]
                        text-black/35
                      "
                      >
                        {item.label}
                      </p>

                      <p
                        className="
                        mt-1
                        text-sm
                        font-medium
                        text-black
                      "
                      >
                        {item.value}
                      </p>

                      <p
                        className="
                        mt-0.5
                        text-xs
                        text-black/40
                      "
                      >
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Small note */}

            <div
              className="
              mt-6
              rounded-2xl
              bg-black/[0.025]
              p-4
            "
            >
              <p className="text-xs leading-5 text-black/45">
                <span className="font-medium text-black">
                  Need help choosing a treatment?
                </span>{" "}
                Don't worry. You can mention your concern in the message field
                and our team will guide you.
              </p>
            </div>
          </div>

          {/* FORM */}

          <div>
            <AppointmentForm />
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="border-t border-black/[0.06] bg-white">
        <div
          className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          gap-6
          px-5
          py-12
          sm:px-8
          lg:flex-row
          lg:items-center
          lg:justify-between
          lg:px-10
          lg:py-14
        "
        >
          <div>
            <p
              className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.25em]
              text-[#6E9CCE]
            "
            >
              Have a question?
            </p>

            <h2
              className="
              mt-2
              text-2xl
              font-light
              tracking-[-0.03em]
              text-black
              sm:text-3xl
            "
            >
              We're happy to help.
            </h2>
          </div>

          <a
            href="tel:+923001234567"
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-3
              rounded-full
              border
              border-black/10
              bg-white
              px-5
              py-3
              text-sm
              font-medium
              text-black
              transition-all
              hover:border-[#6E9CCE]
              hover:bg-[#6E9CCE]
              hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#6E9CCE]
              focus-visible:ring-offset-2
            "
          >
            Call the clinic
            <span
              className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              bg-black
              text-white
              transition-transform
              group-hover:translate-x-1
              group-hover:bg-white
              group-hover:text-black
            "
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
