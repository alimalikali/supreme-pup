"use client";

import { X } from "lucide-react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export default function Modal({ isOpen, onClose, imageUrl }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/50">
      <div className="relative max-w-4xl p-4">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-2xl text-white hover:opacity-80" onClick={onClose}>
          <X size={32} />
        </button>

        {/* Image Display */}
        <Image src={imageUrl} alt="Modal Image" width={800} height={600} className="h-auto w-full rounded-lg object-contain" />
      </div>
    </div>
  );
}
