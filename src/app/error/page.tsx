"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-8xl font-black text-[var(--color-theme-brown-primary)]">Oops!</h1>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
            We are sorry, but the page you are looking for or the action you performed encountered an issue.
          </p>
        </div>

        <p className="text-neutral-400 dark:text-neutral-600 text-xs font-mono">
          Error code: {error.digest || "N/A"}
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={() => reset()}
            className="btn-theme-brown px-8 py-3 rounded-xl uppercase text-xs tracking-widest"
          >
            Try again
          </button>
          
          <Link
            href="/"
            className="px-8 py-3 bg-neutral-200 dark:bg-neutral-800 font-bold uppercase text-xs tracking-widest rounded-xl hover:opacity-80 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}