"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Archive,
  ArrowLeft,
  Calendar,
  Clock,
  Edit3,
  MapPin,
  MoreHorizontal,
  Trash2,
  User,
  AlertCircle,
  Loader2,
  ExternalLink,
  Phone,
  CheckCircle2,
  FileText,
  Globe,
  Info,
} from "lucide-react";

import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { useConfirm } from "@/context/ConfirmContext";
import { useHasPermission } from "@/features/auth/hooks/useHasPermission";
import { PERMISSIONS } from "@/features/auth/constants/permissions";

import { useDonorEventDetail } from "../hooks/useDonorEventDetail";
import {
  usePublishDonorEvent,
  useArchiveDonorEvent,
  useDeleteDonorEvent,
} from "../hooks/useDonorEventMutations";

import DonorEventStatusBadge from "../components/DonorEventStatusBadge";

const formatDate = (dateString?: string) => {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
};

const formatTime = (dateString?: string) => {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("id-ID", {
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
      <div className="h-32 w-full rounded-xl bg-gray-200 dark:bg-white/10" />
      <div className="h-64 w-full rounded-xl bg-gray-200 dark:bg-white/10" />
    </div>
  );
}

export default function DonorEventDetailPage({
  donorEventId,
}: {
  donorEventId: string;
}) {
  const router = useRouter();
  const confirm = useConfirm();

  const { data: event, isLoading, isError } = useDonorEventDetail(donorEventId);

  const publishMutation = usePublishDonorEvent();
  const archiveMutation = useArchiveDonorEvent();
  const deleteMutation = useDeleteDonorEvent();

  const canUpdate = useHasPermission(PERMISSIONS.DONOR_EVENT_UPDATE);
  const canPublish = useHasPermission(PERMISSIONS.DONOR_EVENT_PUBLISH);
  const canDelete = useHasPermission(PERMISSIONS.DONOR_EVENT_DELETE);

  const [isActionOpen, setIsActionOpen] = useState(false);

  const isMutating =
    publishMutation.isPending ||
    archiveMutation.isPending ||
    deleteMutation.isPending;

  const handlePublish = () => event && publishMutation.mutate(event.id);
  const handleArchive = () => event && archiveMutation.mutate(event.id);

  const handleDelete = async () => {
    if (!event) return;

    const confirmed = await confirm({
      title: "Hapus Donor Event Ini?",
      description: (
        <span>
          Tindakan ini tidak dapat dibatalkan. Donor event{" "}
          <strong className="text-gray-900 dark:text-white">
            &quot;{event.title}&quot;
          </strong>{" "}
          akan dihapus secara permanen.
        </span>
      ),
      confirmText: "Ya, Hapus",
      variant: "danger",
    });

    if (!confirmed) return;

    await deleteMutation.mutateAsync(event.id);
    router.push("/donor-events");
  };

  if (isLoading) return <DetailSkeleton />;

  if (isError || !event) {
    return (
      <div className="mx-auto flex min-h-[350px] w-full max-w-md flex-col items-center justify-center text-center">
        <div className="mb-3 rounded-full bg-error-50 p-3 text-error-600 dark:bg-error-500/10 dark:text-error-400">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Donor Event Tidak Ditemukan
        </h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Data donor event mungkin telah dihapus atau URL salah.
        </p>
        <Link
          href="/donor-events"
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-brand-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Daftar
        </Link>
      </div>
    );
  }

  const canArchive = canUpdate && event.status !== "ARCHIVED";
  const hasActions = canArchive || canDelete;

  return (
    <main className="w-full space-y-4">
      {/* Header Navigasi */}
      <div className="mb-5 flex items-center justify-between">
        <Link
          href="/donor-events"
          className="group inline-flex items-center gap-2 text-xs font-semibold text-gray-500 transition hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-300"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Kembali ke daftar
        </Link>

        <span className="hidden text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400 dark:text-gray-600 sm:block">
          Detail Donor Event
        </span>
      </div>

      {/* Container Utama Donor Event */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-white/[0.02]">
        
        {/* Header Event & Tombol Aksi */}
        <div className="border-b border-gray-200/80 p-5 dark:border-white/10 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2.5">
                <DonorEventStatusBadge status={event.status} />
                <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                  /{event.slug}
                </span>
              </div>

              <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl break-words">
                {event.title}
              </h1>
            </div>

            {/* Action Buttons di Main Content */}
            <div className="flex items-center gap-2 shrink-0 border-t border-gray-100 pt-3 dark:border-white/5 sm:border-t-0 sm:pt-0">
              {canUpdate && event.status === "DRAFT"  && (
                <Link
                  href={`/donor-events/${event.id}/edit`}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-white/10 dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/5"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  Edit
                </Link>
              )}

              {canPublish && event.status === "DRAFT" && (
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={isMutating}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-brand-600 px-3 text-xs font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50 dark:bg-brand-500 dark:hover:bg-brand-600"
                >
                  {publishMutation.isPending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  )}
                  Publikasikan
                </button>
              )}

              {hasActions && (
                <div className="relative">
                  <button
                    type="button"
                    aria-label="Aksi lainnya"
                    aria-expanded={isActionOpen}
                    onClick={() => setIsActionOpen((prev) => !prev)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/5"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>

                  <Dropdown
                    isOpen={isActionOpen}
                    onClose={() => setIsActionOpen(false)}
                    className="right-0 mt-1 w-40 border border-gray-200 py-1 dark:border-white/10"
                  >
                    {canArchive && (
                      <DropdownItem
                        onClick={() => {
                          setIsActionOpen(false);
                          handleArchive();
                        }}
                        baseClassName="flex w-full items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
                      >
                        {archiveMutation.isPending ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Archive className="h-3.5 w-3.5 text-gray-400" />
                        )}
                        Arsipkan
                      </DropdownItem>
                    )}

                    {canDelete && (
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
                        Hapus
                      </DropdownItem>
                    )}
                  </Dropdown>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Highlight Quick Info Bar (Primary Event Schedule) */}
        <div className="border-b border-gray-100 bg-gray-50/50 p-5 dark:border-white/5 dark:bg-white/[0.01]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Tanggal */}
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <Calendar className="size-4" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <span className="block text-[11px] font-medium text-gray-400">
                  Tanggal Pelaksanaan
                </span>
                <span className="block text-xs font-bold text-gray-900 dark:text-white truncate">
                  {formatDate(event.startAt)}
                </span>
              </div>
            </div>

            {/* Jam Operasional */}
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <Clock className="size-4" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <span className="block text-[11px] font-medium text-gray-400">
                  Jam Operasional
                </span>
                <span className="block text-xs font-bold text-gray-900 dark:text-white truncate">
                  {formatTime(event.startAt)} – {formatTime(event.endAt)} WIB
                </span>
              </div>
            </div>

            {/* Lokasi Utama */}
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <MapPin className="size-4" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <span className="block text-[11px] font-medium text-gray-400">
                  Gedung / Tempat
                </span>
                <span className="block text-xs font-bold text-gray-900 dark:text-white truncate">
                  {event.location}
                </span>
              </div>
            </div>

            {/* Narahubung */}
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <Phone className="size-4" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <span className="block text-[11px] font-medium text-gray-400">
                  Narahubung
                </span>
                <span className="block text-xs font-bold text-gray-900 dark:text-white truncate">
                  {event.contactInfo || "-"}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Section: Deskripsi Event */}
        <div className="border-b border-gray-100 p-5 dark:border-white/5 sm:p-6">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            <FileText className="size-3.5 text-brand-600 dark:text-brand-400" />
            <span>Deskripsi Event</span>
          </div>

          <div className="rounded-lg border border-gray-200/60 bg-gray-50/40 p-4 dark:border-white/5 dark:bg-white/[0.01]">
            <p className="text-xs sm:text-sm leading-relaxed text-gray-800 dark:text-gray-200">
              {event.description ? (
                <span className="whitespace-pre-line">{event.description}</span>
              ) : (
                <span className="italic text-gray-400 dark:text-gray-500">
                  Tidak ada deskripsi rinci yang ditambahkan untuk event ini.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Section: Detail Informasi Tambahan */}
        <div className="p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            <Info className="size-3.5 text-brand-600 dark:text-brand-400" />
            <span>Informasi Detail & Pendaftaran</span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Form Pendaftaran */}
            <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-3.5 dark:border-white/5 dark:bg-white/[0.01]">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400">
                <Globe className="size-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="block text-[11px] font-medium text-gray-400">
                  Form Pendaftaran
                </span>
                {event.registrationUrl ? (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400 truncate"
                  >
                    Buka Form Pendaftaran <ExternalLink className="size-3" />
                  </a>
                ) : (
                  <span className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    On-site (Tanpa Form Pendaftaran)
                  </span>
                )}
              </div>
            </div>

            {/* Dibuat Oleh */}
            <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-3.5 dark:border-white/5 dark:bg-white/[0.01]">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400">
                <User className="size-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="block text-[11px] font-medium text-gray-400">
                  Dibuat Oleh
                </span>
                <span className="block text-xs font-semibold text-gray-900 dark:text-white truncate">
                  {event.createdBy?.name || "-"}
                </span>
              </div>
            </div>

            {/* Alamat Lengkap */}
            <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-3.5 dark:border-white/5 dark:bg-white/[0.01] sm:col-span-2 lg:col-span-1">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400">
                <MapPin className="size-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="block text-[11px] font-medium text-gray-400">
                  Alamat Lengkap
                </span>
                <span className="block text-xs font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                  {event.address || "-"}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-5 py-3 text-[11px] text-gray-400 dark:border-white/5 dark:bg-white/[0.01]">
          <span>Dibuat pada: {formatDate(event.createdAt)}</span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400 dark:text-gray-600 sm:block">
            Detail Donor Event
          </span>
        </div>

      </div>
    </main>
  );
}