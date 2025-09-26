import { useEffect, useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-background particle-bg">
      <ScrollProgress />
      
      <HeroSection scrollY={scrollY} />
      <AboutSection scrollY={scrollY} />
      <ProjectsSection scrollY={scrollY} />
      <SkillsSection scrollY={scrollY} />
      <ExperienceSection scrollY={scrollY} />
      <ContactSection scrollY={scrollY} />
      
      {/* Ambient particles overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyber-cyan rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyber-purple rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-cyber-pink rounded-full animate-pulse delay-2000"></div>
      </div>
    </main>
  );
};

export default Portfolio;