"use client";

import React from "react";

export interface SegmentedOption {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div
      className={`flex h-9 items-center overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-white/[0.05] ${className}`}
      role="tablist"
    >
      {options.map((option) => {
        const active = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={`h-7 rounded-md px-3 text-xs font-semibold transition ${
              active
                ? "bg-white text-brand-600 shadow-sm dark:bg-white/10 dark:text-brand-300"
                : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
