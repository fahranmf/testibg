import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import NewsDetailPage from "@/features/news/pages/NewsDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const { newsId } = await params;
  return (
    <PermissionRoute required={[PERMISSIONS.NEWS_VIEW]}>
      <NewsDetailPage newsId={newsId} />
    </PermissionRoute>
  );
}
