"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileDown, ExternalLink, GraduationCap, Cpu, Layers, Timer, BookOpen, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- Editable Profile Data ---------------------------------------------------
const profile = {
  name: "Kyriakos Antoniou",
  headline: "MSc Artificial Intelligence — Model Compression • TensorRT • Robotics",
  location: "Groningen / Warsaw",
  blurb:
    "Master's student focused on tensor decompositions (CP/Tucker/TT) for CNN compression and deployment with NVIDIA TensorRT on embedded robotics (Jetson).",
  links: {
    github: "https://github.com/yourhandle",
    linkedin: "https://linkedin.com/in/yourhandle",
    email: "mailto:you@example.com",
    cv: "/Kyriakos_Antoniou_CV.pdf",
  },
};

// Project entries you can tailor. Keep 6–12.
const projects = [
  {
    title: "Thesis: Tensor Decomposition + TensorRT",
    tags: ["TensorRT", "CP", "Tucker", "TT", "Jetson"],
    description:
      "Comparative study across ResNet/DenseNet/VGG at multiple depths using CP/Tucker/TT and TensorRT; measuring accuracy, size, and latency on embedded hardware.",
    links: [{ label: "Paper/Proposal", href: "#" }, { label: "Code", href: "#" }],
    icon: <Layers className="w-5 h-5" />,
  },
  {
    title: "Clock Time Estimation (from scratch)",
    tags: ["PyTorch", "CNN", "Regression", "<20 MiB"],
    description:
      "Trained a lightweight CNN to read analogue clocks (hour+minute) without transfer learning, with strict model size constraints.",
    links: [{ label: "Repo", href: "#" }],
    icon: <Timer className="w-5 h-5" />,
  },
  {
    title: "Generative Models for Clocks",
    tags: ["VAE", "GAN", "Diffusion"],
    description:
      "Explored VAE/GAN/diffusion pipelines to synthesize clock faces conditioned on time labels.",
    links: [{ label: "Report", href: "#" }, { label: "Notebook", href: "#" }],
    icon: <Rocket className="w-5 h-5" />,
  },
  {
    title: "Encrypted Logistic Regression",
    tags: ["TenSEAL", "CKKS", "Privacy"],
    description:
      "Implemented logistic regression training/eval over homomorphically encrypted data using TenSEAL (CKKS).",
    links: [{ label: "Notebook", href: "#" }],
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    title: "Timing Under Risk (cognitive model)",
    tags: ["Python", "ACT-R style", "Stats"],
    description:
      "Built a timing reproduction model; analyzed punishment/noise effects with R (lme4, lmerTest).",
    links: [{ label: "Results", href: "#" }],
    icon: <Timer className="w-5 h-5" />,
  },
  {
    title: "World of Tanks — Loldle-style Web Game",
    tags: ["Full‑stack", "React", "Scraping"],
    description:
      "Designed a guessing game using tank datasets; clean UI and daily puzzles.",
    links: [{ label: "Prototype", href: "#" }],
    icon: <Rocket className="w-5 h-5" />,
  },
];

const education = [
  {
    school: "University of Groningen",
    degree: "MSc Artificial Intelligence",
    years: "2024 – 2026 (exp)",
    details: [
      "Robotics for AI, Deep Learning, Privacy‑Preserving ML",
      "Thesis on tensor decompositions and TensorRT",
    ],
  },
  {
    school: "BSc (prior)",
    degree: "BSc Computer Science / Related",
    years: "2019 – 2023",
    details: ["Algorithms, Systems, Math for ML"],
  },
];

const skills = [
  {
    title: "ML/AI",
    items: ["PyTorch", "TensorRT", "torch2trt", "Tensorly", "NVIDIA Triton", "ONNX"],
  },
  { title: "Compression", items: ["CP", "Tucker", "Tensor Train (TT)", "Quantization", "Pruning"] },
  { title: "Systems", items: ["CUDA basics", "Jetson Nano", "Docker", "Linux"] },
  { title: "Data/Stats", items: ["Pandas", "NumPy", "scikit‑learn", "R (lme4)"] },
  { title: "Web/Apps", items: ["React", "Next.js", "FastAPI", "SQL"] },
];

const publications = [
  {
    title: "Draft Thesis Proposal: Efficient CNNs via Tensor Decomposition + TensorRT",
    venue: "Internal proposal, 2025",
    link: "#",
  },
];

