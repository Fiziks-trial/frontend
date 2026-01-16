"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-context";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return fallback ?? <AuthLoadingSkeleton />;
  }

  if (!isAuthenticated) {
    return fallback ?? <AuthLoadingSkeleton />;
  }

  return <>{children}</>;
}

function AuthLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar skeleton */}
        <div className="hidden lg:flex w-64 border-r border-border p-4">
          <div className="w-full space-y-4">
            <div className="h-8 bg-muted rounded-lg animate-pulse" />
            <div className="space-y-2">
              <div className="h-10 bg-muted rounded-lg animate-pulse" />
              <div className="h-10 bg-muted rounded-lg animate-pulse" />
              <div className="h-10 bg-muted rounded-lg animate-pulse" />
              <div className="h-10 bg-muted rounded-lg animate-pulse" />
              <div className="h-10 bg-muted rounded-lg animate-pulse" />
            </div>
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="h-12 bg-muted rounded-lg w-1/3 animate-pulse" />
            <div className="h-32 bg-muted rounded-lg animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-24 bg-muted rounded-lg animate-pulse" />
              <div className="h-24 bg-muted rounded-lg animate-pulse" />
              <div className="h-24 bg-muted rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
