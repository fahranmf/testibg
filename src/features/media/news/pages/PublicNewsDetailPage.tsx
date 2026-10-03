"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

import { PUBLIC_NEWS_CATEGORY_LABELS } from "../news.types";
import { formatNewsDate } from "../news.utils";
import { usePublicNewsDetail } from "../hooks/usePublicNews";
import NewsImage from "../components/NewsImage";

function BackLink() {
  return (
    <Link
      href="/media/news"
      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      Semua berita
    </Link>
  );
}

export default function PublicNewsDetailPage({ slug }: { slug: string }) {
  const { data: news, isLoading, isError, refetch } = usePublicNewsDetail(slug);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14">
          <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
          <div className="mt-10 h-3 w-32 animate-pulse rounded bg-gray-200" />
          <div className="mt-5 h-14 w-11/12 animate-pulse rounded bg-gray-200" />
          <div className="mt-4 h-14 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="mt-10 aspect-[16/9] animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-10 space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-4 animate-pulse rounded bg-gray-200"
                style={{ width: `${100 - (index % 3) * 8}%` }}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError || !news) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14">
          <BackLink />
          <section className="mt-16 max-w-lg border-y border-error-200 py-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
              Media Center
            </span>
            <h1 className="mt-4 font-serif text-4xl font-medium leading-tight text-gray-900 sm:text-5xl">
              Berita tidak ditemukan
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              Artikel mungkin telah dihapus atau belum dipublikasikan.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/media/news"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
              >
                Lihat semua berita
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
      <article
        className="mx-auto max-w-6xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14"
        aria-labelledby="article-title"
      >
        <BackLink />

        <header className="mt-10 max-w-4xl border-b-2 border-gray-900 pb-9 lg:mt-12 lg:pb-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <span className="text-brand-600">
              {PUBLIC_NEWS_CATEGORY_LABELS[news.category]}
            </span>
            <span className="h-px w-5 bg-gray-300" aria-hidden="true" />
            <time
              dateTime={news.publishedAt}
              className="font-medium normal-case tracking-normal text-gray-400"
            >
              {formatNewsDate(news.publishedAt)}
            </time>
          </div>

          <h1
            id="article-title"
            className="mt-5 text-balance font-serif text-4xl font-medium leading-[1.03] tracking-[-0.02em] text-gray-900 sm:text-5xl lg:text-[3.5rem]"
          >
            {news.title}
          </h1>

          {news.excerpt && (
            <div className="mt-6 border-l-2 border-brand-500 bg-gray-50/70 py-1 pl-4 dark:bg-white/[0.02]">
              <p className="max-w-2xl text-lg leading-relaxed text-gray-500">
                {news.excerpt}
              </p>
            </div>
          )}
        </header>

        <div className="mt-8 overflow-hidden rounded-lg bg-brand-50 shadow-theme-lg lg:mt-10">
          <NewsImage
            src={news.thumbnail}
            alt={news.title}
            loading="eager"
            className="aspect-[16/9] h-full w-full object-contain"
          />
        </div>

        <div className="mt-10 max-w-[68ch] whitespace-pre-wrap font-serif text-lg leading-[1.8] text-gray-700 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[4.25rem] first-letter:font-medium first-letter:leading-[0.75] first-letter:text-brand-600 selection:bg-brand-100 lg:mt-12 lg:text-[1.15rem]">
          {news.content.trim()}
        </div>

        <footer className="mt-16 max-w-[68ch] border-t border-gray-200 pt-7">
          <BackLink />
        </footer>
      </article>
    </main>
  );
}
