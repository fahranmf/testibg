"use client";

import { ReactNode } from "react";
import { Modal } from "../modal";
import Button from "../button/Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "primary" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmText = "Ya, lanjutkan",
  cancelText = "Batal",
  variant = "primary",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const isDanger = variant === "danger";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      className="w-full max-w-[440px] p-0"
    >
      <div className="p-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full ${
              isDanger
                ? "bg-error-50 text-error-600 dark:bg-error-500/10 dark:text-error-400"
                : "bg-brand-50 text-brand-500 dark:bg-brand-500/10 dark:text-brand-400"
            }`}
          >
            {isDanger ? (
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9V13M12 17H12.01M10.29 3.86L2.11 18.04C1.32 19.41 2.31 21.1 3.89 21.1H20.11C21.69 21.1 22.68 19.41 23.11 18.04L13.71 3.86C12.95 2.55 11.05 2.55 10.29 3.86Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8V12M12 16H12.01M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mt-5 text-center">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h4>

          {description && (
            <div className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              {description}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-white/[0.02]">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onCancel}
        >
          {cancelText}
        </Button>

        <Button
          type="button"
          size="sm"
          variant={isDanger ? "danger" : "primary"}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}