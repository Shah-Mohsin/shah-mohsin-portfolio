import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { personal } from "@/data/portfolio";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { toast } from "sonner";

const socials = [
  { name: "GitHub", url: "https://github.com/Shah-Mohsin", Icon: SiGithub },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/shah-mohsin-474999335",
    Icon: FaLinkedin,
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: personal.phone,
    href: `tel:${personal.phone}`,
  },
  { icon: MapPin, label: "Location", value: personal.location, href: null },
  {
    icon: Clock,
    label: "Availability",
    value: "Open to full-time & freelance",
    href: null,
  },
];

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setForm({ name: "", email: "", subject: "", message: "" });
    toast.success("Message sent! I'll get back to you soon.", {
      duration: 5000,
    });
  };

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-28 bg-background"
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="border-primary/30 text-primary bg-primary/5 font-mono text-xs mb-4"
          >
            Get in Touch
          </Badge>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground">
            Let's{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Have a project in mind? Let's discuss how I can help bring your
            vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact details */}
            <div className="glass-effect rounded-2xl p-6 shadow-elevated space-y-5">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-foreground hover:text-primary transition-smooth font-medium"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground font-medium">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="glass-effect rounded-2xl p-6 shadow-elevated">
              <p className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
                Find me on
              </p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ name, url, Icon }) => (
                  <motion.a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    data-ocid={`contact.social_link.${name.toLowerCase()}`}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-smooth group"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-smooth">
                      {name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-effect rounded-2xl p-8 shadow-elevated space-y-5"
              data-ocid="contact.form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    data-ocid="contact.name_input"
                    className="bg-background/50 border-border/60 focus:border-primary/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    data-ocid="contact.email_input"
                    className="bg-background/50 border-border/60 focus:border-primary/60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry, collaboration..."
                  data-ocid="contact.subject_input"
                  className="bg-background/50 border-border/60 focus:border-primary/60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  Message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  data-ocid="contact.message_textarea"
                  className="bg-background/50 border-border/60 focus:border-primary/60 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                data-ocid="contact.submit_button"
                className="w-full gradient-primary text-primary-foreground font-semibold shadow-elevated hover:opacity-90 transition-smooth gap-2 h-11"
              >
                {submitting ? (
                  <span
                    data-ocid="contact.loading_state"
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
