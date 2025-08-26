"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">404 — Page Not Found</h1>
      <p className="text-slate-600 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link href="/">
        <Button>Back Home</Button>
      </Link>
    </main>
  );
}
