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
  description: string[];
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
    items: ["Next.js", "React.js", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
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
    title: "Global Webify Website",
    description:
      "Built and deployed the company’s official website, including dynamic service/blog/portfolio pages, a career portal with job applications, and inquiry forms with Cloudinary uploads and TipTap rich-text editing.",
    image: "/projects/project1.png",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Prisma ORM", "MySQL", "Vercel", "Cloudinary", "TipTap", "JWT"],
    liveUrl: "https://www.globalwebify.com/",
    githubUrl: "#",
  },
  {
    title: "Multi-Vendor E-Commerce Platform",
    description:
      "Architected a scalable marketplace with vendor and admin dashboards. Integrated Razorpay and Shiprocket APIs, automating 100% of vendor payout splits and AWB dispatch generation, cutting order processing time by 80%.",
    image: "/projects/project2.png",
    tags: ["Next.js", "React", "TypeScript", "Prisma ORM", "MySQL", "Tailwind CSS", "Razorpay", "Shiprocket API"],
    liveUrl: "https://stopshop-v2.vercel.app/",
    githubUrl: "#",
  },
  {
    title: "NotionZoa Coordinator Dashboard",
    description:
      "Engineered integration with the Jira API to synchronize bug tickets, enabling real-time display. Developed a Coordinator approval workflow with strict validation and secure Role-Based Access Control (RBAC).",
    image: "/projects/project3.png",
    tags: ["Laravel", "PHP", "PostgreSQL", "React.js", "REST API", "Tailwind CSS"],
    liveUrl: "",
    githubUrl: "#",
  },
  {
    title: "Jobbers | Naukari",
    description:
      "A premium MERN stack job portal featuring real-time skill-match scoring, dynamic IT/Non-IT feed customization, and automated application tracking. Highly responsive, dark/light adaptive dashboard interfaces for both candidates and recruiter hiring teams.",
    image: "/projects/project4.png",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Vercel", "Render"],
    liveUrl: "https://jobbers-chi.vercel.app/",
    githubUrl: "#",
  },
  {
    title: "All-in-One Resume Toolkit",
    description:
      "A 100% frontend-only, privacy-first web application. Features an ATS-friendly resume builder, simulated ATS checker, PDF editor, and image resizer. All processing happens entirely in the browser using pdf-lib and browser-image-compression with zero backend interactions.",
    image: "/projects/project5.png",
    tags: ["React 18", "Vite", "Tailwind CSS", "jsPDF", "pdf-lib"],
    liveUrl: "https://myresizer-resume.vercel.app/",
    githubUrl: "#",
  }
];

export const experiences: Experience[] = [
  {
    year: "May 2026 - Present",
    role: "Web Developer",
    company: "Global Webify | Ranchi, Jharkhand",
    description: [
      "Built and deployed the company’s official website, including dynamic service/blog/portfolio pages, a career portal with job applications, and inquiry forms with Cloudinary uploads and TipTap rich-text editing.",
      "Achieved a 90+ Lighthouse score through strategic database indexing, Sharp image optimization, and code splitting.",
      "Developed a custom admin CMS with JWT-based role authentication, rate-limited login, and audit logging, enabling the internal team to manage 10+ content modules independently, without developer support.",
      "Tech Stack: Next.js 14, TypeScript, Prisma ORM, MySQL, Vercel, Cloudinary, TipTap, JWT.",
    ],
  },
  {
    year: "Mar 2025 - Mar 2026",
    role: "Junior Software Intern",
    company: "NotionZoa | New Delhi",
    description: [
      "Engineered integration with the Jira API to synchronize bug tickets, enabling real-time display and attribution of each ticket to the respective QA member within the Coordinator dashboard.",
      "Developed a Coordinator approval workflow for reviewing bug reports and assigning impact-based reward points, with strict validation rules to prevent duplicate approvals.",
      "Implemented secure Role-Based Access Control (RBAC) across both dashboards using a Laravel backend, PostgreSQL database, and a responsive React and Tailwind CSS frontend, ensuring data integrity and proper user authorization.",
      "Tech Stack: Laravel, PHP, PostgreSQL, React, REST API, JavaScript, Git, and Tailwind CSS.",
    ],
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
    "Full Stack Developer with hands-on experience building and deploying production-ready web applications using Next.js, React, TypeScript, and Laravel. Skilled across the MERN stack, Prisma ORM, and Docker, with a strong focus on clean, scalable, MVC-based engineering.",
  location: "Ranchi, Jharkhand",
  availability: "Open to opportunities",
  education: "Bachelor of Computer Applications (BCA), Sarala Birla University",
};
