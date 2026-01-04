import { forwardRef, type ImgHTMLAttributes } from "react";
import { clsx } from "clsx";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "size"> {
  size?: AvatarSize;
  name?: string;
  src?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
  xl: "w-16 h-16 text-xl",
};

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    "var(--color-primary-600)",
    "var(--color-secondary-600)",
    "var(--color-info-600)",
    "var(--color-success-600)",
    "var(--color-warning-600)",
  ];
  return colors[Math.abs(hash) % colors.length];
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = "md", name, src, alt, className, ...props }, ref) => {
    const hasImage = !!src;
    const displayName = name || alt || "User";

    return (
      <div
        ref={ref}
        className={clsx(
          "relative inline-flex items-center justify-center",
          "rounded-full overflow-hidden",
          "font-medium text-white",
          sizeStyles[size],
          className,
        )}
        style={
          !hasImage
            ? { backgroundColor: stringToColor(displayName) }
            : undefined
        }
      >
        {hasImage ? (
          <img
            src={src}
            alt={alt || displayName}
            className="w-full h-full object-cover"
            {...props}
          />
        ) : (
          <span>{getInitials(displayName)}</span>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";
