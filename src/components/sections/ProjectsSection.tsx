import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Play } from "lucide-react";

interface ProjectsSectionProps {
  scrollY: number;
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  status: "Published" | "In Development" | "Prototype";
  links?: {
    playStore?: string;
    github?: string;
    demo?: string;
  };
  color: "cyan" | "purple" | "pink" | "orange" | "green";
}

const projects: Project[] = [
  {
    title: "Track Master",
    description:
      "Mobile racing game with checkpoint systems, scaling difficulty, and coin-based progression mechanics.",
    tech: [
      "Unity 3D",
      "C#",
      "Racing Mechanics",
      "Mobile Optimization",
      "Monetization",
    ],
    status: "Published",
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.ignipulse.TrackMaster&pcampaignid=web_share",
    },
    color: "pink",
  },
  {
    title: "WingRush",
    description:
      "Offline plane combat game featuring unlockable aircraft, customizable skins, upgrade systems, and challenging survival missions.",
    tech: ["Unity 3D", "C#", "Combat Systems", "Progression", "Mobile Games"],
    status: "Published",
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.IgniPulse.WingRush&pcampaignid=web_share",
    },
    color: "orange",
  },
  {
    title: "Fury Frontline",
    description:
      "Mission-based third-person shooter with AI enemies, unlockable characters/weapons, progression system, and optimized touch controls.",
    tech: [
      "Unity 3D",
      "C#",
      "AI Programming",
      "Mobile Controls",
      "Progression Systems",
    ],
    status: "In Development",
    color: "cyan",
  },
  {
    title: "ANTON",
    description:
      "Multi-character mission-based shooter prototype featuring dynamic combat mechanics and smooth mobile control integration.",
    tech: [
      "Unity 3D",
      "C#",
      "Combat Systems",
      "Character Management",
      "Mobile UI",
    ],
    status: "Prototype",
    color: "purple",
  },
  {
    title: "Multiplayer Car Combat",
    description:
      "Photon PUN 2 prototype with lobby system, matchmaking, synchronized shooting mechanics, and persistent UI elements.",
    tech: [
      "Unity 3D",
      "Photon PUN 2",
      "Multiplayer",
      "Networking",
      "Real-time Combat",
    ],
    status: "Prototype",
    color: "green",
  },
];

// Color mapping for consistent styling
const colorClasses = {
  cyan: "text-cyber-cyan border-cyber-cyan/30 hover:border-cyber-cyan",
  purple: "text-cyber-purple border-cyber-purple/30 hover:border-cyber-purple",
  pink: "text-cyber-pink border-cyber-pink/30 hover:border-cyber-pink",
  orange: "text-cyber-orange border-cyber-orange/30 hover:border-cyber-orange",
  green: "text-cyber-green border-cyber-green/30 hover:border-cyber-green",
};

export const ProjectsSection = ({ scrollY }: ProjectsSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const parallaxOffset = scrollY * 0.05;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen py-20 z-0 px-6 relative overflow-hidden"
      style={{ transform: `translateY(${parallaxOffset}px)`, zIndex: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "animate-float-up" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="cyber-heading text-4xl md:text-6xl gradient-text mb-4">
            Game Projects
          </h2>
          <p className="cyber-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Immersive gaming experiences crafted with passion and cutting-edge
            technology
          </p>
          <div className="w-32 h-1 bg-gradient-cyber mx-auto mt-6"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={`glass-card z-10 p-6 group transition-all duration-1000 border-animated flex flex-col ${
                isVisible ? "animate-float-up" : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-4">
                <Badge
                  variant={
                    project.status === "Published" ? "default" : "outline"
                  }
                  className={`
        ${
          project.status === "Published"
            ? "bg-cyber-green/20 text-cyber-green border-cyber-green/30"
            : ""
        }
        ${
          project.status === "In Development"
            ? "border-cyber-orange/30 text-cyber-orange"
            : ""
        }
        ${
          project.status === "Prototype"
            ? "border-cyber-purple/30 text-cyber-purple"
            : ""
        }
      `}
                >
                  {project.status}
                </Badge>
              </div>

              {/* Project Title */}
              <h3
                className={`cyber-subheading text-xl mb-3 ${
                  colorClasses[project.color].split(" ")[0]
                } group-hover:neon-text transition-all`}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p className="cyber-body text-muted-foreground leading-relaxed mb-4 text-sm">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.tech.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-xs border-muted/30 text-muted-foreground hover:border-cyber-cyan/30 hover:text-cyber-cyan transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Push button to bottom */}
              <div className="mt-auto">
                {project.status === "Published" && project.links?.playStore ? (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className={`w-full cursor-pointer relative z-30 ${
                      colorClasses[project.color]
                    } hover:scale-[1.01] transition-transform duration-300`}
                  >
                    <a
                      href={project.links.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Play Store
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className={`w-full ${colorClasses[project.color]}`}
                  >
                    Coming Soon
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 opacity-5 pointer-events-none -z-10">
        <div className="grid grid-cols-6 gap-8 h-full">
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i} className="border-r border-cyber-cyan/20"></div>
          ))}
        </div>
      </div>
    </section>
  );
};
