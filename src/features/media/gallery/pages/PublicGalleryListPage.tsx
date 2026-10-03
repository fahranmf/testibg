"use client";

import Link from "next/link";
import { Calendar, Camera, ChevronRight, Images, RefreshCw } from "lucide-react";

import { PublicGallery } from "../gallery.types";
import { usePublicGalleries } from "../hooks/usePublicGalleries";
import { formatGalleryDate } from "../gallery.utils";

function GalleryCover({ gallery, priority = false }: { gallery: PublicGallery; priority?: boolean }) {
  if (!gallery.coverImage) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-brand-50 text-brand-600">
        <Images size={36} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={gallery.coverImage}
      alt={`Sampul album ${gallery.title}`}
      loading={priority ? "eager" : "lazy"}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
  );
}

function GallerySkeleton() {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[4/3] bg-gray-200" />
          <div className="mt-4 h-3 w-28 rounded bg-gray-200" />
          <div className="mt-3 h-7 w-4/5 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

function GalleryCard({ gallery, featured }: { gallery: PublicGallery; featured: boolean }) {
  return (
    <Link
      href={`/media/gallery/${gallery.slug}`}
      className={`group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 ${
        featured ? "sm:col-span-2 lg:col-span-2" : ""
      }`}
    >
      <div className={`relative overflow-hidden bg-brand-50 ${featured ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
        <GalleryCover gallery={gallery} priority={featured} />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-950/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {featured && (
          <span className="absolute left-0 top-0 inline-flex items-center gap-1.5 bg-brand-600 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
            <Camera size={12} aria-hidden="true" />
            Dokumentasi terbaru
          </span>
        )}
      </div>
      <div className="border-b border-gray-200 py-5 sm:py-6">
        <time dateTime={gallery.eventDate ?? undefined} className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
          <Calendar size={13} aria-hidden="true" />
          {formatGalleryDate(gallery.eventDate)}
        </time>
        <h2 className={`mt-3 font-serif font-medium leading-[1.06] text-gray-900 transition-colors group-hover:text-brand-600 ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
          {gallery.title}
        </h2>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gray-700 transition-all group-hover:gap-2 group-hover:text-brand-600">
          Lihat album
          <ChevronRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default function PublicGalleryListPage() {
  const { data: galleries, isLoading, isError, refetch } = usePublicGalleries();

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <header className="border-b-2 border-gray-900 pb-9">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
            <span className="h-px w-8 bg-brand-600" />
            Media Center
          </span>
          <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
            <h1 className="max-w-3xl font-serif text-4xl font-medium leading-[0.98] tracking-[-0.02em] text-gray-900 sm:text-5xl lg:text-[3.5rem]">
              Galeri Dokumentasi
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-gray-500 lg:pb-2 lg:text-right">
              Rekaman momen pendonor, relawan, dan petugas UDD PMI Kota Depok dalam melayani sesama.
            </p>
          </div>
        </header>

        <section className="py-10 sm:py-12" aria-live="polite" aria-busy={isLoading}>
          {isLoading && <GallerySkeleton />}

          {isError && !isLoading && (
            <section className="my-8 max-w-lg border-y border-error-200 py-6">
              <h2 className="font-serif text-2xl font-medium text-gray-900">Galeri belum dapat dimuat</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">Terjadi gangguan saat mengambil dokumentasi. Silakan coba lagi.</p>
              <button type="button" onClick={() => refetch()} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600">
                <RefreshCw size={15} aria-hidden="true" />
                Coba lagi
              </button>
            </section>
          )}

          {!isLoading && !isError && galleries && galleries.length > 0 && (
            <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-10">
              {galleries.map((gallery, index) => (
                <GalleryCard key={gallery.id} gallery={gallery} featured={index === 0} />
              ))}
            </div>
          )}

          {!isLoading && !isError && galleries?.length === 0 && (
            <section className="my-8 border-y border-dashed border-gray-300 py-16 text-center">
              <Images className="mx-auto text-brand-600" size={34} aria-hidden="true" />
              <h2 className="mt-4 font-serif text-3xl font-medium text-gray-900">Belum ada dokumentasi</h2>
              <p className="mt-2 text-sm text-gray-500">Album kegiatan UDD PMI Depok akan ditampilkan di halaman ini.</p>
            </section>
          )}
        </section>
      </div>
    </main>
  );
}
