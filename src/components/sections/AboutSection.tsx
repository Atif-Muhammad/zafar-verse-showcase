import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Code, Smartphone } from "lucide-react";

interface AboutSectionProps {
  scrollY: number;
}

export const AboutSection = ({ scrollY }: AboutSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const parallaxOffset = scrollY * 0.1;

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen py-20 px-6 relative overflow-hidden"
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-float-up' : 'opacity-0 translate-y-10'}`}>
          <h2 className="cyber-heading text-4xl md:text-6xl gradient-text mb-4">
            About Me
          </h2>
          <div className="w-32 h-1 bg-gradient-cyber mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story Card */}
          <Card className={`glass-card p-8 hover-glow transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-left' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-cyber-cyan" />
                <h3 className="cyber-subheading text-2xl text-cyber-cyan">My Journey</h3>
              </div>
              
              <p className="cyber-body text-lg leading-relaxed text-muted-foreground">
                Unity Developer specializing in Android game development with experience in 
                mission-based shooters, racing games, and multiplayer prototypes. Skilled in 
                <span className="text-cyber-cyan font-semibold"> C#</span>, 
                <span className="text-cyber-purple font-semibold"> Photon PUN networking</span>, 
                <span className="text-cyber-pink font-semibold"> AI programming</span>, 
                UI/UX, mobile optimization, and Play Store publishing.
              </p>
              
              <p className="cyber-body text-lg leading-relaxed text-muted-foreground">
                Strong background in both independent projects and team-based workflow 
                automation, bringing games from concept to published reality.
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                <Badge variant="outline" className="border-cyber-cyan/30 text-cyber-cyan">Unity 3D</Badge>
                <Badge variant="outline" className="border-cyber-purple/30 text-cyber-purple">C# Programming</Badge>
                <Badge variant="outline" className="border-cyber-pink/30 text-cyber-pink">Mobile Games</Badge>
                <Badge variant="outline" className="border-cyber-orange/30 text-cyber-orange">AI Systems</Badge>
              </div>
            </div>
          </Card>

          {/* Skills Preview */}
          <div className={`space-y-6 transition-all duration-1000 delay-600 ${isVisible ? 'animate-slide-right' : 'opacity-0 translate-x-10'}`}>
            {/* Gaming Focus */}
            <Card className="glass-card p-6 hover-glow border-animated">
              <div className="flex items-center gap-4">
                <Gamepad2 className="w-12 h-12 text-cyber-cyan flex-shrink-0" />
                <div>
                  <h4 className="cyber-subheading text-xl text-cyber-cyan mb-2">Game Development</h4>
                  <p className="cyber-body text-muted-foreground">
                    Crafting immersive gaming experiences from concept to store
                  </p>
                </div>
              </div>
            </Card>

            {/* Mobile Focus */}
            <Card className="glass-card p-6 hover-glow border-animated">
              <div className="flex items-center gap-4">
                <Smartphone className="w-12 h-12 text-cyber-purple flex-shrink-0" />
                <div>
                  <h4 className="cyber-subheading text-xl text-cyber-purple mb-2">Mobile Optimization</h4>
                  <p className="cyber-body text-muted-foreground">
                    Performance-focused development for Android platforms
                  </p>
                </div>
              </div>
            </Card>

            {/* Innovation Focus */}
            <Card className="glass-card p-6 hover-glow border-animated">
              <div className="flex items-center gap-4">
                <Code className="w-12 h-12 text-cyber-pink flex-shrink-0" />
                <div>
                  <h4 className="cyber-subheading text-xl text-cyber-pink mb-2">Innovation</h4>
                  <p className="cyber-body text-muted-foreground">
                    Pushing boundaries with AI, multiplayer, and cutting-edge tech
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 border border-cyber-cyan/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-cyber-purple/10 rounded-full animate-pulse delay-1000"></div>
    </section>
  );
};