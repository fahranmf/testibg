"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

export default function ActivityImage({
  src,
  alt,
  className = "",
  loading = "lazy",
}: {
  src: string | null;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-brand-50 text-brand-600 ${className}`}
        role="img"
        aria-label="Gambar kegiatan tidak tersedia"
      >
        <ImageOff size={24} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => setHasError(true)}
    />
  );
}
