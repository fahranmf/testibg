import {
  CONTACT_MESSAGE_STATUS_LABELS,
  ContactMessageStatus,
} from "../contact-message.types";

const STATUS_STYLES: Record<ContactMessageStatus, string> = {
  UNREAD:
    "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300",
  READ: "bg-gray-100 text-gray-600 dark:bg-white/[0.06] dark:text-gray-400",
};

export default function ContactMessageStatusBadge({
  status,
}: {
  status: ContactMessageStatus;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium ${STATUS_STYLES[status]}`}
    >
      {CONTACT_MESSAGE_STATUS_LABELS[status]}
    </span>
  );
}
