"use client";

import { FormEvent, useState } from "react";
import { Send, CheckCircle2, Phone, Mail } from "lucide-react";
import { useCreateContactMessage } from "@/features/contact-message/hooks/useContactMessageMutations";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { mutate: createContactMessage, isPending } = useCreateContactMessage();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    createContactMessage(
      {
        name: String(formData.get("name")),
        email: String(formData.get("email")),
        phone: String(formData.get("phone")),
        subject: String(formData.get("subject")),
        message: String(formData.get("message")),
      },
      { onSuccess: () => setSubmitted(true) },
    );
  };

  return (
    <section
      id="kontak"
      className="relative overflow-hidden bg-gray-50 py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 z-0 h-96 w-96 rounded-full border border-brand-500/10" />
      <div className="pointer-events-none absolute -left-20 bottom-1/4 z-0 h-72 w-72 rounded-full bg-brand-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
            <span className="h-px w-8 bg-brand-600" />
            Hubungi Kami
            <span className="h-px w-8 bg-brand-600" />
          </span>
          <h2 className="text-3xl font-medium leading-[1.15] text-gray-900 lg:text-4xl">
            Kirim Pesan ke{" "}
            <span className="relative inline-block font-outfit font-semibold text-brand-600">
              <span className="absolute inset-x-0 bottom-0.5 -z-0 h-3 -rotate-1 rounded-sm bg-brand-100" />
              <span className="relative z-10">UDD PMI Depok</span>
            </span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-gray-500">
            Pertanyaan, saran, atau kebutuhan layanan? Tulis di sini dan tim
            kami akan segera merespons.
          </p>
        </div>

        {/* Card — two-zone */}
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="grid lg:grid-cols-[1fr_1.4fr]">
            {/* Left — brand accent panel */}
            <div className="relative flex flex-col justify-center bg-brand-900 p-8 sm:p-10 lg:p-12">
              {/* Decorative circles */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full border border-white/10" />

              <div className="relative z-10">
                <h3 className="font-serif text-2xl font-medium text-white lg:text-[28px] lg:leading-[1.2]">
                  Butuh Bantuan{"\n"}Segera?
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  Hubungi kami langsung untuk pertanyaan mendesak atau
                  keadaan darurat medis.
                </p>
              </div>

              <div className="relative z-10 mt-10 space-y-4">
                <a
                  href="tel:+622187927210"
                  className="group flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-white/20">
                    <Phone size={15} strokeWidth={1.5} />
                  </span>
                  (021) 8792 7210
                </a>
                <a
                  href="mailto:info@pmikotadepok.or.id"
                  className="group flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-white/20">
                    <Mail size={15} strokeWidth={1.5} />
                  </span>
                  info@pmikotadepok.or.id
                </a>
              </div>

              {/* <div className="relative z-10 mt-10 rounded-lg bg-white/10 px-4 py-3">
                <p className="text-xs font-semibold text-white">Darurat 118</p>
                <p className="mt-0.5 text-xs text-white/60">
                  24 jam untuk keadaan gawat darurat
                </p>
              </div> */}
            </div>

            {/* Right — form */}
            <div className="p-8 sm:p-10 lg:p-12">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-50">
                    <CheckCircle2
                      size={32}
                      className="text-success-500"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    Pesan Terkirim!
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
                    Terima kasih telah menghubungi kami. Tim akan segera
                    merespons pesan Anda.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 transition-all hover:border-brand-300 hover:bg-brand-100"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Nama Anda"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(183,28,28,0.08)]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="email@gmail.com"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(183,28,28,0.08)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
                    >
                      Nomor Telepon <span className="normal-case">(opsional)</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      maxLength={20}
                      placeholder="08xx xxxx xxxx"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(183,28,28,0.08)]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
                    >
                      Subjek
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="Perihal pesan Anda"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(183,28,28,0.08)]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
                    >
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tuliskan pesan Anda di sini..."
                      className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(183,28,28,0.08)]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-brand-700 hover:shadow-md active:bg-brand-800 active:shadow-sm disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {isPending ? "Mengirim..." : "Kirim Pesan"}
                    <Send size={15} strokeWidth={2} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
