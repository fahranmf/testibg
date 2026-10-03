import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";

export default function Page() {
  return (
    <PermissionRoute required={[PERMISSIONS.DASHBOARD_VIEW]}>
      <DashboardPage />
    </PermissionRoute>
  );
}
