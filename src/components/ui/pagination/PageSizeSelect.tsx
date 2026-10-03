import { ChevronDown } from "lucide-react";

interface PageSizeSelectProps {
  value: number;
  onChange: (limit: number) => void;
  options?: number[];
}

export default function PageSizeSelect({
  value,
  onChange,
  options = [5, 10, 20, 50],
}: PageSizeSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-theme-xs font-medium text-gray-400 dark:text-gray-500">
        Rows
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          aria-label="Jumlah rows per halaman"
          className="
            h-8
            appearance-none
            rounded-md
            border border-gray-200
            bg-white
            pl-2.5 pr-7
            text-theme-xs
            font-medium
            text-gray-700
            outline-none
            transition-all duration-150
            hover:border-gray-300
            focus:border-brand-500
            focus:ring-2
            focus:ring-brand-500/10
            dark:border-gray-800
            dark:bg-white/[0.03]
            dark:text-gray-200
            dark:hover:border-gray-700
            dark:focus:border-brand-500
          "
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300"
            >
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}