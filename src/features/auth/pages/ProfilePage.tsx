"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, KeyRound, Loader2, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";

import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import PageHeader from "@/components/ui/page-header/PageHeader";
import { useToast } from "@/context/ToastContext";

import { useAuth } from "../contexts/AuthContext";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
  type UpdateProfileFormValues,
  updateProfileSchema,
} from "../schemas/auth.schema";
import { authService } from "../services/auth.service";

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-xs text-rose-500">{message}</p> : null;
}

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const toast = useToast();
  const profileForm = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: "", email: "" },
  });
  const passwordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (user) {
      profileForm.reset({ name: user.name, email: user.email });
    }
  }, [profileForm, user]);

  const submitProfile = async (data: UpdateProfileFormValues) => {
    try {
      const updatedUser = await authService.updateProfile(data);
      profileForm.reset({ name: updatedUser.name, email: updatedUser.email });
      await refreshUser();
      toast.success("Profil berhasil diperbarui");
    } catch {
      // The Axios interceptor displays the API error.
    }
  };

  const submitPassword = async (data: ChangePasswordFormValues) => {
    try {
      await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      passwordForm.reset();
      toast.success("Password berhasil diperbarui");
    } catch {
      // The Axios interceptor displays the API error.
    }
  };

  const inputClassName = "mt-1.5 rounded-lg border-gray-200 text-sm focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03]";

  return (
    <main className="mx-auto w-full space-y-6">
      <PageHeader
        eyebrow="Pengaturan Akun"
        title="Profil Saya"
        // description="Kelola informasi akun dan keamanan Anda."
      />

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-theme-xs dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex items-start gap-3 border-b border-gray-100 px-5 py-4 dark:border-white/10">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-500 dark:bg-brand-500/10"><UserRound className="size-5" /></span>
          <div><h2 className="font-semibold text-gray-900 dark:text-white">Informasi pribadi</h2><p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Nama dan email ini dipakai untuk identitas akun Anda.</p></div>
        </div>
        <form onSubmit={profileForm.handleSubmit(submitProfile)} className="space-y-4 p-5">
          <div>
            <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Nama <span className="text-rose-500">*</span></Label>
            <Input error={!!profileForm.formState.errors.name} className={inputClassName} placeholder="Nama lengkap" {...profileForm.register("name")} />
            <FieldError message={profileForm.formState.errors.name?.message} />
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Email <span className="text-rose-500">*</span></Label>
            <Input type="email" error={!!profileForm.formState.errors.email} className={inputClassName} placeholder="email@contoh.com" {...profileForm.register("email")} />
            <FieldError message={profileForm.formState.errors.email?.message} />
          </div>
          <div className="flex justify-end border-t border-gray-100 pt-4 dark:border-white/10"><Button type="submit" disabled={profileForm.formState.isSubmitting} className="min-w-36">{profileForm.formState.isSubmitting ? <><Loader2 className="size-4 animate-spin" />Menyimpan...</> : <><Check className="size-4" />Simpan profil</>}</Button></div>
        </form>
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-theme-xs dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex items-start gap-3 border-b border-gray-100 px-5 py-4 dark:border-white/10">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"><KeyRound className="size-5" /></span>
          <div><h2 className="font-semibold text-gray-900 dark:text-white">Keamanan</h2><p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Gunakan password lama untuk mengonfirmasi perubahan.</p></div>
        </div>
        <form onSubmit={passwordForm.handleSubmit(submitPassword)} className="space-y-4 p-5">
          <div>
            <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Password lama <span className="text-rose-500">*</span></Label>
            <Input type="password" autoComplete="current-password" error={!!passwordForm.formState.errors.currentPassword} className={inputClassName} {...passwordForm.register("currentPassword")} />
            <FieldError message={passwordForm.formState.errors.currentPassword?.message} />
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Password baru <span className="text-rose-500">*</span></Label>
            <Input type="password" autoComplete="new-password" error={!!passwordForm.formState.errors.newPassword} className={inputClassName} placeholder="Minimal 8 karakter" {...passwordForm.register("newPassword")} />
            <FieldError message={passwordForm.formState.errors.newPassword?.message} />
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Konfirmasi password baru <span className="text-rose-500">*</span></Label>
            <Input type="password" autoComplete="new-password" error={!!passwordForm.formState.errors.confirmPassword} className={inputClassName} {...passwordForm.register("confirmPassword")} />
            <FieldError message={passwordForm.formState.errors.confirmPassword?.message} />
          </div>
          <div className="flex justify-end border-t border-gray-100 pt-4 dark:border-white/10"><Button type="submit" disabled={passwordForm.formState.isSubmitting} className="min-w-40">{passwordForm.formState.isSubmitting ? <><Loader2 className="size-4 animate-spin" />Memperbarui...</> : <><KeyRound className="size-4" />Ubah password</>}</Button></div>
        </form>
      </section>
    </main>
  );
}
