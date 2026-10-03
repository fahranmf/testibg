import type { ContentStatus } from "../dashboard.types";
import { STATUS_LABELS } from "../dashboard.types";

const STATUS_STYLES: Record<ContentStatus, string> = {
  DRAFT:
    "bg-warning-50 text-warning-700 dark:bg-warning-500/10 dark:text-warning-400",
  PUBLISHED:
    "bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400",
  ARCHIVED:
    "bg-gray-100 text-gray-600 dark:bg-white/[0.06] dark:text-gray-400",
};

export default function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
