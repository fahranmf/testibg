"use client";

import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

import { useGalleryDetail } from "../hooks/useGalleryDetail";
import GalleryForm from "../components/GalleryForm";

function EditSkeleton() {
  return (
    <div className="mx-auto w-full space-y-6">
      <div className="h-4 w-36 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
      <div className="space-y-3">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
        <div className="h-4 w-96 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
      </div>
      <div className="h-96 w-full animate-pulse rounded-xl border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.025]" />
    </div>
  );
}

export default function GalleryEditPage({
  galleryId,
}: {
  galleryId: string;
}) {
  const { data: gallery, isLoading } = useGalleryDetail(galleryId);

  if (isLoading) {
    return <EditSkeleton />;
  }

  if (!gallery) {
    return (
      <div className="mx-auto py-12">
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-white/[0.07] dark:bg-white/[0.025]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white">
            Gallery Tidak Ditemukan
          </h3>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            Data gallery yang ingin kamu edit mungkin sudah dihapus atau URL
            tidak valid.
          </p>
          <Link
            href="/gallery"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke Daftar Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full space-y-6">
      {/* Navigation */}
      <div className="mb-5 flex items-center justify-between">
        <Link
          href={`/gallery/${gallery.id}`}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-300"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Kembali ke detail gallery
        </Link>

        <span className="hidden text-xs font-medium uppercase tracking-[0.12em] text-gray-400 dark:text-gray-600 sm:block">
          Edit Gallery
        </span>
      </div>

      {/* Main Header Card */}
      <div className="overflow-hidden">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Edit Gallery
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Perbarui informasi album foto dan dokumentasi yang terkait.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.07] dark:bg-white/[0.025]">
        <GalleryForm mode="edit" initialData={gallery} />
      </div>
    </div>
  );
}
