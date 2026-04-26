import { Badge } from "@/components/ui/badge";
import { personal, services } from "@/data/portfolio";
import { ArrowRight, Code2, Paintbrush, Smartphone } from "lucide-react";
import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";

const iconMap: Record<string, React.ReactNode> = {
  "⚡": <Code2 className="w-5 h-5" />,
  "🎨": <Paintbrush className="w-5 h-5" />,
  "📱": <Smartphone className="w-5 h-5" />,
};

const stats = [
  { target: 3, suffix: "+", label: "Years Experience" },
  { target: 50, suffix: "+", label: "Projects Delivered" },
  { target: 30, suffix: "+", label: "Happy Clients" },
  { target: 15, suffix: "+", label: "Technologies" },
];

function AnimatedCounter({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    if (!node) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = `${Math.round(value)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, target, suffix]);

  return (
    <p ref={ref} className="font-display font-bold text-4xl text-primary">
      0{suffix}
    </p>
  );
}

export function AboutSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section id="about" data-ocid="about.section" className="py-28 bg-muted/20">
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
            About Me
          </Badge>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground">
            What I{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Do
            </span>
          </h2>
        </motion.div>

        {/* Bio + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-24">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center lg:justify-start"
            data-ocid="about.portrait"
          >
            <div className="relative">
              {/* Glow backdrop */}
              <div
                className="absolute inset-0 rounded-2xl blur-2xl opacity-40 pointer-events-none"
                style={{
                  background: "rgba(0,212,255,0.25)",
                  transform: "scale(1.08)",
                }}
              />
              <img
                src="/assets/images/profile.jpg"
                alt="Mohammad Mohsin Shah"
                className="relative rounded-2xl object-cover shadow-elevated"
                style={{
                  width: 300,
                  height: 380,
                  border: "2px solid rgba(0,212,255,0.35)",
                  boxShadow:
                    "0 0 32px rgba(0,212,255,0.18), 0 8px 40px rgba(0,0,0,0.5)",
                }}
                width={300}
                height={380}
              />
            </div>
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="font-display font-bold text-2xl text-foreground">
                Hi, I'm {personal.name.split(" ").slice(0, 2).join(" ")} 👋
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {personal.bio}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Based in the beautiful valley of{" "}
                <span className="text-primary font-medium">
                  Shopian, Kashmir
                </span>
                , I specialize in crafting end-to-end digital products — from
                pixel-perfect interfaces to scalable backend systems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I believe great software lives at the intersection of technical
                excellence and human-centered design. Every line of code I write
                is crafted to deliver both functionality and delight.
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              data-ocid="about.contact_button"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-200"
            >
              Let's work together <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-effect rounded-2xl p-6 text-center shadow-elevated"
                data-ocid={`about.stat.${i + 1}`}
              >
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  inView={inView}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Services */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          data-ocid="about.services"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-effect rounded-2xl p-8 shadow-elevated group hover:border-primary/30 transition-smooth"
              data-ocid={`about.service.${i + 1}`}
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5 text-primary-foreground group-hover:scale-110 transition-smooth">
                {iconMap[service.icon]}
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-xs font-mono bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
