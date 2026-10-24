export const featuredId = "chatbot" as const;
export const featuredVisual = "Streaming multimodal interface.";

export const site = {
  brand: "MALIK",
  displayName: "Malik Fajar",
  fullName: "Muhammad Malik Fajar El Syarif",
  shortName: "Call me Malik",
  role: "PPLG student · software, UI/UX, and AI",
  location: "Cimahi, Indonesia",
  timeZone: "Asia/Jakarta",
  locale: "id-ID",
  siteUrl: "https://malikfajar.me",
  availability: "Open for internships, collaboration, and limited projects",
  headline: "Interfaces that feel designed, not default.",
  intro:
    "I build websites, systems, and visual experiments from Cimahi. Software development, UI/UX, AI, and technology are the lanes I keep walking — still a student, already shipping work.",
} as const;

export const nav = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
] as const;

export const profiles = [
  {
    label: "GitHub",
    href: "https://github.com/Malikkun09",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-malik-fajar-el-syarif-05773a392",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/malikajasih",
  },
  {
    label: "Dev.to",
    href: "https://dev.to/malikkun09",
  },
  {
    label: "Website",
    href: "https://malikfajar.me",
  },
] as const;

export const contact = {
  whatsapp: {
    label: "WhatsApp",
    display: "+62 889-1983-723",
    href: "https://wa.me/628891983723",
  },
  emailNote:
    "Preferred contact is WhatsApp or the public profiles below. No contact form — those links go where I actually read messages.",
} as const;

export const about = {
  kicker: "About",
  title: "A student who learns by shipping.",
  paragraphs: [
    "Hey — I’m Malik, a PPLG student at SMK Informatika Fithrah Insani in Cimahi. I learn by building: websites, interfaces, systems, and visual experiments.",
    "Software, UI/UX, AI, and technology are the lanes I keep walking. When I’m not in class or on PKL, I’m usually in a terminal, a Figma file, or an animation timeline.",
    "I like interfaces that feel designed, not default — type, contrast, and motion doing real work. This site is a working record of that process, not a claim of seniority.",
  ],
  focus: [
    { label: "Software", detail: "Web apps, APIs, and systems that can actually be used." },
    { label: "UI/UX", detail: "Hierarchy first. Decoration last. Motion with a job." },
    { label: "AI", detail: "Interfaces around models — chat, vision, and practical demos." },
    { label: "Technology", detail: "Linux, Git, and the tools that keep a build honest." },
  ],
} as const;

export const projects = [
  {
    id: "chatbot",
    title: "Multimodal Chatbot",
    context: "Personal",
    year: "2026",
    summary:
      "An interactive chatbot for text, images, MP4, and documents with streaming responses. Built around NVIDIA Nemotron Omni, with a free OpenRouter fallback when NVIDIA is rate-limited. Session memory stays in the browser.",
    stack: ["Next.js", "TypeScript", "NVIDIA NIM", "OpenRouter"],
    live: "https://chatbot.malikfajar.me",
    repo: "https://github.com/Malikkun09/chatbot-v2",
  },
  {
    id: "inventaris",
    title: "Inventaris",
    context: "PKL",
    year: "2026",
    summary:
      "Sistem Inventaris Barang from my PKL: a Laravel inventory app with role-based access, stock ledgers, and activity logs. Four access levels keep stock movements accountable. Source is public on GitHub.",
    stack: ["Laravel", "PHP", "MySQL", "Blade"],
    live: null,
    repo: "https://github.com/Malikkun09/pkl-crud-laravel-2",
  },
  {
    id: "skillmatch",
    title: "SkillMatch",
    context: "Coding Camp",
    year: "2026",
    summary:
      "KerjaIn / SkillMatch is a web platform that helps SMK students find internships, jobs, and career information. Capstone for Coding Camp 2026 (DBS Foundation), under the Future-Ready Work & Economy theme.",
    stack: ["Web", "Product", "Education"],
    live: "https://skillmatch.malikfajar.me",
    repo: null,
  },
  {
    id: "courtline",
    title: "Courtline",
    context: "Personal",
    year: "2026",
    summary:
      "A visual experiment: animation, interaction, and composition pushed until the interface feels alive. A playground for motion, transitions, and pacing on the web.",
    stack: ["Frontend", "Motion", "UI"],
    live: "https://courtline.malikfajar.me",
    repo: null,
  },
  {
    id: "jkn",
    title: "JKN BPJS",
    context: "Hackathon",
    year: "2026",
    summary:
      "A hackathon app for JKN BPJS: healthcare services behind a calmer, faster interface. Designed to reduce friction — fewer steps, clearer hierarchy, and an experience that respects the user under pressure.",
    stack: ["Hackathon", "UI/UX", "Frontend"],
    live: "https://jkn-bpjs-projek.malikfajar.my.id",
    repo: null,
  },
  {
    id: "eduverse",
    title: "EduVerse",
    context: "Personal",
    year: "2026",
    summary:
      "An education site with a brutalist-modern face: learning materials that stay easy to reach without flattening the visual character.",
    stack: ["JavaScript", "Frontend", "Education"],
    live: "https://eduverse.malikfajar.my.id",
    repo: "https://github.com/Malikkun09/eduverse-website",
  },
] as const;

export const stack = [
  {
    group: "Interface",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    group: "Systems",
    items: ["Laravel", "PHP", "MySQL", "Python"],
  },
  {
    group: "Craft",
    items: ["Figma", "Git", "Linux", "HTML / CSS"],
  },
  {
    group: "Exploration",
    items: ["AI interfaces", "NVIDIA NIM", "Computer vision demos"],
  },
] as const;

export const journey = [
  {
    period: "Now",
    title: "PPLG student",
    place: "SMK Informatika Fithrah Insani, Cimahi",
    detail:
      "Rekayasa Perangkat Lunak dan Gim. Coursework plus independent builds: websites, interfaces, and experiments in AI.",
  },
  {
    period: "PKL",
    title: "Inventaris system",
    place: "Field work",
    detail:
      "Built Sistem Inventaris Barang in Laravel during PKL: roles, stock ledgers, activity logs, and a public GitHub repository.",
  },
  {
    period: "2026",
    title: "Coding Camp capstone",
    place: "DBS Foundation — Coding Camp 2026",
    detail:
      "SkillMatch / KerjaIn: a platform for SMK students looking for internships, jobs, and career information.",
  },
  {
    period: "2026",
    title: "JKN BPJS hackathon",
    place: "Hackathon",
    detail:
      "Worked on a calmer interface for JKN BPJS healthcare services, focused on hierarchy and fewer steps.",
  },
] as const;

export type Project = (typeof projects)[number];
export type NavItem = (typeof nav)[number];

export function getFeaturedProject(): Project {
  const featured = projects.find((project) => project.id === featuredId);
  if (!featured) {
    throw new Error(`Featured project "${featuredId}" is missing from site data.`);
  }
  return featured;
}

export function getListedProjects(): Project[] {
  return projects.filter((project) => project.id !== featuredId);
}
