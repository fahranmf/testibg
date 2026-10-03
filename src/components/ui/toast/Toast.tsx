"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type ToastVariant =
  | "success"
  | "error"
  | "warning"
  | "info";

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  message: string;
  duration: number;
}

const VARIANT_STYLES: Record<
  ToastVariant,
  {
    icon: ReactNode;
    iconBg: string;
    iconColor: string;
    bar: string;
  }
> = {
  success: {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 6 9 17l-5-5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    iconBg:
      "bg-success-50 dark:bg-success-500/10",
    iconColor:
      "text-success-600 dark:text-success-400",
    bar: "bg-success-500",
  },

  error: {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6 6 18M6 6l12 12"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    iconBg:
      "bg-error-50 dark:bg-error-500/10",
    iconColor:
      "text-error-600 dark:text-error-400",
    bar: "bg-error-500",
  },

  warning: {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 9v4m0 4h.01M10.29 3.86 2.11 18.04A1.9 1.9 0 0 0 3.75 21h16.5a1.9 1.9 0 0 0 1.64-2.96L13.71 3.86a1.9 1.9 0 0 0-3.42 0Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    iconBg:
      "bg-warning-50 dark:bg-warning-500/10",
    iconColor:
      "text-warning-600 dark:text-warning-400",
    bar: "bg-warning-500",
  },

  info: {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 16v-4m0-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    iconBg:
      "bg-brand-50 dark:bg-brand-500/10",
    iconColor:
      "text-brand-500 dark:text-brand-400",
    bar: "bg-brand-500",
  },
};

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

export default function Toast({
  toast,
  onDismiss,
}: ToastProps) {
  const [visible, setVisible] =
    useState(false);

  const [leaving, setLeaving] =
    useState(false);

  const dismissTimeoutRef = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  const dismissedRef = useRef(false);

  const style =
    VARIANT_STYLES[toast.variant];

  const handleDismiss = useCallback(() => {
    if (dismissedRef.current) {
      return;
    }

    dismissedRef.current = true;
    setLeaving(true);

    dismissTimeoutRef.current =
      setTimeout(() => {
        onDismiss(toast.id);
      }, 200);
  }, [onDismiss, toast.id]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setVisible(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const timer = setTimeout(
      handleDismiss,
      toast.duration,
    );

    return () => {
      clearTimeout(timer);

      if (dismissTimeoutRef.current) {
        clearTimeout(
          dismissTimeoutRef.current,
        );
      }
    };
  }, [
    handleDismiss,
    toast.duration,
  ]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-auto w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-theme-lg transition-all duration-200 ease-out motion-reduce:transition-none dark:border-gray-800 dark:bg-gray-dark ${
        visible && !leaving
          ? "translate-x-0 opacity-100"
          : "translate-x-4 opacity-0"
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.iconBg} ${style.iconColor}`}
        >
          {style.icon}
        </span>

        <p className="flex-1 pt-1.5 text-theme-sm leading-5 text-gray-700 dark:text-gray-300">
          {toast.message}
        </p>

        <button
          type="button"
          onClick={handleDismiss}
          className="mt-1 shrink-0 rounded-md p-0.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:hover:bg-white/5 dark:hover:text-gray-300"
          aria-label="Tutup notifikasi"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6 6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="h-1 w-full bg-gray-100 dark:bg-white/[0.06]">
        <div
          className={`h-full ${style.bar} motion-reduce:hidden`}
          style={{
            animation: `toast-progress ${toast.duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
}