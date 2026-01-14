import { type HTMLAttributes, type ReactNode } from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  fallback?: ReactNode;
}

const sizes: Record<AvatarSize, string> = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
};

export function Avatar({
  size = "md",
  src,
  alt,
  fallback,
  className = "",
  ...props
}: AvatarProps) {
  return (
    <div
      className={[
        "relative rounded-full bg-primary flex items-center justify-center",
        "text-primary-foreground font-bold overflow-hidden shrink-0",
        sizes[size],
        className,
      ].join(" ")}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="size-full object-cover"
        />
      ) : (
        fallback
      )}
    </div>
  );
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarSize;
  children: ReactNode;
}

export function AvatarGroup({
  max = 4,
  size = "sm",
  className = "",
  children,
  ...props
}: AvatarGroupProps) {
  return (
    <div className={["flex -space-x-2", className].join(" ")} {...props}>
      {children}
    </div>
  );
}
