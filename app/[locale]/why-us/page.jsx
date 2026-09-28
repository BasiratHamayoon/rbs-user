import ImageTextSection from "components/whyus/ImageTextSection";
import MissionSection from "components/whyus/MissionSection";
import OwnerSection from "components/whyus/OwnerSection";
import PartnershipSection from "components/whyus/PartnershipSection";
import WhyUsHero from "components/whyus/WhyUsHero.js";


export default function WhyUsPage() {
  return (
    <div className="min-h-screen bg-white w-full overflow-hidden flex flex-col">
      <WhyUsHero />
      <OwnerSection />
      <ImageTextSection />
      <MissionSection />
      <PartnershipSection />
    </div>
  );
}