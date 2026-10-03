import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import BloodStockListPage from "@/features/blood-stock/pages/BloodStockListPage";

export default function Page() {
  return (
    <PermissionRoute required={[PERMISSIONS.BLOOD_STOCK_VIEW]}>
      <BloodStockListPage />
    </PermissionRoute>
  );
}
