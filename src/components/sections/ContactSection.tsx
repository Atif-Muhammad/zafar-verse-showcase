import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Send,
  MapPin,
  Globe,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactSectionProps {
  scrollY: number;
}

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "amirzafer028@gmail.com",
    href: "mailto:amirzafer028@gmail.com",
    color: "cyber-cyan"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "03449742161",
    href: "tel:03449742161",
    color: "cyber-purple"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "aamir-zafar-589859372",
    href: "https://linkedin.com/in/aamir-zafar-589859372",
    color: "cyber-pink"
  },
  {
    icon: Github,
    label: "GitHub",
    value: "aamir421",
    href: "https://github.com/aamir421",
    color: "cyber-orange"
  }
];

export const ContactSection = ({ scrollY }: ContactSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

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

  const parallaxOffset = scrollY * 0.04;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent! 🚀",
      description: "Thanks for reaching out! I'll get back to you soon.",
    });
    
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="min-h-screen py-20 px-6 relative overflow-hidden"
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-float-up' : 'opacity-0 translate-y-10'}`}>
          <h2 className="cyber-heading text-4xl md:text-6xl gradient-text mb-4">
            Let's Connect
          </h2>
          <p className="cyber-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on the next big gaming project? Let's build something amazing together.
          </p>
          <div className="w-32 h-1 bg-gradient-cyber mx-auto mt-6"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-left' : 'opacity-0 -translate-x-10'}`}>
            {/* Location Badge */}
            <Card className="glass-card p-6 hover-glow border-animated">
              <div className="flex items-center gap-4 mb-4">
                <MapPin className="w-8 h-8 text-cyber-green" />
                <div>
                  <h3 className="cyber-subheading text-xl text-cyber-green">Based in</h3>
                  <p className="cyber-body text-muted-foreground">Peshawar, Pakistan 🇵🇰</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyber-cyan" />
                <span className="cyber-body text-sm text-cyber-cyan">Available for remote work worldwide</span>
              </div>
            </Card>

            {/* Contact Methods */}
            <div className="space-y-4">
              <h3 className="cyber-subheading text-2xl gradient-text-accent mb-6">
                Get In Touch
              </h3>
              
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <Card 
                    key={method.label}
                    className={`glass-card p-4 hover-glow group transition-all duration-500 delay-${index * 100}`}
                  >
                    <a 
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4"
                    >
                      <div className={`p-3 rounded-xl bg-${method.color}/10 border border-${method.color}/30 group-hover:border-${method.color} transition-colors`}>
                        <IconComponent className={`w-5 h-5 text-${method.color}`} />
                      </div>
                      
                      <div>
                        <h4 className={`cyber-accent text-sm text-${method.color} mb-1`}>
                          {method.label}
                        </h4>
                        <p className="cyber-body text-muted-foreground group-hover:text-foreground transition-colors">
                          {method.value}
                        </p>
                      </div>
                    </a>
                  </Card>
                );
              })}
            </div>

            {/* Availability Status */}
            <Card className="glass-card p-6 hover-glow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-cyber-green rounded-full animate-pulse"></div>
                <Badge variant="outline" className="border-cyber-green/30 text-cyber-green">
                  Available for Projects
                </Badge>
              </div>
              <p className="cyber-body text-sm text-muted-foreground">
                Open to freelance projects, full-time opportunities, and collaborations.
                Passionate about creating innovative gaming experiences!
              </p>
            </Card>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className={`mt-20 pt-12 pb-8 border-t border-cyber-cyan/20 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'animate-float-up' : 'opacity-0'}`}>
        <p className="cyber-body text-muted-foreground">
          © 2024 Aamir Zafar. Crafted with 💙 for the gaming universe.
        </p>
        
        <div className="flex justify-center gap-4 mt-4">
          {contactMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg hover:bg-${method.color}/10 transition-colors`}
              >
                <IconComponent className={`w-5 h-5 text-${method.color} hover:scale-110 transition-transform`} />
              </a>
            );
          })}
        </div>
      </footer>

      {/* Background Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 border border-cyber-cyan/5 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-32 h-32 border border-cyber-purple/5 rotate-45 animate-pulse delay-1000"></div>
    </section>
  );
};