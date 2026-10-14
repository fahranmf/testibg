"use client";

import { Mail, MailOpen, Inbox } from "lucide-react";

import { EmptyState } from "@/components/ui/table";

import { ContactMessage } from "../contact-message.types";

interface Props {
  messages: ContactMessage[];
  isLoading: boolean;
  onView: (item: ContactMessage) => void;
}

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
});

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function LoadingState() {
  return (
    <div className="space-y-0">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-b border-gray-100 px-5 py-5 dark:border-white/5"
        >
          <div className="size-11 shrink-0 animate-pulse rounded-full bg-gray-100 dark:bg-white/5" />

          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-40 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
            <div className="h-3 w-64 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
            <div className="h-3 w-80 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
          </div>

          <div className="h-3 w-20 shrink-0 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
        </div>
      ))}
    </div>
  );
}

function Avatar({ name, isUnread }: { name: string; isUnread: boolean }) {
  return (
    <div
      className={`flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
        isUnread
          ? "bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300"
          : "bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400"
      }`}
    >
      {getInitials(name)}
    </div>
  );
}

export default function ContactMessageList({
  messages,
  isLoading,
  onView,
}: Props) {
  if (isLoading) return <LoadingState />;

  if (messages.length === 0) {
    return (
      <EmptyState
        icon={
          <span className="flex size-12 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-400 dark:border-white/[0.07] dark:bg-white/3 dark:text-gray-500">
            <Inbox className="h-6 w-6" />
          </span>
        }
        title="Belum ada pesan"
        description="Pesan dari pengunjung situs akan muncul di sini."
      />
    );
  }

  return (
    <div>
      {messages.map((item) => {
        const isUnread = item.status === "UNREAD";

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onView(item)}
            className={`flex w-full items-center gap-4 border-b border-gray-100 px-5 py-5 text-left transition-colors duration-150 hover:bg-gray-50/60 dark:border-white/5 dark:hover:bg-white/[0.025]`}
          >
            <Avatar name={item.name} isUnread={isUnread} />

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span
                    className={`truncate text-sm leading-5 tracking-[-0.01em] ${
                    isUnread
                      ? "font-bold text-gray-900 dark:text-white"
                      : "font-medium text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {item.name}
                </span>

                {isUnread && (
                  <span className="size-1.5 shrink-0 rounded-full bg-brand-500" />
                )}
              </div>

              <p
                className={`mt-0.5 truncate text-sm ${
                  isUnread
                    ? "font-semibold text-gray-800 dark:text-white/90"
                    : "font-medium text-gray-600 dark:text-gray-300"
                }`}
              >
                {item.subject || "Tanpa subjek"}
              </p>

              <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-gray-400 dark:text-gray-500">
                {item.excerpt || ""}
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                {dateFormatter.format(new Date(item.createdAt))}
              </span>

              {isUnread ? (
                <Mail className="h-4 w-4 text-brand-500 dark:text-brand-400" />
              ) : (
                <MailOpen className="h-4 w-4 text-gray-300 dark:text-gray-600" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
