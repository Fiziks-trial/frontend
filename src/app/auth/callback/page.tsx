"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button, Card, Spinner } from "@/design-system";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTokensFromCallback } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError(errorParam);
      return;
    }

    if (accessToken && refreshToken) {
      setTokensFromCallback(accessToken, refreshToken);
      window.history.replaceState({}, "", "/auth/callback");
      router.push("/dashboard");
    } else {
      setError("Invalid callback. Missing tokens.");
    }
  }, [searchParams, setTokensFromCallback, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
        <Card
          variant="elevated"
          padding="lg"
          className="bg-white max-w-md w-full text-center"
        >
          <div className="size-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="size-6 text-red-600" />
          </div>
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-2">
            Authentication Error
          </h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <Button
            variant="primary"
            onClick={() => router.push("/sign-in")}
            fullWidth
          >
            Back to Sign In
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center">
        <Spinner size="lg" className="mx-auto" />
        <p className="mt-4 text-gray-500">Completing sign in...</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
          <div className="text-center">
            <Spinner size="lg" className="mx-auto" />
            <p className="mt-4 text-gray-500">Loading...</p>
          </div>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
