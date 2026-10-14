import { MapPin } from "lucide-react";
export default function MapsSection() {
  return (
    <section id="lokasi" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
          <span className="h-px w-8 bg-brand-600" />
          Lokasi Kami
        </span>

        {/* Ubah lg:items-start jadi lg:items-center di sini */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          {/* Left — editorial text */}
          <div className="flex flex-col">
            <h2 className="max-w-lg text-3xl font-medium leading-[1.15] text-gray-900 lg:text-4xl">
              Temukan kami di{" "}
              <span className="relative inline-block font-outfit font-semibold text-brand-600">
                <span className="absolute inset-x-0 bottom-0.5 h-2 rounded-full bg-brand-100/80" />
                <span className="relative z-10">Depok</span>
              </span>
              .
            </h2>
            {/* <h2 className="max-w-lg font-serif text-3xl font-medium leading-[1.15] text-gray-900 lg:text-4xl">
              Temukan kami di
              <span className="relative inline-block font-outfit font-semibold text-brand-600">
                <span className="absolute inset-x-0 bottom-0.5 -z-0 h-3 -rotate-1 rounded-sm bg-brand-100" />
                <span className="relative z-10">Depok</span>
              </span>
              .
            </h2> */}

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-gray-500">
              UDD PMI Kota Depok melayani donor darah, penyimpanan, dan
              penyaluran darah bagi masyarakat. Kunjungi unit kami atau hubungi
              langsung untuk informasi lebih lanjut.
            </p>

            {/* Info — no icon boxes, just clean typography */}
            <div className="mt-7 max-w-md space-y-0 divide-y divide-gray-100 border-t border-gray-200">
              <div className="py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Alamat
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-700">
                  Jl. Boulevard Grand Depok City, Kota Kembang, Jatimulya, Kec.
                  Cilodong, Kota Depok, Jawa Barat 16413
                </p>
              </div>

              <div className="py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Telepon
                </p>
                <a
                  href="tel:+622187927210"
                  className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors hover:text-brand-600"
                >
                  (021) 8792 7210
                </a>
              </div>

              <div className="py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Jam Operasional
                </p>
                <p className="mt-1.5 text-sm text-gray-700">
                  Buka setiap hari &middot; Tutup pukul 20.00 WIB
                </p>
              </div>
            </div>

            {/* <a
              href="https://maps.google.com/?q=PMI+Kota+Depok+Boulevard+Grand+Depok+City"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-5 py-2.5 text-sm font-semibold text-brand-700 transition-all duration-150 hover:border-brand-300 hover:bg-brand-100 hover:shadow-sm"
            >
              Lihat di Google Maps
              <ArrowUpRight size={14} strokeWidth={2} />
            </a> */}
          </div>
          {/* Right — map */}
          {/* Right — map with frame */}
          <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            
            <div className="relative h-[320px] lg:h-[420px]">
              
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5606.864012737866!2d106.82465071784354!3d-6.438774813479676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ea23bddd4399%3A0x31f5f18a6a617dd3!2sPMI%20Depok!5e0!3m2!1sen!2sid!4v1789699306851!5m2!1sen!2sid"
                className="absolute inset-0 h-full w-full grayscale-[15%] contrast-[1.03] transition-all duration-500 hover:grayscale-0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Lokasi UDD PMI Kota Depok"
              />
            </div>
            {/* Map overlay bar */}
            {/* <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/20 bg-white/90 px-5 py-3 backdrop-blur-md">
              
              <div className="flex items-center justify-between gap-3">
                
                <div className="flex items-center gap-2.5 min-w-0">
                  
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-50">
                    
                    <MapPin size={13} className="text-brand-600" />
                  </span>
                  <p className="truncate text-xs font-medium text-gray-700">
                    
                    Jl. Boulevard Grand Depok City, Cilodong
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=PMI+Kota+Depok+Boulevard+Grand+Depok+City"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-xs font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  directions
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
