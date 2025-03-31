"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6 dark:bg-gray-900">
      <div className="text-center">
        <div className="flex justify-center">
          <AlertTriangle className="h-20 w-20 animate-pulse text-red-500" />
        </div>
        <h1 className="mt-6 text-4xl font-bold text-gray-800 dark:text-white">Oops! Something went wrong.</h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">We encountered an unexpected issue. Please try again later.</p>
        <button onClick={() => router.push("/")} className="mt-6 rounded-lg bg-red-600 px-6 py-3 text-lg font-medium text-white transition hover:bg-red-700">
          Go Back Home
        </button>
      </div>
    </div>
  );
}
