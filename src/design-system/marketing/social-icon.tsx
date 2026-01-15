import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type SocialIconVariant = "dark" | "light" | "ghost" | "outline-dark";
type SocialIconSize = "sm" | "md" | "lg";

export interface SocialIconProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  label: string;
  variant?: SocialIconVariant;
  size?: SocialIconSize;
  href?: string;
}

const variants: Record<SocialIconVariant, string> = {
  dark: "bg-gray-800 hover:bg-gray-700 text-white",
  light: "bg-gray-100 hover:bg-gray-200 text-gray-700",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-600",
  "outline-dark":
    "border border-gray-700 text-gray-400 hover:bg-white hover:border-white hover:text-black",
};

const sizes: Record<SocialIconSize, { button: string; icon: string }> = {
  sm: { button: "size-6", icon: "size-3" },
  md: { button: "size-8", icon: "size-4" },
  lg: { button: "size-10", icon: "size-5" },
};

export const SocialIcon = forwardRef<HTMLButtonElement, SocialIconProps>(
  (
    {
      icon,
      label,
      variant = "dark",
      size = "md",
      href,
      className = "",
      ...props
    },
    ref,
  ) => {
    const sizeStyles = sizes[size];

    const buttonContent = (
      <button
        ref={ref}
        type="button"
        className={[
          "rounded-full flex items-center justify-center transition-colors",
          variants[variant],
          sizeStyles.button,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label={label}
        {...props}
      >
        {icon || <div className={`${sizeStyles.icon} bg-gray-500 rounded`} />}
      </button>
    );

    if (href) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {buttonContent}
        </a>
      );
    }

    return buttonContent;
  },
);

SocialIcon.displayName = "SocialIcon";
