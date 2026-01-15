import type { HTMLAttributes, ReactNode } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";

type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const variantStyles: Record<
  AlertVariant,
  { container: string; icon: ReactNode }
> = {
  info: {
    container: "bg-blue-50 border-blue-200 text-blue-800",
    icon: <Info className="size-5 text-blue-500" />,
  },
  success: {
    container: "bg-emerald-50 border-emerald-200 text-emerald-800",
    icon: <CheckCircle2 className="size-5 text-emerald-500" />,
  },
  warning: {
    container: "bg-amber-50 border-amber-200 text-amber-800",
    icon: <AlertTriangle className="size-5 text-amber-500" />,
  },
  error: {
    container: "bg-red-50 border-red-200 text-red-800",
    icon: <AlertCircle className="size-5 text-red-500" />,
  },
};

export function Alert({
  variant = "info",
  title,
  icon,
  dismissible,
  onDismiss,
  className = "",
  children,
  ...props
}: AlertProps) {
  const config = variantStyles[variant];

  return (
    <div
      role="alert"
      className={[
        "relative flex gap-3 p-4 rounded-xl border",
        config.container,
        className,
      ].join(" ")}
      {...props}
    >
      <div className="shrink-0 mt-0.5">{icon ?? config.icon}</div>
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
      {dismissible && onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
          aria-label="Dismiss"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
