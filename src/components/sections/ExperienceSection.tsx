import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Calendar, GraduationCap, Award } from "lucide-react";

interface ExperienceSectionProps {
  scrollY: number;
}

interface ExperienceItem {
  type: "work" | "education" | "achievement";
  title: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
  color: string;
}

const experiences: ExperienceItem[] = [
  {
    type: "work",
    title: "Unity Developer",
    organization: "IgniPulse",
    period: "Feb 2023 – current",
    description: "Led mobile game development projects from concept to market release, focusing on performance optimization and user engagement.",
    highlights: [
      "Developed and published Track Master and WingRush games",
      "Optimized mobile performance for Android platforms",
      "Managed complete Play Store release cycles",
      "Collaborated with design teams on game mechanics",
      "Delivered production-ready builds on schedule"
    ],
    color: "cyber-cyan"
  },
  {
    type: "work",
    title: "Workflow Automation Specialist",
    organization: "n8n Platform",
    period: "March 2024 - Aug 2024",
    description: "Collaborated on advanced app and API integrations, streamlining development workflows and automation processes.",
    highlights: [
      "Designed complex workflow automation systems",
      "Integrated multiple APIs and third-party services",
      "Optimized team productivity through automation",
      "Created scalable integration solutions"
    ],
    color: "cyber-purple"
  },
  {
    type: "education",
    title: "Bachelor of Science in Computer Science",
    organization: "University of Peshawar",
    period: "2020 – 2024",
    description: "Comprehensive study of computer science fundamentals with specialization in game development and software engineering.",
    highlights: [
      "Thesis: 'Fury Frontline – Mission-Based Third-Person Shooting Game'",
      "Specialized in game development and AI programming",
      "Strong foundation in algorithms and data structures",
      "Participated in multiple software development projects"
    ],
    color: "cyber-pink"
  }
];

export const ExperienceSection = ({ scrollY }: ExperienceSectionProps) => {
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

  const parallaxOffset = scrollY * 0.06;

  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return Building;
      case "education":
        return GraduationCap;
      default:
        return Award;
    }
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="min-h-screen py-20 px-6 relative overflow-hidden"
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-float-up' : 'opacity-0 translate-y-10'}`}>
          <h2 className="cyber-heading text-4xl md:text-6xl gradient-text mb-4">
            Experience & Education
          </h2>
          <p className="cyber-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Building expertise through hands-on development and continuous learning
          </p>
          <div className="w-32 h-1 bg-gradient-cyber mx-auto mt-6"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-cyber opacity-50 hidden md:block"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const IconComponent = getIcon(exp.type);
              return (
                <div 
                  key={index}
                  className={`relative transition-all duration-1000 ${isVisible ? 'animate-slide-left' : 'opacity-0 -translate-x-10'}`}
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  {/* Timeline Marker */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-cyber rounded-full hidden md:block border-4 border-background"></div>
                  
                  {/* Content Card */}
                  <Card className={`glass-card p-8 hover-glow ml-0 md:ml-20 group border-animated`}>
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Header Section */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`p-3 rounded-xl bg-${exp.color}/10 border border-${exp.color}/30`}>
                            <IconComponent className={`w-6 h-6 text-${exp.color}`} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                              <h3 className={`cyber-subheading text-xl text-${exp.color} group-hover:neon-text transition-all`}>
                                {exp.title}
                              </h3>
                              <Badge 
                                variant="outline" 
                                className={`border-${exp.color}/30 text-${exp.color} w-fit mt-2 lg:mt-0`}
                              >
                                <Calendar className="w-3 h-3 mr-1" />
                                {exp.period}
                              </Badge>
                            </div>
                            
                            <h4 className="cyber-accent text-lg text-muted-foreground mb-3">
                              {exp.organization}
                            </h4>
                            
                            <p className="cyber-body text-muted-foreground leading-relaxed">
                              {exp.description}
                            </p>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-2">
                          <h5 className="cyber-accent text-sm text-foreground mb-3">Key Achievements:</h5>
                          <div className="grid gap-2">
                            {exp.highlights.map((highlight, highlightIndex) => (
                              <div 
                                key={highlightIndex}
                                className="flex items-start gap-3 group/highlight"
                              >
                                <div className={`w-1.5 h-1.5 rounded-full bg-${exp.color} mt-2 flex-shrink-0`}></div>
                                <span className="cyber-body text-sm text-muted-foreground group-hover/highlight:text-foreground transition-colors">
                                  {highlight}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 transition-all duration-1000 delay-1000 ${isVisible ? 'animate-float-up' : 'opacity-0'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="glass-card p-6 text-center hover-glow">
              <div className="cyber-heading text-3xl gradient-text mb-2">2+</div>
              <div className="cyber-body text-sm text-muted-foreground">Years Experience</div>
            </Card>
            
            <Card className="glass-card p-6 text-center hover-glow">
              <div className="cyber-heading text-3xl gradient-text mb-2">5+</div>
              <div className="cyber-body text-sm text-muted-foreground">Games Developed</div>
            </Card>
            
            <Card className="glass-card p-6 text-center hover-glow">
              <div className="cyber-heading text-3xl gradient-text mb-2">2</div>
              <div className="cyber-body text-sm text-muted-foreground">Published Games</div>
            </Card>
            
            <Card className="glass-card p-6 text-center hover-glow">
              <div className="cyber-heading text-3xl gradient-text mb-2">10+</div>
              <div className="cyber-body text-sm text-muted-foreground">Technologies Mastered</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/3 right-1/4 w-40 h-40 border border-cyber-cyan/5 rotate-45 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-32 h-32 border border-cyber-purple/5 -rotate-12 animate-pulse delay-1000"></div>
    </section>
  );
};