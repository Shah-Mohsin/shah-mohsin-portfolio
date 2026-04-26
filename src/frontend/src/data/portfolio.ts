import type {
  NavLink,
  Project,
  SkillGroup,
  SocialLink,
} from "../types/portfolio";

export const personal = {
  name: "Mohammad Mohsin Shah",
  displayName: "Shah Mohsin",
  initials: "SM",
  title: "Full-Stack Developer | Embedded Systems Enthusiast",
  location: "Shopian, Kashmir, India",
  bio: "Hi, I'm a full stack web developer and UI/UX designer. Ask for me when work calls. Anything You Want.",
  email: "shahmohsin1921@gmail.com",
  phone: "+91 6005453534",
  github: "https://github.com/Shah-Mohsin",
  linkedin: "https://www.linkedin.com/in/shah-mohsin-474999335",
  available: true,
};

export const navLinks: NavLink[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/Shah-Mohsin", icon: "github" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/shah-mohsin-474999335",
    icon: "linkedin",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Programming Languages",
    skills: ["C++", "Python", "JavaScript", "HTML", "CSS"],
  },
  {
    label: "Embedded Systems",
    skills: [
      "Arduino",
      "Sensors Integration",
      "Relay Systems",
      "Microcontroller Programming",
    ],
  },
  {
    label: "Web Development",
    skills: [
      "Responsive UI",
      "Bootstrap",
      "Front-End Layout Design",
      "React",
      "Node.js",
    ],
  },
  {
    label: "Tools & Platforms",
    skills: ["VS Code", "GitHub", "Netlify", "Arduino IDE"],
  },
];

export const projects: Project[] = [
  {
    id: "conveyor-counter",
    title: "Smart Conveyor Belt Counter",
    description:
      "Developed an object-counting system using sensors and microcontroller logic. Integrated OLED display output and relay-based control logic for automated operation.",
    tech: ["Arduino", "Sensors", "OLED Display", "Relay Control"],
    githubUrl: "https://github.com/Shah-Mohsin",
    featured: true,
    category: "embedded",
  },
  {
    id: "school-website",
    title: "School Website Development",
    description:
      "Designed and structured a responsive institutional website featuring department modules, admissions navigation, and scalable UI architecture.",
    tech: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Shah-Mohsin",
    featured: true,
    category: "web",
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    description:
      "Developed a responsive digital portfolio with animated components and optimized layout performance across devices.",
    tech: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Shah-Mohsin",
    featured: true,
    category: "web",
  },
];

export const services = [
  {
    icon: "⚡",
    title: "Full Stack Development",
    description:
      "End-to-end web applications with modern React frontends and robust Node.js backends.",
    tags: ["React", "Node.js", "HTML", "CSS", "JavaScript"],
  },
  {
    icon: "🔌",
    title: "Embedded Systems",
    description:
      "Microcontroller-based solutions with sensor integration, relay control, and OLED display output.",
    tags: ["Arduino", "Sensors", "Relay Systems", "Microcontrollers"],
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description:
      "Beautiful, responsive interfaces designed with user experience and modern design principles.",
    tags: ["Responsive UI", "Bootstrap", "Front-End Design"],
  },
];
