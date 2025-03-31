"use client";

import { useState, useEffect } from "react";

const Loader = () => {
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => (prev.length < 10 ? prev + "." : "Loading"));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <div className="relative flex flex-col items-center">
        {/* Glowing Circle */}
        <div className="loader-circle"></div>
        {/* Loading Text */}
        <p className="mt-4 text-lg font-semibold text-white">{loadingText}</p>
      </div>
    </div>
  );
};

export default Loader;
