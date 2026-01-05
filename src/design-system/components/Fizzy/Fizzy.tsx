"use client";

import { clsx } from "clsx";
import { forwardRef, type HTMLAttributes } from "react";

export type FizzyState =
  | "idle"
  | "thinking"
  | "correct"
  | "wrong"
  | "celebrate"
  | "encourage"
  | "hint"
  | "excited";

export type FizzySize = "sm" | "md" | "lg";

export interface FizzyProps extends HTMLAttributes<HTMLDivElement> {
  state?: FizzyState;
  size?: FizzySize;
  minimized?: boolean;
}

const sizeStyles: Record<FizzySize, { width: number; height: number }> = {
  sm: { width: 48, height: 48 },
  md: { width: 72, height: 72 },
  lg: { width: 96, height: 96 },
};

// Updated colors with Neon Green as primary
const stateColors: Record<FizzyState, { primary: string; glow: string }> = {
  idle: { primary: "#00ff7f", glow: "rgba(0, 255, 127, 0.35)" },
  thinking: { primary: "#00ff7f", glow: "rgba(0, 255, 127, 0.5)" },
  correct: { primary: "#22c55e", glow: "rgba(34, 197, 94, 0.45)" },
  wrong: { primary: "#ef4444", glow: "rgba(239, 68, 68, 0.35)" },
  celebrate: { primary: "#a3e635", glow: "rgba(163, 230, 53, 0.5)" },
  encourage: { primary: "#4ade80", glow: "rgba(74, 222, 128, 0.35)" },
  hint: { primary: "#10b981", glow: "rgba(16, 185, 129, 0.45)" },
  excited: { primary: "#00ff7f", glow: "rgba(0, 255, 127, 0.55)" },
};

const stateAnimations: Record<FizzyState, string> = {
  idle: "animate-fizzy-pulse",
  thinking: "animate-spin-slow",
  correct: "animate-success-burst",
  wrong: "animate-error-shake",
  celebrate: "animate-bounce-fast",
  encourage: "animate-float",
  hint: "animate-bounce-subtle",
  excited: "animate-wiggle",
};

export const Fizzy = forwardRef<HTMLDivElement, FizzyProps>(
  (
    { state = "idle", size = "md", minimized = false, className, ...props },
    ref,
  ) => {
    const { width, height } = sizeStyles[size];
    const { primary, glow } = stateColors[state];
    const animation = stateAnimations[state];

    if (minimized) {
      return (
        <div
          ref={ref}
          className={clsx(
            "fixed bottom-4 right-4 z-[var(--z-mascot)]",
            "cursor-pointer transition-transform hover:scale-110",
            className,
          )}
          {...props}
        >
          <div
            className="w-10 h-10 rounded-full"
            style={{
              background: `radial-gradient(circle, ${primary} 0%, transparent 70%)`,
              boxShadow: `0 0 15px ${glow}`,
            }}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={clsx(
          "relative inline-flex items-center justify-center",
          animation,
          className,
        )}
        style={{ width, height }}
        {...props}
      >
        {/* Main energy core */}
        <svg
          viewBox="0 0 100 100"
          width={width}
          height={height}
          aria-hidden="true"
        >
          <defs>
            {/* Glow filter */}
            <filter
              id="fizzy-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Radial gradient for core */}
            <radialGradient id="fizzy-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.95" />
              <stop offset="35%" stopColor={primary} stopOpacity="0.85" />
              <stop offset="100%" stopColor={primary} stopOpacity="0" />
            </radialGradient>

            {/* Inner glow */}
            <radialGradient id="fizzy-inner" cx="50%" cy="40%" r="40%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer glow ring */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={primary}
            strokeWidth="1"
            opacity="0.25"
            filter="url(#fizzy-glow)"
          />

          {/* Main energy body */}
          <circle
            cx="50"
            cy="50"
            r="26"
            fill="url(#fizzy-core)"
            filter="url(#fizzy-glow)"
          />

          {/* Inner highlight */}
          <circle
            cx="50"
            cy="50"
            r="16"
            fill="url(#fizzy-inner)"
            opacity="0.7"
          />

          {/* Eyes - two bright spots */}
          <circle cx="42" cy="46" r="4" fill="white" opacity="0.95" />
          <circle cx="58" cy="46" r="4" fill="white" opacity="0.95" />

          {/* Eye shine */}
          <circle cx="43" cy="45" r="1.5" fill="white" />
          <circle cx="59" cy="45" r="1.5" fill="white" />

          {/* Particle trails (decorative) */}
          <g opacity="0.4">
            <circle cx="30" cy="35" r="2" fill={primary}>
              <animate
                attributeName="opacity"
                values="0.4;0;0.4"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="70" cy="65" r="1.5" fill={primary}>
              <animate
                attributeName="opacity"
                values="0;0.4;0"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="25" cy="60" r="1" fill={primary}>
              <animate
                attributeName="opacity"
                values="0.3;0;0.3"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="75" cy="40" r="1.5" fill={primary}>
              <animate
                attributeName="opacity"
                values="0;0.35;0"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>

        {/* Glow effect behind */}
        <div
          className="absolute inset-0 rounded-full -z-10 blur-xl"
          style={{
            background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          }}
        />
      </div>
    );
  },
);

Fizzy.displayName = "Fizzy";
