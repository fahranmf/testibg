import PermissionRoute from "@/features/auth/components/PermissionGuard";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import StaffChatPage from "@/features/chat/pages/StaffChatPage";

export default function Page() {
  return <PermissionRoute required={[PERMISSIONS.CHAT_VIEW]}><StaffChatPage /></PermissionRoute>;
}
