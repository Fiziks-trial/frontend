"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Fizzy } from "@/design-system/components/Fizzy";

export default function HomePage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <Fizzy state="thinking" size="lg" />
          <p className="text-[#64748b] animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dot Grid Background */}
      <div className="dot-grid-bg" />

      {/* Subtle green glow spots */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="glow-spot glow-spot-green absolute top-20 left-1/4 w-[600px] h-[600px]" />
        <div
          className="glow-spot glow-spot-green absolute bottom-40 right-1/4 w-[500px] h-[500px]"
          style={{ opacity: 0.5 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center gap-3">
                <Fizzy state="idle" size="sm" />
                <span className="text-xl font-bold text-neon">FIZIKS</span>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/design-system"
                  className="text-sm text-[#64748b] hover:text-white transition-colors"
                >
                  Design System
                </Link>
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3">
                      {user?.avatar && (
                        <Image
                          src={user.avatar}
                          alt={user.name || "User"}
                          width={32}
                          height={32}
                          className="rounded-full ring-2 ring-[#00ff7f]/30"
                        />
                      )}
                      <span className="text-[#94a3b8]">
                        {user?.name || user?.email}
                      </span>
                    </div>
                    <button
                      onClick={logout}
                      className="text-sm text-[#64748b] hover:text-white transition-colors"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/sign-in">
                      <button className="text-sm text-[#94a3b8] hover:text-white transition-colors px-4 py-2">
                        LOG IN
                      </button>
                    </Link>
                    <Link href="/sign-up">
                      <button className="btn-neon text-sm px-5 py-2">
                        TRY IT FREE
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="relative">
          <div className="max-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Main headline with outlined text effect */}
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 tracking-tight leading-none">
                <span className="text-outline-thick font-chunky">
                  CHEAT CODE
                </span>
                <span className="text-white font-display"> TO</span>
                <br />
                <span className="text-white font-display">MASTERING </span>
                <span className="text-outline-thick font-chunky">PHYSICS</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#94a3b8] max-w-2xl mx-auto mb-12 leading-relaxed">
                Battle friends in real-time physics challenges so
                <br className="hidden sm:block" />
                intense they feel like a game — fast, competitive,
                <br className="hidden sm:block" />
                and fully in your control.
              </p>

              {isAuthenticated ? (
                <div className="space-y-8">
                  {/* User welcome card */}
                  <div className="card-dark max-w-md mx-auto p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Fizzy state="celebrate" size="md" />
                      <div className="text-left">
                        <h2 className="text-lg font-semibold text-white">
                          Welcome back!
                        </h2>
                        <p className="text-sm text-[#64748b]">{user?.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="p-4 rounded-2xl bg-[#141414] border border-white/5 text-center">
                        <p className="text-3xl font-bold text-neon">
                          {user?.xp || 0}
                        </p>
                        <p className="text-xs text-[#64748b] mt-1">XP</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-[#141414] border border-white/5 text-center">
                        <p className="text-3xl font-bold text-[#a3e635]">
                          {user?.wins || 0}
                        </p>
                        <p className="text-xs text-[#64748b] mt-1">Wins</p>
                      </div>
                    </div>
                  </div>

                  {/* Mode tabs and CTA */}
                  <div className="flex flex-col items-center gap-6">
                    <div className="tab-group">
                      <button className="tab-item active">BATTLE</button>
                      <button className="tab-item">PRACTICE</button>
                    </div>
                    <button className="btn-neon text-lg px-8 py-3 flex items-center gap-2">
                      Find Match
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-8">
                  {/* Mode toggle tabs */}
                  <div className="tab-group">
                    <button className="tab-item active">COMPETE</button>
                    <button className="tab-item">LEARN</button>
                  </div>

                  {/* URL/Topic input like Loki */}
                  <div className="w-full max-w-2xl">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        placeholder="Pick a topic... kinematics, waves, thermodynamics"
                        className="input-dark w-full pr-16"
                      />
                      <button className="absolute right-2 w-12 h-12 bg-[#00ff7f] rounded-full flex items-center justify-center hover:bg-[#00e070] transition-colors">
                        <svg
                          className="w-6 h-6 text-[#0a0a0a]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Alt CTAs */}
                  <div className="flex gap-4">
                    <Link href="/sign-up">
                      <button className="btn-neon px-8 py-3">
                        Get Started Free
                      </button>
                    </Link>
                    <Link href="/sign-in">
                      <button className="btn-outline-neon px-8 py-3">
                        Sign In
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Features Section */}
            <div className="mt-32 grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon="⚡"
                title="Real-time Battles"
                description="Challenge players worldwide in live physics quiz battles with instant feedback and ELO rankings."
              />
              <FeatureCard
                icon="📈"
                title="Skill Progression"
                description="Track your growth with XP, streaks, and detailed stats across every physics topic."
              />
              <FeatureCard
                icon="🧠"
                title="Smart Learning"
                description="Interactive simulations and AI-powered hints help you actually understand the physics."
              />
            </div>

            {/* Stats Section */}
            <div className="mt-32 text-center">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
                Join the <span className="text-neon">Physics Revolution</span>
              </h2>
              <p className="text-[#64748b] mb-12 max-w-xl mx-auto">
                Thousands of students are already leveling up their physics
                game.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <StatItem value="10K+" label="Active Players" />
                <StatItem value="500K+" label="Matches Played" />
                <StatItem value="50+" label="Physics Topics" />
                <StatItem value="4.9" label="App Rating" />
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-32 text-center">
              <div className="card-dark max-w-3xl mx-auto p-12">
                <Fizzy state="excited" size="lg" />
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6 mb-4">
                  Ready to dominate physics?
                </h2>
                <p className="text-[#94a3b8] mb-8 max-w-md mx-auto">
                  Start competing for free. No credit card required.
                </p>
                <Link href="/sign-up">
                  <button className="btn-neon text-lg px-10 py-4">
                    Start Playing Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-8 mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Fizzy state="idle" size="sm" />
                <span className="text-[#64748b]">
                  Fiziks — Master physics the smart way
                </span>
              </div>
              <div className="flex gap-6">
                <Link
                  href="/design-system"
                  className="text-sm text-[#64748b] hover:text-[#00ff7f] transition-colors"
                >
                  Design System
                </Link>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#64748b] hover:text-[#00ff7f] transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Feature Card Component - Dark Style
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="card-dark p-6 transition-all duration-300 hover:-translate-y-1">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-[#94a3b8] leading-relaxed">{description}</p>
    </div>
  );
}

// Stat Item Component - Dark Style
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="card-dark p-6 text-center transition-all duration-300 hover:border-[#00ff7f]/30">
      <p className="text-4xl font-black text-neon">{value}</p>
      <p className="text-sm text-[#64748b] mt-2">{label}</p>
    </div>
  );
}
