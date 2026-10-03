import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const sitemap = [
  { label: "Beranda", href: "/" },
  { label: "Stok Darah", href: "#stok" },
  { label: "Jadwal Donor", href: "#jadwal" },
  { label: "Panduan Donor", href: "#panduan-donor" },
  { label: "Media Center", href: "#media" },
  { label: "Tentang Kami", href: "#quote" },
  { label: "Donasi", href: "#cta" },
];

const socials = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "TikTok", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo/logo-icon.svg" alt="UDD PMI Kota Depok" className="h-9 w-auto" />
              <span className="text-lg font-semibold text-white border-l border-gray-400 pl-2">
                Kota Depok
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              Unit Donor Darah (UDD) PMI Kota Depok. Melayani pengambilan,
              penyimpanan, dan penyaluran darah bagi masyarakat tanpa henti.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Tautan
            </h4>
            <ul className="space-y-2">
              {sitemap.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Media Sosial
            </h4>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Kontak
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin size={14} className="mt-0.5 shrink-0 text-brand-400" />
                <span>
                  Jl. Boulevard Grand Depok City, Kota Kembang, Jatimulya, Kec. Cilodong, Kota Depok, Jawa Barat 16413
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone size={14} className="shrink-0 text-brand-400" />
                <span>(021) 8792 7210</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail size={14} className="shrink-0 text-brand-400" />
                <span>info@pmikotadepok.or.id</span>
              </li>
              <li className="mt-2 rounded-lg bg-brand-900/50 px-3 py-2 text-xs text-brand-300">
                <span className="font-semibold">Layanan Darurat 118</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row lg:px-8">
          <p className="text-xs text-gray-500">
            &copy; 2026 UDD PMI Kota Depok. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-150">
              Ketentuan Layanan
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-150">
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
