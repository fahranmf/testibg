import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import NewsCreatePage from "@/features/news/pages/NewsCreatePage";

export default function Page() {
  return (
    <PermissionRoute required={[PERMISSIONS.NEWS_CREATE]}>
      <NewsCreatePage />
    </PermissionRoute>
  );
}
