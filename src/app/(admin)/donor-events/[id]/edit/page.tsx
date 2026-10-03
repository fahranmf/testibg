import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import DonorEventEditPage from "@/features/donor-event/pages/DonorEventEditPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PermissionRoute required={[PERMISSIONS.DONOR_EVENT_UPDATE]}>
      <DonorEventEditPage donorEventId={id} />
    </PermissionRoute>
  );
}
