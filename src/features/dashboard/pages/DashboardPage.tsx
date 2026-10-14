"use client";

import {
  Activity,
  CalendarDays,
  HeartHandshake,
  Mail,
  MapPin,
  Newspaper,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

import PageHeader from "@/components/ui/page-header/PageHeader";
import MetricCard from "@/components/ui/metric-card/MetricCard";

import { useDashboard } from "../hooks/useDashboard";
import StockCard from "../components/StockCard";
import StatusDonut from "../components/StatusDonut";
import RecentList from "../components/RecentList";
import StatusBadge from "../components/StatusBadge";
import type {
  RecentNewsItem,
  RecentActivityItem,
  UpcomingDonorEvent,
} from "../dashboard.types";

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-[132px] animate-pulse rounded-xl border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.025]"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="h-[280px] animate-pulse rounded-xl border border-gray-200 bg-white xl:col-span-2 dark:border-white/[0.07] dark:bg-white/[0.025]" />
        <div className="h-[280px] animate-pulse rounded-xl border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.025]" />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-[320px] animate-pulse rounded-xl border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.025]"
          />
        ))}
      </div>
      <div className="h-[320px] animate-pulse rounded-xl border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.025]" />
    </div>
  );
}

export default function DashboardPage() {
  const { data, isLoading, isFetching, isError, refetch } = useDashboard();

  const summary = data?.summary;

  return (
    <main className="mx-auto w-full space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        isFetching={isFetching}
        isLoading={isLoading}
      />

      {isLoading ? (
        <DashboardSkeleton />
      ) : isError || !summary ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-10 text-center dark:border-white/[0.07] dark:bg-white/[0.025]">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Gagal memuat data dashboard
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Periksa koneksi lalu coba lagi.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 active:scale-[0.98] dark:bg-brand-500 dark:hover:bg-brand-600"
          >
            Coba lagi
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              icon={<Newspaper className="size-5" />}
              label="Total Berita"
              value={summary.news.total}
              helperText={`${summary.news.published} published`}
            />
            <MetricCard
              icon={<Activity className="size-5" />}
              label="Total Aktivitas"
              value={summary.activities.total}
              helperText={`${summary.activities.published} published`}
            />
            <MetricCard
              icon={<HeartHandshake className="size-5" />}
              label="Event Mendatang"
              value={summary.donorEvents.upcoming}
              helperText="terjadwal"
            />
            <MetricCard
              icon={<Mail className="size-5" />}
              label="Pesan Belum Dibaca"
              value={summary.contactMessages.unread}
              trend={
                summary.contactMessages.unread > 0
                  ? { direction: "up", label: "Perlu ditinjau" }
                  : undefined
              }
              helperText={summary.contactMessages.unread === 0 ? "Bersih" : undefined}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <StockCard bloodStock={data.bloodStock} />
            </div>
            <StatusDonut
              news={summary.news}
              activities={summary.activities}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <RecentList
              icon={<Newspaper className="size-4" />}
              title="Berita Terbaru"
              viewAllHref="/news"
              items={data.recentNews}
              emptyText="Belum ada berita."
              renderItem={(item: RecentNewsItem) => (
                <li key={item.newsId}>
                  <Link
                    href={`/news/${item.newsId}`}
                    className="flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-gray-50/60 dark:hover:bg-white/[0.02]"
                  >
                    <div className="relative h-12 w-[52px] shrink-0 overflow-hidden rounded-lg border border-gray-200/80 bg-gray-100 dark:border-white/[0.07] dark:bg-white/4">
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          sizes="72px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-300 dark:text-gray-600">
                          <Newspaper className="size-4" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-800 dark:text-white/90">
                        {item.title}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <StatusBadge status={item.status} />
                        <span className="text-xs text-gray-400">
                          {item.publishedAt
                            ? new Intl.DateTimeFormat("id-ID", {
                                dateStyle: "medium",
                              }).format(new Date(item.publishedAt))
                            : "-"}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              )}
            />

            <RecentList
              icon={<CalendarDays className="size-4" />}
              title="Event Donor Mendatang"
              viewAllHref="/donor-events"
              items={data.upcomingDonorEvents}
              emptyText="Belum ada event mendatang."
              renderItem={(event: UpcomingDonorEvent) => (
                <li key={event.donorEventId}>
                  <Link
                    href={`/donor-events/${event.donorEventId}`}
                    className="flex items-start gap-3.5 px-5 py-3.5 transition-colors hover:bg-gray-50/60 dark:hover:bg-white/[0.02]"
                  >
                    <div className="flex w-12 shrink-0 flex-col items-center rounded-lg border border-gray-200/80 bg-gray-50 py-1.5 dark:border-white/[0.07] dark:bg-white/[0.03]">
                      <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
                        {new Intl.DateTimeFormat("id-ID", {
                          month: "short",
                        }).format(new Date(event.startAt))}
                      </span>
                      <span className="text-base font-bold leading-tight text-gray-900 dark:text-white">
                        {new Intl.DateTimeFormat("id-ID", {
                          day: "numeric",
                        }).format(new Date(event.startAt))}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-800 dark:text-white/90">
                        {event.title}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="size-3.5" />
                          {new Intl.DateTimeFormat("id-ID", {
                            timeStyle: "short",
                          }).format(new Date(event.startAt))}
                        </span>
                        <span className="inline-flex min-w-0 items-center gap-1">
                          <MapPin className="size-3.5 shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              )}
            />

            <RecentList
              icon={<Activity className="size-4" />}
              title="Aktivitas Terbaru"
              viewAllHref="/activities"
              items={data.recentActivities}
              emptyText="Belum ada aktivitas."
              renderItem={(item: RecentActivityItem) => (
                <li key={item.activityId}>
                  <Link
                    href={`/activities/${item.activityId}`}
                    className="flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-gray-50/60 dark:hover:bg-white/[0.02]"
                  >
                    <div className="relative h-12 w-[52px] shrink-0 overflow-hidden rounded-lg border border-gray-200/80 bg-gray-100 dark:border-white/[0.07] dark:bg-white/4">
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          sizes="72px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-300 dark:text-gray-600">
                          <Activity className="size-4" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-800 dark:text-white/90">
                        {item.title}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <StatusBadge status={item.status} />
                        <span className="text-xs text-gray-400">
                          {new Intl.DateTimeFormat("id-ID", {
                            dateStyle: "medium",
                          }).format(new Date(item.eventDate))}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              )}
            />
          </div>

        </>
      )}
    </main>
  );
}
