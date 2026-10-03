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

import { useNewsDetail } from "../hooks/useNewsDetail";
import {
  usePublishNews,
  useArchiveNews,
  useDeleteNews,
} from "../hooks/useNewsMutations";

import { NEWS_CATEGORY_LABELS } from "../news.types";
import NewsStatusBadge from "../components/NewsStatusBadge";

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

export default function NewsDetailPage({ newsId }: { newsId: string }) {
  const router = useRouter();
  const confirm = useConfirm();

  const { data: news, isLoading, isError } = useNewsDetail(newsId);

  const publishMutation = usePublishNews();
  const archiveMutation = useArchiveNews();
  const deleteMutation = useDeleteNews();

  const canUpdate = useHasPermission(PERMISSIONS.NEWS_UPDATE);
  const canPublish = useHasPermission(PERMISSIONS.NEWS_PUBLISH);
  const canDelete = useHasPermission(PERMISSIONS.NEWS_DELETE);

  const [isActionOpen, setIsActionOpen] = useState(false);

  const isMutating =
    publishMutation.isPending ||
    archiveMutation.isPending ||
    deleteMutation.isPending;

  const handlePublish = () => {
    if (!news) return;
    publishMutation.mutate(news.newsId);
  };

  const handleArchive = () => {
    if (!news) return;
    archiveMutation.mutate(news.newsId);
  };

  const handleDelete = async () => {
    if (!news) return;

    const confirmed = await confirm({
      title: "Hapus Berita Ini?",
      description: (
        <span>
          Tindakan ini tidak dapat dibatalkan. Berita{" "}
          <strong className="text-gray-900 dark:text-white">
            &quot;{news.title}&quot;
          </strong>{" "}
          akan dihapus secara permanen.
        </span>
      ),
      confirmText: "Ya, Hapus",
      variant: "danger",
    });

    if (!confirmed) return;

    await deleteMutation.mutateAsync(news.newsId);
    router.push("/news");
  };

  if (isLoading) return <DetailSkeleton />;

  if (isError || !news) {
    return (
      <div className="mx-auto flex min-h-[400px] w-full max-w-md flex-col items-center justify-center text-center">
        <div className="mb-4 rounded-full bg-red-50 p-3 text-red-500 dark:bg-red-500/10 dark:text-red-400">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Berita Tidak Ditemukan
        </h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Data berita mungkin telah dihapus atau URL yang kamu tuju salah.
        </p>
        <Link
          href="/news"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Daftar
        </Link>
      </div>
    );
  }

  const date = news.publishedAt ?? news.createdAt;

  const canArchive = canUpdate && news.status !== "ARCHIVED";
  const hasActions = canArchive || canDelete;

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6">
      {/* Top Header Navigation */}
      <div className="mb-5 flex items-center justify-between">
        <Link
          href="/news"
          className="group inline-flex items-center gap-2 text-xs font-semibold text-gray-500 transition hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-300"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Kembali ke daftar
        </Link>

        <span className="hidden text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400 dark:text-gray-600 sm:block">
          News Detail
        </span>
      </div>

      {/* Hero Banner Image */}
      <div className="group relative h-[280px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-white/[0.02] sm:h-[380px]">
        {news.thumbnail ? (
          <Image
            src={news.thumbnail}
            alt={news.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-gray-400 dark:text-gray-600">
            <ImageOff className="h-12 w-12 stroke-[1.5]" />
            <span className="mt-2 text-xs font-medium">
              Tidak ada gambar sampul
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Hero Overlay Details */}
        <div className="absolute bottom-0 inset-x-0 p-6 text-white">
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-black/25 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
              {NEWS_CATEGORY_LABELS[news.category]}
            </span>
            <div className="rounded-full border border-white/15 bg-black/25 px-1 backdrop-blur-md">
              <NewsStatusBadge status={news.status} />
            </div>
          </div>
          <h1 className="text-xl font-bold leading-tight text-white sm:text-3xl">
            {news.title}
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
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-400">
                  Isi Berita
                </h2>
                <p className="mt-0.5 text-[11px] text-gray-400">
                  Konten utama dari berita ini.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                {canUpdate && news.status === "DRAFT" && (
                  <Link
                    href={`/news/${news.newsId}/edit`}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                )}

                {canPublish && news.status === "DRAFT" && (
                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={isMutating}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md bg-brand-500 px-3 text-xs font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
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
                      {canArchive && (
                        <DropdownItem
                          onClick={() => {
                            setIsActionOpen(false);
                            handleArchive();
                          }}
                          baseClassName="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/[0.05] dark:hover:text-white"
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
                          baseClassName="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-error-600 transition-colors hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10"
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

            {/* Excerpt - pertahanin style */}
            {news.excerpt && (
              <div className="mt-5 border-l-2 border-brand-500 bg-gray-50/70 py-1 pl-4 dark:bg-white/[0.02]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Ringkasan
                </p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-gray-700 dark:text-gray-300">
                  {news.excerpt}
                </p>
              </div>
            )}

            {/* Isi Konten */}
            <div className="mt-5 whitespace-pre-line text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {news.content}
            </div>
          </section>
        </div>

        {/* Meta Sidebar */}
        <aside className="self-start space-y-4 lg:sticky lg:top-22 lg:h-fit">
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.07] dark:bg-white/[0.025]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-400">
              Informasi Detail
            </h2>

            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md bg-brand-50 dark:bg-brand-500/10">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand-500 dark:bg-brand-400" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase text-gray-400">
                    Status
                  </p>
                  <div className="mt-1">
                    <NewsStatusBadge status={news.status} />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                <div>
                  <p className="text-[10px] font-semibold uppercase text-gray-400">
                    {news.publishedAt ? "Dipublikasikan" : "Dibuat"}
                  </p>
                  <p className="text-xs font-medium text-gray-800 dark:text-gray-200">
                    {formatDate(date)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400 text-xs font-bold">
                  #
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase text-gray-400">
                    Kategori
                  </p>
                  <p className="text-xs font-medium text-gray-800 dark:text-gray-200">
                    {NEWS_CATEGORY_LABELS[news.category]}
                  </p>
                </div>
              </div>

              {news.createdBy && (
                <div className="flex items-start gap-3">
                  <User className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-gray-400">
                      Pembuat
                    </p>
                    <p className="text-xs font-medium text-gray-800 dark:text-gray-200">
                      {news.createdBy.name}
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
                    /{news.slug}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shortcut Card */}
          <Link
            href="/news"
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 text-xs font-semibold text-gray-600 transition hover:border-brand-500 hover:text-brand-600 dark:border-white/[0.07] dark:bg-white/[0.025] dark:text-gray-400 dark:hover:border-brand-400 dark:hover:text-brand-400"
          >
            <span>Semua berita</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </main>
  );
}
