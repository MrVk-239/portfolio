import type { SkillCategory } from "@/types";

// ---------------------------------------------------------------------------
// Skill usage reference shortcuts — href points to the project or page where
// the technology was directly demonstrated.
// ---------------------------------------------------------------------------

const OJ = { label: "Online Judge", href: "/projects/online-judge" };
const FSA = { label: "File Sharing App", href: "/projects/file-sharing-app" };
const JAVA_CLI = { label: "Java CLI MySQL", href: "/projects/java-cli-mysql" };
const CRYPTO = { label: "IIT Madras Research", href: "/projects/cryptography-research" };
const CANDIDATE = { label: "Candidate Transformer", href: "/projects/candidate-data-transformer" };
const ML = { label: "ML Challenge", href: "/projects/ml-price-prediction" };
const CP = { label: "Problem Solving", href: "/problem-solving" };
const PORTFOLIO = { label: "Portfolio", href: "/" };

export const skillCategories: SkillCategory[] = [
  {
    name: "Competitive Programming",
    skills: [
      { name: "Data Structures & Algorithms", level: "primary", usedIn: [CP] },
      { name: "Dynamic Programming", level: "primary", usedIn: [CP] },
      { name: "Graph Algorithms", level: "primary", usedIn: [CP] },
      { name: "Binary Search", level: "primary", usedIn: [CP] },
      { name: "Number Theory", level: "secondary", usedIn: [CP] },
    ],
  },
  {
    name: "Backend Engineering",
    skills: [
      { name: "Node.js", level: "primary", usedIn: [OJ, FSA] },
      { name: "Express.js", level: "primary", usedIn: [OJ, FSA] },
      { name: "REST APIs", level: "primary", usedIn: [OJ] },
      { name: "JWT Auth", level: "primary", usedIn: [OJ] },
    ],
  },
  {
    name: "Frontend Engineering",
    skills: [
      { name: "React.js", level: "primary", usedIn: [OJ, FSA] },
      { name: "Redux", level: "primary", usedIn: [OJ] },
      { name: "Tailwind CSS", level: "primary", usedIn: [OJ, FSA, PORTFOLIO] },
      { name: "Next.js", level: "secondary", usedIn: [PORTFOLIO] },
      { name: "HTML / CSS", level: "primary" },
    ],
  },
  {
    name: "Programming Languages",
    skills: [
      { name: "C++", level: "primary", usedIn: [CP] },
      { name: "Python", level: "primary", usedIn: [CANDIDATE, ML, CRYPTO] },
      { name: "JavaScript", level: "primary", usedIn: [OJ, FSA] },
      { name: "TypeScript", level: "secondary", usedIn: [PORTFOLIO] },
      { name: "Java", level: "secondary", usedIn: [JAVA_CLI] },
      { name: "OCaml", level: "secondary", usedIn: [CRYPTO] },
      { name: "C", level: "secondary", usedIn: [CRYPTO, CP] },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "MongoDB", level: "primary", usedIn: [OJ, FSA] },
      { name: "MySQL", level: "secondary", usedIn: [JAVA_CLI] },
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "Docker", level: "primary", usedIn: [OJ, JAVA_CLI, CRYPTO] },
      { name: "Microsoft Azure", level: "secondary", usedIn: [OJ] },
      { name: "Vercel", level: "primary", usedIn: [PORTFOLIO, OJ] },
      { name: "Render", level: "secondary", usedIn: [FSA] },
    ],
  },
  {
    name: "Tools & Technologies",
    skills: [
      { name: "Git", level: "primary" },
      { name: "GitHub", level: "primary" },
      { name: "VS Code", level: "primary" },
      { name: "Postman", level: "secondary" },
    ],
  },
  {
    name: "Research & Performance Engineering",
    skills: [
      { name: "OCaml", level: "secondary", usedIn: [CRYPTO] },
      { name: "OxCaml", level: "secondary", usedIn: [CRYPTO] },
      { name: "C", level: "secondary", usedIn: [CRYPTO] },
      { name: "x86-64 Assembly Analysis", level: "secondary", usedIn: [CRYPTO] },
      { name: "SIMD Optimization", level: "secondary", usedIn: [CRYPTO] },
      { name: "Performance Benchmarking", level: "secondary", usedIn: [CRYPTO] },
      { name: "Linux", level: "secondary", usedIn: [CRYPTO] },
    ],
  },
  {
    name: "Relevant Coursework",
    variant: "coursework",
    skills: [
      { name: "Object-Oriented Programming (OOP)", level: "primary" },
      { name: "Operating Systems", level: "primary" },
      { name: "Computer Networks", level: "primary" },
      { name: "Database Management Systems (DBMS)", level: "primary" },
    ],
  },
];
