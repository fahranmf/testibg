"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import ToastContainer from "@/components/ui/toast/ToastContainer";
import type {
  ToastItem,
  ToastVariant,
} from "@/components/ui/toast/Toast";

import { registerToastHandler } from "@/lib/toastBridge";

interface ToastApi {
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

const DEFAULT_DURATION: Record<
  ToastVariant,
  number
> = {
  success: 3500,
  error: 5000,
  warning: 4500,
  info: 4000,
};

const ToastContext =
  createContext<ToastApi | null>(null);

export function ToastProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [toasts, setToasts] = useState<
    ToastItem[]
  >([]);

  const idRef = useRef(0);

  const push = useCallback(
    (
      variant: ToastVariant,
      message: string,
    ) => {
      const id = `toast-${++idRef.current}`;

      setToasts((prev) => [
        ...prev,
        {
          id,
          variant,
          message,
          duration:
            DEFAULT_DURATION[variant],
        },
      ]);
    },
    [],
  );

  const dismiss = useCallback(
    (id: string) => {
      setToasts((prev) =>
        prev.filter((toast) => toast.id !== id),
      );
    },
    [],
  );

  const api: ToastApi = {
    success: (message) =>
      push("success", message),

    error: (message) =>
      push("error", message),

    warning: (message) =>
      push("warning", message),

    info: (message) =>
      push("info", message),
  };

  useEffect(() => {
    registerToastHandler(api);

    // Toast bridge membutuhkan referensi API
    // dari provider yang sedang aktif.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ToastContext.Provider value={api}>
      {children}

      <ToastContainer
        toasts={toasts}
        onDismiss={dismiss}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error(
      "useToast harus dipakai di dalam <ToastProvider>",
    );
  }

  return ctx;
}