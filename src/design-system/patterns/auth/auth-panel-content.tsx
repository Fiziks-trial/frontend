import type { ReactNode } from "react";

export interface AuthPanelQuote {
  text: string;
  author: string;
  initials: string;
  title: string;
}

export interface AuthPanelContentProps {
  /** Visual element (atom, rocket, etc.) */
  visual: ReactNode;
  /** Badge text (e.g., "Season 4 Active", "Begin Your Journey") */
  badge: string;
  /** Badge text color class */
  badgeColor?: string;
  /** Tagline text */
  tagline: string;
  /** Quote to display */
  quote: AuthPanelQuote;
}

export function AuthPanelContent({
  visual,
  badge,
  badgeColor = "text-indigo-300",
  tagline,
  quote,
}: AuthPanelContentProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-16">
      {/* Visual Element */}
      <div className="flex flex-col items-center justify-center">
        {visual}
        <div className="mt-10 text-center space-y-3">
          <div
            className={[
              "inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5",
              "text-[10px] font-mono uppercase tracking-widest",
              badgeColor,
            ].join(" ")}
          >
            {badge}
          </div>
          <h2 className="text-3xl font-serif text-white">{tagline}</h2>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="max-w-md">
        <p className="text-lg text-gray-400 font-serif italic mb-4">
          "{quote.text}"
        </p>
        <footer className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold font-mono">
            {quote.initials}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">{quote.author}</span>
            <span className="text-xs text-gray-500">{quote.title}</span>
          </div>
        </footer>
      </blockquote>
    </div>
  );
}
