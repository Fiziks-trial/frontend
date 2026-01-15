"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Swords } from "lucide-react";

export interface AuthLayoutProps {
  /** Content for the dark left panel (desktop only) */
  panel: ReactNode;
  /** Content for the right panel (form area) */
  children: ReactNode;
  /** Panel glow color scheme */
  glowColors?: "indigo" | "emerald" | "purple" | "rose";
}

const glowColorStyles = {
  indigo: {
    top: "bg-indigo-900/30",
    bottom: "bg-blue-900/20",
  },
  emerald: {
    top: "bg-emerald-900/30",
    bottom: "bg-cyan-900/20",
  },
  purple: {
    top: "bg-purple-900/30",
    bottom: "bg-violet-900/20",
  },
  rose: {
    top: "bg-rose-900/30",
    bottom: "bg-pink-900/20",
  },
};

export function AuthLayout({
  panel,
  children,
  glowColors = "indigo",
}: AuthLayoutProps) {
  const colors = glowColorStyles[glowColors];

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel - Dark gradient with frosted effect */}
      <div className="relative hidden lg:flex flex-col justify-between bg-linear-to-br from-gray-900 via-slate-900 to-zinc-950 text-white p-12 overflow-hidden">
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Frosted overlay for blur effect */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/5" />

        {/* Glow Effects */}
        <div
          className={[
            "absolute -top-1/4 -right-1/4 size-125 rounded-full blur-[120px]",
            colors.top,
          ].join(" ")}
        />
        <div
          className={[
            "absolute -bottom-1/4 -left-1/4 size-100 rounded-full blur-[100px]",
            colors.bottom,
          ].join(" ")}
        />

        {/* Logo */}
        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <div className="size-8 bg-white/10 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
              <Swords size={14} />
            </div>
            <span className="font-bold font-serif tracking-tight">Fiziks</span>
          </Link>
        </div>

        {/* Panel Content */}
        <div className="relative z-10">{panel}</div>

        {/* Empty footer spacer for layout balance */}
        <div className="relative z-10" />
      </div>

      {/* Right Panel - Light form area */}
      <div className="relative flex flex-col items-center justify-center p-6 bg-[#F9F9F8]">
        {/* Mobile Back Link */}
        <div className="lg:hidden absolute top-6 left-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>

        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
