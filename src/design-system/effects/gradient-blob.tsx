import { forwardRef, type HTMLAttributes } from "react";

type BlobPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";
type BlobSize = "sm" | "md" | "lg" | "xl";
type BlobColor = "white" | "sky" | "indigo" | "purple" | "pink" | "emerald";

export interface GradientBlobProps extends HTMLAttributes<HTMLDivElement> {
  position?: BlobPosition;
  size?: BlobSize;
  color?: BlobColor;
  blur?: "lg" | "xl" | "2xl" | "3xl";
}

const positions: Record<BlobPosition, string> = {
  "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  "top-right": "top-0 right-0 translate-x-1/4 -translate-y-1/4",
  "bottom-left": "bottom-0 left-0 -translate-x-1/4 translate-y-1/4",
  "bottom-right": "bottom-0 right-0 translate-x-1/4 translate-y-1/4",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

const sizes: Record<BlobSize, string> = {
  sm: "w-32 h-32",
  md: "w-64 h-64",
  lg: "w-96 h-96",
  xl: "w-[32rem] h-[32rem]",
};

const colors: Record<BlobColor, string> = {
  white: "bg-white/30",
  sky: "bg-sky-100/50",
  indigo: "bg-indigo-100/40",
  purple: "bg-purple-100/40",
  pink: "bg-pink-100/40",
  emerald: "bg-emerald-100/40",
};

const blurs: Record<string, string> = {
  lg: "blur-lg",
  xl: "blur-xl",
  "2xl": "blur-2xl",
  "3xl": "blur-3xl",
};

export const GradientBlob = forwardRef<HTMLDivElement, GradientBlobProps>(
  (
    {
      position = "top-left",
      size = "md",
      color = "white",
      blur = "3xl",
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={[
          "absolute rounded-full pointer-events-none",
          positions[position],
          sizes[size],
          colors[color],
          blurs[blur],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

GradientBlob.displayName = "GradientBlob";
