"use client";

import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Github, Linkedin, ChevronDown, ChevronUp, ChevronsDown, ChevronsUp, Mail, FileDown, ExternalLink, GraduationCap, Cpu, Layers, Timer, BookOpen, Rocket, ShieldCheck, BarChart3, Gamepad, Network, Sun, Moon, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// === Color helpers ===
const GRAD_SOFT = "bg-gradient-to-r from-fuchsia-100 via-sky-100 to-emerald-100 dark:from-fuchsia-900/40 dark:via-sky-900/40 dark:to-emerald-900/40";
const GRAD_VIVID = "bg-gradient-to-r from-fuchsia-500 via-sky-400 to-emerald-500";
const GRAD_MID = "bg-gradient-to-r from-fuchsia-300 via-sky-300 to-emerald-300 dark:from-fuchsia-800/70 dark:via-sky-800/70 dark:to-emerald-800/70";
const TXT_ON_SOFT = "text-slate-900 dark:text-slate-100";

// NEW: exact palettes you asked to mirror
const QUICK_CARD = "bg-gradient-to-r from-fuchsia-400/80 via-sky-400/80 to-emerald-400/80"; // matches Quick Facts card
const HERO_BTN = "bg-gradient-to-r from-fuchsia-400 via-sky-300 to-emerald-400 hover:from-fuchsia-500 hover:via-sky-400 hover:to-emerald-500 text-white"; // matches GitHub/LinkedIn/Contact (hero)
const AURORA_SOFT = "bg-gradient-to-r from-fuchsia-200/70 via-sky-200/70 to-emerald-200/70 dark:from-fuchsia-900/50 dark:via-sky-900/50 dark:to-emerald-900/50"; // unselected filters

const cx = (...xs: Array<string | false | undefined>) => xs.filter(Boolean).join(" ");

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
    "Master’s student working on tensor decompositions (CP/Tucker/TT/TR) for CNN compression + NVIDIA TensorRT on Jetson-class robotics. Thesis with UG & DFKI (supervisors: M.A. Valdenegro-Toro, Gunnar Schönhoff, Elie Mounzer).",
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
      { label: "Proposal", href: "/reports/UDL___Self_Supervised_Visual_Grounding.pdf" }
    ],
    icon: <Layers className="w-5 h-5" />,
  },

  // ===== Deep Learning Assignments =====
  {
    title: "Handwritten Digit Recognition",
    tags: ["LogReg", "CNN", "PCA", "Data Aug"],
    description:
      "Digits benchmark with classical ML and a lightweight CNN; PCA+features boosted linear baseline; tuned CNN reached ~96% test accuracy.",
    links: [
      { label: "Report", href: "/reports/ML_Project.pdf" }
    ],
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    title: "DDPM — Paper Deep-Dive (DL A1)",
    tags: ["Diffusion", "U-Net", "DDPM"],
    description:
      "Technical walkthrough of DDPMs: forward noising schedule, reverse denoising with U-Net, and objective design choices.",
    links: [
      { label: "Report", href: "/reports/Deep_Learning_Assignment_1.pdf" }
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
      { label: "Report", href: "/reports/Cognitive_Modelling.pdf" }
    ],
    icon: <Timer className="w-5 h-5" />,
  },
  {
    title: "Applied Cognitive Modelling — Dobble Android App",
    tags: ["Android", "Game", "Perception"],
    description:
      "Two-card visual search game (8 symbols/card) with scoring, penalties, and highlighted model attention; full class design for deck, cards, and play.",
    links: [
      { label: "Report", href: "/reports/Cognitive_Modelling__Final_Project.pdf" }
    ],
    icon: <Gamepad className="w-5 h-5" />,
  },

  // ===== Reinforcement Learning =====
  {
    title: "Deep Reinforcement Learning: Catch with the DQN Family",
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
      { label: "Report", href: "/reports/Deep_Learning_Assignment_2.pdf" }
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
      { label: "Report", href: "/reports/MultiAgent_System__Beta_Report__Copy_.pdf" }
    ],
    icon: <Layers className="w-5 h-5" />,
  },

  // ===== Methodology / Survey =====
  {
    title: "Methodology in AI — A literature Survey on Quantum Neural Networks",
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
      { label: "Report", href: "#" } 
    ],
    icon: <Timer className="w-5 h-5" />,
  },
  {
    title: "Generative Models for Clocks",
    tags: ["VAE", "GAN", "Diffusion"],
    description:
      "Explored VAE/GAN/diffusion pipelines to synthesize clock faces conditioned on time labels.",
    links: [
      { label: "Report", href: "#" } // placeholder; swap with a dedicated report if you have one
    ],
    icon: <Rocket className="w-5 h-5" />,
  },

  // ===== Game (your original) =====
  {
    title: "World of Tanks — Loldle-style Web Game",
    tags: ["Full-stack", "React", "Scraping"],
    description:
      "Designed a guessing game using tank datasets; clean UI and daily puzzles. (Unpublished)",
    links: [{ label: "Prototype", href: "#" }],
    icon: <Rocket className="w-5 h-5" />,
  },
];

