import AboutSection from "components/Home/AboutSection";
import GallerySection from "components/Home/Galleryection";
import HeroSection from "components/Home/HeroSection";
import RequestQuote from "components/Home/RequestQuote";
import SafetySection from "components/Home/SaftySection";
import SubscriptionSection from "components/Home/SubscriptionSection";
import TestimonialSection from "components/Home/TestimonialSection";
import WhatWeDo from "components/Home/WhatWeDo";


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WhatWeDo />
      <GallerySection />
      <SubscriptionSection />
      <TestimonialSection />
      <SafetySection />
      <RequestQuote />
    </>
  );
}