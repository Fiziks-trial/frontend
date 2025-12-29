"use client";

import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function HomePage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Fiziks
              </span>
            </div>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3">
                    {user?.avatar && (
                      <img
                        src={user.avatar}
                        alt={user.name || "User"}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span className="text-gray-700 dark:text-gray-200">
                      {user?.name || user?.email}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Welcome to Fiziks
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Learn physics the fun way
          </p>

          {isAuthenticated ? (
            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                You&apos;re signed in!
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Email: {user?.email}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Provider: {user?.provider}
              </p>
            </div>
          ) : (
            <div className="mt-8">
              <Link
                href="/sign-up"
                className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
