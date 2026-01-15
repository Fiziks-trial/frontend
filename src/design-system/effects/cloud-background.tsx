import { forwardRef, type HTMLAttributes } from "react";

type CloudDensity = "sparse" | "medium" | "dense";

export interface CloudBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  density?: CloudDensity;
}

const cloudConfigs: Record<
  CloudDensity,
  Array<{ position: string; size: string; opacity: string; blur: string }>
> = {
  sparse: [
    {
      position: "top-20 left-10",
      size: "w-32 h-20",
      opacity: "bg-white/60",
      blur: "blur-xl",
    },
    {
      position: "top-40 right-20",
      size: "w-48 h-24",
      opacity: "bg-white/50",
      blur: "blur-2xl",
    },
    {
      position: "bottom-40 left-20",
      size: "w-40 h-20",
      opacity: "bg-white/30",
      blur: "blur-2xl",
    },
  ],
  medium: [
    {
      position: "top-20 left-10",
      size: "w-32 h-20",
      opacity: "bg-white/60",
      blur: "blur-xl",
    },
    {
      position: "top-40 right-20",
      size: "w-48 h-24",
      opacity: "bg-white/50",
      blur: "blur-2xl",
    },
    {
      position: "top-32 left-1/4",
      size: "w-24 h-16",
      opacity: "bg-white/40",
      blur: "blur-xl",
    },
    {
      position: "bottom-40 left-20",
      size: "w-40 h-20",
      opacity: "bg-white/30",
      blur: "blur-2xl",
    },
    {
      position: "bottom-60 right-1/4",
      size: "w-36 h-18",
      opacity: "bg-white/40",
      blur: "blur-xl",
    },
  ],
  dense: [
    {
      position: "top-10 left-5",
      size: "w-40 h-24",
      opacity: "bg-white/70",
      blur: "blur-xl",
    },
    {
      position: "top-20 left-10",
      size: "w-32 h-20",
      opacity: "bg-white/60",
      blur: "blur-xl",
    },
    {
      position: "top-40 right-20",
      size: "w-48 h-24",
      opacity: "bg-white/50",
      blur: "blur-2xl",
    },
    {
      position: "top-32 left-1/4",
      size: "w-24 h-16",
      opacity: "bg-white/40",
      blur: "blur-xl",
    },
    {
      position: "top-60 right-1/3",
      size: "w-36 h-20",
      opacity: "bg-white/45",
      blur: "blur-xl",
    },
    {
      position: "bottom-20 right-10",
      size: "w-44 h-28",
      opacity: "bg-white/35",
      blur: "blur-2xl",
    },
    {
      position: "bottom-40 left-20",
      size: "w-40 h-20",
      opacity: "bg-white/30",
      blur: "blur-2xl",
    },
    {
      position: "bottom-60 right-1/4",
      size: "w-36 h-18",
      opacity: "bg-white/40",
      blur: "blur-xl",
    },
  ],
};

export const CloudBackground = forwardRef<HTMLDivElement, CloudBackgroundProps>(
  ({ density = "medium", className = "", ...props }, ref) => {
    const clouds = cloudConfigs[density];

    return (
      <div
        ref={ref}
        className={[
          "absolute inset-0 overflow-hidden pointer-events-none",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {clouds.map((cloud) => (
          <div
            key={cloud.position}
            className={[
              "absolute rounded-full",
              cloud.position,
              cloud.size,
              cloud.opacity,
              cloud.blur,
            ].join(" ")}
          />
        ))}
      </div>
    );
  },
);

CloudBackground.displayName = "CloudBackground";
