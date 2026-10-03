import { useAuth } from "../contexts/AuthContext";
import { Permission } from "../constants/permissions";

export function useHasPermission(...permissions: Permission[]) {
  const { user } = useAuth();
  if (!user) return false;
  return permissions.some((p) => user.permissions.includes(p));
}

// buat kasus yang butuh SEMUA permission sekaligus, bukan salah satu
export function useHasAllPermissions(...permissions: Permission[]) {
  const { user } = useAuth();
  if (!user) return false;
  return permissions.every((p) => user.permissions.includes(p));
}