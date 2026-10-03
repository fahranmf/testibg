import React, { ReactNode } from "react";

import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

interface TableProps {
  children: ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

interface TableCellProps {
  children: ReactNode;
  isHeader?: boolean;
  className?: string;
}

interface SortableHeaderProps {
  label: string;
  field: string;
  sortBy?: string | null;
  sortOrder?: "asc" | "desc";
  onSort: (field: string) => void;
  className?: string;
}

const tableBase =
  "text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400";

const Table: React.FC<TableProps> = ({ children, className }) => {
  return <table className={`w-full text-left ${className ?? ""}`}>{children}</table>;
};

const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return (
    <thead className={`border-b border-gray-200/80 dark:border-white/6 ${className ?? ""}`}>
      {children}
    </thead>
  );
};

const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return (
    <tbody className={`divide-y divide-gray-100 dark:divide-white/5 ${className ?? ""}`}>
      {children}
    </tbody>
  );
};

const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  return <tr className={className}>{children}</tr>;
};

const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className,
}) => {
  const CellTag = isHeader ? "th" : "td";
  const base = isHeader
    ? `${tableBase} px-5 py-3.5`
    : "px-5 py-4";
  return <CellTag className={`${base} ${className ?? ""}`}>{children}</CellTag>;
};

function SortableHeader({
  label,
  field,
  sortBy,
  sortOrder,
  onSort,
  className = "",
}: SortableHeaderProps) {
  const isActive = sortBy === field;

  return (
    <TableCell isHeader className={className}>
      <button
        type="button"
        onClick={() => onSort(field)}
        className="group/sort inline-flex items-center gap-1.5 uppercase transition-colors hover:text-gray-700 dark:hover:text-gray-300"
        aria-label={`Urutkan berdasarkan ${label}`}
      >
        <span className="uppercase">{label}</span>

        {isActive ? (
          sortOrder === "asc" ? (
            <ArrowUp className="size-3.5" />
          ) : (
            <ArrowDown className="size-3.5" />
          )
        ) : (
          <ChevronsUpDown className="size-3.5 opacity-40 transition-opacity group-hover/sort:opacity-100" />
        )}
      </button>
    </TableCell>
  );
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-10 px-6 text-center">
      <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-400 dark:border-white/[0.07] dark:bg-white/3 dark:text-gray-500">
        {icon}
      </div>

      <p className="text-sm font-semibold tracking-tight text-gray-800 dark:text-gray-200">
        {title}
      </p>

      <p className="mt-1.5 max-w-sm text-xs leading-5 text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

function EmptyStateIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="4"
        y="3.5"
        width="16"
        height="17"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 8h8M8 12h5M8 16h3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ActionButton({
  label,
  onClick,
  children,
  size = "md",
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "sm" ? "size-7" : "size-8";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={[
        "inline-flex items-center justify-center rounded-lg",
        sizeClass,
        "text-gray-400 transition-all duration-150",
        "hover:scale-[1.03]",
        "hover:bg-brand-50 hover:text-brand-600",
        "dark:text-gray-500",
        "dark:hover:bg-brand-500/10 dark:hover:text-brand-300",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  SortableHeader,
  EmptyState,
  EmptyStateIcon,
  ActionButton,
};
