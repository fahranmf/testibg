import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import GalleryCreatePage from "@/features/gallery/pages/GalleryCreatePage";

export default function Page() {
  return (
    <PermissionRoute required={[PERMISSIONS.GALLERY_CREATE]}>
      <GalleryCreatePage />
    </PermissionRoute>
  );
}
