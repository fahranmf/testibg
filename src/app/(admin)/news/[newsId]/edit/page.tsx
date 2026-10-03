import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import NewsEditPage from "@/features/news/pages/NewsEditPage";

interface Props {
  params: Promise<{
    newsId: string;
  }>;
}

export default async function NewsEditRoute({ params }: Props) {
  const { newsId } = await params;

  return (
    <PermissionRoute required={[PERMISSIONS.NEWS_UPDATE]}>
      <NewsEditPage newsId={newsId} />
    </PermissionRoute>
  );
}
