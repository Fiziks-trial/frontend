import { clsx } from "clsx";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type CardVariant = "default" | "bordered" | "glow";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "bg-[#0a0a0a] border border-[rgba(255,255,255,0.1)] hover:border-[#22c55e40]",
  bordered:
    "bg-transparent border border-[rgba(255,255,255,0.15)] hover:border-[#22c55e50]",
  glow: "bg-[#0a0a0a] border border-[rgba(255,255,255,0.15)] hover:border-[#22c55e60]",
};

/**
 * Base Card component following Hacker House design system
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(variantStyles[variant], "p-6", className)}
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
 * Commonly used for feature showcases
 */
export interface IconCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  title: string;
  description: string;
}

export const IconCard = forwardRef<HTMLDivElement, IconCardProps>(
  ({ icon, title, description, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="bordered"
        className={clsx(
          "group hover:border-[#22c55e50] transition-all duration-300",
          className,
        )}
        {...props}
      >
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="text-[#22c55e] text-2xl">{icon}</div>
          <h3 className="text-base uppercase tracking-wide text-white">
            {title}
          </h3>
          <p className="text-xs text-[#999999]">{description}</p>
        </div>
      </Card>
    );
  },
);
IconCard.displayName = "IconCard";

/**
 * FeatureCard - Card with corner decorations
 * Used for feature highlights and key information
 */
export interface FeatureCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  children?: ReactNode;
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ title, description, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "relative bg-[#0a0a0a] border border-[rgba(255,255,255,0.1)] p-4 lg:p-6 group hover:border-[#22c55e40] transition-all duration-300",
          className,
        )}
        {...props}
      >
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#22c55e66]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#22c55e66]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#22c55e66]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#22c55e66]" />

        <div className="space-y-3">
          <h3 className="text-base uppercase tracking-wide text-white">
            {title}
          </h3>
          <p className="text-xs text-[#999999] leading-relaxed">
            {description}
          </p>
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
        variant="bordered"
        className={clsx(
          "hover:border-[#22c55e50] transition-all duration-300",
          className,
        )}
        {...props}
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-base uppercase tracking-wide text-white mb-2">
              {title}
            </h3>
            <p className="text-xs text-[#cccccc] leading-relaxed">
              {description}
            </p>
          </div>
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item}
                className="text-sm text-[#999999] flex items-start"
              >
                <span className="text-[#22c55e] mr-2">•</span>
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
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ label, value, icon, className, ...props }, ref) => {
    return (
      <Card ref={ref} variant="glow" className={className} {...props}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#999999] mb-1">
              {label}
            </p>
            <p className="text-xl font-mono text-white">{value}</p>
          </div>
          {icon && <div className="text-2xl text-[#999999]">{icon}</div>}
        </div>
      </Card>
    );
  },
);
StatCard.displayName = "StatCard";
