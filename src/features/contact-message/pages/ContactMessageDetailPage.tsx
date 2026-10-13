"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  MailOpen,
  Trash2,
  AlertCircle,
  Loader2,
  Phone,
  Calendar,
  Copy,
  Check,
  User,
  Inbox,
} from "lucide-react";

import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { useConfirm } from "@/context/ConfirmContext";
import { useHasPermission } from "@/features/auth/hooks/useHasPermission";
import { PERMISSIONS } from "@/features/auth/constants/permissions";

import { useContactMessageDetail } from "../hooks/useContactMessageDetail";
import {
  useMarkContactMessageRead,
  useMarkContactMessageUnread,
  useDeleteContactMessage,
} from "../hooks/useContactMessageMutations";

import ContactMessageStatusBadge from "../components/ContactMessageStatusBadge";

const formatDate = (dateString?: string) => {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(dateString));
};

function DetailSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-4 w-32 rounded bg-gray-200 dark:bg-white/10" />
        <div className="h-4 w-24 rounded bg-gray-200 dark:bg-white/10" />
      </div>
      <div className="h-28 w-full rounded-xl bg-gray-200 dark:bg-white/10" />
      <div className="h-64 w-full rounded-xl bg-gray-200 dark:bg-white/10" />
    </div>
  );
}

function getInitials(name: string) {
  if (!name) return "??";
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ContactMessageDetailPage({
  contactMessageId,
}: {
  contactMessageId: string;
}) {
  const router = useRouter();
  const confirm = useConfirm();

  const {
    data: message,
    isLoading,
    isError,
  } = useContactMessageDetail(contactMessageId);

  const markReadMutation = useMarkContactMessageRead();
  const markUnreadMutation = useMarkContactMessageUnread();
  const deleteMutation = useDeleteContactMessage();

  const canUpdate = useHasPermission(PERMISSIONS.CONTACT_MESSAGE_UPDATE);
  const canDelete = useHasPermission(PERMISSIONS.CONTACT_MESSAGE_DELETE);

  const [isActionOpen, setIsActionOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isMutating =
    markReadMutation.isPending ||
    markUnreadMutation.isPending ||
    deleteMutation.isPending;

  const handleToggleRead = () => {
    if (!message) return;
    if (message.status === "UNREAD") {
      markReadMutation.mutate(message.id);
    } else {
      markUnreadMutation.mutate(message.id);
    }
  };

  const handleCopyEmail = () => {
    if (!message?.email) return;
    navigator.clipboard.writeText(message.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!message) return;

    const confirmed = await confirm({
      title: "Hapus Pesan Ini?",
      description: (
        <span>
          Tindakan ini tidak dapat dibatalkan. Pesan dari{" "}
          <strong className="text-gray-900 dark:text-white">
            &quot;{message.name}&quot;
          </strong>{" "}
          akan dihapus secara permanen.
        </span>
      ),
      confirmText: "Ya, Hapus",
      variant: "danger",
    });

    if (!confirmed) return;

    await deleteMutation.mutateAsync(message.id);
    router.push("/contact-messages");
  };

  if (isLoading) return <DetailSkeleton />;

  if (isError || !message) {
    return (
      <div className="mx-auto flex min-h-[350px] w-full max-w-md flex-col items-center justify-center text-center">
        <div className="mb-3 rounded-full bg-error-50 p-3 text-error-600 dark:bg-error-500/10 dark:text-error-400">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Pesan Tidak Ditemukan
        </h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Pesan mungkin telah dihapus atau URL salah.
        </p>
        <Link
          href="/contact-messages"
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-brand-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Daftar
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full space-y-4">
      {/* 📌 Header Navigasi Atas (Persis sesuai permintaan) */}
      <div className="mb-5 flex items-center justify-between">
        <Link
          href="/contact-messages"
          className="group inline-flex items-center gap-2 text-xs font-semibold text-gray-500 transition hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-300"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Kembali ke daftar
        </Link>

        <span className="hidden text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400 dark:text-gray-600 sm:block">
          Detail Message
        </span>
      </div>

      {/* Container Utama Pesan Detail */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-white/[0.02]">
        
        {/* Top Header Card: Title, Status, and Main Action Buttons */}
        <div className="border-b border-gray-200/80 p-5 dark:border-white/10 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2.5">
                <ContactMessageStatusBadge status={message.status} />
                <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">
                  ID: #{message.id.slice(0, 8)}
                </span>
              </div>
              <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl break-words">
                {message.subject || "Tanpa Subjek"}
              </h1>
            </div>

            {/* Action Buttons di Main Content Header */}
            <div className="flex items-center gap-2 shrink-0 border-t border-gray-100 pt-3 dark:border-white/5 sm:border-t-0 sm:pt-0">
              {canUpdate && (
                <button
                  type="button"
                  onClick={handleToggleRead}
                  disabled={isMutating}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-white/10 dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/5"
                >
                  {markReadMutation.isPending || markUnreadMutation.isPending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : message.status === "UNREAD" ? (
                    <MailOpen className="h-3.5 w-3.5 text-gray-500" />
                  ) : (
                    <Mail className="h-3.5 w-3.5 text-gray-500" />
                  )}
                  {message.status === "UNREAD"
                    ? "Tandai Dibaca"
                    : "Tandai Belum Dibaca"}
                </button>
              )}

              {canDelete && (
                <div className="relative">
                  <button
                    type="button"
                    aria-label="Hapus"
                    aria-expanded={isActionOpen}
                    onClick={() => setIsActionOpen((prev) => !prev)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 hover:text-error-600 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-error-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>

                  <Dropdown
                    isOpen={isActionOpen}
                    onClose={() => setIsActionOpen(false)}
                    className="right-0 mt-1 w-40 border border-gray-200 py-1 dark:border-white/10"
                  >
                    <DropdownItem
                      onClick={() => {
                        setIsActionOpen(false);
                        handleDelete();
                      }}
                      baseClassName="flex w-full items-center gap-2 px-3 py-1.5 text-xs font-medium text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10"
                    >
                      {deleteMutation.isPending ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      Hapus Pesan
                    </DropdownItem>
                  </Dropdown>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sender Info Bar (Email Header Meta) */}
        <div className="border-b border-gray-100 bg-gray-50/50 p-5 dark:border-white/5 dark:bg-white/[0.01]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                {getInitials(message.name)}
              </div>

              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {message.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <span className="truncate">{message.email}</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title="Salin email"
                    className="inline-flex items-center text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {copied ? (
                      <Check className="size-3 text-emerald-500" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 shrink-0">
              <Calendar className="size-3.5 text-gray-400" />
              <span>{formatDate(message.createdAt)}</span>
            </div>

          </div>
        </div>

        {/* Main Body Content: Isi Pesan */}
        <div className="p-5 sm:p-6">
          <div className="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            <Inbox className="size-3.5 text-brand-600 dark:text-brand-400" />
            <span>Isi Pesan</span>
          </div>

          <div className="rounded-lg border border-gray-200/60 bg-gray-50/40 p-4 dark:border-white/5 dark:bg-white/[0.01]">
            <p className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-gray-800 dark:text-gray-200">
              {message.message}
            </p>
          </div>
        </div>

        {/* Sender Technical Meta & Quick Actions Footer */}
        <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/30 px-5 py-4 dark:border-white/5 dark:bg-white/[0.01] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <User className="size-3.5 text-gray-400" />
              <span className="text-gray-400">Pengirim:</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {message.name}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Phone className="size-3.5 text-gray-400" />
              <span className="text-gray-400">Telepon:</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {message.phone || "-"}
              </span>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
