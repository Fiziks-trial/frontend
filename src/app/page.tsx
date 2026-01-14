"use client";

import Link from "next/link";
import {
  BookOpen,
  Flame,
  Sparkles,
  Trophy,
  Zap,
  FileText,
  PenTool,
  Share2,
  Layout,
  Folder,
  Database,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function HomePage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Floating Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white rounded-full shadow-lg shadow-black/5 px-4 py-2 flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 px-2">
            <span className="text-xl font-black tracking-tight">FIZIKS</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/dashboard">Learn</NavLink>
            <NavLink href="/dashboard/practice">Practice</NavLink>
            <NavLink href="/dashboard/battles">Battles</NavLink>
            <NavLink href="/dashboard/leaderboard">Rankings</NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 ml-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-3 py-1.5"
                >
                  Sign out
                </button>
                <Link
                  href="/dashboard"
                  className="bg-black text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-3 py-1.5"
                >
                  Log in
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-black text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Try Fiziks Free
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section - Sky Blue with Clouds */}
      <section className="relative min-h-screen bg-linear-to-b from-sky-200 via-sky-100 to-white overflow-hidden">
        {/* Decorative Clouds */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-20 bg-white/60 rounded-full blur-xl" />
          <div className="absolute top-40 right-20 w-48 h-24 bg-white/50 rounded-full blur-2xl" />
          <div className="absolute top-32 left-1/4 w-24 h-16 bg-white/40 rounded-full blur-xl" />
          <div className="absolute bottom-40 left-20 w-40 h-20 bg-white/30 rounded-full blur-2xl" />
          <div className="absolute bottom-60 right-1/4 w-36 h-18 bg-white/40 rounded-full blur-xl" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-5xl mx-auto pt-32 pb-16 px-4 text-center">
          {/* Main Headline - Elegant Serif */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-black leading-tight mb-8">
            Your space for physics,
            <br />
            practice, and big ideas
          </h1>

          {/* CTA Button */}
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center bg-white text-black text-base font-medium px-8 py-4 rounded-full shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15 transition-all"
          >
            Try Fiziks Free
          </Link>

          {/* App Mockup */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden border border-gray-100">
              {/* Window Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white rounded-full px-4 py-1 text-xs text-gray-400 border border-gray-200">
                    All Problems
                  </div>
                </div>
              </div>

              {/* App Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-lg font-semibold text-gray-900">+ All Problems</span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <ProblemCard
                    title="Kinematics"
                    color="bg-rose-100"
                    borderColor="border-rose-200"
                    items={["Motion equations", "Free fall", "Projectile motion"]}
                  />
                  <ProblemCard
                    title="Mechanics"
                    color="bg-sky-100"
                    borderColor="border-sky-200"
                    items={["Newton's Laws", "Friction", "Work & Energy"]}
                  />
                  <ProblemCard
                    title="Waves"
                    color="bg-amber-100"
                    borderColor="border-amber-200"
                    items={["Wave properties", "Sound waves", "Light"]}
                  />
                  <ProblemCard
                    title="Thermodynamics"
                    color="bg-emerald-100"
                    borderColor="border-emerald-200"
                    items={["Heat transfer", "Gas laws", "Entropy"]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARN Section - Lavender Background */}
      <section className="relative py-24 bg-indigo-100/50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - App Mockups */}
            <div className="relative">
              {/* Background Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                  <span className="ml-4 text-sm text-gray-500">Practice Queue</span>
                </div>
                <div className="space-y-3">
                  <TaskItem label="Solve projectile motion" tag="Kinematics" tagColor="bg-rose-100 text-rose-700" />
                  <TaskItem label="Calculate momentum" tag="Mechanics" tagColor="bg-sky-100 text-sky-700" />
                  <TaskItem label="Wave interference" tag="Waves" tagColor="bg-amber-100 text-amber-700" />
                </div>
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-8 -right-8 bg-orange-50 rounded-2xl shadow-xl p-6 max-w-xs border border-orange-100">
                <h4 className="font-semibold text-gray-900 mb-3">Projectile Motion</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border border-gray-300" />
                    Initial velocity: 20 m/s
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border border-gray-300" />
                    Launch angle: 45°
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border border-gray-300" />
                    Find maximum height
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                  Use kinematic equations to solve for the maximum height reached by the projectile...
                </p>
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <span className="text-sm font-medium text-gray-500 tracking-wider uppercase">
                LEARN
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif text-black mt-4 mb-6 leading-tight">
                From first concept
                <br />
                to full mastery
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                In Fiziks, your learning moves with you — capture ideas instantly across all your devices, then practice them when you're ready. Transform quick notes into deep understanding you're proud to share.
              </p>

              {/* Feature Icons */}
              <div className="grid grid-cols-2 gap-6">
                <FeatureItem icon={<FileText className="w-5 h-5" />} label="Simulations" />
                <FeatureItem icon={<PenTool className="w-5 h-5" />} label="Practice" />
                <FeatureItem icon={<Sparkles className="w-5 h-5" />} label="AI Tutor" />
                <FeatureItem icon={<Share2 className="w-5 h-5" />} label="Compete & Share" />
              </div>

              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center bg-white text-black text-base font-medium px-8 py-4 rounded-full shadow-lg shadow-black/10 hover:shadow-xl transition-all mt-10"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ORGANIZE Section - Off-white Background */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-sm font-medium text-gray-500 tracking-wider uppercase">
            ORGANIZE
          </span>
          <h2 className="text-4xl lg:text-5xl font-serif text-black mt-4 mb-6 leading-tight">
            Structure That Adapts
            <br />
            to Your Learning
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            Choose any approach that fits your style: organize with subjects, topics and tags, or build rich study plans with collections.
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <OrganizeCard
              title="Subjects"
              description="Switch between different physics domains"
              color="bg-indigo-100"
              icon={<Layout className="w-6 h-6" />}
            />
            <OrganizeCard
              title="Topics & Tags"
              description="Classic structure for clear hierarchies"
              color="bg-white"
              icon={<Folder className="w-6 h-6" />}
            />
            <OrganizeCard
              title="Collections"
              description="For structured tracking and rich data"
              color="bg-emerald-50"
              icon={<Database className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* COMPETE Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-sm font-medium text-gray-500 tracking-wider uppercase">
            COMPETE
          </span>
          <h2 className="text-4xl lg:text-5xl font-serif text-black mt-4 mb-6">
            Make it unmistakably yours
          </h2>

          <Link
            href="/dashboard/battles"
            className="inline-flex items-center justify-center bg-white text-black text-base font-medium px-8 py-4 rounded-full shadow-lg shadow-black/10 hover:shadow-xl border border-gray-200 transition-all mb-16"
          >
            Start a Battle
          </Link>

          {/* Battle Cards Carousel */}
          <div className="flex justify-center gap-4 overflow-hidden">
            <BattleCard title="Kinematics" color="bg-yellow-300" />
            <BattleCard title="Mechanics" color="bg-gray-700" textColor="text-white" />
            <BattleCard title="Waves" color="bg-gray-100" />
            <BattleCard title="Thermo" color="bg-emerald-100" />
            <BattleCard title="Optics" color="bg-violet-100" />
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative py-24 bg-stone-50 overflow-hidden">
        {/* Decorative Clouds */}
        <div className="absolute top-10 left-10 w-48 h-32 bg-sky-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-40 bg-sky-100/30 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-serif text-black mb-6">
            Stay in the loop
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            Join the community and learn how other students get the most out of Fiziks.
          </p>

          {/* Social Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SocialCard
              platform="r/fiziks"
              description="Discuss, share, and explore"
              color="bg-orange-500"
              textColor="text-white"
            />
            <SocialCard
              platform="Discord"
              description="Get help from the community"
              color="bg-gray-100"
            />
            <SocialCard
              platform="@fiziks"
              description="Stay up to date on releases"
              color="bg-black"
              textColor="text-white"
            />
            <SocialCard
              platform="YouTube"
              description="Tips, tutorials, and deep dives"
              color="bg-white"
            />
          </div>
        </div>
      </section>

      {/* Footer - Dark */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <FooterColumn
              title="PRODUCT"
              links={[
                { label: "Features", href: "#" },
                { label: "Learn", href: "/dashboard" },
                { label: "Practice", href: "/dashboard/practice" },
                { label: "Battles", href: "/dashboard/battles" },
                { label: "Pricing", href: "#" },
              ]}
            />
            <FooterColumn
              title="COMMUNITY"
              links={[
                { label: "Discord", href: "#" },
                { label: "Reddit", href: "#" },
                { label: "Twitter", href: "#" },
              ]}
            />
            <FooterColumn
              title="SUPPORT"
              links={[
                { label: "Help Center", href: "#" },
                { label: "Contact Support", href: "#" },
                { label: "Getting Started", href: "#" },
              ]}
            />
            <FooterColumn
              title="COMPANY"
              links={[
                { label: "About us", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Careers", href: "#" },
              ]}
            />
            <FooterColumn
              title="LEGAL"
              links={[
                { label: "Terms", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Security", href: "#" },
              ]}
            />
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 Fiziks. All rights reserved.
            </p>
            <div className="flex gap-4">
              <SocialIcon name="Instagram" />
              <SocialIcon name="YouTube" />
              <SocialIcon name="Twitter" />
              <SocialIcon name="LinkedIn" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Nav Link Component
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-3 py-1.5 rounded-full hover:bg-gray-100"
    >
      {children}
    </Link>
  );
}

// Problem Card for Hero Mockup
function ProblemCard({
  title,
  color,
  borderColor,
  items,
}: {
  title: string;
  color: string;
  borderColor: string;
  items: string[];
}) {
  return (
    <div className={`${color} ${borderColor} border rounded-xl p-4`}>
      <h4 className="font-semibold text-gray-900 mb-3 text-sm">{title}</h4>
      <ul className="space-y-1.5 text-xs text-gray-600">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// Task Item Component
function TaskItem({
  label,
  tag,
  tagColor,
}: {
  label: string;
  tag: string;
  tagColor: string;
}) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
      <div className="w-4 h-4 rounded border border-gray-300" />
      <span className="text-sm text-gray-700 flex-1">{label}</span>
      <span className={`text-xs px-2 py-0.5 rounded-full ${tagColor}`}>{tag}</span>
    </div>
  );
}

// Feature Item Component
function FeatureItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-700">{icon}</div>
      <span className="text-base font-medium text-gray-900">{label}</span>
    </div>
  );
}

// Organize Card Component
function OrganizeCard({
  title,
  description,
  color,
  icon,
}: {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className={`${color} rounded-3xl p-8 shadow-lg shadow-black/5 border border-gray-100`}>
      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 mx-auto shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

// Battle Card Component
function BattleCard({
  title,
  color,
  textColor = "text-gray-900",
}: {
  title: string;
  color: string;
  textColor?: string;
}) {
  return (
    <div className={`${color} ${textColor} w-40 h-56 rounded-2xl p-4 shadow-lg flex flex-col justify-between`}>
      <h4 className="font-semibold text-sm">{title}</h4>
      <div className="h-20 rounded-lg bg-black/5" />
    </div>
  );
}

// Social Card Component
function SocialCard({
  platform,
  description,
  color,
  textColor = "text-gray-900",
}: {
  platform: string;
  description: string;
  color: string;
  textColor?: string;
}) {
  return (
    <div className={`${color} ${textColor} rounded-2xl p-6 shadow-lg shadow-black/5`}>
      <div className="w-12 h-12 bg-white/20 rounded-xl mb-4 mx-auto" />
      <h4 className="font-bold text-sm uppercase tracking-wide mb-2">{platform}</h4>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
}

// Footer Column Component
function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-xs font-bold tracking-wider text-gray-400 mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Social Icon Component
function SocialIcon({ name }: { name: string }) {
  return (
    <a
      href="#"
      className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
      aria-label={name}
    >
      <div className="w-4 h-4 bg-gray-500 rounded" />
    </a>
  );
}
