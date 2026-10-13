"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Loader2, Check } from "lucide-react";

import { Modal } from "@/components/ui/modal";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

import type { User, UserRole, UpdateUserPayload } from "../user.types";
import { USER_ROLE_LABELS } from "../user.types";
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserFormValues,
} from "../schemas/user.schema";
import {
  useCreateUser,
  useUpdateUser,
} from "../hooks/useUserMutations";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
}

const ROLE_OPTIONS: UserRole[] = [
  "ADMIN",
  "CUSTOMER_SERVICE",
  "LAB_STAFF",
  "USER",
];

export default function UserFormModal({
  isOpen,
  onClose,
  user = null,
}: UserFormModalProps) {
  const isEdit = !!user;

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const isBusy = createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      password: "",
      role: (user?.role === "SUPER_ADMIN" ? "ADMIN" : user?.role ?? "ADMIN") as UserRole,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: user?.name ?? "",
        email: user?.email ?? "",
        password: "",
        role: (user?.role === "SUPER_ADMIN" ? "ADMIN" : user?.role ?? "ADMIN") as UserRole,
      });
    }
  }, [isOpen, user, reset]);

  const onSubmit = async (
    data: Record<string, unknown>,
  ) => {
    try {
      if (isEdit && user) {
        const payload: Record<string, unknown> = {
          name: data.name,
          email: data.email,
          role: data.role,
        };
        if (data.password) {
          payload.password = data.password;
        }
        await updateMutation.mutateAsync({
          id: user.id,
          payload: payload as UpdateUserPayload,
        });
      } else {
        await createMutation.mutateAsync(data as CreateUserFormValues);
      }
      onClose();
    } catch {
      // error handled by toastBridge
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-md overflow-hidden rounded-xl p-0"
      showCloseButton={false}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-white/5">
        <h3 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
          {isEdit ? "Edit User" : "Tambah User"}
        </h3>
        <button
          type="button"
          onClick={onClose}
          disabled={isBusy}
          className="flex size-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-white"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
        {/* Nama */}
        <div>
          <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Nama <span className="text-rose-500">*</span>
          </Label>
          <Input
            placeholder="Nama lengkap"
            error={!!errors.name}
            className="mt-1.5 rounded-lg border-gray-200 text-sm focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03]"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Email <span className="text-rose-500">*</span>
          </Label>
          <Input
            type="email"
            placeholder="user@contoh.com"
            error={!!errors.email}
            className="mt-1.5 rounded-lg border-gray-200 font-mono text-sm focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03]"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Password {!isEdit && <span className="text-rose-500">*</span>}
          </Label>
          <Input
            type="password"
            placeholder={isEdit ? "Kosongkan jika tidak diubah" : "Minimal 8 karakter"}
            error={!!errors.password}
            className="mt-1.5 rounded-lg border-gray-200 text-sm focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03]"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Role <span className="text-rose-500">*</span>
          </Label>
          <div className="relative mt-1.5">
            <select
              className={`h-11 w-full appearance-none rounded-lg border bg-transparent px-3.5 pr-10 text-sm text-gray-800 outline-none transition focus:border-brand-500 focus:ring-brand-500/20 dark:bg-white/[0.03] dark:text-white ${
                errors.role
                  ? "border-rose-500 focus:ring-rose-500/20"
                  : "border-gray-200 dark:border-white/10"
              }`}
              {...register("role")}
            >
              {ROLE_OPTIONS.map((value) => (
                <option key={value} value={value} className="bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-200">
                  {USER_ROLE_LABELS[value]}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          </div>
          {errors.role && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4 dark:border-white/5">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onClose}
            disabled={isBusy}
            className="rounded-lg border-gray-200 text-xs font-semibold dark:border-white/10"
          >
            Batal
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={isBusy}
            className="rounded-lg text-xs font-semibold shadow-sm"
          >
            {isBusy ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-3.5 animate-spin" />
                Menyimpan...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5" />
                {isEdit ? "Simpan" : "Tambah"}
              </span>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
