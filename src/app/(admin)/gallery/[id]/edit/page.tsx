import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import GalleryEditPage from "@/features/gallery/pages/GalleryEditPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PermissionRoute required={[PERMISSIONS.GALLERY_UPDATE]}>
      <GalleryEditPage galleryId={id} />
    </PermissionRoute>
  );
}
