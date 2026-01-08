import { clsx } from "clsx";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

/**
 * Navbar component - Top navigation bar
 */
export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  children?: ReactNode;
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ logo, children, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={clsx(
          "border-b border-[#00ff0033] bg-black/50 backdrop-blur-sm",
          className,
        )}
        {...props}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">{logo}</div>
            <div className="flex items-center gap-1">{children}</div>
          </div>
        </div>
      </nav>
    );
  },
);
Navbar.displayName = "Navbar";

/**
 * Logo component - Brand identity display
 */
export interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  icon?: ReactNode;
}

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ text = "MAVEN_HACKER_HOUSE", icon, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("flex items-center gap-2", className)}
        {...props}
      >
        {icon && <span className="text-[#00ff00]">{icon}</span>}
        <span className="text-white font-mono tracking-wider">{text}</span>
      </div>
    );
  },
);
Logo.displayName = "Logo";

/**
 * NavLink component - Navigation link with bracket styling
 */
export interface NavLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  active?: boolean;
  children: ReactNode;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    { href = "#", active = false, children, className, onClick, ...props },
    ref,
  ) => {
    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        className={clsx(
          "px-4 py-2 text-sm font-mono uppercase tracking-wider transition-all duration-200",
          active
            ? "text-[#00ff00] border-b-2 border-[#00ff00]"
            : "text-white hover:text-[#00ff00]",
          className,
        )}
        {...props}
      >
        [{children}]
      </a>
    );
  },
);
NavLink.displayName = "NavLink";

/**
 * MobileMenuButton component - Hamburger menu button
 */
export interface MobileMenuButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
}

export const MobileMenuButton = forwardRef<
  HTMLButtonElement,
  MobileMenuButtonProps
>(({ isOpen, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={clsx(
        "flex flex-col gap-1 w-6 h-6 justify-center md:hidden",
        className,
      )}
      aria-label="Toggle menu"
      {...props}
    >
      <span
        className={clsx(
          "w-full h-0.5 bg-[#00ff00] transition-all duration-200",
          isOpen && "rotate-45 translate-y-1.5",
        )}
      />
      <span
        className={clsx(
          "w-full h-0.5 bg-[#00ff00] transition-all duration-200",
          isOpen && "opacity-0",
        )}
      />
      <span
        className={clsx(
          "w-full h-0.5 bg-[#00ff00] transition-all duration-200",
          isOpen && "-rotate-45 -translate-y-1.5",
        )}
      />
    </button>
  );
});
MobileMenuButton.displayName = "MobileMenuButton";

/**
 * Sidebar component - Side navigation container
 */
export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={clsx(
          "w-64 border-r border-[#00ff0033] bg-[#0a0a0a] p-6",
          className,
        )}
        {...props}
      >
        <nav className="space-y-1">{children}</nav>
      </aside>
    );
  },
);
Sidebar.displayName = "Sidebar";

/**
 * SidebarLink component - Sidebar navigation link
 */
export interface SidebarLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  children: ReactNode;
}

export const SidebarLink = forwardRef<HTMLAnchorElement, SidebarLinkProps>(
  (
    {
      href = "#",
      icon,
      active = false,
      children,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        className={clsx(
          "flex items-center gap-3 px-4 py-3 text-sm font-mono transition-all duration-200",
          active
            ? "bg-[#00ff0020] border-l-2 border-[#00ff00] text-[#00ff00]"
            : "text-white hover:bg-[#00ff0010] hover:text-[#00ff00] border-l-2 border-transparent",
          className,
        )}
        {...props}
      >
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </a>
    );
  },
);
SidebarLink.displayName = "SidebarLink";

/**
 * Breadcrumb component - Navigation breadcrumb trail
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={clsx("flex items-center gap-2 text-sm font-mono", className)}
        {...props}
      >
        {items.map((item, index) => (
          <span key={item.label} className="flex items-center gap-2">
            {index > 0 && <span className="text-[#00ff00]">/</span>}
            {item.href ? (
              <a
                href={item.href}
                className="text-[#999999] hover:text-[#00ff00] transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-white">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    );
  },
);
Breadcrumb.displayName = "Breadcrumb";

/**
 * Footer component - Page footer
 */
export interface FooterProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={clsx(
          "border-t border-[#00ff0033] bg-black/50 backdrop-blur-sm",
          className,
        )}
        {...props}
      >
        <div className="container mx-auto px-6 py-8">{children}</div>
      </footer>
    );
  },
);
Footer.displayName = "Footer";
