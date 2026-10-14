"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { useState } from "react";
import {
  Archive,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Edit3,
  ImageOff,
  MapPin,
  MoreHorizontal,
  Trash2,
  User,
  AlertCircle,
  Loader2,
  ChevronRight,
} from "lucide-react";

import { useConfirm } from "@/context/ConfirmContext";
import { useHasPermission } from "@/features/auth/hooks/useHasPermission";
import { PERMISSIONS } from "@/features/auth/constants/permissions";

import { useActivityDetail } from "../hooks/useActivityDetail";
import {
  usePublishActivity,
  useArchiveActivity,
  useDeleteActivity,
} from "../hooks/useActivityMutations";

import ActivityStatusBadge from "../components/ActivityStatusBadge";

const formatDate = (dateString?: string) => {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
  }).format(new Date(dateString));
};

function DetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-4 w-32 rounded bg-gray-200 dark:bg-white/10" />
        <div className="h-4 w-24 rounded bg-gray-200 dark:bg-white/10" />
      </div>
      <div className="h-[320px] w-full rounded-2xl bg-gray-200 dark:bg-white/10" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="h-48 w-full rounded-xl bg-gray-200 dark:bg-white/10" />
        </div>
        <div className="h-48 w-full rounded-xl bg-gray-200 dark:bg-white/10" />
      </div>
    </div>
  );
}