// ---------------- UI helpers ----------------
const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 py-12 md:py-20">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 text-slate-900 dark:text-slate-100">{title}</h2>
      {children}
    </div>
  </section>
);

// ✅ UPDATED: project cards use Quick Facts palette; badges use hero palette
const ProjectCard = ({ p, isColorful = false }: { p: Project; isColorful?: boolean }) => (
  <Card
    className={cx(
      "h-full border",
      isColorful
        ? cx(QUICK_CARD, "border-0 shadow-sm", TXT_ON_SOFT)
        : "bg-white/90 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800"
    )}
  >
    <CardHeader className="pb-2">
      <div className={cx("flex items-center gap-2 text-sm", isColorful ? "text-slate-700 dark:text-slate-200" : "text-slate-500 dark:text-slate-400")}>
        {p.icon}
        <span>{p.tags.slice(0, 2).join(" • ")}</span>
      </div>
      <CardTitle className={cx("text-lg mt-1", isColorful && TXT_ON_SOFT)}>{p.title}</CardTitle>
    </CardHeader>
    <CardContent className={cx("text-sm", isColorful && TXT_ON_SOFT)}>
      <p className="mb-4 leading-relaxed">{p.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {p.tags.map((t) => (
          <Badge
            key={t}
            variant="secondary"
            className={cx(
              // Colorful: same look as hero GitHub/LinkedIn/Contact buttons
              isColorful ? cx(HERO_BTN, "border-0") : "border-slate-200 dark:border-slate-700"
            )}
          >
            {t}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {p.links?.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className={cx(
              "inline-flex items-center gap-1 text-sm underline underline-offset-4",
              isColorful ? "text-slate-800 dark:text-slate-100" : "text-slate-700 dark:text-slate-200"
            )}
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
  // theming
  type Theme = "light" | "dark" | "colorful";
  const pendingIndexRef = React.useRef<number | null>(null);
  const HEADER_OFFSET = 80;
  const raf2Ref = React.useRef<number | null>(null);
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
  const [railY, setRailY] = React.useState(0);

  const syncRailToLast = React.useCallback(() => {
    const lastIdx = Math.max(0, Math.min(visibleCount - 1, shown.length - 1));
    const lastEl = document.querySelector<HTMLElement>(`[data-pindex="${lastIdx}"]`);
    const railAnchor = document.getElementById("rail-anchor");
    if (!lastEl || !railAnchor) return;

    const desired = lastEl.getBoundingClientRect().top - railAnchor.getBoundingClientRect().top;
    setRailY(Math.max(0, Math.round(desired)));
  }, [visibleCount, shown.length]);

  React.useLayoutEffect(() => {
    // place the rail at the correct position on first render
    syncRailToLast();
  }, [syncRailToLast]);

  const [theme, setTheme] = React.useState<Theme>("dark");

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  React.useEffect(() => {
    const topIdx = pendingIndexRef.current;

    // Scroll PAGE to the first newly visible card (as before)
    if (topIdx != null) {
      const topEl = document.querySelector<HTMLElement>(`[data-pindex="${topIdx}"]`);
      if (topEl) {
        const top = topEl.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }

    // Try after layout, then again once the smooth scroll settles
    // (double rAF = next paint; debounced scroll = after motion)
    const raf1 = requestAnimationFrame(() => {
      raf2Ref.current = requestAnimationFrame(() => {
        syncRailToLast();
      });
    });

    let debounce: number | undefined;
    const onScroll = () => {
      if (debounce) window.clearTimeout(debounce);
      debounce = window.setTimeout(syncRailToLast, 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const fallback = window.setTimeout(syncRailToLast, 450);

    pendingIndexRef.current = null;


    return () => {
      cancelAnimationFrame(raf1);
      if (raf2Ref.current != null) cancelAnimationFrame(raf2Ref.current);
      raf2Ref.current = null;

      window.removeEventListener("scroll", onScroll);
      if (debounce) window.clearTimeout(debounce);
      window.clearTimeout(fallback);
    };
  }, [visibleCount, syncRailToLast]);

  // --- Right-side arrow rail (matches filter buttons) ---
  const ArrowRail: React.FC<{ className?: string }> = ({ className = "" }) => {
    const canStepUpOne = visibleCount > 3;
    const canStepUpAll = visibleCount > 3;
    const canStepDownOne = shown.length > visibleCount;
    const canStepDownAll = shown.length > visibleCount;

    const baseBtn =
      "w-10 h-10 rounded-full inline-flex items-center justify-center transition " +
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 active:scale-[.98]";

    const btnCx = (enabled: boolean) =>
      cx(
        baseBtn,
        theme === "colorful"
          ? cx(HERO_BTN, "border-0") // same as selected filter chip
          : "bg-slate-100 hover:bg-slate-200 border border-slate-300 " +
            "dark:bg-slate-700 dark:hover:bg-slate-600 dark:border-slate-600",
        !enabled && "pointer-events-none"
      );

    return (
      <motion.div
        layout
        className={cx(
          "flex flex-col items-center gap-2 p-1 rounded-xl backdrop-blur",
          theme === "colorful"
            ? cx(AURORA_SOFT, "border-0 shadow-sm", TXT_ON_SOFT) // same as unselected filter chip
            : "bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm",
          className
        )}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
      >
        {/* Go ALL the way up (collapse to 3) */}
        <button
          aria-label="Show first 3"
          className={btnCx(canStepUpAll)}
          onClick={() => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
            setVisibleCount(3);
            pendingIndexRef.current = 0;
          }}
          disabled={!canStepUpAll}
        >
          <ChevronsUp className="w-5 h-5 text-black dark:text-black" />
        </button>

        {/* Step UP (show 6 fewer) */}
        <button
          aria-label="Show 6 fewer"
          className={btnCx(canStepUpOne)}
          onClick={() => {
            setVisibleCount((c) => {
              const next = Math.max(3, c - 6);
              pendingIndexRef.current = Math.max(0, next - 6);
              return next;
            });
          }}
          disabled={!canStepUpOne}
        >
          <ChevronUp className="w-5 h-5 text-black dark:text-black" />
        </button>

        {/* Step DOWN (show 6 more) */}
        <button
          aria-label="Show 6 more"
          className={btnCx(canStepDownOne)}
          onClick={() => {
            setVisibleCount((c) => {
              pendingIndexRef.current = c;
              return Math.min(c + 6, shown.length);
            });
          }}
          disabled={!canStepDownOne}
        >
          <ChevronDown className="w-5 h-5 text-black dark:text-black" />
        </button>

        {/* Go ALL the way down (show all) */}
        <button
          aria-label="Show all"
          className={btnCx(canStepDownAll)}
          onClick={() => {
            if (shown.length - visibleCount <= 6) {
              pendingIndexRef.current = visibleCount;
            }
            setVisibleCount(shown.length);
          }}
          disabled={!canStepDownAll}
        >
          <ChevronsDown className="w-5 h-5 text-black dark:text-black" />
        </button>
      </motion.div>
    );
  };


  const ThemeToggle: React.FC<{
    theme: "light" | "dark" | "colorful";
    setTheme: (t: "light" | "dark" | "colorful") => void;
  }> = ({ theme, setTheme }) => {
    const base =
      "px-3 h-9 inline-flex items-center gap-2 rounded-md text-sm transition-colors " +
      "focus:outline-none focus:ring-0 ring-0 outline-none border";

    const inactive =
      "bg-transparent !border-transparent text-slate-700 dark:text-slate-200 " +
      "hover:bg-white/10 dark:hover:bg-white/10";

    const activeLight =
      "bg-white !text-orange-500 !border-orange-400 shadow-sm ring-2 ring-orange-400/45";
    const activeDark =
      "bg-slate-800 !text-blue-400 !border-blue-400/60 shadow-sm ring-2 ring-blue-400/45";
    const activeColorful =
      "bg-transparent !text-fuchsia-700 dark:!text-fuchsia-300 !border-fuchsia-300 shadow-md ring-2 ring-fuchsia-300/60";

    const itemCx = (t: "light" | "dark" | "colorful") =>
      cx(
        base,
        inactive,
        t === "light" && theme === "light" && activeLight,
        t === "dark" && theme === "dark" && activeDark,
        t === "colorful" && theme === "colorful" && activeColorful
      );

    return (
      <div role="group" aria-label="Theme" className="inline-flex items-center gap-1 p-1 rounded-lg bg-transparent">
        <button
          type="button"
          aria-pressed={theme === "light"}
          title="Light"
          className={itemCx("light")}
          onClick={() => theme !== "light" && setTheme("light")}
        >
          <Sun className="w-4 h-4" />
          <span className="hidden sm:inline">Light</span>
        </button>

        <button
          type="button"
          aria-pressed={theme === "dark"}
          title="Dark"
          className={itemCx("dark")}
          onClick={() => theme !== "dark" && setTheme("dark")}
        >
          <Moon className="w-4 h-4" />
          <span className="hidden sm:inline">Dark</span>
        </button>

        <button
          type="button"
          aria-pressed={theme === "colorful"}
          title="Colorful"
          className={itemCx("colorful")}
          onClick={() => theme !== "colorful" && setTheme("colorful")}
        >
          <Palette className="w-4 h-4" />
          <span className="hidden sm:inline">Colorful</span>
        </button>
      </div>
    );
  };

  return (
    <div
      className={cx(
        "min-h-screen",
        theme === "colorful"
          ? "bg-gradient-to-b from-fuchsia-300 via-sky-300 to-emerald-400"
          : "bg-white dark:bg-slate-950",
        "text-slate-900 dark:text-slate-100"
      )}
    >
      {/* Nav */}
      <header
        className={cx(
          "sticky top-0 z-50 backdrop-blur border-b",
          theme === "colorful"
            ? "supports-[backdrop-filter]:bg-gradient-to-r from-fuchsia-200/70 via-sky-200/70 to-emerald-200/70 dark:from-fuchsia-900/70 dark:via-sky-900/70 dark:to-emerald-900/70 border-transparent"
            : "supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-900/70 border-slate-200 dark:border-slate-800"
        )}
      >
        <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#home" className="font-semibold">
            KA
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#projects" className="hover:underline underline-offset-4">
              Projects
            </a>
            <a href="#skills" className="hover:underline underline-offset-4">
              Skills
            </a>
            <a href="#education" className="hover:underline underline-offset-4">
              Education
            </a>
            <a href="#publications" className="hover:underline underline-offset-4">
              Publications
            </a>
            <a href="#contact" className="hover:underline underline-offset-4">
              Contact
            </a>
            <a href="/ai-lab" className="hover:underline underline-offset-4">
              AI Lab
            </a>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="pt-16 md:pt-24 pb-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold tracking-tight"
            >
              {profile.name}
            </motion.h1>
            <p className="mt-3 text-lg md:text-xl text-slate-700 dark:text-slate-200 font-medium">
              {profile.headline}
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {profile.blurb}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={profile.links.cv} target="_blank" rel="noreferrer">
                <Button
                  variant={theme === "colorful" ? undefined : "secondary"} // keep secondary for light/dark
                  className={cx(
                    "gap-2 font-semibold rounded-md",
                    theme === "colorful" && HERO_BTN,
                    // border per theme
                    theme === "dark" && "border-2 border-white",
                    theme === "light" && "border-2 border-black",
                    theme === "colorful" && "border-2 border-white"
                  )}
                >
                  <FileDown className="w-4 h-4" /> Download CV
                </Button>
              </a>
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                <Button
                  variant="secondary"
                  className={cx("gap-2", theme === "colorful" && cx(HERO_BTN, "font-semibold rounded-md"))}
                >
                  <Github className="w-4 h-4" /> GitHub
                </Button>
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                <Button
                  variant="secondary"
                  className={cx("gap-2", theme === "colorful" && cx(HERO_BTN, "font-semibold rounded-md"))}
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </Button>
              </a>
              <a href={profile.links.email}>
                <Button
                  variant="secondary"
                  className={cx("gap-2", theme === "colorful" && cx(HERO_BTN, "font-semibold rounded-md"))}
                >
                  <Mail className="w-4 h-4" /> Contact
                </Button>
              </a>
            </div>
          </div>
          <div className="md:col-span-1">
            <Card
              className={cx(
                "border",
                theme === "colorful"
                  ? "bg-gradient-to-r from-fuchsia-400/80 via-sky-400/80 to-emerald-400/80 border-0 text-slate-900"
                  : "bg-white/90 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800"
              )}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> MSc AI @ University of Groningen
                </p>
                <p className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> Tensor Decomposition + TensorRT • Jetson
                </p>
                <p className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> 16 linked course/project reports
                </p>
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
              const firstRow = [...topTags];
              const restInline = showAllTags ? restTags : [];
              const combined = [...firstRow, ...restInline];

              return combined.map((t) => {
                const active = t === "All" ? isAll : selectedTags.has(t);
                return (
                  <button
                    key={t}
                    onClick={() => {
                      if (t === "All") {
                        setSelectedTags(new Set());
                      } else {
                        setSelectedTags((prev) => {
                          const next = new Set(prev);
                          if (next.has(t)) next.delete(t);
                          else next.add(t);
                          return next;
                        });
                      }
                      setVisibleCount(3);
                    }}
                    aria-pressed={active}
                    className={cx(
                      "px-3 py-1 rounded-full border text-sm transition-colors",
                      // Light/Dark (unchanged)
                      theme !== "colorful"
                        ? active
                          ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:border-slate-700"
                        : // Colorful: selected = HERO palette, unselected = AURORA
                          active
                          ? cx(HERO_BTN, "border-0 shadow-sm")
                          : cx(AURORA_SOFT, "border-0 hover:brightness-105", TXT_ON_SOFT)
                    )}
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
                className={cx(
                  "ml-1 px-3 py-1 rounded-full border text-sm inline-flex items-center gap-1 transition-colors",
                  theme === "colorful"
                    ? cx(AURORA_SOFT, "border-0 hover:brightness-105", TXT_ON_SOFT)
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:border-slate-700"
                )}
                aria-expanded={showAllTags}
              >
                {showAllTags ? (
                  <>Fewer filters <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>More filters <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Featured notice */}
        {isAll && (
          <p
            className={cx(
              "mb-3 text-sm text-muted-foreground",
              theme === "colorful" && "text-slate-700 dark:text-slate-200"
            )}
          >
            Featured projects appear first.
          </p>
        )}

        {/* Grid + Ghosted preview */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 200, damping: 36 }}
          className="relative md:flex md:items-start"
        >
          {/* MAIN COLUMN */}
          <div className="flex-1 pr-12">
            {/* Visible cards */}
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {shownNow.map((p, i) => (
                <motion.div
                  key={p.title}
                  data-pindex={i}
                  className="scroll-mt-24"
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 36,
                    delay: Math.min(i * 0.03, 0.18),
                  }}
                >
                  <ProjectCard p={p} isColorful={theme === "colorful"} />
                </motion.div>
              ))}
            </motion.div>

            {/* Ghosted preview row (~3/4 height) */}
            {hasMore && (
              <motion.div
                layout
                role="button"
                aria-label="Show more projects"
                onClick={() =>
                  setVisibleCount((c) => {
                    pendingIndexRef.current = c;
                    return Math.min(c + 3, shown.length);
                  })
                }
                className="mt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-5 cursor-pointer select-none"
              >
                {nextPreview.map((p, i) => (
                  <motion.div
                    key={p.title}
                    layout
                    initial={{ opacity: 0.4, y: 10 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 36, delay: i * 0.03 }}
                    className={cx(
                      "relative rounded-xl overflow-hidden border",
                      theme === "colorful"
                        ? cx(QUICK_CARD, "border-0") // match Quick Facts palette
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    )}
                  >
                    <div className="p-4 h-48 md:h-56 opacity-60 blur-[1px] flex flex-col">
                      {/* header */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <span className="inline-flex items-center justify-center w-5 h-5">{p.icon}</span>
                        <span className="font-medium truncate">{p.title}</span>
                      </div>

                      {/* description */}
                      <p className="text-sm line-clamp-3">{p.description}</p>

                      {/* bottom area: tags + links */}
                      <div className="mt-auto space-y-2">
                        {/* tags */}
                        <div className="flex flex-wrap gap-2">
                          {p.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className={cx(
                                "px-2 py-0.5 text-xs rounded-full",
                                theme === "colorful"
                                  ? cx(HERO_BTN, "border-0") // colorful like hero buttons
                                  : "border bg-white/60 dark:bg-slate-700/60 border-slate-200 dark:border-slate-700"
                              )}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* links (clickable even though the card expands on click) */}
                        {p.links?.length ? (
                          <div className="flex flex-wrap gap-3">
                            {p.links.map((l) => (
                              <a
                                key={l.label}
                                href={l.href}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={cx(
                                  "inline-flex items-center gap-1 text-xs underline underline-offset-4",
                                  theme === "colorful" ? "text-slate-800 dark:text-slate-100" : "text-slate-700 dark:text-slate-200"
                                )}
                              >
                                {l.label} <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    {/* no white overlay */}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* RIGHT-SIDE RAIL (desktop/tablet) */}
          <div className="hidden md:block md:w-10">
            <div className="sticky top-24">
              {/* invisible reference for measuring rail's top */}
              <div id="rail-anchor" />
              <motion.div
                animate={{ y: railY }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                className="will-change-transform"
              >
                <ArrowRail />
              </motion.div>
            </div>
          </div>

          {/* FLOATING RAIL (mobile) */}
          <div className="md:hidden fixed right-3 bottom-24 z-40">
            <ArrowRail className="shadow-lg" />
          </div>
        </motion.div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills & Tools">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "ML/AI", items: ["PyTorch", "TensorRT", "torch2trt", "Tensorly", "NVIDIA Triton", "ONNX"] },
            { title: "Compression", items: ["CP", "Tucker", "Tensor Train (TT)", "Quantization", "Pruning"] },
            { title: "Systems", items: ["CUDA basics", "Jetson Nano", "Docker", "Linux"] },
            { title: "Data/Stats", items: ["Pandas", "NumPy", "scikit-learn", "R (lme4)"] },
            { title: "Web/Apps", items: ["React", "Next.js", "FastAPI", "SQL"] },
          ].map((g) => (
            <Card
              key={g.title}
              className={cx(
                theme === "colorful"
                  ? cx(QUICK_CARD, "border-0 shadow-sm", TXT_ON_SOFT)
                  : "bg-white/90 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800"
              )}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{g.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <Badge
                    key={s}
                    variant="outline"
                    className={cx(
                      theme === "colorful" ? cx(HERO_BTN, "border-0") : ""
                    )}
                  >
                    {s}
                  </Badge>
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
              details: ['State of the Art AI "understanding"', "Thesis on tensor decompositions and TensorRT"],
            },
            {
              school: "University of York",
              degree: "BSc Computer Science and Mathematics 50/50",
              years: "2020 – 2023",
              details: ["Exploration of Computer Science and Mathematics domains", "Thesis: Simulating Urban Airspace Resource Management"],
            },
          ].map((e) => (
            <Card
              key={e.school}
              className={cx(
                theme === "colorful"
                  ? cx(QUICK_CARD, "border-0 shadow-sm", TXT_ON_SOFT)
                  : "bg-white/90 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800"
              )}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{e.school}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {e.degree} • {e.years}
                </p>
              </CardHeader>
              <CardContent>
                <ul className={cx("list-disc pl-5 text-sm space-y-1", theme === "colorful" && TXT_ON_SOFT)}>
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
            <div
              key={pub.title}
              className={cx(
                "p-4 rounded-xl border",
                theme === "colorful"
                  ? cx(QUICK_CARD, "border-0 shadow-sm", TXT_ON_SOFT)
                  : "bg-white/90 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800"
              )}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h3 className="font-medium">{pub.title}</h3>
                  <p className="text-sm text-muted-foreground">{pub.venue}</p>
                </div>
                <a
                  href={pub.link}
                  className={cx(
                    "inline-flex items-center gap-1 text-sm underline underline-offset-4",
                    theme === "colorful" ? "text-slate-800 dark:text-slate-100" : ""
                  )}
                >
                  <ExternalLink className="w-4 h-4" /> View
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Get in touch">
        <div className="max-w-2xl">
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            If you’d like to chat about research, internships, or collaborations, ping me via email or LinkedIn. I’m especially interested in embedded AI, efficient deep learning, and robotics applications.
          </p>
          <div className="flex flex-wrap gap-3">
            {/* Email = same as Download CV */}
            <a href={profile.links.email}>
              <Button
                variant={theme === "colorful" ? undefined : "secondary"}
                className={cx(
                  "gap-2 font-semibold rounded-md",
                  theme === "colorful" && HERO_BTN,
                  theme === "dark" && "border-2 border-white",
                  theme === "light" && "border-2 border-black",
                  theme === "colorful" && "border-2 border-white"
                )}
              >
                <Mail className="w-4 h-4" /> Email me
              </Button>
            </a>

            {/* LinkedIn/GitHub = same as hero buttons in colorful */}
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              <Button
                variant={theme === "colorful" ? undefined : "secondary"}
                className={cx("gap-2", theme === "colorful" && cx(HERO_BTN, "font-semibold rounded-md"))}
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </Button>
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              <Button
                variant={theme === "colorful" ? undefined : "secondary"}
                className={cx("gap-2", theme === "colorful" && cx(HERO_BTN, "font-semibold rounded-md"))}
              >
                <Github className="w-4 h-4" /> GitHub
              </Button>
            </a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800">
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
