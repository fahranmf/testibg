"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const requirements = [
  { value: "17–60", label: "UMUR", detail: "tahun saat berdonor" },
  { value: "45 kg", label: "BERAT", detail: "berat badan minimum" },
  { value: "Sehat", label: "KONDISI", detail: "cukup istirahat & fit" },
  { value: "3 Bulan", label: "JEDA", detail: "jarak donor terakhir" },
];

const steps = [
  {
    num: "01",
    title: "Registrasi & Formulir",
    desc: "Siapkan KTP atau identitas resmi, lalu isi formulir riwayat kesehatan dengan jujur.",
  },
  {
    num: "02",
    title: "Pemeriksaan Medis",
    desc: "Petugas memeriksa tekanan darah, hemoglobin, berat badan, serta kondisi fisik dasar.",
  },
  {
    num: "03",
    title: "Pengambilan Darah",
    desc: "Proses berlangsung sekitar 10 menit menggunakan peralatan steril sekali pakai.",
  },
  {
    num: "04",
    title: "Pemulihan Ringan",
    desc: "Nikmati kudapan dan minum air secukupnya. Hindari aktivitas berat sesaat setelah donor.",
  },
];

const faqs = [
  {
    question: "Apakah donor darah aman?",
    answer:
      "Sangat aman. Semua peralatan yang bersentuhan dengan pendonor bersifat steril, sekali pakai, dan sesuai standar medis UDD PMI.",
  },
  {
    question: "Di mana saya bisa melakukan donor darah?",
    answer:
      "Anda dapat datang langsung ke Markas / UDD PMI Kota Depok atau mengecek jadwal donor keliling (Mobil Unit) yang rutin hadir di berbagai pusat kegiatan.",
  },
  {
    question: "Apakah perlu berpuasa sebelum donor?",
    answer:
      "Tidak perlu. Anda justru dianjurkan makan ringan 3–4 jam sebelumnya dan minum cukup air putih.",
  },
  {
    question: "Bagaimana jika sedang minum obat?",
    answer:
      "Sampaikan jenis obat kepada petugas. Kelayakan donor akan ditentukan langsung saat sesi pemeriksaan awal.",
  },
  {
    question: "Berapa lama proses keseluruhan?",
    answer:
      "Rata-rata 30–45 menit dari awal registrasi hingga selesai pemulihan ringan.",
  },
];

export default function DonorGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="panduan-donor" className="bg-gray-50 py-20 text-gray-900 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col gap-6 border-b border-gray-200 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
              <span className="h-px w-8 bg-brand-600" />
              Panduan Donor
            </span>
            <h2 className="max-w-xl text-3xl font-medium leading-[1.15] text-gray-900 lg:text-4xl">
              Persyaratan & Prosedur
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-gray-500">
            Cek kelayakan dasar Anda sebelum mendatangi UDD atau memilih jadwal
            donor keliling.
          </p>
        </div>

        {/* REQUIREMENTS MATRIX */}
        <div className="mt-10 overflow-hidden border border-brand-900 bg-brand-900 text-white">
          <div className="grid grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0">
            {requirements.map((req) => (
              <div key={req.label} className="p-6 sm:p-8">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-300">
                  {req.label}
                </span>
                <div className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {req.value}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/65">
                  {req.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 bg-white/[0.02] px-6 py-4 sm:flex-row sm:items-center sm:px-8">
            <span className="text-xs text-white/70">
              Pemeriksaan kelayakan akhir tetap dilakukan langsung oleh petugas medis UDD PMI.
            </span>
            <Link
              href="#jadwal"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-200 transition-colors hover:text-white"
            >
              LIHAT JADWAL DONOR
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* COMBINED SECTION: ALUR (LEFT) + FAQ (RIGHT) */}
        <div className="mt-20 lg:mt-24">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
            
            {/* LEFT COLUMN: ALUR DI LOKASI */}
            <div className="lg:col-span-5">
              <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                  <span className="h-px w-6 bg-brand-600" />
                  Alur di Lokasi
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
                  4 Tahap
                </span>
              </div>

              {/* Continuous Editorial Rail */}
              <div className="relative border-l border-gray-200 pl-6 my-2">
                {steps.map((step) => (
                  <div key={step.num} className="group relative pb-8 last:pb-0">
                    {/* Interactive Node Dot */}
                    <div className="absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-gray-300 ring-1 ring-gray-200 transition-all duration-300 group-hover:scale-125 group-hover:bg-brand-600 group-hover:ring-brand-600/30" />

                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs font-bold tracking-wider text-brand-600">
                        {step.num}.
                      </span>
                      <h3 className="text-sm font-semibold text-gray-900 transition-colors duration-200 group-hover:text-brand-600">
                        {step.title}
                      </h3>
                    </div>

                    <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: PERTANYAAN UMUM */}
            <div className="lg:col-span-7">
              <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                  <span className="h-px w-6 bg-brand-600" />
                  Pertanyaan Umum
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
                  FAQ
                </span>
              </div>

              <div className="divide-y divide-gray-200 border-b border-gray-200">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={faq.question} className="py-5">
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="flex w-full items-center justify-between text-left transition-colors hover:text-brand-600"
                      >
                        <span className={`text-sm sm:text-base font-medium transition-colors ${isOpen ? "text-brand-600" : "text-gray-900"}`}>
                          {faq.question}
                        </span>
                        <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center font-mono text-lg font-light text-gray-400">
                          <span className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-600" : ""}`}>
                            {isOpen ? "−" : "+"}
                          </span>
                        </span>
                      </button>

                      {/* Smooth CSS Grid Height Transition */}
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100 pt-3"
                            : "grid-rows-[0fr] opacity-0 pt-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-xs sm:text-sm leading-relaxed text-gray-500">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}