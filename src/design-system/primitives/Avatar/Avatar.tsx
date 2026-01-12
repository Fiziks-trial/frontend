import { clsx } from "clsx";
import Image from "next/image";
import { forwardRef, type HTMLAttributes } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarVariant = "circle" | "rounded";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  variant?: AvatarVariant;
  name?: string;
  src?: string;
  alt?: string;
  status?: "online" | "offline" | "away" | "busy";
  bordered?: boolean;
  glow?: boolean;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

const sizePx: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

const statusSizeStyles: Record<AvatarSize, string> = {
  xs: "w-1.5 h-1.5",
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3",
  xl: "w-4 h-4",
};

const statusColorStyles: Record<string, string> = {
  online: "bg-emerald-500",
  offline: "bg-zinc-500",
  away: "bg-amber-500",
  busy: "bg-red-500",
};

// Generate consistent colors based on name
function getAvatarGradient(name: string): string {
  const gradients = [
    "from-indigo-500 to-purple-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-pink-500 to-rose-500",
    "from-cyan-500 to-blue-500",
    "from-violet-500 to-purple-500",
  ];
  const index = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[index % gradients.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      size = "md",
      variant = "circle",
      name,
      src,
      alt,
      status,
      bordered = false,
      glow = false,
      className,
      ...props
    },
    ref,
  ) => {
    const hasImage = !!src;
    const displayName = name || alt || "User";
    const gradient = getAvatarGradient(displayName);

    return (
      <div
        ref={ref}
        className={clsx(
          "relative inline-flex items-center justify-center",
          "font-medium text-white",
          hasImage ? "bg-zinc-800" : `bg-gradient-to-br ${gradient}`,
          "overflow-hidden transition-all duration-200",
          variant === "circle" ? "rounded-full" : "rounded-xl",
          bordered && "ring-2 ring-indigo-500/50",
          glow && "shadow-lg shadow-indigo-500/30",
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {hasImage ? (
          <Image
            src={src}
            alt={alt || displayName}
            width={sizePx[size]}
            height={sizePx[size]}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-semibold">{getInitials(displayName)}</span>
        )}
        {status && (
          <span
            className={clsx(
              "absolute bottom-0 right-0 rounded-full ring-2 ring-[#18181b]",
              statusSizeStyles[size],
              statusColorStyles[status],
            )}
          />
        )}
      </div>
    );
  },
);
Avatar.displayName = "Avatar";

/**
 * AvatarGroup - Display multiple avatars stacked
 */
export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarSize;
  children: React.ReactNode;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max = 4, size = "md", children, className, ...props }, ref) => {
    const childArray = Array.isArray(children) ? children : [children];
    const visibleAvatars = childArray.slice(0, max);
    const remainingCount = childArray.length - max;

    return (
      <div ref={ref} className={clsx("flex -space-x-3", className)} {...props}>
        {visibleAvatars}
        {remainingCount > 0 && (
          <div
            className={clsx(
              "inline-flex items-center justify-center",
              "font-semibold text-white bg-zinc-700",
              "ring-2 ring-[#18181b] rounded-full",
              sizeStyles[size],
            )}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";
