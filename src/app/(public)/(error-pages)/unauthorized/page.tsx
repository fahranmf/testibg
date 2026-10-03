import GridShape from "@/components/common/GridShape";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Unauthorized",
  description: "Anda tidak memiliki akses ke halaman ini",
};

export default function Unauthorized() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
      <GridShape />
      <div className="mx-auto w-full max-w-[472px] text-center">
        <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
          403
        </h1>

        <p className="mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
          Anda tidak memiliki akses ke halaman ini.
        </p>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          Kembali ke Dashboard
        </Link>
      </div>
      <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
        &copy; {new Date().getFullYear()} - UDD PMI Depok
      </p>
    </div>
  );
}
