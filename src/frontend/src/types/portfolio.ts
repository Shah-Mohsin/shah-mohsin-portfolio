export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: "embedded" | "web" | "fullstack" | "uiux" | "mobile";
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: "frontend" | "backend" | "design" | "tools";
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}
