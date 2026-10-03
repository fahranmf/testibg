import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import ActivityListPage from "@/features/activity/pages/ActivityListPage";

export default function Page() {
  return (
    <PermissionRoute required={[PERMISSIONS.ACTIVITY_VIEW]}>
      <ActivityListPage />
    </PermissionRoute>
  );
}
