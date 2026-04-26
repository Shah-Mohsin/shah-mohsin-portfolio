import { Button } from "@/components/ui/button";
import { personal, socialLinks } from "@/data/portfolio";
import { Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { HeroBackground3D } from "./HeroBackground3D";

// Stable roles list — no array-index keys needed (mapped with role string)
const ROLES = [
  "Full-Stack Developer",
  "Embedded Systems Enthusiast",
  "UI/UX Designer",
];

// Types out a single string once, then hides cursor. Calls onComplete when done.
function TypingName({
  text,
  onComplete,
}: { text: string; onComplete: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (displayed.length < text.length) {
      const t = setTimeout(
        () => setDisplayed(text.slice(0, displayed.length + 1)),
        80,
      );
      return () => clearTimeout(t);
    }
    // Brief pause so cursor is visible at full text, then signal complete
    const t = setTimeout(() => {
      setDone(true);
      onComplete();
    }, 400);
    return () => clearTimeout(t);
  }, [displayed, done, text, onComplete]);

  return (
    <>
      {displayed}
      {!done && (
        <span className="typing-cursor" aria-hidden="true">
          |
        </span>
      )}
    </>
  );
}

// Typing roles — only starts after nameReady is true
function TypingText({ enabled }: { enabled: boolean }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const current = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80,
      );
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        45,
      );
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIdx, enabled]);

  return (
    <span className="typing-text">
      {displayed}
      <span className="typing-cursor" aria-hidden="true">
        |
      </span>
    </span>
  );
}

const SOCIAL_ICON_MAP: Record<string, React.ReactNode> = {
  github: <Github className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
};

export function HeroSection() {
  const [nameComplete, setNameComplete] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 3D background — absolute z-0 */}
      <HeroBackground3D />

      {/* Dark gradient base */}
      <div className="absolute inset-0 gradient-hero" style={{ zIndex: 1 }} />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Accent orbs */}
      <div
        className="absolute top-1/4 left-1/6 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ zIndex: 2, background: "rgba(0,212,255,0.05)" }}
      />
      <div
        className="absolute bottom-1/3 right-1/6 w-60 h-60 rounded-full blur-3xl pointer-events-none"
        style={{ zIndex: 2, background: "rgba(168,85,247,0.06)" }}
      />

      {/* Content */}
      <div className="relative container pt-28 pb-20" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0 text-center lg:text-left space-y-6">
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-base font-mono hero-greeting"
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name — types out once on load */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="font-display font-extrabold tracking-tight leading-[1.05] hero-name
                text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl"
            >
              <TypingName
                text={personal.name}
                onComplete={() => setNameComplete(true)}
              />
            </motion.h1>

            {/* Typing role — starts only after name is fully typed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                nameComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl font-mono font-semibold h-8"
            >
              <TypingText enabled={nameComplete} />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hero-bio text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              {personal.bio}
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-2 hero-location text-sm"
            >
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{personal.location}</span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <Button
                size="lg"
                data-ocid="hero.download_cv_button"
                className="hero-btn-primary font-semibold gap-2 px-8 border-0"
                onClick={() =>
                  alert("CV available on request — reach out via Contact!")
                }
              >
                <Download className="w-4 h-4" />
                Download CV
              </Button>
              <Button
                size="lg"
                variant="outline"
                data-ocid="hero.contact_button"
                className="hero-btn-outline font-semibold gap-2 px-8"
                onClick={() => scrollTo("contact")}
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </Button>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  data-ocid={`hero.social_link.${link.icon}`}
                  className="social-icon-btn"
                >
                  {SOCIAL_ICON_MAP[link.icon] ?? null}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — portrait ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 4,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Outer glow ring */}
              <div className="portrait-glow-ring" />

              {/* Portrait image */}
              <div className="portrait-container" data-ocid="hero.portrait">
                <img
                  src="/assets/images/profile.jpg"
                  alt="Mohammad Mohsin Shah — Full-Stack Developer"
                  className="portrait-img"
                  width={320}
                  height={320}
                />
              </div>

              {/* Decorative floating badge — top right */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5,
                  ease: "easeInOut",
                }}
                className="portrait-badge portrait-badge-tr"
              >
                <span className="text-xs font-mono font-bold text-cyan-300">
                  Full-Stack
                </span>
              </motion.div>

              {/* Decorative floating badge — bottom left */}
              <motion.div
                animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.04, 1] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 6,
                  delay: 1,
                  ease: "easeInOut",
                }}
                className="portrait-badge portrait-badge-bl"
              >
                <span className="text-xs font-mono font-bold text-purple-300">
                  Arduino
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          type="button"
          onClick={() => scrollTo("about")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-smooth"
          style={{ color: "rgba(147,210,232,0.7)" }}
          data-ocid="hero.scroll_down_button"
          aria-label="Scroll to about section"
        >
          <span className="text-xs font-mono tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.6,
              ease: "easeInOut",
            }}
            className="w-5 h-8 rounded-full border border-current flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-current rounded-full" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
