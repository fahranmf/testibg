"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Newspaper, RefreshCw } from "lucide-react";

import {
  PUBLIC_NEWS_CATEGORY_LABELS,
  PublicNews,
  PublicNewsCategory,
} from "../news.types";
import { formatNewsDate, getPageItems } from "../news.utils";
import { usePublicNews } from "../hooks/usePublicNews";
import NewsImage from "../components/NewsImage";

const PAGE_SIZE = 9;

function HeroStory({ news }: { news: PublicNews }) {
  return (
    <Link
      href={`/media/news/${news.slug}`}
      className="group relative flex overflow-hidden rounded-lg bg-gray-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 lg:min-h-[440px]"
    >
      <div className="flex w-full flex-col lg:block">
        <div className="relative aspect-[16/10] overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
          <NewsImage
            src={news.thumbnail}
            alt={news.title}
            tone="dark"
            loading="eager"
            className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/45 to-gray-950/10" />
        </div>

        <div className="relative bg-gray-950 p-6 sm:p-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:bg-transparent lg:p-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
            <Newspaper size={12} aria-hidden="true" />
            {PUBLIC_NEWS_CATEGORY_LABELS[news.category]}
          </span>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl font-medium leading-[1.05] text-white sm:text-4xl lg:text-[2.5rem]">
            {news.title}
          </h2>
          {news.excerpt && (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 sm:text-[15px]">
              {news.excerpt}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            <time dateTime={news.publishedAt} className="text-xs text-white/55">
              {formatNewsDate(news.publishedAt)}
            </time>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-white transition-all duration-200 group-hover:gap-2">
              Baca Selengkapnya
              <ChevronRight size={14} aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function StoryRow({ news }: { news: PublicNews }) {
  return (
    <Link
      href={`/media/news/${news.slug}`}
      className="group grid grid-cols-[5.25rem_minmax(0,1fr)] gap-4 py-6 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-6 sm:py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
    >
      <div className="aspect-square self-start overflow-hidden rounded-md bg-brand-50">
        <NewsImage
          src={news.thumbnail}
          alt={news.title}
          className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
          <span className="text-brand-600">
            {PUBLIC_NEWS_CATEGORY_LABELS[news.category]}
          </span>
          <time
            dateTime={news.publishedAt}
            className="font-medium normal-case tracking-normal text-gray-400"
          >
            {formatNewsDate(news.publishedAt)}
          </time>
        </div>
        <h3 className="mt-2 font-serif text-xl font-medium leading-[1.1] text-gray-900 transition-colors group-hover:text-brand-600 sm:text-2xl">
          {news.title}
        </h3>
        {news.excerpt && (
          <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-gray-500">
            {news.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

function LoadingStories() {
  return (
    <div aria-label="Memuat berita">
      <div className="mt-10 aspect-[16/10] animate-pulse rounded-lg bg-gray-200 lg:aspect-[2/1]" />
      <ul className="mt-14 border-t border-gray-200">
        {Array.from({ length: 4 }).map((_, index) => (
          <li
            key={index}
            className="grid grid-cols-[5.25rem_minmax(0,1fr)] gap-4 py-6 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-6 sm:py-7"
          >
            <div className="aspect-square animate-pulse rounded-md bg-gray-200" />
            <div className="space-y-3">
              <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-4/5 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PublicNewsListPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
            <LoadingStories />
          </div>
        </main>
      }
    >
      <PublicNewsListContent />
    </Suspense>
  );
}

function PublicNewsListContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page"));
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
  const categoryParam = searchParams.get("category");
  const category = Object.hasOwn(
    PUBLIC_NEWS_CATEGORY_LABELS,
    categoryParam ?? "",
  )
    ? (categoryParam as PublicNewsCategory)
    : undefined;

  const { data, isLoading, isError, isFetching, refetch } = usePublicNews({
    page,
    limit: PAGE_SIZE,
    category,
  });

  const updateSearchParams = ({
    page: nextPage,
    category: nextCategory,
  }: {
    page?: number;
    category?: PublicNewsCategory;
  }) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (!nextPage || nextPage === 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(nextPage));
    }

    if (nextCategory) {
      nextParams.set("category", nextCategory);
    } else {
      nextParams.delete("category");
    }

    const query = nextParams.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const totalPages = data?.pagination.totalPages ?? 1;
  const [hero, ...rest] = data?.news ?? [];

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
              Kabar dari UDD PMI Depok
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-gray-500 lg:pb-2 lg:text-right">
              Informasi terkini seputar Unit Donor Darah PMI Kota Depok.
            </p>
          </div>
        </header>

        <div
          className="no-scrollbar -mx-5 flex gap-7 overflow-x-auto border-b border-gray-200 px-5 lg:mx-0 lg:px-0"
          role="tablist"
          aria-label="Filter kategori berita"
        >
          <button
            type="button"
            role="tab"
            aria-selected={!category}
            onClick={() => updateSearchParams({})}
            className={`relative shrink-0 py-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
              !category ? "text-gray-900" : "text-gray-400 hover:text-gray-700"
            }`}
          >
            Semua
            {!category && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-600" />
            )}
          </button>
          {(
            Object.keys(PUBLIC_NEWS_CATEGORY_LABELS) as PublicNewsCategory[]
          ).map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              onClick={() => updateSearchParams({ category: item })}
              className={`relative shrink-0 py-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                category === item
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {PUBLIC_NEWS_CATEGORY_LABELS[item]}
              {category === item && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-600" />
              )}
            </button>
          ))}
        </div>

        <section
          aria-live="polite"
          aria-busy={isFetching}
          className={`mt-10 transition-opacity duration-200 sm:mt-12 ${
            isFetching && !isLoading ? "opacity-60" : "opacity-100"
          }`}
        >
          {isLoading && <LoadingStories />}

          {isError && !isLoading && (
            <section className="my-16 max-w-lg border-y border-error-200 py-6">
              <h2 className="font-serif text-2xl font-medium text-gray-900">
                Berita belum dapat dimuat
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Terjadi gangguan saat mengambil data. Silakan coba lagi.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
              >
                <RefreshCw size={15} aria-hidden="true" />
                Coba lagi
              </button>
            </section>
          )}

          {!isLoading && !isError && hero && (
            <>
              <HeroStory news={hero} />

              {rest.length > 0 && (
                <ul className="mt-12 border-t border-gray-200 sm:grid sm:grid-cols-2 sm:gap-x-10">
                  {rest.map((news) => (
                    <li key={news.newsId} className="border-b border-gray-200">
                      <StoryRow news={news} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {!isLoading && !isError && data && data.news.length === 0 && (
            <section className="my-16 border-y border-dashed border-gray-300 py-16 text-center">
              <Newspaper
                className="mx-auto text-brand-600"
                size={32}
                aria-hidden="true"
              />
              <h2 className="mt-4 font-serif text-3xl font-medium text-gray-900">
                Belum ada berita
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Berita untuk kategori ini belum tersedia.
              </p>
            </section>
          )}
        </section>

        {data && totalPages > 1 && (
          <nav
            className="mt-16 flex flex-col-reverse items-center gap-6 border-t border-gray-200 py-8 sm:flex-row sm:justify-between"
            aria-label="Navigasi halaman berita"
          >
            <button
              type="button"
              onClick={() => updateSearchParams({ page: page - 1, category })}
              disabled={page === 1}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition-colors hover:text-brand-600 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:text-gray-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
            >
              <ChevronLeft
                size={16}
                className="transition-transform group-enabled:group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              Terbaru
            </button>

            <ul className="flex items-center gap-1">
              {getPageItems(page, totalPages).map((item, index) =>
                item === "gap" ? (
                  <li
                    key={`gap-${index}`}
                    aria-hidden="true"
                    className="px-2 text-sm text-gray-300"
                  >
                    &hellip;
                  </li>
                ) : (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() =>
                        updateSearchParams({ page: item, category })
                      }
                      aria-current={page === item ? "page" : undefined}
                      className={`h-9 w-9 rounded-md text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                        page === item
                          ? "bg-brand-500 text-white shadow-sm shadow-brand-500/20"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ),
              )}
            </ul>

            <button
              type="button"
              onClick={() => updateSearchParams({ page: page + 1, category })}
              disabled={page === totalPages}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition-colors hover:text-brand-600 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:text-gray-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
            >
              Berikutnya
              <ChevronRight
                size={16}
                className="transition-transform group-enabled:group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </nav>
        )}
      </div>
    </main>
  );
}
