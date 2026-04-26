import { navLinks, personal } from "@/data/portfolio";
import { ArrowUp, Heart } from "lucide-react";
import { motion } from "motion/react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

const year = new Date().getFullYear();

const footerSocials = [
  {
    name: "GitHub",
    url: "https://github.com/Shah-Mohsin",
    Icon: SiGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/shah-mohsin-474999335",
    Icon: FaLinkedin,
  },
];

export function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border/40" data-ocid="footer">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-border/30">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-elevated">
                <span className="font-display font-bold text-sm text-primary-foreground">
                  {personal.initials}
                </span>
              </div>
              <div>
                <p className="font-display font-semibold text-foreground">
                  {personal.displayName}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  Full-Stack Dev
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Crafting impactful digital experiences with modern technology and
              embedded systems expertise from the beautiful valley of Kashmir.
            </p>
          </div>

          {/* Site Links */}
          <div data-ocid="footer.site_links">
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
              Site Links
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    data-ocid={`footer.nav_link.${link.id}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div data-ocid="footer.connect">
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
              Connect
            </p>
            <div className="flex gap-3 flex-wrap">
              {footerSocials.map(({ name, url, Icon }) => (
                <motion.a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`footer.social_link.${name.toLowerCase()}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-smooth"
                  aria-label={name}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <a
                href={`mailto:${personal.email}`}
                className="hover:text-primary transition-smooth"
              >
                {personal.email}
              </a>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              <a
                href={`tel:${personal.phone}`}
                className="hover:text-primary transition-smooth"
              >
                {personal.phone}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            © {year} {personal.name}. Made with{" "}
            <Heart className="w-3 h-3 text-primary animate-pulse-glow" /> in
            Kashmir
          </p>
          <motion.button
            onClick={scrollToTop}
            data-ocid="footer.back_to_top_button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-smooth px-3 py-1.5 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-primary/5"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
