import AboutHero from "components/About/AboutHeroSection";
import AwardsSection from "components/About/AwardsSection";
import MissionCards from "components/About/MissionVisionCards";
import TeamSection from "components/About/TeamSection";
import ValuesSection from "components/About/ValuesSection";


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white w-full overflow-hidden flex flex-col">
      <AboutHero />
      <ValuesSection />
      <MissionCards />
      <TeamSection />
      <AwardsSection />
    </div>
  );
}