export default function ActivityDetailPage({
  activityId,
}: {
  activityId: string;
}) {
  const router = useRouter();
  const confirm = useConfirm();

  const { data: activity, isLoading, isError } = useActivityDetail(activityId);

  const publishMutation = usePublishActivity();
  const archiveMutation = useArchiveActivity();
  const deleteMutation = useDeleteActivity();

  const canUpdate = useHasPermission(PERMISSIONS.ACTIVITY_UPDATE);
  const canPublish = useHasPermission(PERMISSIONS.ACTIVITY_PUBLISH);
  const canDelete = useHasPermission(PERMISSIONS.ACTIVITY_DELETE);

  const [isActionOpen, setIsActionOpen] = useState(false);

  const isMutating =
    publishMutation.isPending ||
    archiveMutation.isPending ||
    deleteMutation.isPending;

  const handlePublish = () => activity && publishMutation.mutate(activity.id);
  const handleArchive = () => activity && archiveMutation.mutate(activity.id);

  const handleDelete = async () => {
    if (!activity) return;

    const confirmed = await confirm({
      title: "Hapus Kegiatan Ini?",
      description: (
        <span>
          Tindakan ini tidak dapat dibatalkan. Kegiatan{" "}
          <strong className="text-gray-900 dark:text-white">
            &quot;{activity.title}&quot;
          </strong>{" "}
          akan dihapus secara permanen.
        </span>
      ),
      confirmText: "Ya, Hapus",
      variant: "danger",
    });

    if (!confirmed) return;

    await deleteMutation.mutateAsync(activity.id);
    router.push("/activities");
  };

  if (isLoading) return <DetailSkeleton />;

  if (isError || !activity) {
    return (
      <div className="mx-auto flex min-h-[400px] w-full max-w-md flex-col items-center justify-center text-center">
        <div className="mb-4 rounded-full bg-red-50 p-3 text-red-500 dark:bg-red-500/10 dark:text-red-400">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Kegiatan Tidak Ditemukan
        </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Data kegiatan mungkin telah dihapus atau URL yang kamu tuju salah.
        </p>
        <Link
          href="/activities"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Daftar
        </Link>
      </div>
    );
  }

  const eventDate = activity.eventDate ?? activity.createdAt;

  const canArchive = canUpdate && activity.status !== "ARCHIVED";
  const hasActions = canArchive || canDelete;

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6">
      {/* Top Header Navigation */}
      <div className="mb-5 flex items-center justify-between">
        <Link
          href="/activities"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-300"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Kembali ke daftar
        </Link>

        <span className="hidden text-xs font-medium uppercase tracking-[0.12em] text-gray-400 dark:text-gray-600 sm:block">
          Detail Activity
        </span>
      </div>

      {/* Hero Banner Image */}
      <div className="relative h-[280px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-white/[0.02] sm:h-[380px]">
        {activity.thumbnail ? (
          <Image
            src={activity.thumbnail}
            alt={activity.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-gray-400 dark:text-gray-600">
            <ImageOff className="h-12 w-12 stroke-[1.5]" />
              <span className="mt-2 text-sm font-medium">
              Tidak ada gambar sampul
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Hero Overlay Details */}
        <div className="absolute bottom-0 inset-x-0 p-6 text-white">
          <div className="mb-3 flex items-center gap-2">
            <ActivityStatusBadge status={activity.status} />
          </div>
          <h1 className="text-2xl font-bold leading-tight text-white sm:text-4xl">
            {activity.title}
          </h1>
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Article & Actions Section */}
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.07] dark:bg-white/[0.025]">
            {/* Header Deskripsi & Action Buttons */}
            <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 dark:border-white/[0.06] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-400">
                  Deskripsi Kegiatan
                </h2>
                <p className="mt-0.5 text-xs text-gray-400">
                  Detail utama rincian kegiatan.
                </p>
              </div>

              {/* Actions */}

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                {canUpdate && activity.status === "DRAFT" && (
                  <Link
                    href={`/activities/${activity.id}/edit`}
                    className="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                )}

                {canPublish && activity.status === "DRAFT" && (
                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={isMutating}
                    className="inline-flex h-9 items-center gap-1.5 rounded-md bg-brand-500 px-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
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
                      className={`dropdown-toggle inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.06] dark:hover:text-white ${
                        isActionOpen
                          ? "bg-gray-100 text-gray-900 dark:bg-white/[0.06] dark:text-white"
                          : ""
                      }`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>

                    <Dropdown
                      isOpen={isActionOpen}
                      onClose={() => setIsActionOpen(false)}
                      className="right-0 mt-2 w-44 py-1"
                    >
                      {canArchive && (
                        <DropdownItem
                          onClick={() => {
                            setIsActionOpen(false);
                            handleArchive();
                          }}
                          baseClassName="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/[0.05] dark:hover:text-white"
                        >
                          {archiveMutation.isPending ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Archive className="h-3.5 w-3.5 text-gray-900 dark:text-gray-400" />
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
                          baseClassName="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium text-error-600 transition-colors hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10"
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

            {/* Isi Deskripsi */}
            <div className="mt-5 whitespace-pre-line text-base leading-relaxed text-gray-700 dark:text-gray-300">
              {activity.description}
            </div>
          </section>

          {/* Photo Gallery */}
          {activity.images && activity.images.length > 0 && (
            <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.07] dark:bg-white/[0.025]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-400">
                  Galeri Foto
                </h2>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {activity.images.length} Foto
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {activity.images
                  .slice()
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((img) => (
                    <div
                      key={img.id}
                      className="group relative aspect-square overflow-hidden rounded-lg border border-gray-100 bg-gray-50 dark:border-white/5 dark:bg-white/[0.02]"
                    >
                      <Image
                        src={img.imageUrl}
                        alt={img.caption || "Gambar kegiatan"}
                        fill
                        className="object-contain"
                      />
                      {img.caption && (
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-xs text-white opacity-0 transition group-hover:opacity-100">
                          <p className="line-clamp-2">{img.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          )}
        </div>

        {/* Meta Sidebar */}
        <aside className="self-start space-y-4 lg:sticky lg:top-22 lg:h-fit">
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.07] dark:bg-white/[0.025]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-400">
              Informasi Detail
            </h2>

            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-400">
                    Tanggal
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {formatDate(eventDate)}
                  </p>
                </div>
              </div>

              {activity.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-400">
                      Lokasi
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {activity.location}
                    </p>
                  </div>
                </div>
              )}

              {activity.createdBy && (
                <div className="flex items-start gap-3">
                  <User className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-400">
                      Pembuat
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {activity.createdBy.name}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-400">
                    Slug URL
                  </p>
                  <p className="break-all font-mono text-xs text-gray-600 dark:text-gray-400">
                    /{activity.slug}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shortcut Card */}
          <Link
            href="/activities"
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 text-sm font-semibold text-gray-600 transition hover:border-brand-500 hover:text-brand-600 dark:border-white/[0.07] dark:bg-white/[0.025] dark:text-gray-400 dark:hover:border-brand-400 dark:hover:text-brand-400"
          >
            <span>Lihat semua kegiatan</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </main>
  );
}
