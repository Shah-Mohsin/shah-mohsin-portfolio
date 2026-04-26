import { Badge } from "@/components/ui/badge";
import { skillGroups } from "@/data/portfolio";
import { motion } from "motion/react";

const categoryColors: Record<string, string> = {
  "Programming Languages": "bg-primary/10 text-primary border-primary/20",
  "Embedded Systems": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Web Development": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Tools & Platforms": "bg-muted text-muted-foreground border-border/60",
};

export function SkillsSection() {
  return (
    <section
      id="skills"
      data-ocid="skills.section"
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
            Tech Stack
          </Badge>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground">
            Skills &{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            From embedded systems to full-stack web development — tools and
            technologies I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skill Groups */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          data-ocid="skills.grid"
        >
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.08 }}
              className="glass-effect rounded-2xl p-8 shadow-elevated"
              data-ocid={`skills.group.${gi + 1}`}
            >
              <h3 className="font-display font-semibold text-lg text-foreground mb-5 flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-primary inline-block" />
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: gi * 0.08 + si * 0.04 }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-smooth cursor-default ${
                      categoryColors[group.label] ??
                      "bg-primary/10 text-primary border-primary/20"
                    }`}
                    data-ocid={`skills.item.${gi * 10 + si + 1}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-2xl gradient-primary p-8 text-center shadow-elevated"
          data-ocid="skills.cta_banner"
        >
          <p className="font-display font-semibold text-xl text-primary-foreground">
            Always learning, always growing 🚀
          </p>
          <p className="text-primary-foreground/70 mt-2 text-sm">
            Currently expanding into advanced embedded systems, IoT, and modern
            full-stack frameworks.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
