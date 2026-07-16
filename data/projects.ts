import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "online-judge",
    title: "Online Judge Platform",
    tagline: "A full-stack competitive programming platform with AI-powered code review.",
    description:
      "A production-grade Online Judge built during my Software Engineering Co-op at AlgoUniversity (Y-Combinator backed). The platform enables users to solve coding problems, submit solutions in multiple languages, and receive instant automated verdicts — with AI-assisted debugging.",
    problem:
      "Competitive programmers need a platform that handles multi-language code execution securely and at scale, with meaningful feedback beyond just pass/fail verdicts.",
    whyBuilt:
      "Built as part of my Software Engineering Co-op at AlgoUniversity to give their learners a hands-on competitive programming environment. I took ownership of the full stack — from the Docker-based execution engine to the AI review layer.",
    techStack: [
      "React.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Docker",
      "JWT",
      "Google Gemini API",
      "Microsoft Azure",
      "Vercel",
    ],
    features: [
      "Multi-language code execution (C, C++, Java, Python) inside Docker containers with time and memory limits",
      "JWT-based authentication with role-based access control (Admin / User)",
      "Admin panel for problem and test case management",
      "AI-powered code review via Google Gemini — explains errors and suggests optimizations without revealing solutions",
      "Submission history with detailed verdicts and runtime feedback",
      "Responsive UI with real-time submission status updates",
    ],
    challenges: [
      "Designing a sandboxed code execution environment that prevents malicious code from affecting the host system while maintaining low latency",
      "Reducing page load time by 35% through frontend optimization — code splitting, lazy loading, and efficient state management with Redux",
      "Architecting for auto-scalability to handle 500+ concurrent users on Azure without performance degradation",
    ],
    learnings: [
      "Production-level system design — separating concerns across frontend, backend, and compiler microservices",
      "Docker container orchestration for secure, isolated code execution",
      "Mentorship from engineers at Google, Apple, ByteDance, and Alphagrep shaped my approach to scalability and code quality",
    ],
    metrics: [
      "100+ monthly active users",
      "1,000+ code submissions processed",
      "99.9% crash-free sessions",
      "35% page load time reduction",
      "Auto-scalable to 500+ concurrent users",
    ],
    impact:
      "100+ monthly active users · 1,000+ code submissions · 99.9% crash-free · 35% page load improvement · Auto-scalable to 500+ concurrent users",
    tags: ["Full Stack", "Systems", "AI", "DevOps"],
    githubUrl: "https://github.com/MrVk-239/online_judge",
    blogUrl: "/blog/building-an-online-judge",
    relatedArticles: ["building-an-online-judge"],
    featured: true,
    order: 1,
    category: "fullstack",
    status: "completed",
    date: "2025-06",
    endDate: "2025-07",
  },
  {
    slug: "cryptography-research",
    title: "Performance Engineering of Cryptographic Primitives",
    tagline: "Assembly-guided study of the OCaml/OxCaml performance frontier — Rijndael at C parity, OxCaml SIMD at 86% of C SIMD for ChaCha20.",
    description:
      "A completed compiler and runtime engineering study measuring how closely OCaml and OxCaml can approach C performance for cryptographic software. Six primitives were studied — XOR, AES-128, Rijndael, AES-NI, ChaCha20, SHA-256 — across 15 implementations and ~35 named optimization stages. Generated assembly served as the primary evidence, with benchmarks as consistency checks.",
    problem:
      "OCaml is increasingly used in production security-critical systems (Jane Street, Meta), but there is limited rigorous research on how its cryptographic performance compares to C — especially with OxCaml's unboxed types and SIMD builtins. The irreducible vs. fixable language costs needed systematic quantification.",
    whyBuilt:
      "Driven by curiosity about the intersection of programming language design, performance engineering, and cryptography — specifically whether OCaml's safety guarantees come at a measurable cost for cryptographic workloads, and which of those costs are architectural versus compiler-fixable.",
    techStack: [
      "C",
      "OCaml",
      "OxCaml",
      "x86-64 Assembly (SIMD/SSE2/AVX2)",
      "Python (benchmarking)",
      "Make",
      "Shell",
    ],
    features: [
      "Assembly-guided methodology: generated machine code as primary evidence; benchmarks as consistency checks rather than the definitive metric",
      "Rijndael (T-table AES): full C parity (1.00×) by eliminating Int32 boxing — GC pressure dropped from 1,208 to 8 minor collections per 100 MB run",
      "ChaCha20 OxCaml SIMD: 1.61× C reference (275 vs 170 MB/s) with zero block-function assembly gap; 14% outer-loop gap in counter update and buffer allocation",
      "SHA-256 int32# migration: +52% over optimized OCaml scalar (73.99 vs 48.68 MB/s); rotate idiom non-recognition identified as dominant remaining gap",
      "Quantified irreducible OCaml scalar gaps: integer tagging ~13.5%, 32-bit masking ~25.8%, rotate expansion ~7 instructions vs 1 C instruction",
      "Discovered Array.unsafe_get can regress performance when safe accesses serve as range proofs for bounds-check elimination",
    ],
    challenges: [
      "Distinguishing reducible from irreducible performance gaps — separating source-level fixable issues (Int32 boxing, bounds checks) from architectural compiler limits (integer tagging, rotate non-recognition)",
      "Designing a fair benchmarking methodology where the location of bounds checks — not just their count — determined actual performance outcomes",
      "Understanding Flambda2's optimization pipeline deeply enough to predict when constant hoisting or loop restructuring survives to code generation",
    ],
    learnings: [
      "Full C parity is achievable for algorithms whose arithmetic is byte extraction and XOR — Rijndael OCaml matches C after eliminating Int32 boxing while preserving all safety properties",
      "The OCaml scalar gap on 32-bit modular arithmetic is ~3× and ~99% irreducible without int32# or compiler changes — quantifying this precisely was the core contribution",
      "OxCaml SIMD reaches 86% of equivalent C when all required builtins exist; the inner compute loop is no longer the bottleneck — surrounding orchestration code is",
    ],
    metrics: [
      "6 cryptographic primitives: XOR, AES-128, Rijndael, AES-NI, ChaCha20, SHA-256",
      "15 distinct implementations across ~35 named optimization stages",
      "Rijndael OCaml: 1.00× C — GC pressure from 1,208 → 8 minor collections per benchmark",
      "OxCaml SIMD ChaCha20: 1.61× C with zero block-function assembly gap",
      "SHA-256 int32#: 0.50× C vs 0.33× standard OCaml (+52% from unboxed types)",
      "51 benchmark CSV files; ~10,900 documentation lines across 39 files",
    ],
    impact:
      "Full parity is achievable for algorithms whose arithmetic is byte extraction and XOR. For 32-bit modular arithmetic, the OCaml scalar gap is ~3× and ~99% irreducible at the source level — requiring int32# or compiler changes.",
    tags: ["Systems", "Research", "Performance", "Cryptography"],
    githubUrl: "https://github.com/fplaunchpad/ocaml-c-cryptography",
    blogUrl: "/blog/cryptography-research-ocaml",
    relatedArticles: ["cryptography-research-ocaml"],
    featured: true,
    order: 2,
    category: "research",
    status: "completed",
    date: "2025-01",
    endDate: "2026-07",
  },
  {
    slug: "file-sharing-app",
    title: "VK File Sharing App",
    tagline: "Full-stack file sharing platform with unique link generation and download tracking.",
    description:
      "A MERN-stack file sharing application that allows users to upload files, generate unique shareable download links, and track download counts — deployed and publicly accessible.",
    problem:
      "Simple, dependency-free file sharing with unique links and download analytics, without requiring user accounts.",
    whyBuilt:
      "Built to explore file handling in Node.js, practice full-stack deployment across multiple platforms, and understand the end-to-end flow of a file management system.",
    techStack: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Multer",
      "Vercel",
      "Render",
    ],
    features: [
      "File upload with unique link generation per file",
      "Download count tracking persisted in MongoDB",
      "Responsive UI built with React + Tailwind CSS",
      "CORS-enabled API with error handling",
    ],
    challenges: [
      "Managing stateful file storage on Render's free tier (ephemeral filesystem)",
      "Handling CORS correctly across Vercel frontend and Render backend deployments",
    ],
    learnings: [
      "Practical experience with multi-platform deployment (Vercel + Render)",
      "File handling middleware (Multer) and binary data management in Node.js",
    ],
    metrics: [
      "Unique per-file download links with MongoDB-persisted download counts",
      "Deployed across Vercel (frontend) + Render (backend)",
    ],
    tags: ["Full Stack", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/MrVk-239/VK_File_Sharing_App",
    featured: true,
    order: 3,
    category: "fullstack",
    status: "completed",
    date: "2025-07",
  },
  {
    slug: "candidate-data-transformer",
    title: "Candidate Data Transformer",
    tagline: "A modular Python pipeline for ingesting, normalizing, and transforming candidate data.",
    description:
      "A production-quality Python data pipeline that ingests candidate information from multiple sources (CSV and plain-text GitHub profiles), normalizes and validates it, deduplicates records with provenance tracking, and outputs configurable JSON.",
    problem:
      "Recruiting pipelines deal with messy, inconsistent candidate data across formats. Manual normalization is error-prone and doesn't scale.",
    whyBuilt:
      "Built as a backend engineering assignment to demonstrate clean software architecture, modular design, and thorough testing practices.",
    techStack: [
      "Python 3.12",
      "Pydantic v2",
      "Pytest",
      "phonenumbers",
      "python-dateutil",
    ],
    features: [
      "Multi-source ingestion: CSV recruiter data and plain-text GitHub profiles",
      "Data normalization: email, phone (E.164), skill aliases, date standardization",
      "Merge engine: deduplication with source provenance tracking",
      "Configurable output: field selection, renaming, confidence scoring",
      "CLI interface with 114 passing tests",
    ],
    challenges: [
      "Designing a clean pipeline architecture (parsers → normalizers → merger → validator → projector) where each stage has a single responsibility",
      "Implementing robust deduplication that tracks which source each field came from",
    ],
    learnings: [
      "Pydantic v2 for strongly-typed, validated data models in production pipelines",
      "The value of comprehensive test coverage — 114 tests caught multiple edge cases during development",
    ],
    metrics: [
      "114 passing tests covering normalization, deduplication, and projection",
      "Multi-source ingestion: CSV + plain-text GitHub profiles",
      "E.164 phone normalization, skill alias resolution, date standardization",
    ],
    tags: ["Backend", "Python", "Data Pipeline"],
    githubUrl: "https://github.com/MrVk-239/candidate-data-transformer",
    featured: false,
    order: 4,
    category: "backend",
    status: "completed",
    date: "2026-06",
  },
  {
    slug: "ml-price-prediction",
    title: "E-Commerce Price Prediction",
    tagline: "ML solution for predicting optimal product pricing from 75k catalog entries.",
    description:
      "A machine learning pipeline built for a competitive challenge, predicting e-commerce product prices from catalog content using TF-IDF feature extraction and Ridge regression.",
    problem:
      "Determining optimal price points for marketplace products from unstructured text descriptions at scale.",
    whyBuilt:
      "Participated in the ML Challenge 2025 to build practical ML pipeline skills — from data exploration and feature engineering to model evaluation.",
    techStack: [
      "Python",
      "Jupyter Notebook",
      "scikit-learn",
      "TF-IDF",
      "Ridge Regression",
      "pandas",
      "numpy",
    ],
    features: [
      "TF-IDF vectorization of catalog text for feature extraction",
      "Ridge regression for price prediction on 75,000 samples",
      "SMAPE (Symmetric Mean Absolute Percentage Error) evaluation",
      "Modular utility functions for preprocessing and submission generation",
    ],
    challenges: [
      "Feature engineering from unstructured product descriptions without image data (excluded due to hardware constraints)",
    ],
    learnings: [
      "End-to-end ML pipeline construction from raw data to evaluation-ready submissions",
      "Trade-offs between model complexity and generalization on large datasets",
    ],
    metrics: [
      "75,000 catalog entries processed",
      "TF-IDF + Ridge regression pipeline with SMAPE evaluation",
    ],
    tags: ["Machine Learning", "Python", "NLP"],
    githubUrl: "https://github.com/MrVk-239/ml_challenge",
    featured: false,
    order: 5,
    category: "ml",
    status: "completed",
    date: "2025-10",
  },
  {
    slug: "java-cli-mysql",
    title: "Java CLI MySQL Manager",
    tagline: "Containerized Java CLI for MySQL CRUD operations using Docker Compose multi-container orchestration.",
    description:
      "A Docker-containerized Java CLI application that performs user management CRUD operations against a MySQL database. Built as a college mini project demonstrating Docker multi-container orchestration, multi-stage builds, and automatic schema initialization with connection retry logic.",
    problem:
      "Demonstrating Docker multi-container orchestration with an application container and a database container working together with proper startup sequencing.",
    whyBuilt:
      "Built to explore Docker Compose for multi-container setups — specifically the pattern of a Java application waiting for a MySQL container to become ready before connecting.",
    techStack: ["Java 17", "Maven", "MySQL 8.0", "Docker", "Docker Compose"],
    features: [
      "Interactive CLI menu for user management: Add, List, Update, Delete",
      "Automatic database initialization with retry logic (10 retries, 3-second intervals)",
      "Multi-stage Docker build with Maven Shade plugin for a self-contained fat JAR",
      "Environment-based configuration for portable container deployment",
    ],
    challenges: [
      "Implementing reliable container startup ordering — the application container must wait for MySQL readiness before attempting to connect",
    ],
    learnings: [
      "Docker Compose multi-container orchestration and health-check-based startup sequencing",
      "Java database access layer structured with the DAO pattern: App → UserDao → DBConnection → MySQL",
    ],
    metrics: [
      "Full CRUD operations via interactive CLI",
      "Automatic schema creation on first run",
      "Single-command deployment with docker-compose up --build",
    ],
    tags: ["Backend", "Java", "Docker"],
    githubUrl: "https://github.com/MrVk-239/java-cli-mysql",
    featured: false,
    order: 6,
    category: "backend",
    status: "completed",
    date: "2026-07",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
