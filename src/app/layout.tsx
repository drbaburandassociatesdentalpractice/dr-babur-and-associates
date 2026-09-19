import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Map } from "@/components/layout/map";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drbaburandassociatesdentalpractice.com"),

  title: {
    default: "Dr. Babur & Associates | Top Rated Dentist in DHA, Karachi",
    template: "%s | Dr. Babur & Associates",
  },

  description:
    "Dr. Babur & Associates is a dental practice in DHA Phase 5, Karachi, offering orthodontics, braces, clear aligners, dental implants, root canal treatment, teeth cleaning, crowns, and general dentistry.",

keywords: [
  // Local / high-intent
  "dentist DHA Phase 5 Karachi",
  "best dentist DHA Phase 5 Karachi",
  "dental clinic DHA Phase 5 Karachi",
  "dentist near DHA Phase 5 Karachi",
  "dentist in DHA Karachi",
  "dental clinic DHA Karachi",
  "dentist Karachi",
  "dental clinic Karachi",

  // Orthodontics
  "orthodontist DHA Phase 5 Karachi",
  "orthodontist DHA Karachi",
  "orthodontist Karachi",
  "braces dentist Karachi",
  "braces specialist Karachi",
  "braces in DHA Karachi",
  "braces DHA Phase 5 Karachi",
  "clear aligners Karachi",
  "clear aligners DHA Karachi",
  "clear aligners DHA Phase 5",
  "teeth straightening Karachi",
  "bite correction Karachi",
  "retainers Karachi",

  // General dentistry
  "general dentist DHA Karachi",
  "general dentist DHA Phase 5",
  "general dentistry Karachi",
  "dental checkup Karachi",
  "dental checkup DHA Karachi",
  "teeth cleaning Karachi",
  "teeth cleaning DHA Karachi",
  "dental fillings Karachi",
  "dental crowns Karachi",
  "dental bridges Karachi",
  "root canal dentist Karachi",
  "root canal treatment DHA Karachi",
  "tooth extraction Karachi",
  "gum treatment Karachi",

  // Cosmetic dentistry
  "cosmetic dentist Karachi",
  "cosmetic dentistry DHA Karachi",
  "cosmetic dentist DHA Phase 5",
  "teeth whitening Karachi",
  "teeth whitening DHA Karachi",
  "smile makeover Karachi",
  "smile makeover DHA Karachi",

  // Dental implants
  "dental implants Karachi",
  "dental implant dentist Karachi",
  "dental implants DHA Karachi",
  "implant dentist DHA Phase 5",
  "dental implant clinic Karachi",

  // Local / neighborhood intent
  "dentist near Clifton Karachi",
  "dentist near Sea View Karachi",
  "dentist near DHA Phase 5",
  "dental clinic near DHA Phase 5",
  "dentist near DHA Karachi",

  // Appointment intent
  "book dentist appointment Karachi",
  "book dentist appointment DHA",
  "dental appointment Karachi",
  "online dentist appointment Karachi",
],

  authors: [
    {
      name: "Dr. Babur & Associates Dental Practice",
    },
  ],

  creator: "Dr. Babur & Associates Dental Practice",
  publisher: "Dr. Babur & Associates Dental Practice",

  alternates: {
    canonical: "https://drbaburandassociatesdentalpractice.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/assets/icons/favicon.ico",
      },
      {
        url: "/assets/icons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/assets/icons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/assets/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/assets/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: {
      url: "/assets/icons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },

  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://drbaburandassociatesdentalpractice.com",
    siteName: "Dr. Babur & Associates Dental Practice",
    title: "Dr. Babur & Associates | Top Rated Dentist in DHA, Karachi",
    description:
      "Dental care in DHA Phase 5, Karachi, including orthodontics, braces, clear aligners, implants, root canal treatment, cosmetic dentistry, and general dental care.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dr. Babur & Associates Dental Practice, DHA Phase 5 Karachi",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dr. Babur & Associates Dental Practice | Top Rated Dentist in DHA, Karachi",
    description:
      "Dental care, orthodontics, braces, clear aligners, implants, and general dentistry in DHA Phase 5, Karachi.",
    images: ["/assets/og-image.png"],
  },

  category: "healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", poppins.variable)}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Map />

        <Footer />

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}