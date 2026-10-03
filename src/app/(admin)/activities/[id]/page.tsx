import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import ActivityDetailPage from "@/features/activity/pages/ActivityDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PermissionRoute required={[PERMISSIONS.ACTIVITY_VIEW]}>
      <ActivityDetailPage activityId={id} />
    </PermissionRoute>
  );
}
