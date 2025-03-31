"use client";

import { ButtonHTMLAttributes, MouseEvent, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function RippleButton({ children, className = "", onClick, ...props }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;

    const newRipple: Ripple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(event);
  };

  return (
    <button className={`relative overflow-hidden rounded-lg text-lg font-medium text-white transition ${className}`} onClick={addRipple} {...props}>
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="animate-ripple absolute block h-20 w-20 rounded-full bg-white/30"
          style={{
            top: `${ripple.y - 40}px`,
            left: `${ripple.x - 40}px`,
          }}
        />
      ))}
    </button>
  );
}
