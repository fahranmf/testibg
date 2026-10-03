"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";

import {
  EyeCloseIcon,
  EyeIcon,
} from "@/icons";

import { useAuth } from "../contexts/AuthContext";
import {
  loginSchema,
  LoginFormValues,
} from "../schemas/auth.schema";

export default function SignInForm() {
  const router = useRouter();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [serverError, setServerError] =
    useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    data: LoginFormValues,
  ) => {
    setServerError(null);

    try {
        const user = await login(data);

        router.replace(user.role === "USER" ? "/chat" : "/dashboard");
    } catch (error: any) {
      setServerError(
        error?.response?.data?.message ??
          "Login gagal, coba lagi.",
      );
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col lg:w-1/2">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div>
          <div className="mb-5 sm:mb-5">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Masuk ke dashboard PMI Depok
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-6">
              {serverError && (
                <div className="rounded-lg bg-error-50 px-4 py-2.5 text-sm text-error-600 dark:bg-error-500/10 dark:text-error-400">
                  {serverError}
                </div>
              )}

              {/* Email */}
              <div>
                <Label>
                  Email{" "}
                  <span className="text-error-500">
                    *
                  </span>
                </Label>

                <Input
                  type="email"
                  placeholder="info@pmidepok.or.id"
                  {...register("email")}
                />

                {errors.email && (
                  <p className="mt-1 text-xs text-error-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label>
                  Password{" "}
                  <span className="text-error-500">
                    *
                  </span>
                </Label>

                <div className="relative">
                  <Input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Masukkan password"
                    {...register("password")}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev,
                      )
                    }
                    className="absolute right-4 top-1/2 z-30 -translate-y-1/2"
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                  >
                    {showPassword ? (
                      <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-xs text-error-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="mt-8">
                <Button
                  type="submit"
                  className="w-full"
                  size="sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Signing in..."
                    : "Sign in"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
