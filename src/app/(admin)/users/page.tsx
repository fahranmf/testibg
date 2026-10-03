import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import UserListPage from "@/features/user/pages/UserListPage";

export default function Page() {
  return (
    <PermissionRoute required={[PERMISSIONS.USER_VIEW]}>
      <UserListPage />
    </PermissionRoute>
  );
}
