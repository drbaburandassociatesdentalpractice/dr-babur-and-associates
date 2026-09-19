export const dentists = [
  {
    value: "dr-babur",
    label: "Dr. Babur Ashraf Quraishi",
  },
  {
    value: "dr-haroon",
    label: "Dr. Haroon Ashraf",
  },
] as const;

export const services = [
  // ─────────────────────────────────────────
  // ORTHODONTICS — DR. BABUR
  // ─────────────────────────────────────────

  {
    value: "orthodontic-consultation",
    label: "Orthodontic Consultation",
  },
  {
    value: "braces",
    label: "Braces",
  },
  {
    value: "clear-aligners",
    label: "Clear Aligners",
  },
  {
    value: "bite-correction",
    label: "Bite & Jaw Alignment",
  },
  {
    value: "retainers",
    label: "Retainers",
  },

  // ─────────────────────────────────────────
  // GENERAL DENTISTRY — DR. HAROON
  // ─────────────────────────────────────────

  {
    value: "general-checkup",
    label: "General Dental Checkup",
  },
  {
    value: "teeth-cleaning",
    label: "Teeth Cleaning & Polishing",
  },
  {
    value: "dental-fillings",
    label: "Dental Fillings",
  },
  {
    value: "crowns",
    label: "Dental Crowns",
  },
  {
    value: "bridges",
    label: "Dental Bridges",
  },
  {
    value: "root-canal",
    label: "Root Canal Treatment",
  },
  {
    value: "tooth-extraction",
    label: "Tooth Extraction",
  },
  {
    value: "gum-treatment",
    label: "Gum Treatment",
  },
  {
    value: "tooth-sensitivity",
    label: "Tooth Sensitivity & Pain",
  },
] as const;

/**
 * Treatments available for each dentist.
 */

// Dr. Babur Ashraf Quraishi
// Orthodontics & tooth alignment
export const dentistServices = {
  "dr-babur": [
    "orthodontic-consultation",
    "braces",
    "clear-aligners",
    "bite-correction",
    "retainers",
  ],

  // Dr. Haroon Ashraf
  // General & restorative dentistry
  "dr-haroon": [
    "general-checkup",
    "teeth-cleaning",
    "dental-fillings",
    "crowns",
    "bridges",
    "root-canal",
    "tooth-extraction",
    "gum-treatment",
    "tooth-sensitivity",
  ],
} as const;

/**
 * Days when each dentist is unavailable.
 *
 * JavaScript day numbers:
 * Sunday    = 0
 * Monday    = 1
 * Tuesday   = 2
 * Wednesday = 3
 * Thursday  = 4
 * Friday    = 5
 * Saturday  = 6
 */
export const unavailableWeekdays = {
  // Sunday, Wednesday, Saturday
  "dr-babur": [0, 3, 6],

  // Sunday
  "dr-haroon": [0],
} as const;

/**
 * Online appointment time slots.
 *
 * Available appointment window:
 * 4:00 PM – 7:00 PM
 */
export const timeSlots = [
  "4:00 PM",
  "4:15 PM",
  "4:30 PM",
  "4:45 PM",
  "5:00 PM",
  "5:15 PM",
  "5:30 PM",
  "5:45 PM",
  "6:00 PM",
  "6:15 PM",
  "6:30 PM",
  "6:45 PM",
  "7:00 PM",
] as const;

export type DentistValue =
  (typeof dentists)[number]["value"];

export type ServiceValue =
  (typeof services)[number]["value"];

export type TimeSlot =
  (typeof timeSlots)[number];