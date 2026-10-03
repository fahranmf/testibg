import Link from "next/link";

export default function QuoteSection() {
  return (
    <section id="quote" className="bg-brand-25 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">
          <span className="h-px w-8 bg-brand-600" />
          Tentang Kami
          <span className="h-px w-8 bg-brand-600" />
        </span>
        <blockquote className="font-serif text-2xl font-medium leading-relaxed italic text-gray-800 sm:text-3xl lg:text-4xl lg:leading-[1.3]">
          &ldquo;Seperti Depok yang terus bergerak maju, UDD PMI Depok hadir
          tanpa henti menjaga ketersediaan darah. Setiap kantong yang terkumpul,
          setiap pendonor yang terulur, adalah bukti nyata dari semangat gotong
          royong kita bersama.&rdquo;
        </blockquote>
        {/* <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="#cta"
            className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors duration-150"
          >
            Ayo Donor Darah
          </Link>
          <Link
            href="#cta"
            className="rounded-lg border border-brand-600 px-6 py-3 text-sm font-semibold text-brand-600 hover:bg-brand-50 transition-colors duration-150"
          >
            Ayo Donasi
          </Link>
        </div> */}
      </div>
    </section>
  );
}
