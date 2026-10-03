"use client";

import { useState } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { createQueryClient } from "@/lib/queryClient";

import { AuthProvider } from "@/features/auth/contexts/AuthContext";
import { ConfirmProvider } from "@/context/ConfirmContext";
import { ToastProvider } from "@/context/ToastContext";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ConfirmProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ConfirmProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}