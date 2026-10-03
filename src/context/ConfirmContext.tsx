"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

import ConfirmDialog from "@/components/ui/confirm-modal/ConfirmDialog";

interface ConfirmOptions {
  title: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "primary" | "danger";
}

type ConfirmFn = (
  options: ConfirmOptions,
) => Promise<boolean>;

const ConfirmContext =
  createContext<ConfirmFn | null>(null);

export function ConfirmProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState<{
    isOpen: boolean;
    options: ConfirmOptions | null;
  }>({
    isOpen: false,
    options: null,
  });

  const resolveRef = useRef<
    ((value: boolean) => void) | null
  >(null);

  const confirm = useCallback<ConfirmFn>(
    (options) => {
      setState({
        isOpen: true,
        options,
      });

      return new Promise<boolean>((resolve) => {
        resolveRef.current = resolve;
      });
    },
    [],
  );

  const handleClose = useCallback(
    (result: boolean) => {
      setState({
        isOpen: false,
        options: null,
      });

      resolveRef.current?.(result);
      resolveRef.current = null;
    },
    [],
  );

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      {state.options && (
        <ConfirmDialog
          isOpen={state.isOpen}
          title={state.options.title}
          description={
            state.options.description
          }
          confirmText={
            state.options.confirmText
          }
          cancelText={
            state.options.cancelText
          }
          variant={state.options.variant}
          onConfirm={() => handleClose(true)}
          onCancel={() => handleClose(false)}
        />
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);

  if (!ctx) {
    throw new Error(
      "useConfirm harus dipakai di dalam <ConfirmProvider>",
    );
  }

  return ctx;
}