const courses = [
  "Deep Learning",
  "Reinforcement Learning",
  "Robotics for AI",
  "Computer Vision",
  "Privacy‑Preserving ML",
];

// --- UI Components -----------------------------------------------------------
const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 py-12 md:py-20">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">{title}</h2>
      {children}
    </div>
  </section>
);

const ProjectCard = ({ p }: { p: any }) => (
  <Card className="h-full">
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {p.icon}
        <span>{p.tags.slice(0, 2).join(" • ")}</span>
      </div>
      <CardTitle className="text-lg mt-1">{p.title}</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p className="mb-4 leading-relaxed">{p.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {p.tags.map((t: string) => (
          <Badge key={t} variant="secondary">{t}</Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {p.links?.map((l: any) => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm underline underline-offset-4">
            {l.label} <ExternalLink className="w-4 h-4" />
          </a>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
        <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#home" className="font-semibold">KA</a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#projects" className="hover:underline underline-offset-4">Projects</a>
            <a href="#skills" className="hover:underline underline-offset-4">Skills</a>
            <a href="#education" className="hover:underline underline-offset-4">Education</a>
            <a href="#publications" className="hover:underline underline-offset-4">Publications</a>
            <a href="#contact" className="hover:underline underline-offset-4">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="pt-16 md:pt-24 pb-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-5xl font-bold tracking-tight">
              {profile.name}
            </motion.h1>
            <p className="mt-3 text-lg md:text-xl text-slate-700">{profile.headline}</p>
            <p className="mt-4 text-slate-600 max-w-2xl leading-relaxed">{profile.blurb}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={profile.links.cv} target="_blank" rel="noreferrer">
                <Button className="gap-2"><FileDown className="w-4 h-4" /> Download CV</Button>
              </a>
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                <Button variant="secondary" className="gap-2"><Github className="w-4 h-4" /> GitHub</Button>
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                <Button variant="secondary" className="gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</Button>
              </a>
              <a href={profile.links.email}>
                <Button variant="ghost" className="gap-2"><Mail className="w-4 h-4" /> Contact</Button>
              </a>
            </div>
          </div>
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="flex items-center gap-2"><GraduationCap className="w-4 h-4" /> MSc AI @ UG</p>
                <p className="flex items-center gap-2"><Cpu className="w-4 h-4" /> TensorRT • Jetson</p>
                <p className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Courses: {courses.slice(0,3).join(", ")}…</p>
                <p className="text-slate-600">Open to collaborations & research internships.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects */}
      <Section id="projects" title="Selected Projects">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills & Tools">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((g) => (
            <Card key={g.title}>
              <CardHeader className="pb-2"><CardTitle className="text-lg">{g.title}</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <Badge key={s} variant="outline">{s}</Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section id="education" title="Education">
        <div className="grid md:grid-cols-2 gap-5">
          {education.map((e) => (
            <Card key={e.school}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{e.school}</CardTitle>
                <p className="text-sm text-muted-foreground">{e.degree} • {e.years}</p>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {e.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Publications */}
      <Section id="publications" title="Publications & Writing">
        <div className="space-y-4">
          {publications.map((pub) => (
            <div key={pub.title} className="p-4 border rounded-xl bg-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h3 className="font-medium">{pub.title}</h3>
                  <p className="text-sm text-muted-foreground">{pub.venue}</p>
                </div>
                <a href={pub.link} className="inline-flex items-center gap-1 text-sm underline underline-offset-4"><ExternalLink className="w-4 h-4"/> View</a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Get in touch">
        <div className="max-w-2xl">
          <p className="text-slate-700 mb-6">If you'd like to chat about research, internships, or collaborations, ping me via email or LinkedIn. I'm especially interested in embedded AI, efficient deep learning, and robotics applications.</p>
          <div className="flex flex-wrap gap-3">
            <a href={profile.links.email}><Button className="gap-2"><Mail className="w-4 h-4"/> Email me</Button></a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer"><Button variant="secondary" className="gap-2"><Linkedin className="w-4 h-4"/> LinkedIn</Button></a>
            <a href={profile.links.github} target="_blank" rel="noreferrer"><Button variant="ghost" className="gap-2"><Github className="w-4 h-4"/> GitHub</Button></a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#projects" className="hover:underline underline-offset-4">Projects</a>
            <a href="#skills" className="hover:underline underline-offset-4">Skills</a>
            <a href="#education" className="hover:underline underline-offset-4">Education</a>
            <a href="#publications" className="hover:underline underline-offset-4">Writing</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
