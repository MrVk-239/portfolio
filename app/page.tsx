import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { ProblemSolvingSection } from "@/components/home/ProblemSolvingSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { WritingSection } from "@/components/home/WritingSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <FeaturedProjectsSection />
      <ProblemSolvingSection />
      <SkillsSection />
      <WritingSection />
      <ContactSection />
    </>
  );
}
