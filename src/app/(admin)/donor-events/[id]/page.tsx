import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import DonorEventDetailPage from "@/features/donor-event/pages/DonorEventDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PermissionRoute required={[PERMISSIONS.DONOR_EVENT_VIEW]}>
      <DonorEventDetailPage donorEventId={id} />
    </PermissionRoute>
  );
}
