"use client";

import Button from "@/components/ui/button/Button";
import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;

  actionLabel?: string;
  actionIcon?: ReactNode;
  onAction?: () => void;
  canAction?: boolean;

  isFetching?: boolean;
  isLoading?: boolean;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  actionIcon,
  onAction,
  canAction = true,
  isFetching = false,
  isLoading = false,
}: PageHeaderProps) {
  const showAction =
    canAction && actionLabel && onAction;

  return (
    <section className="relative mb-6 overflow-hidden ">
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="min-w-0">
            {/* Eyebrow */}
            {(eyebrow || (isFetching && !isLoading)) && (
              <div className="mb-1.5 flex items-center gap-2">
                {eyebrow && (
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
                    {eyebrow}
                  </span>
                )}

                {isFetching && !isLoading && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500 dark:bg-white/[0.06] dark:text-gray-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
                    Syncing
                  </span>
                )}
              </div>
            )}

            {/* Title */}
            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className="mt-1 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Action */}
        {showAction && (
          <Button
            size="sm"
            variant="primary"
            onClick={onAction}
            className="h-9 shrink-0 gap-1.5 self-start rounded-lg px-3.5 text-xs font-semibold shadow-sm transition hover:bg-brand-700 active:scale-[0.98] dark:bg-brand-500 dark:hover:bg-brand-600 sm:self-auto"
          >
            {actionIcon ?? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {actionLabel}
          </Button>
        )}
      </div>
    </section>
  );
}

