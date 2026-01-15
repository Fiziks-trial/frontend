import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

type SocialCardColor = "default" | "orange" | "black" | "gray";

export interface SocialCardProps extends HTMLAttributes<HTMLDivElement> {
  platform: string;
  description: string;
  icon?: ReactNode;
  color?: SocialCardColor;
}

const colorStyles: Record<SocialCardColor, { bg: string; text: string }> = {
  default: { bg: "bg-white", text: "text-gray-900" },
  orange: { bg: "bg-orange-500", text: "text-white" },
  black: { bg: "bg-black", text: "text-white" },
  gray: { bg: "bg-gray-100", text: "text-gray-900" },
};

export const SocialCard = forwardRef<HTMLDivElement, SocialCardProps>(
  (
    {
      platform,
      description,
      icon,
      color = "default",
      className = "",
      ...props
    },
    ref,
  ) => {
    const styles = colorStyles[color];

    return (
      <div
        ref={ref}
        className={[
          "rounded-2xl p-6 shadow-lg shadow-black/5",
          styles.bg,
          styles.text,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {icon ? (
          <div className="size-12 mb-4 mx-auto">{icon}</div>
        ) : (
          <div className="size-12 bg-white/20 rounded-xl mb-4 mx-auto" />
        )}
        <h4 className="font-bold text-sm uppercase tracking-wide mb-2">
          {platform}
        </h4>
        <p className="text-sm opacity-80">{description}</p>
      </div>
    );
  },
);

SocialCard.displayName = "SocialCard";
