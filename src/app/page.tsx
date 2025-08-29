"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileDown, ExternalLink, GraduationCap, Cpu, Layers, Timer, BookOpen, Rocket, ChevronDown, ChevronUp, ShieldCheck, BarChart3, Gamepad, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ---------------- Types ----------------
type LinkRef = { label: string; href: string };
type Project = {
  title: string;
  tags: string[];
  description: string;
  links?: LinkRef[];
  icon: React.ReactNode;
  featured?: boolean;
};

// ---------------- Profile ----------------
const profile = {
  name: "Kyriakos Antoniou",
  headline: "MSc Artificial Intelligence",
  location: "Groningen (Netherlands) / Nicosia (Cyprus)",
  blurb:
    "Master's student focused on tensor decompositions (CP/Tucker/TT) for CNN compression and deployment with NVIDIA TensorRT on embedded robotics (Jetson).",
  links: {
    github: "https://github.com/UnknownGamerYT",
    linkedin: "https://www.linkedin.com/in/kyriakos-antoniou-a26b64230/",
    email: "mailto:kyriakosantoniou3@gmail.com",
    cv: "/Kyriakos_Antoniou_CV.pdf",
  },
};

// ---------------- Projects ----------------
const projects: Project[] = [
  // ===== Efficient DL / Thesis =====
  {
    title: "Thesis: Tensor Decomposition + TensorRT",
    tags: ["TensorRT", "CP", "Tucker", "TT", "Jetson"],
    description:
      "Comparative study across ResNet/DenseNet/VGG at multiple depths using CP/Tucker/TT and TensorRT; measuring accuracy, size, and latency on embedded hardware.",
    links: [
      { label: "Proposal", href: "/reports/Exploring_Model_Tensor_Decomposition_Techniques_on_Model_Performance_after_TensorRT_Conversion.pdf" },
      { label: "WIP Code", href: "#" }
    ],
    icon: <Layers className="w-5 h-5" />,
  },

  // ===== Pattern Recognition / Semi-supervised =====
  {
    title: "Semi-Supervised Credit-Card Fraud Detection",
    tags: ["Semi-Supervised", "k-NN", "Label Propagation", "Imbalanced"],
    description:
      "100× simulation comparing baseline k-NN vs. Label Propagation (transductive) on highly imbalanced fraud data; reports Accuracy & F1 uplift.",
    links: [
      { label: "Report", href: "/reports/Pattern_Recognition_Assignment_2_semi_supervised_learning.pdf" }
    ],
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    title: "Pattern Recognition Pipelines (Images & RNA)",
    tags: ["PCA", "RandomForest", "SIFT", "LogReg", "Clustering"],
    description:
      "Two end-to-end PR pipelines: RNA tumor classification (PCA+RF best) and wildlife images (SIFT + multinomial logistic regression).",
    links: [
      { label: "Scientific Report", href: "/reports/Pattern_Recognition_Assignment_2_Scientific_Report.pdf" }
    ],
    icon: <BarChart3 className="w-5 h-5" />,
  },

  // ===== Vision / OCR =====
  {
    title: "Dead Sea Scrolls & IAM Handwriting OCR",
    tags: ["OCR", "Hebrew", "ResNet", "Transformer", "cVAE", "GAN"],
    description:
      "Three-stage pipeline (line → character segmentation → recognition) with ResNet/Transformer; cVAE+GAN boosted Hebrew data from ~5.5k to ~24.9k samples.",
    links: [
      { label: "Report", href: "/reports/Handwriting_Recognition.pdf" },
      { label: "Repo", href: "https://github.com/RobertPower7/Handwriting-Recognition" }
    ],
    icon: <BookOpen className="w-5 h-5" />,
  },

  // ===== Self-supervised / Grounding =====
  {
    title: "Self-Supervised Visual Grounding (ViT)",
    tags: ["DINO/MAE", "RefCOCO", "Flickr30k", "Vision-Language"],
    description:
      "Fine-tuning self-supervised ViTs for referring expression grounding; evaluate by IoU/accuracy; visualize attention maps and boxes.",
    links: [
      { label: "Report", href: "/reports/UDL___Self_Supervised_Visual_Grounding.pdf" }
    ],
    icon: <Layers className="w-5 h-5" />,
  },

  // ===== Deep Learning Assignments =====
  {
    title: "Handwritten Digit Recognition (DL A1)",
    tags: ["LogReg", "CNN", "PCA", "Data Aug"],
    description:
      "Digits benchmark with classical ML and a lightweight CNN; PCA+features boosted linear baseline; tuned CNN reached ~96% test accuracy.",
    links: [
      { label: "Report", href: "/reports/Deep_Learning___Assignment_1.pdf" }
    ],
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    title: "DDPM — Paper Deep-Dive (DL A2)",
    tags: ["Diffusion", "U-Net", "DDPM"],
    description:
      "Technical walkthrough of DDPMs: forward noising schedule, reverse denoising with U-Net, and objective design choices.",
    links: [
      { label: "Report", href: "/reports/Deep_Learning_Assignment_2.pdf" }
    ],
    icon: <BookOpen className="w-5 h-5" />,
  },

  // ===== Privacy =====
  {
    title: "Data Privacy Lab: k-Anonymity & Differential Privacy",
    tags: ["k-anonymity", "Generalization", "Suppression", "Laplace", "ε"],
    description:
      "Made a dataset 2-anonymous via suppression/generalization; implemented Laplace mechanism for count queries with varying ε.",
    links: [
      { label: "Report", href: "/reports/Data_Privacy.pdf" }
    ],
    icon: <ShieldCheck className="w-5 h-5" />,
  },

  // ===== Cognitive Modelling =====
  {
    title: "Timing Under Risk (Cognitive Model)",
    tags: ["Python", "ACT-R style", "R lme4"],
    description:
      "Timing reproduction model with noise/punishment manipulations; mixed-effects analysis (lme4/lmerTest) on experimental data.",
    links: [
      { label: "Final Report", href: "/reports/Cognitive_Modelling__Final_Project.pdf" },
      { label: "Appendix/Notes", href: "/reports/Cognitive_Modelling.pdf" }
    ],
    icon: <Timer className="w-5 h-5" />,
  },
  {
    title: "Applied Cognitive Modelling — Dobble Android App",
    tags: ["Android", "Game", "Perception"],
    description:
      "Two-card visual search game (8 symbols/card) with scoring, penalties, and highlighted model attention; full class design for deck, cards, and play.",
    links: [
      { label: "Report", href: "/reports/AppliedCogMod.pdf" }
    ],
    icon: <Gamepad className="w-5 h-5" />,
  },

  // ===== Reinforcement Learning =====
  {
    title: "Deep RL: Catch with the DQN Family",
    tags: ["DQN", "DDQN", "Dueling", "DQV", "DQV-Max"],
    description:
      "Implemented and compared five DRL algorithms on Catch; all reached ~90% success post-training with replay + target networks.",
    links: [
      { label: "Report", href: "/reports/Deep_Reinforcement_Learning.pdf" }
    ],
    icon: <Rocket className="w-5 h-5" />,
  },
  {
    title: "Atari with Six Neurons — Reproduction",
    tags: ["RNN", "IDVQ", "DRSC", "XNES"],
    description:
      "Reimplemented IDVQ+DRSC feature pipeline and XNES optimisation for tiny recurrent policy networks on Atari tasks.",
    links: [
      { label: "Report", href: "/reports/ML_Project.pdf" }
    ],
    icon: <Network className="w-5 h-5" />,
  },

  // ===== Multi-Agent Systems / MAS =====
  {
    title: "Multi-Agent Systems — Project",
    tags: ["Multi-Agent", "MAS", "Logic"],
    description:
      "Course project on MAS formalisms and reasoning; modelling, verification, and coordination strategies.",
    links: [
      { label: "Project Report", href: "/reports/LAMAS_proj.pdf" },
      { label: "Beta Report", href: "/reports/MultiAgent_System__Beta_Report__Copy_.pdf" }
    ],
    icon: <Layers className="w-5 h-5" />,
  },

  // ===== Methodology / Survey =====
  {
    title: "Methodology in AI — Survey & Notes",
    tags: ["Survey", "Methodology", "AI"],
    description:
      "Critical review of contemporary AI methodologies; strengths, limitations, and reproducibility considerations.",
    links: [
      { label: "Report", href: "/reports/Methodology_in_AI.pdf" }
    ],
    icon: <BookOpen className="w-5 h-5" />,
  },

  // ===== Crypto / HE (your original) =====
  {
    title: "Encrypted Logistic Regression",
    tags: ["Homomorphic Encryption", "TenSEAL", "CKKS"],
    description:
      "Logistic regression training/eval over CKKS-encrypted data with TenSEAL; explores privacy/utility trade-offs.",
    links: [
      { label: "Notebook", href: "#" }
    ],
    icon: <Cpu className="w-5 h-5" />,
  },

  // ===== Clocks (your originals) =====
  {
    title: "Clock Time Estimation (from scratch)",
    tags: ["PyTorch", "CNN", "Regression", "<20 MiB"],
    description:
      "Trained a lightweight CNN to read analogue clocks (hour+minute) without transfer learning, with strict model size constraints.",
    links: [
      { label: "Report", href: "/reports/Deep_Learning___Assignment_1.pdf" } // same DL A1 report if you like, or replace later
    ],
    icon: <Timer className="w-5 h-5" />,
  },
  {
    title: "Generative Models for Clocks",
    tags: ["VAE", "GAN", "Diffusion"],
    description:
      "Explored VAE/GAN/diffusion pipelines to synthesize clock faces conditioned on time labels.",
    links: [
      { label: "Report", href: "/reports/Deep_Learning_Assignment_2.pdf" } // placeholder; swap with a dedicated report if you have one
    ],
    icon: <Rocket className="w-5 h-5" />,
  },

  // ===== Game (your original) =====
  {
    title: "World of Tanks — Loldle-style Web Game",
    tags: ["Full-stack", "React", "Scraping"],
    description:
      "Designed a guessing game using tank datasets; clean UI and daily puzzles.",
    links: [{ label: "Prototype", href: "#" }],
    icon: <Rocket className="w-5 h-5" />,
  },
];

