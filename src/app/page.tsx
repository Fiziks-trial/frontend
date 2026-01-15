"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { NAV_LINKS } from "@/lib/constants/marketing";
import { FloatingNavbar, NavLink, PillButton, Spinner } from "@/design-system";
import {
  CommunitySection,
  FooterSection,
  HeroSection,
  LearnSection,
  OrganizeSection,
} from "./_components";

export default function HomePage() {
  const { isLoading, isAuthenticated, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <FloatingNavbar
        logo={
          <Link href="/" className="text-xl font-black tracking-tight">
            FIZIKS
          </Link>
        }
        links={NAV_LINKS.map(({ href, label }) => (
          <NavLink key={href} href={href}>
            {label}
          </NavLink>
        ))}
        actions={
          isAuthenticated ? (
            <>
              <button
                type="button"
                onClick={logout}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-3 py-1.5"
              >
                Sign out
              </button>
              <PillButton href="/dashboard" variant="dark" size="sm">
                Dashboard
              </PillButton>
            </>
          ) : (
            <>
              <NavLink href="/sign-in">Log in</NavLink>
              <PillButton href="/sign-up" variant="dark" size="sm">
                Try Fiziks Free
              </PillButton>
            </>
          )
        }
      />

      <HeroSection />
      <LearnSection />
      <OrganizeSection />
      <CommunitySection />
      <FooterSection />
    </div>
  );
}
