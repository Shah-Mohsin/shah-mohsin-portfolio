import { Button } from "@/components/ui/button";
import { navLinks, personal } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTheme } from "@/hooks/useTheme";
import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function Header() {
  const { isDark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = navLinks.map((l) => l.id);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "header-scrolled py-3" : "bg-transparent py-5"
      }`}
      data-ocid="header"
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <motion.button
          type="button"
          onClick={() => scrollTo("#home")}
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.02 }}
          data-ocid="header.logo_link"
          aria-label="Go to home"
        >
          {/* Initials badge */}
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-elevated flex-shrink-0">
            <span className="font-display font-bold text-sm text-primary-foreground tracking-tight">
              {personal.initials}
            </span>
          </div>
          {/* Name */}
          <div className="hidden sm:block leading-none">
            <p className="font-display font-semibold text-sm text-foreground leading-tight">
              {personal.displayName}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 font-mono">
              Full-Stack Dev
            </p>
          </div>
        </motion.button>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          data-ocid="header.nav"
        >
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.id}
              onClick={() => scrollTo(link.href)}
              data-ocid={`header.nav_link.${link.id}`}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                activeSection === link.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeSection === link.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.38 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </nav>

        {/* Right-side actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            data-ocid="header.theme_toggle"
            className="rounded-full w-9 h-9 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Toggle dark/light theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {/* Hire Me CTA */}
          <Button
            onClick={() => scrollTo("#contact")}
            data-ocid="header.hire_button"
            size="sm"
            className="hidden sm:flex gradient-primary text-primary-foreground font-semibold shadow-elevated hover:opacity-90 transition-smooth rounded-lg px-5"
          >
            Hire Me
          </Button>

          {/* Mobile burger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden w-9 h-9 text-muted-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            data-ocid="header.mobile_menu_toggle"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden overflow-hidden glass-effect border-t border-border/30"
            data-ocid="header.mobile_nav"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => scrollTo(link.href)}
                  data-ocid={`header.mobile_nav_link.${link.id}`}
                  className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-smooth ${
                    activeSection === link.id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollTo("#contact")}
                data-ocid="header.mobile_hire_button"
                className="mt-2 gradient-primary text-primary-foreground font-semibold"
              >
                Hire Me
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
