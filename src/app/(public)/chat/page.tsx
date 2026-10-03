"use client";

import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import { AuthProvider } from "@/features/auth/contexts/AuthContext";
import UserChatPage from "@/features/chat/pages/UserChatPage";

export default function Page() {
  return <AuthProvider><ProtectedRoute allowedRoles={["USER"]}><UserChatPage /></ProtectedRoute></AuthProvider>;
}
