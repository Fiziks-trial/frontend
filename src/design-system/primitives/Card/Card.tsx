import { clsx } from "clsx";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type CardVariant = "default" | "bordered" | "glow" | "glass";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "bg-[#18181b]/60 border border-white/[0.08] hover:border-white/[0.12]",
  bordered:
    "bg-transparent border border-white/[0.1] hover:border-white/[0.15]",
  glow: "bg-[#18181b]/60 border border-white/[0.08] hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10",
  glass:
    "bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.12]",
};

/**
 * Base Card component following Craft-inspired design system
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          variantStyles[variant],
          "rounded-xl p-6 transition-all duration-200",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Card.displayName = "Card";

/**
 * IconCard - Card with centered icon header
 */
export interface IconCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  title: string;
  description: string;
  gradient?: string;
}

export const IconCard = forwardRef<HTMLDivElement, IconCardProps>(
  (
    {
      icon,
      title,
      description,
      gradient = "from-indigo-500 to-purple-500",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <Card
        ref={ref}
        variant="default"
        className={clsx(
          "group hover:border-indigo-500/30 transition-all duration-300",
          className,
        )}
        {...props}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div
            className={clsx(
              "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg",
              gradient,
            )}
          >
            {icon}
          </div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>
      </Card>
    );
  },
);
IconCard.displayName = "IconCard";

/**
 * FeatureCard - Card for feature highlights
 */
export interface FeatureCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  children?: ReactNode;
  gradient?: string;
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ title, description, children, gradient, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "relative bg-[#18181b]/60 border border-white/[0.08] rounded-xl p-5 group hover:border-white/[0.15] transition-all duration-300",
          gradient && `bg-gradient-to-br ${gradient}`,
          className,
        )}
        {...props}
      >
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
          {children}
        </div>
      </div>
    );
  },
);
FeatureCard.displayName = "FeatureCard";

/**
 * InfoCard - Card with title, description, and bullet list
 */
export interface InfoCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  items: string[];
}

export const InfoCard = forwardRef<HTMLDivElement, InfoCardProps>(
  ({ title, description, items, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        className={clsx(
          "hover:border-indigo-500/20 transition-all duration-300",
          className,
        )}
        {...props}
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {description}
            </p>
          </div>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item} className="text-sm text-zinc-400 flex items-start">
                <span className="text-indigo-400 mr-2 mt-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    );
  },
);
InfoCard.displayName = "InfoCard";

/**
 * StatCard - Card for displaying metrics/stats
 */
export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  icon?: ReactNode;
  change?: { value: string; type: "increase" | "decrease" | "neutral" };
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ label, value, icon, change, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "bg-white/[0.03] rounded-xl p-4 border border-white/[0.05] hover:border-white/[0.1] transition-colors",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2 text-zinc-400 mb-2">
          {icon}
          <span className="text-xs font-medium">{label}</span>
        </div>
        <p className="text-xl font-bold text-white">{value}</p>
        {change && (
          <p
            className={clsx(
              "text-xs mt-1",
              change.type === "increase" && "text-emerald-400",
              change.type === "decrease" && "text-red-400",
              change.type === "neutral" && "text-zinc-500",
            )}
          >
            {change.value}
          </p>
        )}
      </div>
    );
  },
);
StatCard.displayName = "StatCard";
