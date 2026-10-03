"use client";

import { usePublicBloodStock } from "@/features/blood-stock/hooks/useBloodStock";

const bloodTypes = [
  { type: "A+", bloodType: "A", rhesus: "POSITIVE" },
  { type: "A-", bloodType: "A", rhesus: "NEGATIVE" },
  { type: "B+", bloodType: "B", rhesus: "POSITIVE" },
  { type: "B-", bloodType: "B", rhesus: "NEGATIVE" },
  { type: "AB+", bloodType: "AB", rhesus: "POSITIVE" },
  { type: "AB-", bloodType: "AB", rhesus: "NEGATIVE" },
  { type: "O+", bloodType: "O", rhesus: "POSITIVE" },
  { type: "O-", bloodType: "O", rhesus: "NEGATIVE" },
] as const;

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export default function BloodStock() {
  const { data: bloodStocks, isLoading, isError } = usePublicBloodStock();
  const latestUpdatedAt = bloodStocks?.reduce<string | undefined>(
    (latest, bloodStock) =>
      !latest || bloodStock.updatedAt > latest ? bloodStock.updatedAt : latest,
    undefined,
  );

  return (
    <section
      id="stok"
      className="relative overflow-hidden bg-white py-20 lg:py-28"
    >

      {/* 1. Subtle Radial Dot Pattern (Fades out at borders) */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_10%,#000_70%,transparent_100%)] opacity-70" />

      {/* 2. Soft Glow Color Brand (Top Right & Bottom Left) */}
      <div className="pointer-events-none absolute -top-24 -right-24 z-0 h-96 w-96 rounded-full bg-brand-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 z-0 h-96 w-96 rounded-full bg-brand-500/5 blur-3xl" />

      {/* Content Main */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
              <span className="h-px w-8 bg-brand-600" />
              Stok Darah
            </span>
            <h2 className="max-w-lg text-3xl font-medium leading-[1.15] text-gray-900 lg:text-4xl">
              Cek Ketersediaan{" "}
              <span className="relative inline-block font-outfit font-semibold text-brand-600">
                <span className="absolute inset-x-0 bottom-0.5 -z-0 h-3 -rotate-1 rounded-sm bg-brand-100" />
                <span className="relative z-10">Stok Darah</span>
              </span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-gray-500">
              Data stok darah di UDD PMI Kota Depok diperbarui secara berkala.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 overflow-hidden rounded-lg border border-gray-200/80 bg-gray-200/80 shadow-sm">
          <div className="grid grid-cols-2 gap-px sm:grid-cols-4">
            {bloodTypes.map((bt) => {
              const bloodStock = bloodStocks?.find(
                (item) =>
                  item.bloodType === bt.bloodType && item.rhesus === bt.rhesus,
              );
              const isOut = bloodStock?.stock === 0;
              return (
                <div
                  key={bt.type}
                  className="group relative flex flex-col justify-between bg-white p-6 transition-all duration-300 hover:bg-gray-50/80 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-2xl font-medium ${
                        isOut ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      {bt.type}
                    </span>
                  </div>

                  <div className="mt-8 flex items-baseline gap-1.5">
                    {isLoading ? (
                      <span className="h-8 w-20 animate-pulse rounded bg-gray-100" />
                    ) : isOut ? (
                      <span className="text-sm font-medium tracking-wide text-gray-400">
                        Kosong
                      </span>
                    ) : isError || !bloodStock ? (
                      <span className="text-sm font-medium tracking-wide text-gray-400">
                        Tidak tersedia
                      </span>
                    ) : (
                      <>
                        <span className="text-3xl font-semibold tracking-tight text-gray-900">
                          {bloodStock.stock}
                        </span>
                        <span className="text-sm text-gray-500">kantong</span>
                      </>
                    )}
                  </div>

                  {/* Line Accent Red */}
                  <div
                    className={`absolute bottom-0 left-0 w-full transition-all duration-300 ${
                      isOut
                        ? "h-0 bg-transparent"
                        : "h-[2px] bg-brand-500 group-hover:h-[3px] group-hover:bg-brand-600"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-right text-xs text-gray-400">
          {latestUpdatedAt
            ? `Terakhir diperbarui: ${dateTimeFormatter.format(new Date(latestUpdatedAt))} WIB`
            : isLoading
              ? "Memuat stok darah..."
              : "Waktu pembaruan tidak tersedia"}
        </p>
      </div>
    </section>
  );
}
