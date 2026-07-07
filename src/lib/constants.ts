export interface Skill {
  category: string;
  icon: string;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
}

export const skills: Skill[] = [
  {
    category: "Languages",
    icon: "📝",
    items: ["JavaScript (ES6+)", "TypeScript", "PHP"],
  },
  {
    category: "Frontend",
    icon: "🎨",
    items: ["Next.js", "React.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: "⚙️",
    items: ["Laravel", "Node.js", "Express.js", "RESTful API Design", "MVC Architecture"],
  },
  {
    category: "Database",
    icon: "🗄️",
    items: ["MySQL", "Prisma ORM", "PostgreSQL", "MongoDB"],
  },
  {
    category: "DevOps & Tools",
    icon: "🚀",
    items: ["Docker", "Vercel", "Git", "GitHub", "Postman"],
  }
];

export const projects: Project[] = [
  {
    title: "Company Website & Admin CMS",
    description:
      "Built and deployed the official company website featuring dynamic service/blog/portfolio pages, career portal, and inquiry forms. Developed a custom admin CMS with JWT-based role authentication, rate-limited login, and audit logging.",
    image: "/projects/project1.png",
    tags: ["Next.js 14", "TypeScript", "Prisma ORM", "MySQL", "Vercel", "Cloudinary", "TipTap", "JWT"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Multi-Vendor E-Commerce Platform",
    description:
      "Architected a scalable marketplace with vendor and admin dashboards. Integrated Razorpay and Shiprocket APIs, automating 100% of vendor payout splits and AWB dispatch generation.",
    image: "/projects/project2.png",
    tags: ["Next.js", "React", "TypeScript", "Prisma ORM", "MySQL", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Jira Issue Coordinator Dashboard",
    description:
      "Engineered seamless integration with the Jira API to synchronize bug tickets and developed a robust Coordinator approval workflow with Role-Based Access Control.",
    image: "/projects/project3.png",
    tags: ["Laravel", "PHP", "PostgreSQL", "React.js", "REST API", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

export const experiences: Experience[] = [
  {
    year: "May 2026 - Present",
    role: "Web Developer",
    company: "GlobalWebify",
    description:
      "Achieved a 90+ Lighthouse score via strategic DB indexing, Sharp image optimization, and code splitting. Architected a scalable marketplace with hybrid SSR/ISR rendering and automated retention engine.",
  },
  {
    year: "Mar 2025 - Mar 2026",
    role: "Junior Software Intern",
    company: "NotionZoa",
    description:
      "Engineered seamless integration with Jira API to synchronize bug tickets. Developed a robust Coordinator approval workflow and implemented secure Role-Based Access Control (RBAC).",
  }
];

export const socialLinks = {
  github: "https://github.com/VikramKumar-1",
  linkedin: "https://linkedin.com/in/vikram-kumar-824037301",
  twitter: "https://twitter.com",
  email: "mailto:vikuraj3337@gmail.com",
};

export const siteConfig = {
  name: "Vikram Kumar",
  role: "Full Stack Developer",
  tagline: "I build things for the web",
  description:
    "Highly motivated Full Stack Developer with proven expertise in designing, developing, and deploying production-ready applications. Adept at implementing MVC architecture and committed to crafting clean, maintainable code for robust full-stack engineering solutions.",
  location: "Ranchi, Jharkhand",
  availability: "Open to opportunities",
};