// ---------------- UI helpers ----------------
const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 py-12 md:py-20">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">{title}</h2>
      {children}
    </div>
  </section>
);

const ProjectCard = ({ p }: { p: Project }) => (
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
        {p.tags.map((t) => (
          <Badge key={t} variant="secondary">{t}</Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {p.links?.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm underline underline-offset-4"
          >
            {l.label} <ExternalLink className="w-4 h-4" />
          </a>
        ))}
      </div>
    </CardContent>
  </Card>
);

// ---------------- Page ----------------
export default function Portfolio() {
  const [showAllTags, setShowAllTags] = React.useState<boolean>(false);
  const [selectedTags, setSelectedTags] = React.useState<Set<string>>(new Set());
  // convenience flag
  const isAll = selectedTags.size === 0;
  const [visibleCount, setVisibleCount] = React.useState<number>(3);
  // collect & rank tags by frequency (desc), then alphabetically
  const { topTags, restTags, allTags } = React.useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));

    const sortedTags = Array.from(counts.entries())
      .sort((a, b) => (b[1] - a[1]) || a[0].localeCompare(b[0]))
      .map(([t]) => t);

    const tops = sortedTags.slice(0, 6);
    const rest = sortedTags.slice(6);

    return { topTags: ["All", ...tops], restTags: rest, allTags: ["All", ...sortedTags] };
  }, [projects]);

  const sorted = React.useMemo(() => {
  const arr = [...projects];
  arr.sort((a: Project, b: Project) => Number(!!b.featured) - Number(!!a.featured));
  return arr;
  }, [projects]);

  const shown = React.useMemo(() => {
    if (selectedTags.size === 0) return sorted; // "All"
    return sorted.filter((p) => p.tags.some((t) => selectedTags.has(t))); // OR logic
  }, [selectedTags, sorted]);

  const shownNow = React.useMemo(() => shown.slice(0, visibleCount), [shown, visibleCount]);
  const nextPreview = React.useMemo(() => shown.slice(visibleCount, visibleCount + 3), [shown, visibleCount]);
  const hasMore = shown.length > visibleCount;
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
            <a href="/ai-lab" className="hover:underline underline-offset-4">AI Lab</a>
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
                <p className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Courses: {"Deep Learning, Reinforcement Learning, Robotics for AI"}…</p>
                <p className="text-slate-600">Open to collaborations & research internships.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects */}
      <Section id="projects" title="Selected Projects">
        {/* Tag filter (multi-select, inline expandable, fixed order) */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-2 items-center">
            {(() => {
              // First row is fixed: "All" + top tags (frequency-ranked)
              const firstRow = [...topTags];

              // When expanded, append the rest (in their original order)
              const restInline = showAllTags ? restTags : [];

              const combined = [...firstRow, ...restInline];

              return combined.map((t) => {
                const active = t === "All" ? isAll : selectedTags.has(t);
                return (
                  <button
                    key={t}
                    onClick={() => {
                      if (t === "All") {
                        setSelectedTags(new Set());          // clear all
                      } else {
                        setSelectedTags((prev) => {
                          const next = new Set(prev);
                          if (next.has(t)) next.delete(t);    // toggle off
                          else next.add(t);                    // toggle on
                          return next;
                        });
                      }
                      setVisibleCount(3);
                    }}
                    aria-pressed={active}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      active ? "bg-slate-900 text-white" : "bg-white hover:bg-slate-100"
                    }`}
                  >
                    {t}
                  </button>
                );
              });
            })()}

            {/* Toggle is always LAST */}
            {restTags.length > 0 && (
              <button
                onClick={() => setShowAllTags((v) => !v)}
                className="ml-1 px-3 py-1 rounded-full border text-sm bg-white hover:bg-slate-100 inline-flex items-center gap-1"
                aria-expanded={showAllTags}
              >
                {showAllTags ? <>Fewer filters <ChevronUp className="w-4 h-4" /></> : <>More filters <ChevronDown className="w-4 h-4" /></>}
              </button>
            )}
          </div>
        </div>

        {/* Featured notice */}
        {isAll && (
          <p className="mb-3 text-sm text-muted-foreground">Featured projects appear first.</p>
        )}

        {/* Grid + Ghosted preview */}
        <div className="relative">
          {/* Visible cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {shownNow.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </div>

          {/* Ghosted preview row (~3/4 height) */}
          {hasMore && (
            <div
              role="button"
              aria-label="Show more projects"
              onClick={() => setVisibleCount((c) => Math.min(c + 6, shown.length))}
              className="mt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-5 cursor-pointer select-none"
            >
              {nextPreview.map((p) => (
                <div
                  key={p.title}
                  className="relative border rounded-xl overflow-hidden bg-white"
                >
                  {/* mimic card height ~3/4 with blur */}
                  <div className="p-4 h-48 md:h-56 opacity-60 blur-[1px]">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span className="inline-flex items-center justify-center w-5 h-5">{p.icon}</span>
                      <span className="font-medium truncate">{p.title}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 text-xs rounded-full border bg-white/60">
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm line-clamp-3">{p.description}</p>
                  </div>
                  {/* subtle gradient to suggest more content */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
                </div>
              ))}
            </div>
          )}

          {/* Pagination controls */}
          <div className="flex justify-center gap-3 mt-4">
            {hasMore ? (
              <>
                <button
                  onClick={() => setVisibleCount((c) => Math.min(c + 6, shown.length))}
                  aria-expanded={true}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white hover:bg-slate-100"
                >
                  <ChevronDown className="w-4 h-4" /> Show more
                </button>
                <button
                  onClick={() => setVisibleCount(shown.length)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white hover:bg-slate-100"
                >
                  Show all
                </button>
              </>
            ) : shown.length > 3 ? (
              <button
                onClick={() => {
                  window.scrollTo({
                    top: (document.getElementById('projects')?.offsetTop || 0) - 80,
                    behavior: 'smooth'
                  });
                  setVisibleCount(3);
                }}
                aria-expanded={false}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white hover:bg-slate-100"
              >
                <ChevronUp className="w-4 h-4" /> Show less
              </button>
            ) : null}
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills & Tools">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "ML/AI", items: ["PyTorch", "TensorRT", "torch2trt", "Tensorly", "NVIDIA Triton", "ONNX"] },
            { title: "Compression", items: ["CP", "Tucker", "Tensor Train (TT)", "Quantization", "Pruning"] },
            { title: "Systems", items: ["CUDA basics", "Jetson Nano", "Docker", "Linux"] },
            { title: "Data/Stats", items: ["Pandas", "NumPy", "scikit‑learn", "R (lme4)"] },
            { title: "Web/Apps", items: ["React", "Next.js", "FastAPI", "SQL"] },
          ].map((g) => (
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
          {[
            {
              school: "University of Groningen",
              degree: "MSc Artificial Intelligence",
              years: "2024 – 2026 (exp)",
              details: [
                'State of the Art AI "understanding"',
                "Thesis on tensor decompositions and TensorRT",
              ],
            },
            {
              school: "University of York",
              degree: "BSc Computer Science and Mathematics 50/50",
              years: "2020 – 2023",
              details: [
                "Exploration of Computer Science and Mathematics domains",
                "Thesis: Simulating Urban Airspace Resource Management",
              ],
            },
          ].map((e) => (
            <Card key={e.school}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{e.school}</CardTitle>
                <p className="text-sm text-muted-foreground">{e.degree} • {e.years}</p>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {e.details.map((d: string) => (
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
          {[
            {
              title: "Draft Thesis Proposal: Efficient CNNs via Tensor Decomposition + TensorRT",
              venue: "Internal proposal, 2025",
              link: "#",
            },
          ].map((pub) => (
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
          <p className="text-slate-700 mb-6"> If you’d like to chat about research, internships, or collaborations, ping me via email or LinkedIn. I’m especially interested in embedded AI, efficient deep learning, and robotics applications.</p>
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
