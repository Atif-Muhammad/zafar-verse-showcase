import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Code, 
  Gamepad2, 
  Smartphone, 
  Palette, 
  TrendingUp, 
  Users,
  Brain,
  Wrench
} from "lucide-react";

interface SkillsSectionProps {
  scrollY: number;
}

interface SkillCategory {
  title: string;
  icon: any;
  color: string;
  skills: { name: string; level: number }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Game Development",
    icon: Gamepad2,
    color: "cyber-cyan",
    skills: [
      { name: "Unity 3D", level: 95 },
      { name: "C# Programming", level: 90 },
      { name: "Photon PUN", level: 85 },
      { name: "NavMesh AI", level: 80 },
      { name: "Game Physics", level: 85 }
    ]
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    color: "cyber-purple",
    skills: [
      { name: "Mobile Controls", level: 90 },
      { name: "Performance Optimization", level: 85 },
      { name: "Google Play Console", level: 80 },
      { name: "Mobile Ads Integration", level: 75 },
      { name: "Touch UI/UX", level: 85 }
    ]
  },
  {
    title: "Design & Tools",
    icon: Palette,
    color: "cyber-pink",
    skills: [
      { name: "Adobe Photoshop", level: 75 },
      { name: "Figma", level: 70 },
      { name: "UI/UX Design", level: 80 },
      { name: "Game Art Direction", level: 75 },
      { name: "Prototyping", level: 85 }
    ]
  },
  {
    title: "Technical Skills",
    icon: Code,
    color: "cyber-orange",
    skills: [
      { name: "Shooting Systems", level: 90 },
      { name: "Damage Systems", level: 85 },
      { name: "Progression Systems", level: 80 },
      { name: "Save/Load Systems", level: 85 },
      { name: "Performance Profiling", level: 80 }
    ]
  }
];

const softSkills = [
  { name: "Problem Solving", icon: Brain, level: 95 },
  { name: "Team Collaboration", icon: Users, level: 90 },
  { name: "Project Management", icon: TrendingUp, level: 85 },
  { name: "Technical Documentation", icon: Wrench, level: 80 }
];

export const SkillsSection = ({ scrollY }: SkillsSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Delay progress animation
          setTimeout(() => setAnimateProgress(true), 500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const parallaxOffset = scrollY * 0.08;

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="min-h-screen py-20 px-6 relative overflow-hidden"
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-float-up' : 'opacity-0 translate-y-10'}`}>
          <h2 className="cyber-heading text-4xl md:text-6xl gradient-text mb-4">
            Skills & Expertise
          </h2>
          <p className="cyber-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Mastering the art and science of game development
          </p>
          <div className="w-32 h-1 bg-gradient-cyber mx-auto mt-6"></div>
        </div>

        {/* Technical Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.title}
                className={`glass-card p-6 hover-glow group transition-all duration-1000 ${isVisible ? 'animate-float-up' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: `${categoryIndex * 200}ms` }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <IconComponent className={`w-8 h-8 text-${category.color}`} />
                  <h3 className={`cyber-subheading text-lg text-${category.color}`}>
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="cyber-body text-sm text-muted-foreground">
                          {skill.name}
                        </span>
                        <span className={`cyber-accent text-xs text-${category.color}`}>
                          {skill.level}%
                        </span>
                      </div>
                      <Progress 
                        value={animateProgress ? skill.level : 0}
                        className="h-2"
                        style={{
                          transition: `all 1s ease-out ${(categoryIndex * 200 + skillIndex * 100)}ms`
                        }}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Soft Skills */}
        <Card className={`glass-card p-8 hover-glow transition-all duration-1000 delay-800 ${isVisible ? 'animate-float-up' : 'opacity-0 translate-y-10'}`}>
          <h3 className="cyber-subheading text-2xl gradient-text-accent text-center mb-8">
            Professional Skills
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {softSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div 
                  key={skill.name}
                  className="text-center group"
                >
                  <div className="mb-4 relative">
                    <div className={`w-16 h-16 rounded-full border-2 border-cyber-cyan/30 flex items-center justify-center mx-auto group-hover:border-cyber-cyan transition-colors duration-300`}>
                      <IconComponent className="w-8 h-8 text-cyber-cyan" />
                    </div>
                    
                    {/* Circular Progress */}
                    <svg className="absolute inset-0 w-16 h-16 mx-auto -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${animateProgress ? skill.level : 0}, 100`}
                        className="text-cyber-cyan opacity-75"
                        style={{ transition: `stroke-dasharray 1.5s ease-out ${index * 200}ms` }}
                      />
                    </svg>
                  </div>
                  
                  <h4 className="cyber-accent text-sm text-cyber-cyan mb-1">{skill.name}</h4>
                  <span className="cyber-body text-xs text-muted-foreground">{skill.level}%</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-cyber-purple/10 rotate-45 animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-cyber-pink/10 -rotate-12 animate-pulse delay-1000"></div>
    </section>
  );
};