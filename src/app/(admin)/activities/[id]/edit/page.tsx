import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import ActivityEditPage from "@/features/activity/pages/ActivityEditPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PermissionRoute required={[PERMISSIONS.ACTIVITY_UPDATE]}>
      <ActivityEditPage activityId={id} />
    </PermissionRoute>
  );
}
