import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Github, Mail, Phone, Linkedin } from "lucide-react";
import heroQuote from "@/assets/hero-quote.png";
import messxPreview from "@/assets/messx-preview.png";
import estorePreview from "@/assets/estore-preview.png";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "" // spam prevention
  });

  useEffect(() => {
    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const reveals = document.querySelectorAll(".reveal, .stagger-children");
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot spam check
    if (formData.honeypot) return;

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // TODO: Connect to EmailJS, Netlify Forms, or backend endpoint
    console.log("Form submission:", formData);
    
    toast.success("Message sent successfully!", {
      description: "I'll get back to you soon."
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      honeypot: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="snap-container">
      {/* Hero Section - LCP placeholder */}
      <section 
        id="hero" 
        className="snap-section relative flex items-center justify-center overflow-hidden"
        aria-label="Hero section"
      >
        <div className="w-full max-w-5xl mx-auto px-8">
          <img 
            src={heroQuote} 
            alt="Steve Jobs inspirational quote: Always keep the drive to learn, explore and achieve more" 
            className="reveal relative aspect-video rounded-3xl w-full object-cover shadow-2xl"
          />
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="snap-section flex items-center justify-center py-24 px-4"
        aria-label="About me"
      >
        <div className="card w-full max-w-4xl bg-card text-card-foreground p-10 rounded-[var(--radius-lg)] shadow-2xl reveal">
          <div className="stagger-children space-y-6">
            <h2 className="text-5xl font-bold text-primary">About Me</h2>
            <p className="text-3xl font-semibold text-primary">V A Rishivaradha</p>
            <p className="text-lg text-primary/80">
              Sri Venkateshwara College of Engineering — Computer Science & Engineering
            </p>
            <p className="text-lg leading-relaxed text-primary/90">
              I am a passionate student with a strong interest in technology and problem-solving. 
              My core strength lies in Java programming, where I enjoy building logical solutions and 
              applying structured thinking to real-world problems. Alongside my programming skills, 
              I am also skilled in designing and developing smooth, user-friendly, and interactive websites. 
              I focus on creating efficient solutions through low-code and no-code platforms, enabling faster 
              development without compromising on functionality or design. With a blend of coding expertise 
              and creative website development, I strive to deliver impactful digital experiences that are 
              both practical and visually engaging.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className="snap-section flex items-center justify-center py-24 px-4"
        aria-label="Projects"
      >
        <div className="w-full max-w-6xl">
          <h2 className="text-5xl font-bold text-center mb-16 text-foreground reveal">Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* MessX Project */}
            <article className="card bg-card text-card-foreground rounded-[var(--radius-lg)] overflow-hidden shadow-2xl reveal transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl">
              <div className="project-media aspect-[3/2] border-b-2 border-primary/20 overflow-hidden">
                <img 
                  src={messxPreview} 
                  alt="MessX real-time chat application preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8 space-y-4">
                <h3 className="text-3xl font-bold text-primary">MessX</h3>
                <p className="text-primary/80 leading-relaxed">
                  Real-time chat app built with Flutter frontend + Node.js WebSocket backend. 
                  Instant sign-in, dynamic contacts, presence detection.
                </p>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="group border-2 border-primary bg-primary text-foreground hover:bg-primary/90 transition-all duration-200"
                    asChild
                  >
                    <a 
                      href="https://github.com/Rishivaradha/MessX.git" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Github className="w-5 h-5" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </article>

            {/* E-Store Project */}
            <article className="card bg-card text-card-foreground rounded-[var(--radius-lg)] overflow-hidden shadow-2xl reveal transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl">
              <div className="project-media aspect-[3/2] border-b-2 border-primary/20 overflow-hidden">
                <img 
                  src={estorePreview} 
                  alt="E-Store e-commerce platform preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8 space-y-4">
                <h3 className="text-3xl font-bold text-primary">E-Store</h3>
                <p className="text-primary/80 leading-relaxed">
                  Responsive e-commerce demo prototype with product previews, cart flow and checkout UI.
                </p>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="group border-2 border-primary bg-primary text-foreground hover:bg-primary/90 transition-all duration-200"
                    asChild
                  >
                    <a 
                      href="https://github.com/Rishivaradha/E-STORE.git" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Github className="w-5 h-5" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="snap-section flex items-center justify-center py-24 px-4"
        aria-label="Contact"
      >
        <div className="card w-full max-w-6xl bg-card text-card-foreground p-10 rounded-[var(--radius-lg)] shadow-2xl reveal">
          <h2 className="text-5xl font-bold text-primary mb-12 text-center">Get In Touch</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info Box */}
            <div className="contact-info border-2 border-primary rounded-[var(--radius-md)] p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-primary mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-primary/60">Email</p>
                    {/* REPLACE {EMAIL} with your actual email */}
                    <a 
                      href="mailto:your.email@example.com" 
                      className="text-primary hover:underline"
                    >
                      your.email@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-primary/60">Phone</p>
                    {/* REPLACE {PHONE} with your actual phone number */}
                    <a 
                      href="tel:+1234567890" 
                      className="text-primary hover:underline"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-primary/60">LinkedIn</p>
                    {/* REPLACE {LINKEDIN_URL} with your actual LinkedIn profile */}
                    <a 
                      href="https://linkedin.com/in/yourprofile" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      linkedin.com/in/yourprofile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Box */}
            <div className="contact-form border-2 border-primary rounded-[var(--radius-md)] p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background/5 border-primary/30 text-primary placeholder:text-primary/40"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background/5 border-primary/30 text-primary placeholder:text-primary/40"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-background/5 border-primary/30 text-primary placeholder:text-primary/40"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-background/5 border-primary/30 text-primary placeholder:text-primary/40 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {/* Honeypot field for spam prevention */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <Button
                  type="submit"
                  className="w-full bg-primary text-card hover:bg-primary/90 transition-all duration-200 py-6 text-lg"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-foreground/60 text-sm">
        <p>© 2025 V A Rishivaradha. Designed with attention to detail.</p>
      </footer>
    </div>
  );
};

export default Index;
