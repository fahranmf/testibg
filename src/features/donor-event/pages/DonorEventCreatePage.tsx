import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import DonorEventForm from "../components/DonorEventForm";

export default function DonorEventCreatePage() {
  return (
    <div className="mx-auto w-full space-y-6">
      {/* Navigation */}
      <div className="mb-5 flex items-center justify-between">
        <Link
          href="/donor-events"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-300"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Kembali ke daftar
        </Link>

        <span className="hidden text-xs font-medium uppercase tracking-[0.12em] text-gray-400 dark:text-gray-600 sm:block">
          Create Donor Event
        </span>
      </div>

      {/* Header */}
      <div className="overflow-hidden">
        <div className="space-y-1.5">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            Tambah Donor Event Baru
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Lengkapi informasi jadwal donor darah, lokasi, serta kontak yang
            dapat dihubungi.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.07] dark:bg-white/[0.025]">
        <DonorEventForm mode="create" />
      </div>
    </div>
  );
}
