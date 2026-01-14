"use client";

import type { ReactNode } from "react";
import { useState, createContext, useContext } from "react";
import { X, Menu } from "lucide-react";

interface SidebarContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarLayout");
  }
  return context;
}

export interface SidebarLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  sidebarWidth?: string;
}

export function SidebarLayout({
  children,
  sidebar,
  sidebarWidth = "w-64",
}: SidebarLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  const contextValue: SidebarContextValue = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <div className="flex min-h-screen bg-background text-foreground">
        {/* Mobile Overlay */}
        {isOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 bg-black/20 z-40 lg:hidden cursor-default"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={[
            "fixed lg:static inset-y-0 left-0 z-50",
            sidebarWidth,
            "shrink-0 border-r border-border bg-background",
            "flex flex-col",
            "transform transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          ].join(" ")}
        >
          {/* Close button for mobile */}
          <button
            type="button"
            className="absolute top-4 right-4 p-2 lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} className="text-muted-foreground" />
          </button>

          {sidebar}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto w-full">{children}</main>
      </div>
    </SidebarContext.Provider>
  );
}

export function SidebarTrigger({ className = "" }: { className?: string }) {
  const { open } = useSidebar();

  return (
    <button
      type="button"
      className={["p-2 lg:hidden", className].join(" ")}
      onClick={open}
    >
      <Menu size={24} className="text-muted-foreground" />
    </button>
  );
}
