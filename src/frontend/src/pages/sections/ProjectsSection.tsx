import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type Filter = "all" | "embedded" | "web";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "embedded", label: "Embedded Systems" },
  { value: "web", label: "Web Development" },
];

// Category colors for project banner
const categoryStyle: Record<string, { bg: string; text: string }> = {
  embedded: {
    bg: "from-orange-900/30 to-orange-800/10",
    text: "text-orange-400",
  },
  web: { bg: "from-cyan-900/30 to-cyan-800/10", text: "text-cyan-400" },
  fullstack: { bg: "from-primary/20 to-primary/5", text: "text-primary" },
  uiux: { bg: "from-purple-900/30 to-purple-800/10", text: "text-purple-400" },
  mobile: { bg: "from-green-900/30 to-green-800/10", text: "text-green-400" },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const style = categoryStyle[project.category] ?? categoryStyle.fullstack;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="glass-effect rounded-2xl overflow-hidden shadow-elevated group flex flex-col"
      data-ocid={`projects.item.${index + 1}`}
    >
      {/* Project preview bar */}
      <div
        className={`h-40 bg-gradient-to-br ${style.bg} relative overflow-hidden border-b border-border/30`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`text-6xl font-display font-black select-none opacity-10 ${style.text}`}
          >
            {project.title.slice(0, 2).toUpperCase()}
          </div>
        </div>
        {/* Dot grid decoration */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--primary) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {project.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="text-xs font-mono bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
              Featured
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-smooth">
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              data-ocid={`projects.github_link.${index + 1}`}
              className="w-8 h-8 rounded-lg bg-card/80 backdrop-blur-sm border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              data-ocid={`projects.live_link.${index + 1}`}
              className="w-8 h-8 rounded-lg bg-card/80 backdrop-blur-sm border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="Live site"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          )}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-smooth">
            {project.title}
          </h3>
          <Badge
            variant="outline"
            className={`text-xs font-mono shrink-0 capitalize ${style.text} border-current/20 bg-current/5`}
          >
            {project.category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-xs font-mono bg-muted/60 text-muted-foreground border border-border/40"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={project.githubUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid={`projects.learn_more_link.${index + 1}`}
          className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:gap-2.5 transition-all duration-200 mt-1"
        >
          View on GitHub <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      data-ocid="projects.section"
      className="py-28 bg-muted/20"
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge
            variant="outline"
            className="border-primary/30 text-primary bg-primary/5 font-mono text-xs mb-4"
          >
            Selected Work
          </Badge>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Real-world projects spanning embedded systems and web development —
            built with care and attention to detail.
          </p>
        </motion.div>

        {/* Filters */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-10"
          data-ocid="projects.filter_tabs"
        >
          {filters.map((f) => (
            <Button
              key={f.value}
              variant={filter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.value)}
              data-ocid={`projects.filter.${f.value}`}
              className={
                filter === f.value
                  ? "gradient-primary text-primary-foreground font-medium shadow-elevated"
                  : "border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40"
              }
            >
              {f.label}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="projects.grid"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
