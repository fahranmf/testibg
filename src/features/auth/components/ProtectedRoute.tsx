"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../contexts/AuthContext";
import { Role } from "../auth.types";
import LoadingScreen from "@/components/ui/loading/LoadingScreen";

export default function ProtectedRoute({
  allowedRoles,
  children,
}: {
  allowedRoles?: Role[];
  children: ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/signin");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.replace("/");
    }
  }, [isLoading, user, allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <LoadingScreen /> 
      </div>
    );
  }

  if (!user) return null; // lagi redirect ke /sign-in
  if (allowedRoles && !allowedRoles.includes(user.role)) return null; // lagi redirect ke /

  return <>{children}</>;
}