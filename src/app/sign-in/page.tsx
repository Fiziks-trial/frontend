"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Swords } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  Spinner,
  Text,
  Divider,
  Link,
  AuthLayout,
  OAuthButton,
  AuthPanelContent,
} from "@/design-system";
import { GithubIcon, GoogleIcon } from "./_components/oauth-icons";

function OrbitingAtom() {
  return (
    <div className="relative size-64 flex items-center justify-center">
      {/* Nucleus */}
      <div className="absolute size-8 rounded-full bg-linear-to-br from-indigo-400 to-indigo-600 shadow-lg shadow-indigo-500/30" />

      {/* Orbit 1 - Horizontal */}
      <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
        <div className="absolute inset-0 border border-white/10 rounded-full" />
        <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 size-3 rounded-full bg-sky-400 shadow-lg shadow-sky-400/50" />
      </div>

      {/* Orbit 2 - Tilted 60deg */}
      <div
        className="absolute inset-4 animate-[spin_6s_linear_infinite_reverse]"
        style={{ transform: "rotateX(60deg)" }}
      >
        <div className="absolute inset-0 border border-white/10 rounded-full" />
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 size-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
      </div>

      {/* Orbit 3 - Tilted -60deg */}
      <div
        className="absolute inset-8 animate-[spin_10s_linear_infinite]"
        style={{ transform: "rotateX(-60deg)" }}
      >
        <div className="absolute inset-0 border border-dashed border-white/20 rounded-full" />
        <div className="absolute top-1/2 -left-1 -translate-y-1/2 size-2.5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
      </div>

      {/* Outer glow ring */}
      <div className="absolute inset-0 border border-white/5 rounded-full" />
    </div>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const { isLoading, isAuthenticated, login } = useAuth();

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

  return (
    <AuthLayout
      glowColors="indigo"
      panel={
        <AuthPanelContent
          visual={<OrbitingAtom />}
          badge="Season 4 Active"
          badgeColor="text-indigo-300"
          tagline="Master the mechanics."
          quote={{
            text: "Logic will get you from A to B. Imagination will take you everywhere.",
            author: "Albert Einstein",
            initials: "AE",
            title: "Theoretical Physicist",
          }}
        />
      }
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="size-14 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center mx-auto mb-6 rotate-3">
            <Swords size={28} className="text-black" />
          </div>
          <Text variant="h1" className="text-gray-900">
            Welcome back
          </Text>
          <Text variant="body" color="muted">
            Enter the arena to continue your progress.
          </Text>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3 pt-4">
          <OAuthButton
            provider="google"
            icon={<GoogleIcon className="size-5" />}
            onClick={() => login("google")}
          >
            Continue with Google
          </OAuthButton>

          <OAuthButton
            provider="github"
            icon={<GithubIcon className="size-5" />}
            onClick={() => login("github")}
          >
            Continue with GitHub
          </OAuthButton>
        </div>

        {/* Divider */}
        <Divider label="Or" />

        {/* Sign Up Link */}
        <Text variant="body" color="muted" className="text-center">
          Don't have an account?{" "}
          <Link href="/sign-up" variant="underline" className="font-semibold">
            Create account
          </Link>
        </Text>

        {/* Terms */}
        <Text
          variant="body-sm"
          color="muted"
          className="text-center max-w-sm mx-auto leading-relaxed"
        >
          By continuing, you agree to our{" "}
          <NextLink href="/terms" className="underline hover:text-gray-600">
            Terms of Service
          </NextLink>{" "}
          and{" "}
          <NextLink href="/privacy" className="underline hover:text-gray-600">
            Privacy Policy
          </NextLink>
          .
        </Text>
      </div>
    </AuthLayout>
  );
}
