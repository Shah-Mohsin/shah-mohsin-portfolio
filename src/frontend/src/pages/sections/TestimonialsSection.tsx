import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Aisha Malik",
    role: "Founder, NexaStore",
    quote:
      "Mohsin transformed our e-commerce concept into a stunning, high-performance platform. His attention to UI detail and performance optimization exceeded every expectation we had.",
    avatar: "AM",
  },
  {
    id: 2,
    name: "Rahul Kapoor",
    role: "CTO, TaskBridge Technologies",
    quote:
      "Working with Mohsin felt like having a senior developer and a UX designer in one. He delivered our project management dashboard ahead of schedule, and the code quality was exceptional.",
    avatar: "RK",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Product Manager, CloudSync",
    quote:
      "From wireframes to production deployment, Mohsin handled everything flawlessly. The file-sharing platform he built has become the core of our team's workflow. Highly recommended.",
    avatar: "PS",
  },
  {
    id: 4,
    name: "Daniel Osei",
    role: "CEO, FinTrack Africa",
    quote:
      "Mohsin delivered a beautiful, responsive dashboard with real-time analytics that our users love. His communication was clear throughout and he truly understood what we were trying to build.",
    avatar: "DO",
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (next: number) => {
      setDirection(next > active ? 1 : -1);
      setActive(next);
    },
    [active],
  );

  const prev = useCallback(() => {
    go((active - 1 + testimonials.length) % testimonials.length);
  }, [active, go]);

  const next = useCallback(() => {
    go((active + 1) % testimonials.length);
  }, [active, go]);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const t = testimonials[active];

  return (
    <section
      id="testimonials"
      data-ocid="testimonials.section"
      className="py-28 bg-background"
    >
      <div className="container">
        {/* Header */}
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
            Client Feedback
          </Badge>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground">
            What Clients{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Delivering results that speak louder than words — here's what my
            clients have to say about working with me.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="max-w-3xl mx-auto relative"
          data-ocid="testimonials.carousel"
        >
          {/* Quote card */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="glass-effect rounded-2xl p-10 shadow-elevated text-center"
                data-ocid={`testimonials.item.${active + 1}`}
              >
                {/* Quote mark */}
                <div className="text-6xl font-display font-black text-primary/20 leading-none select-none mb-4">
                  "
                </div>
                <p className="text-foreground/90 text-lg leading-relaxed italic mb-8">
                  {t.quote}
                </p>
                {/* Avatar + identity */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold font-mono text-sm shadow-elevated">
                    {t.avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-display font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={prev}
              data-ocid="testimonials.prev_button"
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-smooth"
            >
              ‹
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((testimonial, i) => (
                <button
                  type="button"
                  key={testimonial.id}
                  onClick={() => go(i)}
                  data-ocid={`testimonials.dot.${i + 1}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 h-2 bg-primary"
                      : "w-2 h-2 bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              data-ocid="testimonials.next_button"
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-smooth"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
