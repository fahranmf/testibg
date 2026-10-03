import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import GalleryDetailPage from "@/features/gallery/pages/GalleryDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PermissionRoute required={[PERMISSIONS.GALLERY_VIEW]}>
      <GalleryDetailPage galleryId={id} />
    </PermissionRoute>
  );
}
