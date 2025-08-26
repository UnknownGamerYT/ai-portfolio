"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  RotateCcw,
  Wand2,
  Eye,
  Ear,
  MousePointer2,
  Flag,
  Square,
  Map as MapIcon,
  Grid,
} from "lucide-react";

// ---------- Types ----------
type Cell = 0 | 1; // 0=empty, 1=wall
type Point = { r: number; c: number };
type SensingMode = "vision" | "hearing" | "both";

// ---------- Utils ----------
const inside = (r: number, c: number, rows: number, cols: number) =>
  r >= 0 && c >= 0 && r < rows && c < cols;

const manhattan = (a: Point, b: Point) => Math.abs(a.r - b.r) + Math.abs(a.c - b.c);

// Supercover Bresenham: blocks diagonal "slits" between two corners.
function hasLineOfSight(grid: Cell[][], a: Point, b: Point) {
  let x = a.c;
  let y = a.r;
  const x2 = b.c;
  const y2 = b.r;

  const dx = Math.abs(x2 - x);
  const dy = Math.abs(y2 - y);
  const sx = x < x2 ? 1 : -1;
  const sy = y < y2 ? 1 : -1;

  let err = dx - dy;
  const dx2 = dx * 2;
  const dy2 = dy * 2;

  while (true) {
    // ignore starting cell; check every other cell the line traverses
    if (!(x === a.c && y === a.r)) {
      if (grid[y]?.[x] === 1) return false;
    }
    if (x === x2 && y === y2) break;

    const e2 = err;
    let movedX = false;
    let movedY = false;

    if (e2 > -dy) {
      err -= dy;
      x += sx;
      movedX = true;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
      movedY = true;
    }

    // supercover extra checks when crossing a corner (both axis moved)
    if (movedX && movedY) {
      // Check the adjacent cells we "brush" while cutting the corner.
      const adj1 = { r: y - sy, c: x }; // cell stepped in Y first
      const adj2 = { r: y, c: x - sx }; // cell stepped in X first
      if (grid[adj1.r]?.[adj1.c] === 1 || grid[adj2.r]?.[adj2.c] === 1) return false;
    }
  }
  return true;
}

// A* (4-neighborhood)
function astar(grid: Cell[][], start: Point, goal: Point): Point[] | null {
  const rows = grid.length;
  const cols = grid[0].length;

  const open = new Set<string>();
  const came = new Map<string, string>();
  const g = new Map<string, number>();
  const f = new Map<string, number>();

  const key = (p: Point) => `${p.r},${p.c}`;
  const startK = key(start);
  open.add(startK);
  g.set(startK, 0);
  f.set(startK, manhattan(start, goal));

  const neighbors = (p: Point): Point[] =>
    [
      { r: p.r - 1, c: p.c },
      { r: p.r + 1, c: p.c },
      { r: p.r, c: p.c - 1 },
      { r: p.r, c: p.c + 1 },
    ].filter((q) => inside(q.r, q.c, rows, cols) && grid[q.r][q.c] === 0);

  while (open.size) {
    // pick node with min f
    let curK = "";
    let bestF = Infinity;
    for (const k of open) {
      const fk = f.get(k) ?? Infinity;
      if (fk < bestF) {
        bestF = fk;
        curK = k;
      }
    }
    const [cr, cc] = curK.split(",").map(Number);
    const current: Point = { r: cr, c: cc };

    if (current.r === goal.r && current.c === goal.c) {
      // reconstruct
      const path: Point[] = [goal];
      let ck = curK;
      while (came.has(ck)) {
        const prev = came.get(ck)!;
        const [pr, pc] = prev.split(",").map(Number);
        path.push({ r: pr, c: pc });
        ck = prev;
      }
      path.reverse();
      return path;
    }

    open.delete(curK);
    for (const n of neighbors(current)) {
      const nk = key(n);
      const tentative = (g.get(curK) ?? Infinity) + 1;
      if (tentative < (g.get(nk) ?? Infinity)) {
        came.set(nk, curK);
        g.set(nk, tentative);
        f.set(nk, tentative + manhattan(n, goal));
        open.add(nk);
      }
    }
  }
  return null;
}

