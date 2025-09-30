import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Github, Mail, Phone, Linkedin, Check } from "lucide-react";
import emailjs from '@emailjs/browser';
const heroImage = "https://i.postimg.cc/9MnFm7F3/3.jpg";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  useEffect(() => {
    // Optimized Intersection Observer with requestAnimationFrame
    let animationFrameId: number;
    
    const observer = new IntersectionObserver(entries => {
      // Use requestAnimationFrame to batch DOM updates
      animationFrameId = requestAnimationFrame(() => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px' // Trigger slightly before element comes into view
    });

    // Use passive event listeners for better scroll performance
    const reveals = document.querySelectorAll(".reveal, .stagger-children");
    reveals.forEach(el => observer.observe(el));

    // Add passive event listeners for better scroll performance
    const handleWheel = (e: Event) => {
      // This empty handler enables passive event listeners
    };
    
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchmove', handleWheel, { passive: true });

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleWheel);
    };
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_cc3981c', // Service ID
        'template_ja0xiio', // Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'BwLVREdQZ8dnGx6g8' // Public Key
      );

      // Show success notification
      setShowSuccess(true);
      
      // Hide success notification after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        honeypot: ""
      });

    } catch (error) {
      console.error("Failed to send message:", error);
      let errorMessage = "Failed to send message. Please try again later.";
      
      if (error instanceof Error) {
        if ('status' in error) {
          // Handle HTTP status errors
          switch (error.status) {
            case 400:
              errorMessage = "Invalid form data. Please check your inputs.";
              break;
            case 401:
              errorMessage = "Authentication failed. Please check your EmailJS configuration.";
              break;
            case 429:
              errorMessage = "Too many requests. Please try again later.";
              break;
          }
        } else if (error.message.includes('Network Error')) {
          errorMessage = "Network error. Please check your internet connection.";
        }
      }
      
      console.error("Detailed error:", error);
      setErrorMessage(errorMessage);
      setShowError(true);
      
      // Hide error after 5 seconds
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="snap-container relative">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed bottom-8 right-8 bg-[#D1B399] text-[#550000] px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in-up">
          <Check className="w-6 h-6 text-[#550000]" />
          <span className="font-medium">Message sent successfully!</span>
        </div>
      )}
      {showError && (
        <div className="fixed bottom-8 right-8 bg-[#FEE2E2] text-[#991B1B] px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in-up">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}
      {/* Hero Section - Full Screen */}
      <section id="hero" className="snap-section relative w-full px-8 pt-8 md:px-16" aria-label="Hero section">
        <div className="relative w-full h-[120vh] overflow-hidden rounded-2xl shadow-xl">
          <img 
            src={heroImage} 
            alt="Steve Jobs inspirational quote: Always keep the drive to learn, explore and achieve more"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 rounded-2xl" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="snap-section flex items-center justify-center py-24 px-4" aria-label="About me">
        <div className="w-full max-w-6xl bg-card text-card-foreground p-10 rounded-2xl shadow-2xl reveal hover-enlarge">
          <div className="relative">
            <div className="space-y-6 pb-16">
              <h2 className="text-5xl font-bold text-primary">About Me</h2>
              <div>
                <p className="text-3xl font-semibold text-primary">V A Rishivaradha</p>
                <p className="text-lg text-primary/80 mt-2">
                  Sri Venkateshwara College of Engineering — Computer Science & Engineering
                </p>
                <p className="text-lg leading-relaxed text-primary/90 mt-4">
                  I am a passionate student with a strong interest in technology and problem-solving. 
                  My core strength lies in Java programming, where I enjoy building logical solutions and 
                  applying structured thinking to real-world problems. Alongside my programming skills, 
                  I am also skilled in designing and developing smooth, user-friendly, and interactive websites. 
                  I focus on creating efficient solutions through low-code and no-code platforms, enabling faster
                  development and deployment.
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0">
              <Button variant="outline" className="border-2 border-primary bg-primary text-foreground" asChild>
                <a href="https://drive.google.com/file/d/1_ShMlxE_WQ-TgJBrggSRfjxa4Ay1uJW1/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="snap-section flex items-center justify-center py-24 px-4" aria-label="Projects">
        <div className="w-full max-w-6xl">
          <h2 className="text-5xl font-bold text-center mb-16 text-foreground reveal">Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* MessX Project */}
            <article className="bg-card text-card-foreground rounded-[var(--radius-md)] overflow-hidden shadow-2xl reveal hover-enlarge" style={{ transition: 'transform 0.3s cubic-bezier(0.2, 0.9, 0.25, 1), box-shadow 0.3s ease' }}>
              <div className="project-media aspect-[3/2] border-b-2 border-primary/20 overflow-hidden">
                <img src={messxPreview} alt="MessX real-time chat application preview" className="w-full h-full object-cover" />
              </div>
              
              <div className="p-8 space-y-4">
                <h3 className="text-3xl font-bold text-primary">MessX</h3>
                <p className="text-primary/80 leading-relaxed">
                  Real-time chat app built with Flutter frontend + Node.js WebSocket backend. 
                  Instant sign-in, dynamic contacts, presence detection.
                </p>
                <div className="pt-4">
                  <Button variant="outline" className="border-2 border-primary bg-primary text-foreground" asChild>
                    <a href="https://github.com/Rishivaradha/MessX.git" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                      <Github className="w-5 h-5" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </article>

            {/* E-Store Project */}
            <article className="bg-card text-card-foreground rounded-[var(--radius-md)] overflow-hidden shadow-2xl reveal hover-enlarge" style={{ transition: 'transform 0.3s cubic-bezier(0.2, 0.9, 0.25, 1), box-shadow 0.3s ease' }}>
              <div className="project-media aspect-[3/2] border-b-2 border-primary/20 overflow-hidden">
                <img src={estorePreview} alt="E-Store e-commerce platform preview" className="w-full h-full object-cover" />
              </div>
              
              <div className="p-8 space-y-4">
                <h3 className="text-3xl font-bold text-primary">E-Store</h3>
                <p className="text-primary/80 leading-relaxed">
                  Responsive e-commerce demo prototype with product previews, cart flow and checkout UI.
                </p>
                <div className="pt-4">
                  <Button variant="outline" className="border-2 border-primary bg-primary text-foreground" asChild>
                    <a href="https://github.com/Rishivaradha/E-STORE.git" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
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
      <section id="contact" className="snap-section flex items-center justify-center py-24 px-4" aria-label="Contact">
        <div className="card w-full max-w-6xl bg-card text-card-foreground p-10 rounded-[var(--radius-lg)] shadow-2xl reveal hover-enlarge">
          <h2 className="text-5xl font-bold text-primary mb-12 text-center">Get In Touch</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info Box */}
            <div className="contact-info border-2 border-primary rounded-[var(--radius-md)] p-8 space-y-6 hover-enlarge">
              <h3 className="text-2xl font-semibold text-primary mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-primary/60">Email</p>
                    <a href="mailto:rishiva2004@gmail.com" className="text-primary hover:underline">rishiva2004@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-primary/60">Phone</p>
                    <a href="tel:+919940351596" className="text-primary hover:underline">9940351596</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-primary/60">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/rishivaradha07/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">linkedin.com/in/rishivaradha07</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-primary/60">GitHub</p>
                    <a href="https://github.com/Rishivaradha" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">github.com/Rishivaradha</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Box */}
            <div className="contact-form border-2 border-primary rounded-[var(--radius-md)] p-8 hover-enlarge">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                    Name *
                  </label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="bg-background/5 border-primary/30 text-primary placeholder:text-primary/40" placeholder="Your name" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Email *
                  </label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="bg-background/5 border-primary/30 text-primary placeholder:text-primary/40" placeholder="your.email@example.com" />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                    Subject *
                  </label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="bg-background/5 border-primary/30 text-primary placeholder:text-primary/40" placeholder="What's this about?" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    Message *
                  </label>
                  <Textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} required className="bg-background/5 border-primary/30 text-primary placeholder:text-primary/40 resize-none" placeholder="Your message..." />
                </div>

                {/* Honeypot field for spam prevention */}
                <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} style={{
                display: "none"
              }} tabIndex={-1} autoComplete="off" />

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-card hover:bg-primary/90 transition-all duration-200 py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
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