import AboutSection from "components/Home/AboutSection";
import GallerySection from "components/Home/Galleryection";
import HeroSection from "components/Home/HeroSection";
import RequestQuote from "components/Home/QuoteSection";
import SafetySection from "components/Home/SaftySection";
import TestimonialSection from "components/Home/TestimonialSection";


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      {/* <StatsSection /> */}
      {/* <ServicesSection /> */}
      <GallerySection />
      <TestimonialSection />
      <SafetySection />
      <RequestQuote />
    </>
  );
}