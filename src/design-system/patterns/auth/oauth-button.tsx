import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { MoveUpRight } from "lucide-react";

type OAuthProvider = "google" | "github" | "custom";

export interface OAuthButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider?: OAuthProvider;
  icon?: ReactNode;
  showArrow?: boolean;
}

const providerStyles: Record<OAuthProvider, string> = {
  google:
    "bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50",
  github:
    "bg-[#111] text-white hover:bg-black hover:shadow-lg hover:shadow-gray-900/20",
  custom:
    "bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50",
};

export const OAuthButton = forwardRef<HTMLButtonElement, OAuthButtonProps>(
  (
    {
      provider = "custom",
      icon,
      showArrow = true,
      disabled,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={[
          "group relative w-full flex items-center justify-center gap-3 h-14 px-4 rounded-2xl font-medium transition-all active:scale-[0.99]",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none",
          providerStyles[provider],
          provider === "google" && "disabled:hover:border-gray-200",
          provider === "github" && "disabled:hover:bg-[#111]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {icon && (
          <span className="opacity-80 group-hover:opacity-100 group-disabled:opacity-50 transition-opacity">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {showArrow && (
          <MoveUpRight
            size={16}
            className={[
              "absolute right-4 opacity-0 -translate-x-1",
              "group-hover:opacity-100 group-hover:translate-x-0 group-disabled:opacity-0",
              "transition-all",
              provider === "github" ? "text-gray-500" : "text-gray-400",
            ].join(" ")}
          />
        )}
      </button>
    );
  },
);

OAuthButton.displayName = "OAuthButton";
