"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Calendar, ChevronLeft, ChevronRight, MapPin, RefreshCw } from "lucide-react";

import ActivityImage from "../components/ActivityImage";
import { formatActivityDate, formatActivityDateParts, getPageItems } from "../activity.utils";
import { usePublicActivities } from "../hooks/usePublicActivities";

const PAGE_SIZE = 9;

function ActivityListSkeleton() {
  return (
    <div className="mt-10 animate-pulse divide-y border-y border-gray-200">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="grid grid-cols-[5rem_1fr] gap-5 py-6 sm:grid-cols-[8rem_1fr] sm:gap-7">
            <div className="aspect-[4/3] bg-gray-200" />
            <div className="space-y-3 py-1">
              <div className="h-3 w-28 bg-gray-200" />
              <div className="h-6 w-4/5 bg-gray-200" />
              <div className="h-4 w-2/3 bg-gray-200" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default function PublicActivityListPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white"><div className="mx-auto max-w-7xl px-5 lg:px-8"><ActivityListSkeleton /></div></main>}>
      <PublicActivityListContent />
    </Suspense>
  );
}

function PublicActivityListContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page"));
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
  const { data, isLoading, isError, refetch } = usePublicActivities({
    page,
    limit: PAGE_SIZE,
  });
  const activities = data?.activities;
  const totalPages = data?.pagination.totalPages ?? 1;

  const updatePage = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (nextPage <= 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(nextPage));
    }

    const query = nextParams.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <header className="border-b-2 border-gray-900 pb-9">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
            <span className="h-px w-7 bg-brand-600" />
            Media Center
          </span>
          <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
            <h1 className="max-w-3xl font-serif text-4xl font-medium leading-[0.98] tracking-[-0.02em] text-gray-900 sm:text-5xl lg:text-[3.5rem]">
              Kegiatan UDD PMI Depok
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-gray-500 lg:pb-2 lg:text-right">
              Dokumentasi kegiatan dan aksi kemanusiaan.
            </p>
          </div>
        </header>

        <section className="pb-4 pt-2" aria-live="polite">
          {isLoading && <ActivityListSkeleton />}

          {isError && !isLoading && (
            <section className="my-16 max-w-lg border-y border-error-200 py-6">
              <h2 className="font-serif text-2xl font-medium text-gray-900">
                Kegiatan belum dapat dimuat
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Terjadi gangguan saat mengambil data. Silakan coba lagi.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
              >
                <RefreshCw size={15} aria-hidden="true" />
                Coba lagi
              </button>
            </section>
          )}

          {!isLoading && !isError && activities && activities.length > 0 && (() => {
            const [featured, ...archive] = activities;
            const date = formatActivityDateParts(featured.eventDate);

            return (
              <>
                <article className="mt-9 border-b border-gray-200 pb-10 sm:pb-12">
                  <Link
                    href={`/media/activities/${featured.slug}`}
                    className="group grid gap-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-10"
                  >
                    <div className="relative overflow-hidden bg-brand-50">
                      <ActivityImage
                        src={featured.thumbnail}
                        alt={featured.title}
                        loading="eager"
                        className="aspect-[16/10] h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      {page === 1 && (
                        <span className="absolute bottom-0 left-0 bg-brand-600 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                          Kegiatan terbaru
                        </span>
                      )}
                    </div>
                    <div className="lg:pb-1">
                      <time dateTime={featured.eventDate} className="flex items-baseline gap-2 text-brand-600">
                        <span className="font-serif text-3xl font-medium leading-none">{date.day}</span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">{date.month}</span>
                        <span className="text-xs text-gray-400">{new Date(featured.eventDate).getFullYear()}</span>
                      </time>
                      <h2 className="mt-5 font-serif text-3xl font-medium leading-[1.02] tracking-[-0.025em] text-gray-900 transition-colors group-hover:text-brand-600 sm:text-4xl">
                        {featured.title}
                      </h2>
                      {featured.location && <span className="mt-4 flex items-center gap-1.5 text-sm text-gray-500"><MapPin size={14} className="shrink-0 text-brand-600" aria-hidden="true" />{featured.location}</span>}
                    </div>
                  </Link>
                </article>

                {archive.length > 0 && (
                  <ul className="divide-y divide-gray-200">
                    {archive.map((activity) => (
                      <li key={activity.id}>
                        <Link
                          href={`/media/activities/${activity.slug}`}
                          className="group grid grid-cols-[5rem_minmax(0,1fr)] gap-5 py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:items-center sm:gap-7"
                        >
                          <div className="aspect-[4/3] overflow-hidden bg-brand-50">
                            <ActivityImage src={activity.thumbnail} alt={activity.title} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]" />
                          </div>
                          <div className="min-w-0">
                            <h2 className="font-serif text-xl font-medium leading-[1.1] text-gray-900 transition-colors group-hover:text-brand-600 sm:text-2xl">
                              {activity.title}
                            </h2>
                            {activity.location && <span className="mt-2 flex items-center gap-1.5 text-sm text-gray-500"><MapPin size={13} className="shrink-0 text-gray-400" aria-hidden="true" />{activity.location}</span>}
                          </div>
                          <time dateTime={activity.eventDate} className="col-start-2 flex items-center gap-2 text-xs text-gray-400 sm:col-start-auto sm:justify-self-end">
                            <Calendar size={13} aria-hidden="true" />
                            {formatActivityDate(activity.eventDate)}
                          </time>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            );
          })()}

          {!isLoading && !isError && activities?.length === 0 && (
            <section className="my-16 border-y border-dashed border-gray-300 py-16 text-center">
              <Calendar className="mx-auto text-brand-600" size={32} aria-hidden="true" />
              <h2 className="mt-4 font-serif text-3xl font-medium text-gray-900">
                Belum ada kegiatan
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Dokumentasi kegiatan akan ditampilkan di halaman ini.
              </p>
            </section>
          )}
        </section>

        {data && totalPages > 1 && (
          <nav className="mt-12 flex flex-col-reverse items-center gap-6 border-t border-gray-200 py-8 sm:flex-row sm:justify-between" aria-label="Navigasi halaman kegiatan">
            <button
              type="button"
              onClick={() => updatePage(page - 1)}
              disabled={page === 1}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition-colors hover:text-brand-600 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:text-gray-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
            >
              <ChevronLeft size={16} className="transition-transform group-enabled:group-hover:-translate-x-0.5" aria-hidden="true" />
              Terbaru
            </button>

            <ul className="flex items-center gap-1">
              {getPageItems(page, totalPages).map((item, index) =>
                item === "gap" ? (
                  <li key={`gap-${index}`} aria-hidden="true" className="px-2 text-sm text-gray-300">&hellip;</li>
                ) : (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => updatePage(item)}
                      aria-current={page === item ? "page" : undefined}
                      className={`h-9 w-9 rounded-md text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${page === item ? "bg-brand-500 text-white shadow-sm shadow-brand-500/20" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"}`}
                    >
                      {item}
                    </button>
                  </li>
                ),
              )}
            </ul>

            <button
              type="button"
              onClick={() => updatePage(page + 1)}
              disabled={page === totalPages}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition-colors hover:text-brand-600 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:text-gray-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
            >
              Berikutnya
              <ChevronRight size={16} className="transition-transform group-enabled:group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </nav>
        )}
      </div>
    </main>
  );
}
