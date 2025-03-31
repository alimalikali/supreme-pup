// app/not-found.tsx (for 404 errors)
"use client";

import { useRouter } from "next/navigation";
import { Ban } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="text-center">
        <div className="flex justify-center">
          <Ban className="h-20 w-20 animate-bounce text-red-500" />
        </div>
        <h1 className="mt-6 text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
        <p className="mt-3 text-lg text-gray-600">The page you’re looking for doesn’t exist.</p>
        <button onClick={() => router.push("/")} className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition hover:bg-blue-700">
          Go Home
        </button>
      </div>
    </div>
  );
}
