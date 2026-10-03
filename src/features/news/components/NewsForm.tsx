"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  FileText,
  ChevronDown,
  Sparkles,
  Check,
  Loader2,
} from "lucide-react";

import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

import {
  newsFormSchema,
  NewsFormValues,
  slugify,
} from "../schemas/news.schema";

import { NEWS_CATEGORY_LABELS, NewsCategory, NewsDetail } from "../news.types";
import { useCreateNews, useUpdateNews } from "../hooks/useNewsMutations";
import { storageService } from "@/features/storage/services/storage.service";

interface NewsFormProps {
  news?: NewsDetail | null;
}

const CATEGORY_OPTIONS = Object.entries(NEWS_CATEGORY_LABELS) as [
  NewsCategory,
  string,
][];

export default function NewsForm({ news = null }: NewsFormProps) {
  const isEdit = !!news;

  const createMutation = useCreateNews();
  const updateMutation = useUpdateNews();

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    news?.thumbnail ?? null,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: news?.title ?? "",
      slug: news?.slug ?? "",
      excerpt: news?.excerpt ?? "",
      content: news?.content ?? "",
      thumbnailKey: "",
      category: news?.category ?? "DONOR_DARAH",
    },
  });

  const thumbnailKey = watch("thumbnailKey");
  const contentValue = watch("content");

  const {
    ref: contentRef,
    onChange: onContentChange,
    ...contentRegister
  } = register("content");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [adjustHeight, contentValue]);

  const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight();
    onContentChange(e);
  };

  useEffect(() => {
    if (news) {
      setPreviewUrl(news.thumbnail);
    } else {
      setPreviewUrl(null);
    }
    setUploadError(null);
  }, [news]);

  const handleTitleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentSlug = watch("slug");
    if (!currentSlug) {
      setValue("slug", slugify(e.target.value), {
        shouldValidate: true,
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setPreviewUrl(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const result = await storageService.upload(file, "news");
      setValue("thumbnailKey", result.key, { shouldValidate: true });
    } catch {
      setUploadError("Gagal mengunggah thumbnail. Silakan coba lagi.");
      setPreviewUrl(news?.thumbnail ?? null);
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: NewsFormValues) => {
    const payload = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || undefined,
      content: data.content,
      thumbnailKey: data.thumbnailKey || undefined,
      category: data.category,
    };

    try {
      if (isEdit && news) {
        await updateMutation.mutateAsync({
          id: news.newsId,
          payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }

      router.push("/news");
    } catch (error) {
      console.error("Gagal menyimpan berita:", error);
    }
  };

  const handleCancel = () => {
    router.push(isEdit && news ? `/news/${news.newsId}` : "/news");
  };

  const isBusy = isSubmitting || isUploading;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Kolom Kiri: Detail Informasi */}
        <div className="space-y-5 lg:col-span-7">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-white/5">
            <FileText className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Informasi Utama
            </h3>
          </div>

          {/* Judul & Slug */}
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Judul Berita <span className="text-rose-500">*</span>
              </Label>
              <Input
                placeholder="Contoh: PMI Depok Gelar Aksi Donor Darah"
                error={!!errors.title}
                className="mt-1.5 rounded-lg border-gray-200 text-sm focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03]"
                {...register("title", { onBlur: handleTitleBlur })}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                URL Slug <span className="text-rose-500">*</span>
              </Label>
              <Input
                placeholder="judul-berita"
                error={!!errors.slug}
                className="mt-1.5 rounded-lg border-gray-200 font-mono text-xs text-gray-600 focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300"
                {...register("slug")}
              />
              {errors.slug ? (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.slug.message}
                </p>
              ) : (
                <p className="mt-1 text-[11px] leading-5 text-gray-400 dark:text-gray-500">
                  Slug dibuat otomatis dari judul dan dapat diubah secara
                  manual.
                </p>
              )}
            </div>
          </div>

          {/* Kategori */}
          <div>
            <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Kategori <span className="text-rose-500">*</span>
            </Label>
            <div className="relative mt-1.5">
              <select
                className={`h-10 w-full appearance-none rounded-lg border bg-transparent px-3.5 pr-10 text-sm text-gray-800 outline-none transition focus:border-brand-500 focus:ring-brand-500/20 dark:bg-white/[0.03] dark:text-white ${
                  errors.category
                    ? "border-rose-500 focus:ring-rose-500/20"
                    : "border-gray-200 dark:border-white/10"
                }`}
                {...register("category")}
              >
                {CATEGORY_OPTIONS.map(([value, label]) => (
                  <option
                    key={value}
                    value={value}
                    className="bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  >
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            </div>
            {errors.category && (
              <p className="mt-1 text-xs text-rose-500">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="border-b border-gray-100 dark:border-white/5" />

          {/* Isi Artikel */}
          <div>
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-white/5">
              <FileText className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Isi Artikel
              </h3>
            </div>

            <div className="mt-5 space-y-5">
              {/* Excerpt */}
              <div>
                <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Ringkasan
                </Label>
                <textarea
                  rows={5}
                  placeholder="Tulis ringkasan singkat yang menjelaskan inti berita..."
                  className={`mt-1.5 w-full resize-none rounded-lg border bg-transparent p-3 text-sm leading-relaxed outline-none transition placeholder:text-gray-400 focus:ring-2 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-gray-500 ${
                    errors.excerpt
                      ? "border-rose-500 focus:ring-rose-500/20"
                      : "border-gray-200 focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10"
                  }`}
                  {...register("excerpt")}
                />
                {errors.excerpt && (
                  <p className="mt-1 text-xs text-rose-500">
                    {errors.excerpt.message}
                  </p>
                )}
              </div>

              {/* Content with Auto-Expand */}
              <div>
                <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Konten <span className="text-rose-500">*</span>
                </Label>
                <textarea
                  rows={6}
                  placeholder="Mulai tulis berita di sini..."
                  className={`mt-1.5 min-h-[200px] w-full resize-y overflow-hidden rounded-lg border bg-transparent p-3 text-sm leading-relaxed outline-none transition placeholder:text-gray-400 focus:ring-2 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-gray-500 ${
                    errors.content
                      ? "border-rose-500 focus:ring-rose-500/20"
                      : "border-gray-200 focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10"
                  }`}
                  {...contentRegister}
                  ref={(e) => {
                    contentRef(e);
                    textareaRef.current = e;
                  }}
                  onChange={handleAutoResize}
                />
                {errors.content && (
                  <p className="mt-1 text-xs text-rose-500">
                    {errors.content.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Media */}
        <div className="self-start space-y-5 lg:sticky lg:top-25 lg:col-span-5">
          {/* Thumbnail Dropzone */}
          <div>
            <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-white/5">
              <Sparkles className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Thumbnail
              </h3>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-3 text-center transition hover:border-brand-500 hover:bg-brand-50/20 dark:border-white/15 dark:bg-white/[0.015] dark:hover:border-brand-400 dark:hover:bg-brand-500/5"
            >
              {previewUrl ? (
                <div className="relative h-36 w-full overflow-hidden rounded-md">
                  <Image
                    src={previewUrl}
                    alt="Thumbnail Preview"
                    fill
                    className="object-contain transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      <UploadCloud className="h-3.5 w-3.5" /> Ganti Banner
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-2">
                  <UploadCloud className="mx-auto h-8 w-8 text-gray-400 transition group-hover:text-brand-500" />
                  <p className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                    Klik untuk memilih thumbnail
                  </p>
                  <p className="mt-1 text-[10px] text-gray-400">
                    Format JPG, PNG, WEBP (Maks. 5MB)
                  </p>
                </div>
              )}

              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
                  <Loader2 className="h-5 w-5 animate-spin text-brand-600 dark:text-brand-400" />
                </div>
              )}
            </div>

            {uploadError && (
              <p className="mt-1.5 text-xs text-rose-500">{uploadError}</p>
            )}
            <input
              type="hidden"
              {...register("thumbnailKey")}
              value={thumbnailKey}
            />
          </div>
        </div>
      </div>

      {/* Footer Form Action Buttons */}
      <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-5 dark:border-white/5">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="rounded-lg border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
        >
          Batal
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={isBusy}
          className="rounded-lg bg-brand-600 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <Check className="mr-1.5 h-3.5 w-3.5" />
              {isEdit ? "Simpan Perubahan" : "Terbitkan Berita"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
