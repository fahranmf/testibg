import { USER_ROLE_LABELS, UserRole } from "../user.types";
import type { Role } from "@/features/auth/auth.types";

const ROLE_STYLES: Record<UserRole, string> = {
  ADMIN:
    "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400",
  CUSTOMER_SERVICE:
    "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  USER: "bg-gray-100 text-gray-600 dark:bg-white/[0.06] dark:text-gray-400",
};

export default function UserRoleBadge({ role }: { role: Role }) {
  if (role === "SUPER_ADMIN") {
    return (
      <span className="inline-flex items-center rounded-full bg-warning-50 px-2.5 py-1 text-xs font-medium text-warning-700 dark:bg-warning-500/10 dark:text-warning-400">
        Super Admin
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${ROLE_STYLES[role]}`}
    >
      {USER_ROLE_LABELS[role]}
    </span>
  );
}
