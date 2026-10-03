import Link from "next/link";
import {
  Newspaper,
  ArrowRight,
  Calendar,
  Camera,
  ChevronRight,
  MapPin,
} from "lucide-react";

const berita = {
  href: "/media/news",
  image:
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&q=80",
  date: "20 September 2026",
  title: "UDD PMI Depok Salurkan 200 Kantong Darah ke RSUD Kota Depok",
  description:
    "Penyaluran darah rutin ini memastikan ketersediaan stok untuk pasien gawat darurat di RSUD Kota Depok dan rumah sakit rujukan lainnya.",
};

const sorotan = {
  title: "Setiap kantong darah memulai harapan baru",
  description:
    "Potret kebersamaan pendonor, relawan, dan petugas UDD PMI Depok dalam menjaga ketersediaan darah bagi sesama.",
  images: {
    primary:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=900&q=85",
    secondary:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&q=85",
    detail:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=85",
  },
};

const aksiPmi = {
  title: "Pendonor muda berbagi harapan di Unit Donor Darah",
  date: "20 September 2026",
  location: "UDD PMI Kota Depok",
  image:
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&q=85",
};

export default function MediaCenter() {
  return (
    <section
      id="media"
      className="relative overflow-hidden bg-white py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-20 bottom-1/4 z-0 h-72 w-72 rounded-full bg-brand-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
              <span className="h-px w-8 bg-brand-600" />
              Media Center
            </span>
            <h2 className="text-3xl font-medium leading-[1.15] text-gray-900 lg:text-4xl">
              Pusat Informasi
              & Dokumentasi
            </h2>
          </div>
          <Link
            href="/media/news"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            Jelajahi Berita
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Three distinct entry points, not a simulated content feed. */}
        <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:items-stretch">

          {/* ─── BERITA — primary editorial story ─── */}
          <Link
            href={berita.href}
            className="group relative flex overflow-hidden rounded-lg bg-gray-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 lg:col-span-7 lg:min-h-[560px]"
          >
            <div className="flex w-full flex-col lg:block">
              <div className="relative aspect-[16/10] overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
                <img
                  src={berita.image}
                  alt={berita.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/35 to-transparent" />
              </div>

              <div className="relative bg-gray-950 p-6 sm:p-7 lg:absolute lg:inset-x-0 lg:bottom-0 lg:bg-transparent lg:p-9">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                  <Newspaper size={12} />
                  Berita Utama
                </span>
                <h3 className="mt-4 max-w-xl font-serif text-2xl font-medium leading-[1.08] text-white sm:text-3xl lg:text-[2.1rem]">
                  {berita.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 sm:text-[15px]">
                  {berita.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/55">
                    <Calendar size={13} />
                    {berita.date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-white transition-all duration-200 group-hover:gap-2">
                    Baca Selengkapnya
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <div className="grid gap-5 lg:col-span-5 lg:grid-rows-2">
            {/* ─── AKSI UDD — fixed activity entry point ─── */}
            <Link
              href="/media/activities"
              className="group grid overflow-hidden rounded-lg border border-gray-200 bg-gray-50 transition-colors hover:border-brand-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 sm:grid-cols-[0.88fr_1.12fr] lg:grid-cols-[0.8fr_1.2fr]"
            >
              <div className="relative min-h-52 overflow-hidden sm:min-h-full">
                <img
                  src={aksiPmi.image}
                  alt="Relawan UDD PMI dalam kegiatan bersama masyarakat"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/55 to-transparent sm:bg-gradient-to-r" />
              </div>
              <div className="flex flex-col p-6 sm:p-7">
                <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                  <span className="h-px w-5 bg-brand-600" />
                  Aksi UDD
                </span>
                <h3 className="mt-3 font-serif text-xl font-medium leading-tight text-gray-900 lg:text-2xl">
                  {aksiPmi.title}
                </h3>
                <div className="mt-4 space-y-1.5 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-brand-600" />
                    {aksiPmi.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-brand-600" />
                    {aksiPmi.location}
                  </span>
                </div>
                <span className="mt-auto pt-5 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 transition-all duration-200 group-hover:gap-2">
                  Lihat kegiatan UDD
                  <ChevronRight size={14} />
                </span>
              </div>
            </Link>

            {/* ─── SOROTAN — static photo story ─── */}
            <Link
              href="/media/gallery"
              className="group relative flex min-h-[360px] overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 sm:min-h-[300px]"
            >
              <div className="grid w-full grid-cols-[1.35fr_0.65fr] gap-1.5">
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={sorotan.images.primary}
                      alt="Petugas UDD PMI menyiapkan layanan donor darah"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="grid grid-rows-2 gap-1.5">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={sorotan.images.secondary}
                      alt="Kegiatan donor darah UDD PMI Kota Depok"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={sorotan.images.detail}
                      alt="Dokumentasi kegiatan petugas UDD PMI"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/65 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
                  <Camera size={13} />
                  Sorotan Dokumentasi
                </span>
                <h3 className="mt-2 max-w-sm font-serif text-2xl font-medium leading-tight text-white">
                  {sorotan.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-white transition-all duration-200 group-hover:gap-2">
                  Lihat dokumentasi
                  <ChevronRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
