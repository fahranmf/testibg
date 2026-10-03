"use client";

import Link from "next/link";
import { ArrowLeft, MapPin, RefreshCw } from "lucide-react";

import ActivityImage from "../components/ActivityImage";
import { usePublicActivityDetail } from "../hooks/usePublicActivities";

function BackLink() {
  return (
    <Link
      href="/media/activities"
      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      Semua kegiatan
    </Link>
  );
}

export default function PublicActivityDetailPage({ slug }: { slug: string }) {
  const { data: activity, isLoading, isError, refetch } = usePublicActivityDetail(slug);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14">
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
          <div className="mt-10 h-3 w-28 animate-pulse rounded bg-gray-200" />
          <div className="mt-5 h-14 w-11/12 animate-pulse rounded bg-gray-200" />
          <div className="mt-10 aspect-[16/9] animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-10 space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-4 animate-pulse rounded bg-gray-200" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError || !activity) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14">
          <BackLink />
          <section className="mt-16 max-w-lg border-y border-error-200 py-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
              Media Center
            </span>
            <h1 className="mt-4 font-serif text-4xl font-medium leading-tight text-gray-900 sm:text-5xl">
              Kegiatan tidak ditemukan
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              Kegiatan mungkin telah dihapus atau belum dipublikasikan.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/media/activities"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
              >
                Lihat semua kegiatan
              </Link>
              {isError && (
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-brand-200 hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                >
                  <RefreshCw size={15} aria-hidden="true" />
                  Coba lagi
                </button>
              )}
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-6xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14" aria-labelledby="activity-title">
        <BackLink />

        <header className="mt-10 max-w-4xl border-b border-gray-200 pb-7 lg:mt-12">
          <h1 id="activity-title" className="text-balance font-serif text-3xl font-medium leading-[1.02] tracking-[-0.025em] text-gray-900 sm:text-4xl lg:text-5xl">
            {activity.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
            <time dateTime={activity.eventDate}>{new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(activity.eventDate))}</time>
            {activity.location && <span className="inline-flex items-center gap-1.5"><MapPin size={14} className="text-brand-600" aria-hidden="true" />{activity.location}</span>}
          </div>
        </header>

        <div className="mt-8 overflow-hidden bg-brand-50 lg:mt-10">
          <ActivityImage src={activity.thumbnail} alt={activity.title} loading="eager" className="aspect-[16/9] h-full w-full object-contain" />
        </div>

        <div className="mt-9 max-w-[68ch] whitespace-pre-wrap font-serif text-lg leading-[1.8] text-gray-700 selection:bg-brand-100 lg:mt-10">
          {activity.description.trim()}
        </div>

        {activity.images.length > 0 && (
          <section className="mt-14 max-w-5xl border-t border-gray-200 pt-7" aria-labelledby="gallery-title">
            <div className="flex items-end justify-between gap-5">
              <h2 id="gallery-title" className="font-serif text-2xl font-medium text-gray-900">Galeri</h2>
              <span className="text-sm text-gray-400">{activity.images.length} foto</span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {activity.images.map((image) => (
                <figure key={image.id} className="overflow-hidden bg-brand-50">
                  <ActivityImage src={image.imageUrl} alt={image.caption || `Dokumentasi ${activity.title}`} className="aspect-[4/3] h-full w-full object-contain" />
                  {image.caption && <figcaption className="border-t border-gray-100 bg-white px-3 py-2 text-xs leading-relaxed text-gray-500">{image.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-16 max-w-[68ch] border-t border-gray-200 pt-7">
          <BackLink />
        </footer>
      </article>
    </main>
  );
}
