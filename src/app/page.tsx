import { HeroSection } from '@/components/home/hero-section';
import { AboutSection } from '@/components/home/about-section';
import { ServicesSection } from '@/components/home/services';
import { DoctorsSection } from '@/components/home/doctors-section';
import { FAQs } from '@/components/home/faq-section';
import { GallerySection } from '@/components/home/gallery-section';

export default function Home() {
  return (
    <>
        <HeroSection />
        <ServicesSection />
        <DoctorsSection />
        <GallerySection />
        <AboutSection />
        <FAQs />
    </>
  );
}