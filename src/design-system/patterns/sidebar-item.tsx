import type { ReactNode } from "react";
import Link from "next/link";

export interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  icon,
  label,
  href,
  active = false,
  onClick,
}: SidebarItemProps) {
  const styles = [
    "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer w-full text-left",
    "transition-all duration-200 group",
    active
      ? "bg-secondary text-foreground"
      : "text-muted-foreground hover:bg-muted hover:text-foreground",
  ].join(" ");

  const iconStyles = active
    ? "text-foreground"
    : "text-muted-foreground group-hover:text-foreground";

  const content = (
    <>
      <span className={iconStyles}>{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </>
  );

  if (href) {
    return (
      <li>
        <Link href={href} className={styles}>
          {content}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button type="button" className={styles} onClick={onClick}>
        {content}
      </button>
    </li>
  );
}
