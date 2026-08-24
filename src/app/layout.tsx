import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { cn } from "@/lib/utils";
import  Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Map } from "@/components/layout/map";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Babur & Associates - Dentist in DHA Phase 5, Karachi",
  description: "Dr. Babur & Associates is a modern dental clinic in DHA Phase 5, Karachi. We offer braces, implants, whitening, kids dentistry, and emergency care. Book your appointment today.",
  keywords: "dentist Karachi, orthodontist DHA, pediatric dentist Clifton, teeth whitening, dental implants, emergency dentist, braces Karachi, Invisalign Karachi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", poppins.variable)}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Map/>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}