import { ACTIVITY_STATUS_LABELS, ActivityStatus } from "../activity.types";

const STATUS_STYLES: Record<ActivityStatus, string> = {
  DRAFT: "bg-warning-50 text-warning-700 dark:bg-warning-500/10 dark:text-warning-400",
  PUBLISHED:
    "bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400",
  ARCHIVED: "bg-gray-100 text-gray-600 dark:bg-white/[0.06] dark:text-gray-400",
};

export default function ActivityStatusBadge({ status }: { status: ActivityStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {ACTIVITY_STATUS_LABELS[status]}
    </span>
  );
}