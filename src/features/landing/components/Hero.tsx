"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1920&q=80",
    eyebrow: "Unit Donor Darah",
    title: "Selamat Datang di\nUDD PMI Depok",
    subtitle: "Siamo Tutti Fratelli, Kita Semua Bersaudara",
    cta: { label: "Donor Darah Sekarang", href: "#jadwal" },
    ctaSecondary: { label: "Cek Stok Darah", href: "#stok" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1920&q=80",
    eyebrow: "Jaga Ketersediaan Darah",
    title: "UDD PMI Depok\nSiap Melayani",
    subtitle:
      "Kami memastikan stok darah selalu tersedia bagi pasien di Kota Depok dan sekitarnya",
    cta: { label: "Lihat Stok Darah", href: "#stok" },
    ctaSecondary: { label: "Jadwal Donor", href: "#jadwal" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80",
    eyebrow: "Ayo Donor Darah",
    title: "Setiap Tetes Darah\nMenyelamatkan Jiwa",
    subtitle: "Satu kali donor dapat menyelamatkan hingga tiga nyawa",
    cta: { label: "Jadwalkan Donor", href: "#jadwal" },
    ctaSecondary: { label: "Panduan Donor", href: "#panduan-donor" },
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  const goTo = useCallback(
    (idx: number) => {
      if (isAnimating || idx === current) return;
      setIsAnimating(true);
      setCurrent(idx);
      setTimeout(() => setIsAnimating(false), 800);
    },
    [current, isAnimating],
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo],
  );
  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo],
  );

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const dist = touchStart.current - touchEnd.current;
    if (Math.abs(dist) > 50) {
      dist > 0 ? next() : prev();
    }
  };

  const slide = slides[current];
  const num = String(current + 1).padStart(2, "0");
  const total = String(slides.length).padStart(2, "0");

  return (
    <section
      className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-brand-950"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
            i === current
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <div
            className={`h-full w-full bg-cover bg-center transition-transform duration-[8000ms] ease-out ${
              i === current ? "scale-[1.08]" : "scale-100"
            }`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        </div>
      ))}

      {/* Layered gradient overlays — cinematic depth */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-950 via-brand-950/70 to-brand-950/20" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-950/50 to-transparent" />
      {/* Subtle vignette */}
      <div className="absolute inset-0 z-10 [background:radial-gradient(ellipse_at_center,transparent_50%,rgba(69,3,7,0.3)_100%)]" />

      {/* Main Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-end px-5 pb-28 sm:pb-32 lg:items-center lg:px-8 lg:pb-0">
        <div key={current} className="max-w-2xl">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center opacity-0 animate-[fadeSlideUp_0.6s_0.1s_ease-out_forwards]">
            <span className="bg-brand-600 py-1.5 pl-4 pr-7 text-xs font-bold uppercase tracking-wider text-white [clip-path:polygon(0_0,calc(100%-12px)_0,100%_50%,calc(100%-12px)_100%,0_100%)]">
              {slide.eyebrow}
            </span>
            <span className="-ml-2 h-[2px] w-24 bg-brand-600 sm:w-32" />
          </div>

          {/* Title — manual line break with \n */}
          <h1 className=" text-2xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-3xl lg:text-5xl opacity-0 animate-[fadeSlideUp_0.7s_0.25s_ease-out_forwards]">
            {slide.title.split("\n").map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-xl text-md font-light leading-relaxed text-white/80 lg:text-md opacity-0 animate-[fadeSlideUp_0.7s_0.4s_ease-out_forwards]">
            {slide.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="mt-5 flex flex-wrap gap-2.5 opacity-0 animate-[fadeSlideUp_0.6s_0.4s_ease-out_forwards]">
            <Link
              href={slide.cta.href}
              className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-brand-700"
            >
              {slide.cta.label}
            </Link>
            <Link
              href={slide.ctaSecondary.href}
              className="inline-flex items-center justify-center rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-white/10"
            >
              {slide.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows — glassmorphism pill */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 items-center justify-center rounded-lg border border-white/15 bg-white/[0.08] p-3 text-white backdrop-blur-md transition-all duration-150 hover:bg-white/[0.18] hover:border-white/25 sm:flex sm:left-6"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 items-center justify-center rounded-lg border border-white/15 bg-white/[0.08] p-3 text-white backdrop-blur-md transition-all duration-150 hover:bg-white/[0.18] hover:border-white/25 sm:flex sm:right-6"
        aria-label="Next slide"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>

      {/* Bottom bar — slide counter + indicators, glassmorphism */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 pb-6 sm:px-8 lg:pb-8">
          {/* Slide counter */}
          <div className="flex items-center gap-3 text-white/60">
            <span className=" text-sm font-medium tabular-nums text-white">
              {num}
            </span>
            <span className="h-px w-6 bg-white/30" />
            <span className="text-sm tabular-nums">{total}</span>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`group relative h-2 rounded-lg transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  i === current
                    ? "w-10 bg-white"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              >
                {i === current && (
                  <span className="absolute inset-0 rounded-lg bg-white/20 animate-[pulse_2s_ease-in-out_infinite]" />
                )}
              </button>
            ))}
          </div>

          {/* CTA hint on desktop */}
          <Link
            href="#quote"
            className="hidden items-center gap-2 text-sm text-white/50 transition-colors duration-150 hover:text-white lg:flex"
          >
            Scroll
            <span className="h-4 w-px bg-white/30" />
            <ChevronLeft size={12} className="-rotate-90" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
