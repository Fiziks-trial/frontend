"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Swords } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  Spinner,
  Text,
  Divider,
  Link,
  Checkbox,
  AuthLayout,
  OAuthButton,
  AuthPanelContent,
} from "@/design-system";
import { GithubIcon, GoogleIcon } from "../sign-in/_components/oauth-icons";

function LaunchingRocket() {
  return (
    <div className="relative size-64 flex items-center justify-center">
      {/* Launch pad glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-orange-500/20 rounded-full blur-xl" />

      {/* Rocket body */}
      <div className="relative animate-[bounce_3s_ease-in-out_infinite]">
        {/* Exhaust flames */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-4 h-12 bg-linear-to-t from-transparent via-orange-500 to-yellow-400 rounded-full animate-pulse" />
          <div className="w-6 h-8 bg-linear-to-t from-transparent via-orange-400/50 to-orange-500/80 rounded-full blur-sm -mt-4" />
        </div>

        {/* Main rocket */}
        <svg
          viewBox="0 0 64 100"
          className="w-16 h-24 drop-shadow-2xl"
          aria-hidden="true"
        >
          {/* Rocket nose cone */}
          <path d="M32 0 L44 30 L20 30 Z" fill="url(#rocketNose)" />
          {/* Rocket body */}
          <rect
            x="20"
            y="30"
            width="24"
            height="45"
            rx="2"
            fill="url(#rocketBody)"
          />
          {/* Window */}
          <circle
            cx="32"
            cy="45"
            r="8"
            fill="#1e3a5f"
            stroke="#60a5fa"
            strokeWidth="2"
          />
          <circle cx="32" cy="45" r="4" fill="#93c5fd" opacity="0.6" />
          {/* Fins */}
          <path d="M20 60 L8 80 L20 75 Z" fill="url(#finGradient)" />
          <path d="M44 60 L56 80 L44 75 Z" fill="url(#finGradient)" />
          {/* Base */}
          <rect x="22" y="75" width="20" height="8" rx="1" fill="#4b5563" />

          <defs>
            <linearGradient id="rocketNose" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e5e7eb" />
              <stop offset="50%" stopColor="#f9fafb" />
              <stop offset="100%" stopColor="#d1d5db" />
            </linearGradient>
            <linearGradient
              id="finGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Stars */}
      <div className="absolute top-4 left-8 size-1.5 rounded-full bg-white animate-pulse" />
      <div className="absolute top-12 right-12 size-1 rounded-full bg-white/80 animate-pulse delay-100" />
      <div className="absolute top-20 left-16 size-1 rounded-full bg-white/60 animate-pulse delay-200" />
      <div className="absolute bottom-20 right-8 size-1.5 rounded-full bg-white animate-pulse delay-300" />
      <div className="absolute top-8 right-20 size-1 rounded-full bg-white/70 animate-pulse delay-500" />
    </div>
  );
}

export default function SignUpPage() {
  const router = useRouter();
  const { isLoading, isAuthenticated, login } = useAuth();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Spinner size="lg" />
      </div>
    );
  }

  const handleLogin = (provider: "google" | "github") => {
    if (agreedToTerms) {
      login(provider);
    }
  };

  return (
    <AuthLayout
      glowColors="emerald"
      panel={
        <AuthPanelContent
          visual={<LaunchingRocket />}
          badge="Begin Your Journey"
          badgeColor="text-emerald-300"
          tagline="Launch into physics."
          quote={{
            text: "The first principle is that you must not fool yourself — and you are the easiest person to fool.",
            author: "Richard Feynman",
            initials: "RF",
            title: "Nobel Laureate in Physics",
          }}
        />
      }
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="size-14 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center mx-auto mb-6 -rotate-3">
            <Swords size={28} className="text-black" />
          </div>
          <Text variant="h1" className="text-gray-900">
            Create account
          </Text>
          <Text variant="body" color="muted">
            Join the arena and start mastering physics.
          </Text>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3 pt-4">
          <OAuthButton
            provider="google"
            icon={<GoogleIcon className="size-5" />}
            onClick={() => handleLogin("google")}
            disabled={!agreedToTerms}
          >
            Continue with Google
          </OAuthButton>

          <OAuthButton
            provider="github"
            icon={<GithubIcon className="size-5" />}
            onClick={() => handleLogin("github")}
            disabled={!agreedToTerms}
          >
            Continue with GitHub
          </OAuthButton>
        </div>

        {/* Terms Checkbox */}
        <Checkbox
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          label={
            <Text variant="body" color="muted" className="leading-snug">
              I agree to the{" "}
              <NextLink
                href="/terms"
                className="text-gray-900 hover:underline underline-offset-4 decoration-gray-300"
              >
                Terms of Service
              </NextLink>{" "}
              and{" "}
              <NextLink
                href="/privacy"
                className="text-gray-900 hover:underline underline-offset-4 decoration-gray-300"
              >
                Privacy Policy
              </NextLink>
            </Text>
          }
        />

        {/* Divider */}
        <Divider label="Or" />

        {/* Sign In Link */}
        <Text variant="body" color="muted" className="text-center">
          Already have an account?{" "}
          <Link href="/sign-in" variant="underline" className="font-semibold">
            Sign in
          </Link>
        </Text>
      </div>
    </AuthLayout>
  );
}
