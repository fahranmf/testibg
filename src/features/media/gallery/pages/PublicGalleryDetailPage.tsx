"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Images, RefreshCw } from "lucide-react";

import { usePublicGalleryDetail } from "../hooks/usePublicGalleries";
import { formatGalleryDate } from "../gallery.utils";

function BackLink() {
  return (
    <Link href="/media/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600">
      <ArrowLeft size={16} aria-hidden="true" />
      Semua galeri
    </Link>
  );
}

export default function PublicGalleryDetailPage({ slug }: { slug: string }) {
  const { data: gallery, isLoading, isError, refetch } = usePublicGalleryDetail(slug);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white"><div className="mx-auto max-w-6xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14"><div className="h-4 w-28 animate-pulse rounded bg-gray-200" /><div className="mt-10 h-14 w-4/5 animate-pulse rounded bg-gray-200" /><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="aspect-[4/3] animate-pulse bg-gray-200" />)}</div></div></main>
    );
  }

  if (isError || !gallery) {
    return (
      <main className="min-h-screen bg-white"><div className="mx-auto max-w-6xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14"><BackLink /><section className="mt-16 max-w-lg border-y border-error-200 py-6"><span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">Media Center</span><h1 className="mt-4 font-serif text-4xl font-medium leading-tight text-gray-900 sm:text-5xl">Galeri tidak ditemukan</h1><p className="mt-4 text-sm leading-relaxed text-gray-500">Album mungkin telah dihapus atau belum tersedia.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/media/gallery" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600">Lihat semua galeri</Link>{isError && <button type="button" onClick={() => refetch()} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-brand-200 hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"><RefreshCw size={15} aria-hidden="true" />Coba lagi</button>}</div></section></div></main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-6xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14" aria-labelledby="gallery-title">
        <BackLink />
        <header className="mt-10 max-w-4xl border-b-2 border-gray-900 pb-9 lg:mt-12 lg:pb-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <span className="inline-flex items-center gap-1.5 text-brand-600"><Calendar size={13} aria-hidden="true" />{formatGalleryDate(gallery.eventDate)}</span>
            <span className="h-px w-5 bg-gray-300" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5 font-medium normal-case tracking-normal text-gray-400"><Images size={14} aria-hidden="true" />{gallery.images.length} foto</span>
          </div>
          <h1 id="gallery-title" className="mt-5 text-balance font-serif text-4xl font-medium leading-[1.03] tracking-[-0.02em] text-gray-900 sm:text-5xl lg:text-[3.5rem]">{gallery.title}</h1>
          {gallery.description && <p className="mt-6 max-w-2xl border-l-2 border-brand-500 bg-gray-50/70 py-1 pl-4 text-lg leading-relaxed text-gray-500">{gallery.description}</p>}
        </header>

        {gallery.images.length > 0 ? (
          <section className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3" aria-label={`Foto ${gallery.title}`}>
            {gallery.images.map((image, index) => (
              <figure key={image.id} className={`group overflow-hidden bg-brand-50 ${index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}>
                <img src={image.image} alt={image.caption || `Dokumentasi ${gallery.title}`} loading={index < 3 ? "eager" : "lazy"} className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] ${index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`} />
                {image.caption && <figcaption className="border-t border-gray-100 bg-white px-4 py-3 text-sm leading-relaxed text-gray-500">{image.caption}</figcaption>}
              </figure>
            ))}
          </section>
        ) : (
          <section className="mt-12 border-y border-dashed border-gray-300 py-14 text-center"><Images className="mx-auto text-brand-600" size={32} aria-hidden="true" /><h2 className="mt-4 font-serif text-2xl font-medium text-gray-900">Belum ada foto dalam album ini</h2></section>
        )}
        <footer className="mt-16 border-t border-gray-200 pt-7"><BackLink /></footer>
      </article>
    </main>
  );
}
