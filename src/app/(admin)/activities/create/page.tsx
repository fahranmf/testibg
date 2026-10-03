import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import ActivityCreatePage from "@/features/activity/pages/ActivityCreatePage";

export default function Page() {
  return (
    <PermissionRoute required={[PERMISSIONS.ACTIVITY_CREATE]}>
      <ActivityCreatePage />
    </PermissionRoute>
  );
}
