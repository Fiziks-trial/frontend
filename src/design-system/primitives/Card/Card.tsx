import { clsx } from "clsx";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type CardVariant = "default" | "bordered" | "glow";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-[#0a0a0a] border border-[#00ff0033]",
  bordered: "bg-transparent border border-[#00ff00]",
  glow: "bg-[#0a0a0a] border border-[#00ff00] shadow-[0_0_20px_rgba(0,255,0,0.3)]",
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
          "group hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300",
          className,
        )}
        {...props}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="text-[#00ff00] text-4xl">{icon}</div>
          <h3 className="text-xl uppercase tracking-wide text-white">
            {title}
          </h3>
          <p className="text-sm text-[#999999]">{description}</p>
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
          "relative bg-[#0a0a0a] border border-[#00ff0033] p-8 group hover:border-[#00ff00] transition-all duration-300",
          className,
        )}
        {...props}
      >
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00ff00]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00ff00]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00ff00]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00ff00]" />

        <div className="space-y-4">
          <h3 className="text-2xl uppercase tracking-wide text-[#00ff00]">
            {title}
          </h3>
          <p className="text-sm text-[#999999] leading-relaxed">
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
          "hover:shadow-[0_0_20px_rgba(0,255,0,0.2)] transition-all duration-300",
          className,
        )}
        {...props}
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-xl uppercase tracking-wide text-[#00ff00] mb-3">
              {title}
            </h3>
            <p className="text-sm text-[#cccccc] leading-relaxed">
              {description}
            </p>
          </div>
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item}
                className="text-sm text-[#999999] flex items-start"
              >
                <span className="text-[#00ff00] mr-2">•</span>
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
            <p className="text-xs uppercase tracking-wider text-[#999999] mb-2">
              {label}
            </p>
            <p className="text-3xl font-mono text-[#00ff00]">{value}</p>
          </div>
          {icon && <div className="text-4xl text-[#00ff0066]">{icon}</div>}
        </div>
      </Card>
    );
  },
);
StatCard.displayName = "StatCard";
