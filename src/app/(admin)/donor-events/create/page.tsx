import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import DonorEventCreatePage from "@/features/donor-event/pages/DonorEventCreatePage";

export default function Page() {
  return (
    <PermissionRoute required={[PERMISSIONS.DONOR_EVENT_CREATE]}>
      <DonorEventCreatePage />
    </PermissionRoute>
  );
}
