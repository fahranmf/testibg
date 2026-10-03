"use client";

import { useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Plus, Search, X, RotateCcw, Loader2 } from "lucide-react";

import Input from "@/components/form/input/InputField";
import PageHeader from "@/components/ui/page-header/PageHeader";
import SegmentedControl from "@/components/ui/segmented-control";
import TablePagination from "@/components/ui/pagination/TablePagination";

import { useHasPermission } from "@/features/auth/hooks/useHasPermission";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useDebounce } from "@/hooks/useDebounce";
import { useConfirm } from "@/context/ConfirmContext";

import { useUsers } from "../hooks/useUsers";
import {
  useToggleUserActive,
  useDeleteUser,
} from "../hooks/useUserMutations";
import UserTable from "../components/UserTable";
import UserFormModal from "../components/UserFormModal";
import type { User } from "../user.types";
import type { Role } from "@/features/auth/auth.types";

const ROLE_FILTERS: { label: string; value: Role | "all" }[] = [
  { label: "Semua", value: "all" },
  { label: "Admin", value: "ADMIN" },
  { label: "CS", value: "CUSTOMER_SERVICE" },
  { label: "User", value: "USER" },
];

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export default function UserListPage() {
  const { user: currentUser } = useAuth();
  const confirm = useConfirm();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageParam = Number(searchParams.get("page"));
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
  const limitParam = Number(searchParams.get("limit"));
  const limit = PAGE_SIZE_OPTIONS.includes(limitParam) ? limitParam : 10;
  const search = searchParams.get("search") ?? "";
  const roleParam = searchParams.get("role");
  const role = ROLE_FILTERS.some((filter) => filter.value === roleParam)
    ? (roleParam as Role | "all")
    : "all";

  const debouncedSearch = useDebounce(search, 400);

  const canCreate = useHasPermission(PERMISSIONS.USER_CREATE);
  const canUpdate = useHasPermission(PERMISSIONS.USER_UPDATE);
  const canDelete = useHasPermission(PERMISSIONS.USER_DELETE);

  const { data, isLoading, isFetching } = useUsers({
    page,
    limit,
    search: debouncedSearch,
    role,
  });

  const toggleMutation = useToggleUserActive();
  const deleteMutation = useDeleteUser();

  const pagination = data?.pagination;
  const hasActiveFilters = search.trim() !== "" || role !== "all";

  const [formState, setFormState] = useState<{
    mode: "create" | "edit" | null;
    user: User | null;
  }>({ mode: null, user: null });

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });

    const query = nextParams.toString();
    window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
  };

  const handleSearchChange = (value: string) => {
    updateSearchParams({ search: value || null, page: null });
  };

  const handleRoleChange = (value: Role | "all") => {
    updateSearchParams({ role: value === "all" ? null : value, page: null });
  };

  const handleAdd = () => {
    setFormState({ mode: "create", user: null });
  };

  const handleEdit = (user: User) => {
    setFormState({ mode: "edit", user });
  };

  const handleToggleActive = useCallback(
    async (user: User) => {
      if (user.id === currentUser?.id) return;

      const result = await confirm({
        title: user.isActive ? "Nonaktifkan akun?" : "Aktifkan akun?",
        description: user.isActive
          ? `${user.name} tidak akan bisa login setelah dinonaktifkan.`
          : `${user.name} akan bisa login kembali.`,
        confirmText: user.isActive ? "Nonaktifkan" : "Aktifkan",
        variant: user.isActive ? "danger" : "primary",
      });

      if (result) {
        toggleMutation.mutate(user.id);
      }
    },
    [currentUser?.id, confirm, toggleMutation],
  );

  const handleDelete = useCallback(
    async (user: User) => {
      if (user.id === currentUser?.id) return;

      const result = await confirm({
        title: "Hapus user?",
        description: `Data ${user.name} akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.`,
        confirmText: "Hapus",
        variant: "danger",
      });

      if (result) {
        deleteMutation.mutate(user.id);
      }
    },
    [currentUser?.id, confirm, deleteMutation],
  );

  const resetFilters = () => {
    updateSearchParams({
      search: null,
      role: null,
      page: null,
      limit: null,
    });
  };

  return (
    <main className="mx-auto w-full space-y-6">
      {/* Header Bar */}
      <PageHeader
        eyebrow="User Management"
        title="Daftar Pengguna"
        actionLabel="Tambah Pengguna"
        actionIcon={<Plus className="h-4 w-4" />}
        onAction={canCreate ? handleAdd : undefined}
        canAction={canCreate}
      />

      {/* Content Container */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.025]">
        {/* Controls Bar */}
        <div className="border-b border-gray-200 dark:border-white/[0.07]">
          <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <Input
                placeholder="Cari user..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="h-9 rounded-lg border-gray-200 bg-gray-50/50 pl-9 pr-8 text-xs transition focus:border-brand-500 focus:bg-white focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03] dark:focus:border-brand-400 dark:focus:bg-transparent"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <SegmentedControl
                options={ROLE_FILTERS}
                value={role}
                onChange={(value) =>
                  handleRoleChange(value as Role | "all")
                }
              />

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex h-9 items-center gap-1 rounded-lg px-2.5 text-xs font-medium text-gray-400 hover:text-brand-600 dark:hover:text-brand-400"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 px-4 py-2.5 dark:border-white/5">
              <span className="text-[11px] font-medium text-gray-400">
                Filter aktif:
              </span>

              {search.trim() && (
                <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                  &quot;{search}&quot;
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    className="hover:opacity-75"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {role !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                  Role:{" "}
                  {ROLE_FILTERS.find((f) => f.value === role)?.label}
                  <button
                    type="button"
                    onClick={() => handleRoleChange("all")}
                    className="hover:opacity-75"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Table & Floating Refetch State */}
        <div className="relative">
          <UserTable
            users={data?.users ?? []}
            isLoading={isLoading}
            onEdit={canUpdate ? handleEdit : undefined}
            onToggleActive={canUpdate ? handleToggleActive : undefined}
            onDelete={canDelete ? handleDelete : undefined}
          />

          {isFetching && !isLoading && (
            <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-brand-200/50 bg-white/90 px-3 py-1 text-[11px] font-semibold text-brand-600 shadow-sm backdrop-blur-md dark:border-brand-500/20 dark:bg-gray-900/90 dark:text-brand-300">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Memperbarui...
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {pagination && (
          <div className="border-t border-gray-100 p-4 dark:border-white/5">
            <TablePagination
              pagination={pagination}
              limit={limit}
              onPageChange={(newPage) =>
                updateSearchParams({
                  page: newPage === 1 ? null : String(newPage),
                })
              }
              onLimitChange={(newLimit) => {
                updateSearchParams({
                  limit: newLimit === 10 ? null : String(newLimit),
                  page: null,
                });
              }}
            />
          </div>
        )}
      </section>

      {/* Form Modal */}
      <UserFormModal
        isOpen={formState.mode !== null}
        onClose={() => setFormState({ mode: null, user: null })}
        user={formState.user}
      />
    </main>
  );
}
