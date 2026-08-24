"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";

const faqs = [
  {
    question: "What dental services do you offer?",
    answer:
      "We offer comprehensive dental care including clear aligners, braces, cleaning, teeth whitening, cosmetic fillings, implants, root canals, tooth extractions, veneers, crowns and bridges, dentures, pediatric dentistry and tooth jewelry.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment through our online appointment form or contact our clinic directly. Our team will help you find a suitable date and time based on your treatment needs.",
  },
  {
    question: "Do you offer emergency dental treatment?",
    answer:
      "Yes. We provide emergency dental care for urgent problems such as severe tooth pain, dental trauma, swelling and other situations that require prompt attention.",
  },
  {
    question: "How often should I visit the dentist?",
    answer:
      "For most patients, a dental check-up every six months is recommended. However, your dentist may recommend more frequent visits depending on your oral health and treatment requirements.",
  },
  {
    question: "Do you offer braces and clear aligners?",
    answer:
      "Yes. We provide both traditional braces and clear aligner treatments. During your consultation, our dental team can assess your teeth and recommend the most suitable option for your smile.",
  },
  {
    question: "Do you treat children?",
    answer:
      "Yes. We provide pediatric dentistry with a focus on making dental visits comfortable, positive and age-appropriate for children.",
  },
  {
    question: "What should I expect during my first visit?",
    answer:
      "Your first visit typically begins with a consultation and examination. We discuss your concerns, assess your oral health and explain suitable treatment options before moving forward.",
  },
  {
    question: "Where is the clinic located?",
    answer:
      "Dr. Babur & Associates Dental Practice is located at 11-C, 9th 3rd Zamzama Commercial Lane, behind OKRA restaurant, DHA Phase 5, Karachi.",
  },
];

export const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="relative overflow-hidden bg-gray-50 py-24 sm:py-28 lg:py-36">

      <div className="mx-auto max-w-375 px-5 sm:px-8 lg:px-12">

        {/* ───────────────── HEADER ───────────────── */}

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{
              duration: 0.7,
            }}
          >

            <div className="mb-6 flex items-center gap-3">

              <span className="h-px w-8 bg-[#6E9CCE]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400">
                Frequently Asked Questions
              </span>

            </div>


            <h2 className="max-w-xl text-5xl font-light leading-[0.88] tracking-[-0.055em] text-[#111827] sm:text-6xl lg:text-7xl">

              Everything
              <br />

              <span className="text-[#6E9CCE]">
                you need to know.
              </span>

            </h2>


            <p className="mt-7 max-w-sm text-sm leading-7 text-gray-500">
              Have a question about your treatment, appointment or
              dental care? Find some of the answers our patients ask
              most often.
            </p>


            {/* Small contact prompt */}

            <div className="mt-10 hidden border-t border-gray-200 pt-5 lg:block">

              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                Still have questions?
              </p>

              <a
                href="tel:+923348222296"
                className="group mt-3 flex w-fit items-center gap-2 text-sm font-medium text-[#111827]"
              >

                Speak with our team

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6E9CCE] text-white transition-transform duration-300 group-hover:translate-x-1">

                  <ArrowUpRight className="h-3.5 w-3.5" />

                </span>

              </a>

            </div>

          </motion.div>


          {/* ───────────────── FAQ LIST ───────────────── */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{
              delay: 0.1,
              duration: 0.7,
            }}
            className="border-t border-gray-200"
          >

            {faqs.map((faq, index) => {

              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-gray-200"
                >

                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
                  >

                    <div className="flex items-start gap-5 sm:gap-7">

                      <span
                        className={`pt-1 text-[9px] font-medium tracking-[0.15em] transition-colors duration-300 ${
                          isOpen
                            ? "text-[#6E9CCE]"
                            : "text-gray-300"
                        }`}
                      >
                        0{index + 1}
                      </span>

                      <span
                        className={`text-sm font-medium transition-colors duration-300 sm:text-base ${
                          isOpen
                            ? "text-[#111827]"
                            : "text-gray-600 group-hover:text-[#111827]"
                        }`}
                      >
                        {faq.question}
                      </span>

                    </div>


                    {/* Plus icon */}

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-[#6E9CCE] bg-[#6E9CCE] text-white"
                          : "border-gray-200 text-gray-400 group-hover:border-[#6E9CCE] group-hover:text-[#6E9CCE]"
                      }`}
                    >

                      <Plus
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />

                    </span>

                  </button>


                  {/* Answer */}

                  <AnimatePresence initial={false}>

                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                        className="overflow-hidden"
                      >

                        <div className="pb-6 pl-12 pr-10 sm:pl-16">

                          <p className="max-w-2xl text-xs leading-7 text-gray-500 sm:text-sm">
                            {faq.answer}
                          </p>

                        </div>

                      </motion.div>
                    )}

                  </AnimatePresence>

                </div>
              );
            })}

          </motion.div>

        </div>


        {/* ───────────────── MOBILE CONTACT ───────────────── */}

        <div className="mt-10 border-t border-gray-200 pt-6 lg:hidden">

          <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
            Still have questions?
          </p>

          <a
            href="tel:+923348222296"
            className="group mt-3 flex w-fit items-center gap-2 text-sm font-medium text-[#111827]"
          >

            Speak with our team

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6E9CCE] text-white transition-transform duration-300 group-hover:translate-x-1">

              <ArrowUpRight className="h-3.5 w-3.5" />

            </span>

          </a>

        </div>  

      </div>

    </section>
  );
};