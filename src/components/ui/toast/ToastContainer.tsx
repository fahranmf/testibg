"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import Toast, {
  type ToastItem,
} from "./Toast";

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export default function ToastContainer({
  toasts,
  onDismiss,
}: ToastContainerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div className="pointer-events-none fixed right-5 top-5 z-[100000] flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onDismiss={onDismiss}
        />
      ))}
    </div>,
    document.body,
  );
}