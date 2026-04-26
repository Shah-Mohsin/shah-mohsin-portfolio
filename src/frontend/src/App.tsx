import { Layout } from "@/components/layout/Layout";
import { AboutSection } from "@/pages/sections/AboutSection";
import { ContactSection } from "@/pages/sections/ContactSection";
import { HeroSection } from "@/pages/sections/HeroSection";
import { ProjectsSection } from "@/pages/sections/ProjectsSection";
import { SkillsSection } from "@/pages/sections/SkillsSection";
import { TestimonialsSection } from "@/pages/sections/TestimonialsSection";

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
    </Layout>
  );
}
