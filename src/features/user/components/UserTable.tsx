"use client";

import { Pencil, Trash2, Power, PowerOff } from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  EmptyState,
  EmptyStateIcon,
  ActionButton,
} from "@/components/ui/table";

import type { User } from "../user.types";
import UserRoleBadge from "./UserRoleBadge";

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  onEdit?: (user: User) => void;
  onToggleActive?: (user: User) => void;
  onDelete?: (user: User) => void;
}

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
});

function LoadingState({ showActions }: { showActions: boolean }) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {["Nama", "Email", "Role", "Status", "Dibuat", ...(showActions ? ["Aksi"] : [])].map(
              (heading, index) => (
                <TableCell
                  key={heading}
                  isHeader
                  className={index === 5 ? "text-center" : ""}
                >
                  {heading}
                </TableCell>
              ),
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 6 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="h-3.5 w-40 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
              </TableCell>
              <TableCell>
                <div className="h-3.5 w-48 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
              </TableCell>
              <TableCell>
                <div className="h-6 w-24 animate-pulse rounded-full bg-gray-100 dark:bg-white/5" />
              </TableCell>
              <TableCell>
                <div className="h-6 w-16 animate-pulse rounded-full bg-gray-100 dark:bg-white/5" />
              </TableCell>
              <TableCell>
                <div className="h-3.5 w-28 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
              </TableCell>
              {showActions && (
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <div className="size-8 animate-pulse rounded-lg bg-gray-100 dark:bg-white/5" />
                    <div className="size-8 animate-pulse rounded-lg bg-gray-100 dark:bg-white/5" />
                    <div className="size-8 animate-pulse rounded-lg bg-gray-100 dark:bg-white/5" />
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function UserTable({
  users,
  isLoading,
  onEdit,
  onToggleActive,
  onDelete,
}: UserTableProps) {
  const showActions = !!(onEdit || onToggleActive || onDelete);

  if (isLoading) {
    return <LoadingState showActions={showActions} />;
  }

  if (users.length === 0) {
    return (
      <EmptyState
        icon={<EmptyStateIcon />}
        title="Belum ada user"
        description="User yang sudah dibuat akan muncul di daftar ini."
      />
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell isHeader>Nama</TableCell>
            <TableCell isHeader>Email</TableCell>
            <TableCell isHeader>Role</TableCell>
            <TableCell isHeader>Status</TableCell>
            <TableCell isHeader>Dibuat</TableCell>
            {showActions && (
              <TableCell isHeader className="w-[120px] text-center">
                Aksi
              </TableCell>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="group transition-colors duration-150 hover:bg-gray-50/60 dark:hover:bg-white/2.5"
            >
              <TableCell>
                <span className="text-sm font-semibold tracking-[-0.01em] text-gray-800 dark:text-white/90">
                  {user.name}
                </span>
              </TableCell>

              <TableCell>
                <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </span>
              </TableCell>

              <TableCell>
                <UserRoleBadge role={user.role} />
              </TableCell>

              <TableCell>
                <span
                  className={`inline-flex items-center rounded px-2.5 py-1 text-xs font-medium ${
                    user.isActive
                      ? "bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400"
                      : "bg-gray-100 text-gray-600 dark:bg-white/[0.06] dark:text-gray-400"
                  }`}
                >
                  {user.isActive ? "Aktif" : "Nonaktif"}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {dateFormatter.format(new Date(user.createdAt))}
                </span>
              </TableCell>

              {showActions && (
                <TableCell className="text-center">
                  <div className="inline-flex items-center gap-1">
                    {onEdit && (
                      <ActionButton
                        label={`Edit ${user.name}`}
                        onClick={() => onEdit(user)}
                      >
                        <Pencil className="size-4" />
                      </ActionButton>
                    )}

                    {onToggleActive && (
                      <ActionButton
                        label={
                          user.isActive
                            ? `Nonaktifkan ${user.name}`
                            : `Aktifkan ${user.name}`
                        }
                        onClick={() => onToggleActive(user)}
                      >
                        {user.isActive ? (
                          <PowerOff className="size-4" />
                        ) : (
                          <Power className="size-4" />
                        )}
                      </ActionButton>
                    )}

                    {onDelete && (
                      <button
                        type="button"
                        aria-label={`Hapus ${user.name}`}
                        title={`Hapus ${user.name}`}
                        onClick={() => onDelete(user)}
                        className="inline-flex size-9 items-center justify-center rounded-lg text-gray-400 transition-all duration-150 hover:scale-[1.03] hover:bg-error-50 hover:text-error-600 dark:text-gray-500 dark:hover:bg-error-500/10 dark:hover:text-error-400"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
