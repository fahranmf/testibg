import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import GalleryForm from "../components/GalleryForm";

export default function GalleryCreatePage() {
  return (
    <div className="mx-auto w-full space-y-6">
      {/* Navigation */}
      <div className="mb-5 flex items-center justify-between">
        <Link
          href="/gallery"
          className="group inline-flex items-center gap-2 text-xs font-semibold text-gray-500 transition hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-300"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Kembali ke daftar
        </Link>

        <span className="hidden text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400 dark:text-gray-600 sm:block">
          Create Gallery
        </span>
      </div>

      {/* Main Header Card */}
      <div className="overflow-hidden">
        <div className="space-y-1.5">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            Tambah Gallery Baru
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Buat album foto baru untuk mendokumentasikan kegiatan PMI Depok.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.07] dark:bg-white/[0.025]">
        <GalleryForm mode="create" />
      </div>
    </div>
  );
}
