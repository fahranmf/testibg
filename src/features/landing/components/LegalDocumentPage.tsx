import Link from "next/link";
import { ArrowLeft, CalendarDays, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";
import TopBar from "./TopBar";

export interface LegalSection {
  title: string;
  paragraphs?: ReactNode[];
  bullets?: string[];
}

function createSectionId(title: string, index: number) {
  const slug = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `bagian-${index + 1}-${slug}`;
}

export default function LegalDocumentPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  const sectionLinks = sections.map((section, index) => ({
    title: section.title,
    id: createSectionId(section.title, index),
  }));

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-[60vh] bg-white px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-4"
          >
            <ArrowLeft className="size-4" />
            Kembali ke beranda
          </Link>

          <article className="mt-10 sm:mt-14">
            <header className="pb-9 sm:pb-11">
              <h1 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-5 max-w-[68ch] text-base leading-7 text-gray-600 sm:text-[17px] sm:leading-8">
                {intro}
              </p>
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays className="size-4 text-brand-700" />
                <time dateTime="2026-10-14">Diperbarui 14 Oktober 2026</time>
              </p>
            </header>

            <details className="group border-y border-gray-200 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-gray-800 [&::-webkit-details-marker]:hidden">
                <span>Daftar isi</span>
                <ChevronDown className="size-4 text-gray-500 transition-transform group-open:rotate-180" />
              </summary>
              <nav aria-label="Daftar isi" className="pt-3">
                <ol className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                  {sectionLinks.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block rounded py-1.5 text-sm leading-6 text-gray-600 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-brand-700 hover:decoration-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>

            <div className="max-w-[68ch] divide-y divide-gray-200">
              {sections.map((section, index) => (
                <section
                  key={section.title}
                  id={sectionLinks[index].id}
                  className="scroll-mt-28 py-8 first:pt-9 last:pb-0"
                >
                  <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-[22px]">
                    {section.title}
                  </h2>
                  {section.paragraphs?.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="mt-4 text-base leading-7 text-gray-700 sm:leading-8"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-gray-700 marker:text-brand-700 sm:leading-8">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