// ---------- Component ----------
export default function AILabPage() {
  const [rows, cols] = [18, 30];
  const initialAgent: Point = { r: 2, c: 2 };
  const initialGoal: Point = { r: 12, c: 24 };

  const [grid, setGrid] = useState<Cell[][]>(() =>
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0 as Cell))
  );
  const [agent, setAgent] = useState<Point>(initialAgent);
  const [goal, setGoal] = useState<Point>(initialGoal);
  const [placing, setPlacing] = useState<"wall" | "erase" | "agent" | "goal">("wall");
  const [mode, setMode] = useState<SensingMode>("both");
  const [hearRadius, setHearRadius] = useState<number>(6);
  const [running, setRunning] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);

  // Path preview for UI (recomputed on state change)
  const previewPath = useMemo(() => astar(grid, agent, goal), [grid, agent, goal]);

  // Refs to avoid stale closures in the run loop
  const gridRef = useRef<Cell[][]>(grid);
  const agentRef = useRef<Point>(agent);
  const goalRef = useRef<Point>(goal);
  const modeRef = useRef<SensingMode>(mode);
  const hearRef = useRef<number>(hearRadius);
  const runningRef = useRef<boolean>(false);
  const visitedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);
  useEffect(() => {
    agentRef.current = agent;
  }, [agent]);
  useEffect(() => {
    goalRef.current = goal;
  }, [goal]);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);
  useEffect(() => {
    hearRef.current = hearRadius;
  }, [hearRadius]);

  const key = (p: Point) => `${p.r},${p.c}`;

  // One tick using latest state
  function stepFromLatest() {
    if (finished) return;

    const gridL = gridRef.current;
    const agentL = agentRef.current;
    const goalL = goalRef.current;
    const modeL = modeRef.current;
    const hearL = hearRef.current;

    // if already at goal, finish
    if (agentL.r === goalL.r && agentL.c === goalL.c) {
      stopLoop();
      setFinished(true);
      return;
    }

    const pathL = astar(gridL, agentL, goalL);
    const canSee = modeL !== "hearing" && hasLineOfSight(gridL, agentL, goalL);
    const canHear = modeL !== "vision" && manhattan(agentL, goalL) <= hearL;

    // mark visited
    visitedRef.current.add(key(agentL));

    let next: Point | null = null;

    if (canSee && pathL && pathL.length > 1) {
      // follow A* path
      next = pathL[1];
    } else if (canHear) {
      // prefer moves that reduce distance and are unvisited
      const candidates: Point[] = [
        { r: agentL.r + Math.sign(goalL.r - agentL.r), c: agentL.c },
        { r: agentL.r, c: agentL.c + Math.sign(goalL.c - agentL.c) },
      ]
        .filter(
          (p) =>
            inside(p.r, p.c, gridL.length, gridL[0].length) &&
            gridL[p.r][p.c] === 0 &&
            manhattan(p, goalL) < manhattan(agentL, goalL)
        )
        .sort((p1, p2) => {
          const v1 = visitedRef.current.has(key(p1)) ? 1 : 0;
          const v2 = visitedRef.current.has(key(p2)) ? 1 : 0;
          return v1 - v2; // prefer unvisited
        });
      if (candidates.length) next = candidates[0];
    }

    if (!next) {
      // explore: prefer unvisited neighbors; then fallback to any free neighbor
      const neighbors: Point[] = [
        { r: agentL.r - 1, c: agentL.c },
        { r: agentL.r + 1, c: agentL.c },
        { r: agentL.r, c: agentL.c - 1 },
        { r: agentL.r, c: agentL.c + 1 },
      ].filter(
        (n) =>
          inside(n.r, n.c, gridL.length, gridL[0].length) && gridL[n.r][n.c] === 0
      );

      const unvisited = neighbors.filter((n) => !visitedRef.current.has(key(n)));
      const pool = unvisited.length ? unvisited : neighbors;
      if (pool.length) next = pool[Math.floor(Math.random() * pool.length)];
    }

    if (next) {
      setAgent(next);
      // check arrival
      if (next.r === goalL.r && next.c === goalL.c) {
        stopLoop();
        setFinished(true);
      }
    }
  }

  function runLoop() {
    if (runningRef.current || finished) return;
    runningRef.current = true;
    setRunning(true);

    const tick = () => {
      if (!runningRef.current) return;
      stepFromLatest();
      setTimeout(tick, 110);
    };
    tick();
  }

  function stopLoop() {
    runningRef.current = false;
    setRunning(false);
  }

  function restartAll() {
    stopLoop();
    setAgent(initialAgent);
    setGoal(initialGoal);
    visitedRef.current.clear();
    setFinished(false);
  }

  function clearWalls() {
    setGrid((g) => g.map((row) => row.map(() => 0 as Cell)));
    visitedRef.current.clear();
  }

  function randomMaze(density = 0.22) {
    const g = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0 as Cell)
    );
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() < density) g[r][c] = 1;
      }
    }
    g[agent.r][agent.c] = 0;
    g[goal.r][goal.c] = 0;
    setGrid(g);
    visitedRef.current.clear();
  }

  function handleCellClick(r: number, c: number) {
    if (placing === "wall")
      setGrid((g) => g.map((row, ri) => row.map((v, ci) => (ri === r && ci === c ? 1 : v))));
    if (placing === "erase")
      setGrid((g) => g.map((row, ri) => row.map((v, ci) => (ri === r && ci === c ? 0 : v))));
    if (placing === "agent") {
      setAgent({ r, c });
      visitedRef.current.clear();
    }
    if (placing === "goal") setGoal({ r, c });
  }

  function handleDrag(r: number, c: number) {
    if (placing === "wall")
      setGrid((g) => g.map((row, ri) => row.map((v, ci) => (ri === r && ci === c ? 1 : v))));
    if (placing === "erase")
      setGrid((g) => g.map((row, ri) => row.map((v, ci) => (ri === r && ci === c ? 0 : v))));
  }

  const canSeeUI = mode !== "hearing" && hasLineOfSight(grid, agent, goal);
  const canHearUI = mode !== "vision" && manhattan(agent, goal) <= hearRadius;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Back button */}
        <div className="mb-4 flex items-center gap-2">
          <Link href="/">
            <Button variant="secondary" className="gap-2">
              ← Back to Home
            </Button>
          </Link>
          <Button variant="secondary" onClick={restartAll} className="gap-2">
            <RotateCcw className="w-4 h-4" /> Restart
          </Button>
        </div>

        {/* Success banner */}
        {finished && (
          <div className="mb-4 p-3 rounded-lg border bg-emerald-50 text-emerald-700 flex items-center justify-between">
            <span>🎯 Goal reached! Nice pathfinding.</span>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={restartAll}>
                Run Again
              </Button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
            <Grid className="w-6 h-6" /> AI Mini-Lab{" "}
            <span className="text-slate-500 text-base">Pathfinding • Vision • Hearing</span>
          </h1>
          <div className="hidden md:flex gap-2">
            {!running ? (
              <Button onClick={runLoop} className="gap-2" disabled={finished}>
                <Play className="w-4 h-4" /> Run
              </Button>
            ) : (
              <Button variant="secondary" onClick={stopLoop} className="gap-2">
                <RotateCcw className="w-4 h-4" /> Stop
              </Button>
            )}
            <Button variant="secondary" onClick={stepFromLatest} className="gap-2" disabled={finished}>
              <Wand2 className="w-4 h-4" /> Step
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapIcon className="w-5 h-5" /> Sandbox
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Button
                  variant={placing === "wall" ? "default" : "secondary"}
                  onClick={() => setPlacing("wall")}
                  className="gap-2"
                >
                  <Square className="w-4 h-4" /> Wall
                </Button>
                <Button
                  variant={placing === "erase" ? "default" : "secondary"}
                  onClick={() => setPlacing("erase")}
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Erase
                </Button>
                <Button
                  variant={placing === "agent" ? "default" : "secondary"}
                  onClick={() => setPlacing("agent")}
                  className="gap-2"
                >
                  <MousePointer2 className="w-4 h-4" /> Agent
                </Button>
                <Button
                  variant={placing === "goal" ? "default" : "secondary"}
                  onClick={() => setPlacing("goal")}
                  className="gap-2"
                >
                  <Flag className="w-4 h-4" /> Goal
                </Button>
                <Button variant="secondary" onClick={() => randomMaze(0.2)}>
                  Random Maze
                </Button>
                <Button variant="secondary" onClick={clearWalls}>
                  Clear
                </Button>
              </div>

              <div className="relative inline-block select-none border rounded-xl overflow-hidden bg-white">
                {/* Grid */}
                <div style={{ width: cols * 22, height: rows * 22 }}>
                  {grid.map((row, r) => (
                    <div key={r} className="flex">
                      {row.map((cell, c) => {
                        const isAgent = agent.r === r && agent.c === c;
                        const isGoal = goal.r === r && goal.c === c;

                        const onDown = (e: React.MouseEvent<HTMLDivElement>) => {
                          e.preventDefault();
                          handleCellClick(r, c);
                        };
                        const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
                          if (e.buttons === 1) handleDrag(r, c);
                        };

                        return (
                          <div
                            key={c}
                            onMouseDown={onDown}
                            onMouseEnter={onEnter}
                            className={`border border-slate-200 flex items-center justify-center ${
                              cell === 1 ? "bg-slate-800" : "bg-slate-50"
                            }`}
                            style={{ width: 22, height: 22 }}
                          >
                            {isAgent && (
                              <div className="w-4 h-4 rounded-full bg-indigo-500" title="Agent" />
                            )}
                            {isGoal && (
                              <div className="w-4 h-4 rounded bg-emerald-500" title="Goal" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Path overlay */}
                {previewPath && (
                  <div className="pointer-events-none absolute inset-0" style={{ width: cols * 22, height: rows * 22 }}>
                    {previewPath.map((p, i) => (
                      <div
                        key={`${p.r}-${p.c}-${i}`}
                        style={{
                          position: "absolute",
                          left: p.c * 22 + 22 / 4,
                          top: p.r * 22 + 22 / 4,
                          width: 22 / 2,
                          height: 22 / 2,
                          borderRadius: 8,
                          opacity: 0.7,
                          background: i === 0 ? "#6366f1" : "#a5b4fc",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Vision line */}
                {mode !== "hearing" && (
                  <svg className="pointer-events-none absolute inset-0" width={cols * 22} height={rows * 22}>
                    <line
                      x1={agent.c * 22 + 11}
                      y1={agent.r * 22 + 11}
                      x2={goal.c * 22 + 11}
                      y2={goal.r * 22 + 11}
                      stroke={canSeeUI ? "#22c55e" : "#ef4444"}
                      strokeDasharray={canSeeUI ? "6 0" : "6 6"}
                      strokeWidth={2}
                    />
                  </svg>
                )}

                {/* Hearing radius */}
                {mode !== "vision" && (
                  <svg className="pointer-events-none absolute inset-0" width={cols * 22} height={rows * 22}>
                    <circle
                      cx={agent.c * 22 + 11}
                      cy={agent.r * 22 + 11}
                      r={hearRadius * 22}
                      fill="rgba(59,130,246,0.08)"
                      stroke="#60a5fa"
                    />
                  </svg>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-sm">
              <div className="flex gap-2 flex-wrap">
                <Badge
                  variant={mode === "vision" ? "default" : "secondary"}
                  className="gap-1 cursor-pointer"
                  onClick={() => setMode("vision")}
                >
                  <Eye className="w-3 h-3" /> Vision
                </Badge>
                <Badge
                  variant={mode === "hearing" ? "default" : "secondary"}
                  className="gap-1 cursor-pointer"
                  onClick={() => setMode("hearing")}
                >
                  <Ear className="w-3 h-3" /> Hearing
                </Badge>
                <Badge
                  variant={mode === "both" ? "default" : "secondary"}
                  className="gap-1 cursor-pointer"
                  onClick={() => setMode("both")}
                >
                  <Eye className="w-3 h-3" />+<Ear className="w-3 h-3" /> Both
                </Badge>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-2">
                    <Ear className="w-4 h-4" /> Hearing radius
                  </span>
                  <span className="font-medium">{hearRadius} tiles</span>
                </div>
                <Slider value={[hearRadius]} min={1} max={12} step={1} onValueChange={(v) => setHearRadius(v[0])} />
              </div>

              <div className="space-y-2">
                <p className="text-slate-600">How it works:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Vision</strong>: line-of-sight to the goal (green = clear, red = blocked). Uses A* for shortest path, with diagonal slits blocked.
                  </li>
                  <li>
                    <strong>Hearing</strong>: if within radius, agent moves heuristically toward the goal (blue circle), preferring unvisited cells.
                  </li>
                  <li>
                    <strong>Both</strong>: prefers Vision; falls back to Hearing; otherwise explores (with visited-memory).
                  </li>
                  <li>Click/drag to place walls; switch tools to set agent and goal.</li>
                </ul>
              </div>

              <div className="flex gap-2 md:hidden">
                {!running ? (
                  <Button onClick={runLoop} className="gap-2 w-full" disabled={finished}>
                    <Play className="w-4 h-4" /> Run
                  </Button>
                ) : (
                  <Button variant="secondary" onClick={stopLoop} className="gap-2 w-full">
                    <RotateCcw className="w-4 h-4" /> Stop
                  </Button>
                )}
                <Button variant="secondary" onClick={stepFromLatest} className="gap-2 w-full" disabled={finished}>
                  <Wand2 className="w-4 h-4" /> Step
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
