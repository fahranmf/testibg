import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import DonorEventListPage from "@/features/donor-event/pages/DonorEventListPage";

export default function Page() {
  return (
    <PermissionRoute required={[PERMISSIONS.DONOR_EVENT_VIEW]}>
      <DonorEventListPage />
    </PermissionRoute>
  );
}
