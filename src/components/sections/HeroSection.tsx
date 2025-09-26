import { useEffect, useState } from "react";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  scrollY: number;
}

export const HeroSection = ({ scrollY }: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
          transform: `translateY(${parallaxOffset}px)`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background/90" />
      
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-cyber-cyan/30 rotate-45 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-cyber-purple/30 rotate-12 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-2/3 w-20 h-20 border border-cyber-pink/30 -rotate-12 animate-pulse delay-2000"></div>
      </div>
      
      {/* Main Content */}
      <div className={`relative z-10 text-center px-6 max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'animate-float-up' : 'opacity-0'}`}>
        {/* Name with Dramatic Reveal */}
        <div className="mb-6">
          <TypewriterText 
            text="AAMIR ZAFAR" 
            className="cyber-heading text-6xl md:text-8xl lg:text-9xl neon-text"
            delay={1000}
          />
        </div>
        
        {/* Subtitle */}
        <div className={`mb-8 transition-all duration-1000 delay-2000 ${isVisible ? 'animate-slide-right' : 'opacity-0'}`}>
          <h2 className="cyber-subheading text-xl md:text-3xl lg:text-4xl gradient-text mb-2">
            Unity Developer | Game Programmer
          </h2>
          <p className="cyber-accent text-lg md:text-xl text-muted-foreground">
            📍 Peshawar, Pakistan
          </p>
        </div>
        
        {/* Call to Action */}
        <div className={`mb-12 transition-all duration-1000 delay-3000 ${isVisible ? 'animate-float-up' : 'opacity-0'}`}>
          <Button 
            onClick={scrollToAbout}
            variant="outline"
            size="lg"
            className="glass-card hover-glow border-cyber-cyan/30 text-cyber-cyan hover:text-background hover:bg-cyber-cyan"
          >
            Explore My Universe
          </Button>
        </div>
        
        {/* Scroll Indicator */}
        <div className={`animate-bounce transition-all duration-1000 delay-4000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <ChevronDown className="w-8 h-8 mx-auto text-cyber-cyan animate-glow-pulse" />
        </div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 48 }, (_, i) => (
            <div key={i} className="border-r border-cyber-cyan/20"></div>
          ))}
        </div>
      </div>
    </section>
  );
};