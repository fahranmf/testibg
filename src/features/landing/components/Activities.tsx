import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

const activities = [
  {
    image:
      "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=800&q=80",
    date: "20 September 2026",
    title: "Donor Darah Serentak Bersama Komunitas Pendonor Depok",
    description:
      "Kolaborasi UDD PMI Depok dengan komunitas dan kampus untuk menjaga cadangan darah lokal.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    date: "18 September 2026",
    title: "Penyaluran Darah ke RSUD dan Rumah Sakit Rujukan",
    description:
      "Distribusi kantong darah ke fasilitas kesehatan di Kota Depok untuk pasien gawat darurat.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
    date: "15 September 2026",
    title: "Edukasi Donor Darah Aman untuk Pelajar dan Mahasiswa",
    description:
      "Sosialisasi syarat, prosedur, dan manfaat donor darah sejak dini di sekolah se-Kota Depok.",
  },
];

export default function LatestActivities() {
  return (
    <section id="kegiatan" className="bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header Section */}
        <div className="max-w-2xl">
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
            <span className="h-px w-6 bg-brand-600" />
            Aktivitas Terkini
          </span>
          <h2 className="font-serif text-3xl font-medium leading-[1.15] text-gray-900 lg:text-4xl">
            Kegiatan Terbaru
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-gray-500">
            Dokumentasi dan berita seputar kegiatan donor darah serta operasional
            UDD PMI Kota Depok.
          </p>
        </div>

        {/* Grid Kegiatan */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((item) => (
            <Link key={item.title} href="#" className="group flex flex-col h-full">
              {/* flex flex-col h-full bikin kontainer dalam ngisi tinggi maksimal */}
              <div className="flex flex-col h-full border-b-2 border-brand-600 pb-5">
                <div className="overflow-hidden rounded">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Tanggal */}
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-400">
                  <Calendar size={14} className="text-brand-600" />
                  <span>{item.date}</span>
                </div>

                {/* Judul Kegiatan */}
                <h3 className="mt-2 line-clamp-2 font-serif text-xl font-medium text-gray-900 transition-colors duration-200 group-hover:text-brand-600">
                  {item.title}
                </h3>

                {/* Deskripsi - diberi flex-1 buat ngisi sisa ruang kosong */}
                <p className="mt-2 flex-1 line-clamp-2 text-[15px] leading-relaxed text-gray-500">
                  {item.description}
                </p>

                {/* Link Action - otomatis kegeser ke paling bawah */}
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-600 transition-all duration-200 group-hover:gap-3">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}