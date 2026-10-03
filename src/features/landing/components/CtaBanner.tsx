import Link from "next/link";

export default function CtaBanner() {
  return (
    <section id="cta" className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920&q=80)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900 to-brand-950/90" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center lg:px-8 lg:py-28">
        <h2 className="font-serif text-3xl font-medium text-white lg:text-5xl">
          Satu Kali Donor, Tiga Nyawa Terbantu
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          Bersama UDD PMI Depok kita menjaga ketersediaan darah. Donasi dan
          donor Anda memberikan harapan bagi mereka yang membutuhkan.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="#lokasi"
            className="rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-brand-700 hover:bg-gray-100 transition-colors duration-150"
          >
            Donor Sekarang
          </Link>
          <Link
            href="#jadwal"
            className="rounded-lg border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors duration-150"
          >
            Jadwalkan Donor
          </Link>
        </div>
      </div>
    </section>
  );
}
