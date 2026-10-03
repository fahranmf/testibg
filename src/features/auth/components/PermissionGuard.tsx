"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../contexts/AuthContext";
import { Permission } from "../constants/permissions";

/**
 * Dipasang di layout.tsx / page.tsx spesifik yang butuh permission tertentu,
 * di dalam ProtectedRoute (jadi `user` udah pasti ada & isLoading udah kelar):
 *
 *   <PermissionRoute required={[PERMISSIONS.USER_VIEW]}>{children}</PermissionRoute>
 */
export default function PermissionRoute({
  required,
  children,
}: {
  required: Permission[];
  children: ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  const allowed = !!user && required.some((p) => user.permissions.includes(p));

  useEffect(() => {
    if (!allowed) {
      router.replace("/unauthorized");
    }
  }, [allowed, router]);

  if (!allowed) return null; // lagi redirect ke /unauthorized

  return <>{children}</>;
}