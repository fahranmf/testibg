import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import NewsListPage from "@/features/news/pages/NewsListPage";

export default function Page() {
  return (
    <PermissionRoute required={[PERMISSIONS.NEWS_VIEW]}>
      <NewsListPage />
    </PermissionRoute>
  );
}
