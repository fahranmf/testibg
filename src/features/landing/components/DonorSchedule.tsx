"use client";

import Link from "next/link";
import { MapPin, Clock, ArrowUpRight, RefreshCw } from "lucide-react";
import { usePublishedDonorEvents } from "@/features/donor-event/hooks/usePublishedDonorEvents";

function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    day: d.getDate().toString().padStart(2, "0"),
    month: d.toLocaleDateString("id-ID", { month: "short" }).toUpperCase(),
  };
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function DonorSchedule() {
  const {
    data: events,
    isLoading,
    isError,
    refetch,
  } = usePublishedDonorEvents();

  return (
    <section
      id="jadwal"
      className="relative overflow-hidden bg-white py-20 lg:py-28 text-gray-900"
    >
      {/* BACKGROUND ACCENTS */}
      {/* 1. Concentric Ring Geometry (Border Tebal & Opacity Dinaikin) */}
      <div className="pointer-events-none absolute -right-24 -top-24 z-0 h-96 w-96 rounded-full border border-brand-500/15 sm:h-[500px] sm:w-[500px]" />
      <div className="pointer-events-none absolute -right-48 -top-48 z-0 h-[650px] w-[650px] rounded-full border border-brand-500/10" />
      {/* 2. Soft Red Glow di Kiri */}
      <div className="pointer-events-none absolute -left-20 top-1/3 z-0 h-72 w-72 rounded-full bg-red-500/5 blur-3xl" />

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Layout */}
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
              <span className="h-px w-8 bg-brand-600" />
              Mobil Unit
            </span>
            <h2 className="max-w-lg text-3xl font-medium leading-[1.15] text-gray-900 lg:text-4xl">
              Jadwal{" "}
              <span className="relative inline-block font-outfit font-semibold text-brand-600">
                <span className="absolute inset-x-0 bottom-0.5 -z-0 h-3 -rotate-1 rounded-sm bg-brand-100" />
                <span className="relative z-10">Donor Darah</span>
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-gray-500">
            Jadwal kegiatan donor darah keliling di wilayah Kota Depok. Hadir
            dan bagikan kebaikan untuk sesama.
          </p>
        </div>

        {/* Schedule List */}
        <div className="mt-4">
          {isLoading ? (
            <div className="divide-y divide-gray-100">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="py-8 animate-pulse flex items-center justify-between"
                >
                  <div className="h-12 w-16 bg-gray-100 rounded-md" />
                  <div className="h-6 w-1/2 bg-gray-100 rounded-md" />
                  <div className="h-6 w-20 bg-gray-100 rounded-md" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="border-b border-error-200 py-12 text-center">
              <p className="text-sm font-medium text-gray-700">
                Jadwal donor belum dapat dimuat.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-brand-600 transition-colors hover:border-brand-200 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
              >
                <RefreshCw size={15} aria-hidden="true" />
                Coba lagi
              </button>
            </div>
          ) : events && events.length > 0 ? (
            <div className="divide-y divide-gray-200 border-b border-gray-200">
              {events.map((event) => {
                const { day, month } = formatDate(event.startAt);
                const startTime = formatTime(event.startAt);
                const endTime = formatTime(event.endAt);

                return (
                  <Link
                    key={event.id}
                    href={`/jadwal-donor/${event.slug}`}
                    className="group relative flex flex-col gap-6 py-7 transition-colors duration-200 hover:bg-gray-50/80 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    {/* Left Accent Bar */}
                    <div className="absolute left-0 top-0 hidden h-full w-[3px] bg-brand-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block" />

                    <div className="flex items-start gap-6 sm:items-center sm:gap-8">
                      {/* Date Block */}
                      <div className="flex min-w-[64px] flex-col items-center justify-center rounded-xl bg-gray-100/80 px-3 py-2.5 text-center transition-colors group-hover:bg-brand-50">
                        <span className="font-mono text-2xl font-bold tracking-tight text-gray-900 group-hover:text-brand-600">
                          {day}
                        </span>
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-500 group-hover:text-brand-600/80">
                          {month}
                        </span>
                      </div>

                      {/* Main Info */}
                      <div className="min-w-0">
                        <h2 className="text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-brand-600 sm:text-xl">
                          {event.title}
                        </h2>

                        <div className="mt-1.5 flex flex-col gap-1.5 text-xs font-medium text-gray-500">
                          {/* Location */}
                          <div className="flex items-start gap-1.5">
                            <MapPin
                              size={14}
                              className="mt-0.5 shrink-0 text-gray-400 transition-colors group-hover:text-brand-600"
                            />

                            <span className="max-w-xl leading-relaxed">
                              {event.location}
                              {event.address && (
                                <span className="font-normal text-gray-400">
                                  {" "}
                                  — {event.address}
                                </span>
                              )}
                            </span>
                          </div>

                          {/* Time */}
                          <div className="flex items-center gap-1.5 font-mono text-gray-600">
                            <Clock
                              size={14}
                              className="shrink-0 text-gray-400 transition-colors group-hover:text-brand-600"
                            />

                            <span>
                              {startTime} – {endTime} WIB
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Tag & Action */}
                    <div className="flex items-center justify-between gap-3 pt-2 sm:border-t-0 sm:pt-0 sm:justify-end">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-600 transition-colors group-hover:bg-brand-100 group-hover:text-brand-600">
                        Mobil Unit
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-all group-hover:bg-brand-600 group-hover:text-white">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center border-b border-gray-200">
              <p className="text-sm font-medium text-gray-500">
                Belum ada jadwal donor darah terdekat.
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Pantau terus halaman ini untuk pembaruan lokasi dan waktu.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
