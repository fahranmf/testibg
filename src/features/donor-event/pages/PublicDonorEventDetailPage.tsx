"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  ExternalLink,
  MapPin,
  RefreshCw,
} from "lucide-react";

import { usePublishedDonorEventDetail } from "../hooks/usePublishedDonorEvents";

function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function formatEventTime(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(date));
}

function formatDateTile(date: string) {
  const value = new Date(date);

  return {
    day: new Intl.DateTimeFormat("id-ID", { day: "2-digit" }).format(value),
    month: new Intl.DateTimeFormat("id-ID", { month: "short" })
      .format(value)
      .toUpperCase(),
    year: new Intl.DateTimeFormat("id-ID", { year: "numeric" }).format(value),
  };
}

function BackLink() {
  return (
    <Link
      href="/#jadwal"
      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      Kembali ke jadwal donor
    </Link>
  );
}

function LoadingState() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14">
        <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
        <div className="mt-10 grid gap-7 lg:grid-cols-[10rem_minmax(0,1fr)]">
          <div className="h-36 animate-pulse bg-brand-100" />
          <div className="space-y-4 pt-2">
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
            <div className="h-14 w-4/5 animate-pulse rounded bg-gray-200" />
            <div className="h-5 w-2/5 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          <div className="h-32 animate-pulse bg-gray-100" />
          <div className="h-32 animate-pulse bg-gray-100" />
        </div>
      </div>
    </main>
  );
}

function NotFoundState({ onRetry }: { onRetry?: () => void }) {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14">
        <BackLink />
        <section className="mt-16 max-w-lg border-y border-error-200 py-7">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
            Jadwal Donor
          </span>
          <h1 className="mt-4 font-serif text-4xl font-medium leading-tight text-gray-900 sm:text-5xl">
            Jadwal tidak ditemukan
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            Jadwal ini mungkin telah berakhir atau tidak lagi tersedia.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/#jadwal"
              className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
            >
              Lihat jadwal donor
            </Link>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-brand-200 hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
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

export default function PublicDonorEventDetailPage({ slug }: { slug: string }) {
  const { data: event, isLoading, isError, refetch } =
    usePublishedDonorEventDetail(slug);

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !event) {
    return <NotFoundState onRetry={isError ? () => refetch() : undefined} />;
  }

  const dateTile = formatDateTile(event.startAt);
  const mapQuery = encodeURIComponent(
    [event.location, event.address].filter(Boolean).join(", "),
  );

  return (
    <main className="min-h-screen bg-white">
      <article
        className="mx-auto max-w-6xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14"
        aria-labelledby="event-title"
      >
        <BackLink />

        <header className="mt-9 border-b-2 border-gray-900 pb-10 lg:mt-12 lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-10">
          <div className="flex w-full items-center gap-4 bg-brand-800 px-5 py-4 text-white sm:w-44 sm:flex-col sm:items-start sm:justify-center sm:gap-0 sm:px-6 sm:py-6 lg:w-auto lg:min-h-40">
            <span className="font-mono text-5xl font-semibold leading-none tracking-[-0.08em] sm:text-6xl">
              {dateTile.day}
            </span>
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-white/85">
              {dateTile.month}
            </span>
            <span className="ml-auto text-xs font-medium text-white/55 sm:ml-0 sm:mt-3">
              {dateTile.year}
            </span>
          </div>

          <div className="mt-7 lg:mt-0 lg:self-end">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
              <span className="h-px w-7 bg-brand-600" />
              Mobil Unit PMI Depok
            </span>
            <h1
              id="event-title"
              className="mt-4 max-w-4xl text-balance font-serif text-4xl font-medium leading-[1.01] tracking-[-0.025em] text-gray-900 sm:text-5xl lg:text-[3.7rem]"
            >
              {event.title}
            </h1>
          </div>
        </header>

        <section
          className="grid border-b border-gray-200 sm:grid-cols-2 lg:grid-cols-[0.85fr_1.15fr]"
          aria-label="Waktu dan lokasi kegiatan"
        >
          <div className="border-b border-gray-200 py-7 sm:border-b-0 sm:border-r sm:pr-8 lg:py-9">
            <div className="flex gap-4">
              <CalendarDays
                className="mt-0.5 shrink-0 text-brand-600"
                size={19}
                aria-hidden="true"
              />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                  Waktu pelaksanaan
                </p>
                <p className="mt-2 text-xl font-medium leading-tight text-gray-900 sm:text-2xl">
                  {formatEventDate(event.startAt)}
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-gray-500">
                  <Clock3 size={14} aria-hidden="true" />
                  {formatEventTime(event.startAt)} - {formatEventTime(event.endAt)} WIB
                </p>
              </div>
            </div>
          </div>

          <div className="py-7 sm:pl-8 lg:py-9">
            <div className="flex gap-4">
              <MapPin
                className="mt-0.5 shrink-0 text-brand-600"
                size={19}
                aria-hidden="true"
              />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                  Lokasi donor
                </p>
                <p className="mt-2 text-xl font-medium leading-tight text-gray-900 sm:text-2xl">
                  {event.location}
                </p>
                {event.address && (
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    {event.address}
                  </p>
                )}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                >
                  Petunjuk arah
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-16">
          <section className="max-w-[65ch]" aria-labelledby="description-title">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
              Tentang Kegiatan
            </span>
            <h2
              id="description-title"
              className="mt-3 font-serif text-3xl font-medium leading-[1.08] text-gray-900 sm:text-4xl"
            >
              Luangkan waktu, selamatkan kehidupan.
            </h2>
            <p className="mt-6 whitespace-pre-wrap font-serif text-lg leading-[1.8] text-gray-700 lg:text-[1.15rem]">
              {event.description?.trim() ||
                "Kegiatan donor darah ini terbuka bagi masyarakat yang memenuhi syarat. Kehadiran Anda membantu menjaga ketersediaan darah bagi pasien yang membutuhkan."}
            </p>
          </section>

          <aside className="self-start bg-brand-900 p-6 text-white sm:p-7 lg:sticky lg:top-28" aria-labelledby="action-title">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
              Aksi Donor
            </span>
            <h2 id="action-title" className="mt-3 font-serif text-3xl font-medium leading-[1.05]">
              Siap berbagi harapan?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Pastikan kondisi tubuh sehat dan bawa identitas diri saat datang.
            </p>

            {event.registrationUrl ? (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-white px-4 py-3 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Daftar donor
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            ) : (
              <Link
                href="/#panduan-donor"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 border border-white/30 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Lihat persyaratan donor
                <ArrowLeft size={15} className="rotate-180" aria-hidden="true" />
              </Link>
            )}
          </aside>
        </div>

        <footer className="mt-16 border-t border-gray-200 pt-7">
          <BackLink />
        </footer>
      </article>
    </main>
  );
}
