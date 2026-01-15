import Link from "next/link";
import { PROBLEM_CARDS } from "@/lib/constants/marketing";
import {
  CloudBackground,
  DisplayHeading,
  DisplayHeadingMuted,
  PillButton,
  ProblemCard,
  SectionLabel,
  WindowMockup,
} from "@/design-system";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-linear-to-b from-sky-200 via-sky-100 to-white overflow-hidden">
      <CloudBackground density="medium" />

      <div className="relative max-w-5xl mx-auto pt-32 pb-16 px-4 text-center z-10">
        <SectionLabel>SEASON 4 IS LIVE</SectionLabel>
        <DisplayHeading size="hero" className="mb-8 mt-6">
          The mind sport <br />
          <DisplayHeadingMuted>for students.</DisplayHeadingMuted>
        </DisplayHeading>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Challenge friends to academic duels. Climb the ELO leaderboard in
          Physics, Maths, and Chemistry.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <PillButton href="/sign-up" variant="dark" size="lg">
            Join the League
          </PillButton>
          <Link
            href="/demo"
            className="text-sm font-medium text-gray-500 hover:text-black flex items-center gap-2 transition-colors"
          >
            Watch Trailer
            <span className="size-6 rounded-full border border-gray-200 flex items-center justify-center text-xs">
              ▶
            </span>
          </Link>
        </div>

        <WindowMockup
          title="All Problems"
          className="mt-16 max-w-4xl mx-auto hidden sm:block"
        >
          <p className="text-lg font-semibold text-gray-900 mb-6">
            + All Problems
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PROBLEM_CARDS.map((card) => (
              <ProblemCard key={card.title} {...card} />
            ))}
          </div>
        </WindowMockup>
      </div>
    </section>
  );
}
