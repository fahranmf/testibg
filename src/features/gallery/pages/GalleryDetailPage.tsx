"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit3,
  ImageOff,
  Images,
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

import { useGalleryDetail } from "../hooks/useGalleryDetail";
import { useDeleteGallery } from "../hooks/useGalleryMutations";

const formatDate = (dateString?: string | null) => {
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

export default function GalleryDetailPage({
  galleryId,
}: {
  galleryId: string;
}) {
  const router = useRouter();
  const confirm = useConfirm();

  const { data: gallery, isLoading, isError } = useGalleryDetail(galleryId);

  const deleteMutation = useDeleteGallery();

  const canUpdate = useHasPermission(PERMISSIONS.GALLERY_UPDATE);
  const canDelete = useHasPermission(PERMISSIONS.GALLERY_DELETE);

  const hasActions = canDelete;

  const [isActionOpen, setIsActionOpen] = useState(false);

  const isMutating = deleteMutation.isPending;

  const handleDelete = async () => {
    if (!gallery) return;

    const confirmed = await confirm({
      title: "Hapus Gallery Ini?",
      description: (
        <span>
          Tindakan ini tidak dapat dibatalkan. Album foto{" "}
          <strong className="text-gray-900 dark:text-white">
            &quot;{gallery.title}&quot;
          </strong>{" "}
          beserta seluruh fotonya akan dihapus secara permanen.
        </span>
      ),
      confirmText: "Ya, Hapus",
      variant: "danger",
    });

    if (!confirmed) return;

    await deleteMutation.mutateAsync(gallery.id);
    router.push("/gallery");
  };

  if (isLoading) return <DetailSkeleton />;

  if (isError || !gallery) {
    return (
      <div className="mx-auto flex min-h-[400px] w-full max-w-md flex-col items-center justify-center text-center">
        <div className="mb-4 rounded-full bg-red-50 p-3 text-red-500 dark:bg-red-500/10 dark:text-red-400">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Gallery Tidak Ditemukan
        </h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Data gallery mungkin telah dihapus atau URL yang kamu tuju salah.
        </p>
        <Link
          href="/gallery"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Daftar
        </Link>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6">
      {/* Top Header Navigation */}
      <div className="mb-5 flex items-center justify-between">
        <Link
          href="/gallery"
          className="group inline-flex items-center gap-2 text-xs font-semibold text-gray-500 transition hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-300"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Kembali ke daftar
        </Link>

        <span className="hidden text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400 dark:text-gray-600 sm:block">
          Detail Gallery
        </span>
      </div>

      {/* Hero Cover Image */}
      <div className="relative h-[280px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-white/[0.02] sm:h-[380px]">
        {gallery.coverImage ? (
          <Image
            src={gallery.coverImage}
            alt={gallery.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-gray-400 dark:text-gray-600">
            <ImageOff className="h-12 w-12 stroke-[1.5]" />
            <span className="mt-2 text-xs font-medium">
              Tidak ada cover album
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Hero Overlay Details */}
        <div className="absolute bottom-0 inset-x-0 p-6 text-white">
          <h1 className="text-xl font-bold leading-tight text-white sm:text-3xl">
            {gallery.title}
          </h1>
          <p className="mt-2 text-xs font-medium text-white/80">
            {gallery.images.length} foto di album ini
          </p>
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content Section */}
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.07] dark:bg-white/[0.025]">
            {/* Header Deskripsi & Action Buttons */}
            <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 dark:border-white/[0.06] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-400">
                  Deskripsi Album
                </h2>
                <p className="mt-0.5 text-[11px] text-gray-400">
                  Konteks dokumentasi album ini.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                {canUpdate && (
                  <Link
                    href={`/gallery/${gallery.id}/edit`}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                )}

                {hasActions && (
                  <div className="relative">
                    <button
                      type="button"
                      aria-label="Aksi lainnya"
                      aria-expanded={isActionOpen}
                      onClick={() => setIsActionOpen((prev) => !prev)}
                      className={`dropdown-toggle inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.06] dark:hover:text-white ${
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
                      {canDelete && (
                        <DropdownItem
                          onClick={() => {
                            setIsActionOpen(false);
                            handleDelete();
                          }}
                          baseClassName="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-error-600 transition-colors hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10"
                        >
                          {isMutating ? (
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
            {gallery.description ? (
              <div className="mt-5 whitespace-pre-line text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {gallery.description}
              </div>
            ) : (
              <p className="mt-5 text-sm text-gray-400">
                Tidak ada deskripsi untuk album ini.
              </p>
            )}
          </section>

          {/* Photo Grid */}
          {gallery.images && gallery.images.length > 0 && (
            <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.07] dark:bg-white/[0.025]">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Images className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-400">
                    Foto Album
                  </h2>
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {gallery.images.length} Foto
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery.images
                  .slice()
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((img) => (
                    <div
                      key={img.id}
                      className="group relative aspect-square overflow-hidden rounded-lg border border-gray-100 bg-gray-50 dark:border-white/5 dark:bg-white/[0.02]"
                    >
                      <Image
                        src={img.image}
                        alt={img.caption || "Foto album"}
                        fill
                        className="object-contain"
                      />
                      {img.caption && (
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
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
                  <p className="text-[10px] font-semibold uppercase text-gray-400">
                    Tanggal Kegiatan
                  </p>
                  <p className="text-xs font-medium text-gray-800 dark:text-gray-200">
                    {formatDate(gallery.eventDate ?? undefined)}
                  </p>
                </div>
              </div>

              {gallery.createdBy && (
                <div className="flex items-start gap-3">
                  <User className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-gray-400">
                      Dibuat oleh
                    </p>
                    <p className="text-xs font-medium text-gray-800 dark:text-gray-200">
                      {gallery.createdBy.name}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                <div>
                  <p className="text-[10px] font-semibold uppercase text-gray-400">
                    Slug URL
                  </p>
                  <p className="break-all font-mono text-[11px] text-gray-600 dark:text-gray-400">
                    /{gallery.slug}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shortcut Card */}
          <Link
            href="/gallery"
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 text-xs font-semibold text-gray-600 transition hover:border-brand-500 hover:text-brand-600 dark:border-white/[0.07] dark:bg-white/[0.025] dark:text-gray-400 dark:hover:border-brand-400 dark:hover:text-brand-400"
          >
            <span>Lihat semua gallery</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </main>
  );
}
