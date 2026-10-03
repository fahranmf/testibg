import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export default function RecentList<T>({
  icon,
  title,
  viewAllHref,
  items,
  emptyText,
  renderItem,
}: {
  icon: ReactNode;
  title: string;
  viewAllHref: string;
  items: T[];
  emptyText: string;
  renderItem: (item: T) => ReactNode;
}) {
  return (
    <section className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.025]">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-white/5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
            {icon}
          </span>
          <h3 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          Lihat semua
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
      {items.length === 0 ? (
        <p className="p-6 text-center text-xs text-gray-500 dark:text-gray-400">
          {emptyText}
        </p>
      ) : (
        <ul className="divide-y divide-gray-100 dark:divide-white/5">
          {items.map((item) => renderItem(item))}
        </ul>
      )}
    </section>
  );
}
