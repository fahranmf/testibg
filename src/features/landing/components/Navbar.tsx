"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Stok Darah", href: "/#stok" },
  { label: "Jadwal Donor", href: "/#jadwal" },
  {
    label: "Media Center",
    href: "/#media",
    children: [
      { label: "Kabar UDD", href: "/media/news" },
      { label: "Kegiatan UDD", href: "/media/activities" },
      { label: "Galeri Dokumentasi", href: "/media/gallery" },
    ],
  },
  { label: "Panduan Donor", href: "/#panduan-donor" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo/logo.svg" alt="UDD PMI Kota Depok" className="h-10 w-auto" />
          <div className="hidden sm:block">
            <span className="hidden border-l border-line pl-3 text-[11px] font-semibold uppercase leading-tight tracking-wider text-brand-600 sm:block">
              Unit Donor Darah
            </span>
            <span className="hidden border-l border-line pl-3 text-[11px] font-semibold uppercase leading-tight tracking-wider text-muted sm:block">
              Kota Depok
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-600 transition-colors duration-150"
              >
                {item.label}
                {item.children && <ChevronDown size={14} />}
              </Link>
              {item.children && openDropdown === item.label && (
                <div className="absolute left-0 top-full z-50 w-56 rounded-lg border border-gray-100 bg-white p-2 shadow-lg">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block rounded px-3 py-2 text-sm text-gray-600 hover:bg-brand-50 hover:text-brand-600 transition-colors duration-150"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/#cta"
            className="hidden rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 transition-colors duration-150 lg:inline-block"
          >
            Donor
          </Link>
          <button
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden transition-colors duration-150"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 lg:hidden">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-600"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-3 border-l border-gray-200 py-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-brand-50 hover:text-brand-600"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <Link
              href="/#cta"
              className="rounded-lg bg-brand-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-brand-700"
            >
              Donor
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
