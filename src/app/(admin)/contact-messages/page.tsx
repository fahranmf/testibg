import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import ContactMessageListPage from "@/features/contact-message/pages/ContactMessageListPage";

export default function Page() {
  return (
    <PermissionRoute required={[PERMISSIONS.CONTACT_MESSAGE_VIEW]}>
      <ContactMessageListPage />
    </PermissionRoute>
  );
}
