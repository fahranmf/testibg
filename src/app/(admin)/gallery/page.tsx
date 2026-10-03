import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import GalleryListPage from "@/features/gallery/pages/GalleryListPage";

export default function Page() {
  return (
    <PermissionRoute required={[PERMISSIONS.GALLERY_VIEW]}>
      <GalleryListPage />
    </PermissionRoute>
  );
}
