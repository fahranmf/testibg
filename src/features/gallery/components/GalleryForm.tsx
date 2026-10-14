"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UploadCloud,
  ImagePlus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Calendar,
  FileText,
  Sparkles,
  Check,
  Loader2,
} from "lucide-react";

import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

import {
  galleryFormSchema,
  GalleryFormValues,
  slugify,
} from "../schemas/gallery.schema";
import { GalleryDetail } from "../gallery.types";
import {
  useCreateGallery,
  useUpdateGallery,
} from "../hooks/useGalleryMutations";
import { storageService } from "@/features/storage/services/storage.service";

interface Props {
  mode: "create" | "edit";
  initialData?: GalleryDetail;
}

function toDateInputValue(iso: string | undefined) {
  if (!iso) return "";
  return iso.slice(0, 10);
}

export default function GalleryForm({ mode, initialData }: Props) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const createMutation = useCreateGallery();
  const updateMutation = useUpdateGallery();

  const [isCoverUploading, setIsCoverUploading] = useState(false);
  const [coverError, setCoverError] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialData?.coverImage ?? null,
  );
  const coverInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<GalleryFormValues>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      slug: initialData?.slug ?? "",
      description: initialData?.description ?? "",
      eventDate: toDateInputValue(initialData?.eventDate ?? undefined),
      coverImageKey: initialData?.coverImageKey ?? "",
      images:
        initialData?.images.map((img) => ({
          _tempId: img.id,
          imageKey: img.imageKey,
          caption: img.caption ?? "",
          sortOrder: img.sortOrder,
        })) ?? [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "images",
  });

  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>(
    () => {
      const initial: Record<string, string> = {};
      initialData?.images.forEach((img) => {
        initial[img.id] = img.image;
      });
      return initial;
    },
  );
  const [uploadingImageId, setUploadingImageId] = useState<string | null>(null);

  const coverImageKey = watch("coverImageKey");
  const descriptionValue = watch("description");

  // Ref & Register khusus Textarea Description
  const {
    ref: descriptionRef,
    onChange: onDescriptionChange,
    ...descriptionRegister
  } = register("description");
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
  }, [adjustHeight, descriptionValue]);

  const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight();
    onDescriptionChange(e);
  };

  const handleTitleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentSlug = watch("slug");
    if (!currentSlug) {
      setValue("slug", slugify(e.target.value), { shouldValidate: true });
    }
  };

  const handleCoverChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverError(null);
    setCoverPreview(URL.createObjectURL(file));
    setIsCoverUploading(true);

    try {
      const result = await storageService.upload(file, "galleries");
      setValue("coverImageKey", result.key, { shouldValidate: true });
    } catch {
      setCoverError("Gagal mengunggah cover. Silakan coba lagi.");
      setCoverPreview(initialData?.coverImage ?? null);
    } finally {
      setIsCoverUploading(false);
    }
  };

  const handleAddImage = () => {
    const tempId = crypto.randomUUID();
    append({
      _tempId: tempId,
      imageKey: "",
      caption: "",
      sortOrder: fields.length,
    });
  };

  const handleAlbumFileChange = async (
    tempId: string,
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setImagePreviews((prev) => ({ ...prev, [tempId]: localPreview }));
    setUploadingImageId(tempId);

    try {
      const result = await storageService.upload(file, "gallery-images");
      setValue(`images.${index}.imageKey`, result.key, {
        shouldValidate: true,
      });
    } catch {
      setImagePreviews((prev) => {
        const next = { ...prev };
        delete next[tempId];
        return next;
      });
    } finally {
      setUploadingImageId(null);
    }
  };

  const handleRemoveImage = (tempId: string, index: number) => {
    remove(index);
    setImagePreviews((prev) => {
      const next = { ...prev };
      delete next[tempId];
      return next;
    });
  };

  const handleMoveImage = (from: number, to: number) => {
    if (to < 0 || to >= fields.length) return;
    move(from, to);
  };

  const onSubmit = async (data: GalleryFormValues) => {
    const validImages = data.images
      .filter((img) => img.imageKey)
      .map((img, index) => ({
        imageKey: img.imageKey,
        caption: img.caption || undefined,
        sortOrder: index,
      }));

    const payload = {
      title: data.title,
      slug: data.slug,
      description: data.description || undefined,
      eventDate: data.eventDate || undefined,
      coverImageKey: data.coverImageKey || undefined,
      images: validImages,
    };

    try {
      if (isEdit && initialData) {
        const updated = await updateMutation.mutateAsync({
          id: initialData.id,
          payload,
        });

        router.push(`/gallery/${updated.data.id}`);
      } else {
        const created = await createMutation.mutateAsync(payload);

        router.push(`/gallery/${created.data.id}`);
      }
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  const handleCancel = () => {
    router.push(
      isEdit && initialData
        ? `/gallery/${initialData.id}`
        : "/gallery",
    );
  };

  const isBusy = isSubmitting || isCoverUploading || uploadingImageId !== null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Kolom Kiri: Detail Informasi */}
        <div className="space-y-5 lg:col-span-7">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-white/5">
            <FileText className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Informasi Utama
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Judul Album <span className="text-rose-500">*</span>
              </Label>
              <Input
                placeholder="mis. Donor Darah di Kantor PMI"
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
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                URL Slug <span className="text-rose-500">*</span>
              </Label>
              <Input
                placeholder="donor-darah-di-kantor-pmi"
                error={!!errors.slug}
                className="mt-1.5 rounded-lg border-gray-200 font-mono text-sm text-gray-600 focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300"
                {...register("slug")}
              />
              {errors.slug && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.slug.message}
                </p>
              )}
            </div>

            <div>
              <Label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <Calendar className="h-3.5 w-3.5 text-gray-400" /> Tanggal
                Kegiatan
              </Label>
              <Input
                type="date"
                error={!!errors.eventDate}
                className="mt-1.5 rounded-lg border-gray-200 text-sm focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03]"
                {...register("eventDate")}
              />
              {errors.eventDate && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.eventDate.message}
                </p>
              )}
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Deskripsi Album
              </Label>
              <textarea
                rows={5}
                placeholder="Ceritakan konteks album foto ini..."
                className={`mt-1.5 min-h-[160px] w-full resize-y overflow-hidden rounded-lg border bg-transparent p-3 text-sm leading-relaxed outline-none transition placeholder:text-gray-400 focus:ring-2 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-gray-500 ${
                  errors.description
                    ? "border-rose-500 focus:ring-rose-500/20"
                    : "border-gray-200 focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10"
                }`}
                {...descriptionRegister}
                ref={(e) => {
                  descriptionRef(e);
                  textareaRef.current = e;
                }}
                onChange={handleAutoResize}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Media */}
        <div className="self-start space-y-5 lg:sticky lg:top-25 lg:col-span-5">
          {/* Cover Dropzone */}
          <div>
            <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-white/5">
              <Sparkles className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Cover Album
              </h3>
            </div>

            <input
              ref={coverInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleCoverChange}
              className="hidden"
            />

            <div
              onClick={() => coverInputRef.current?.click()}
              className="group relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-3 text-center transition hover:border-brand-500 hover:bg-brand-50/20 dark:border-white/15 dark:bg-white/[0.015] dark:hover:border-brand-400 dark:hover:bg-brand-500/5"
            >
              {coverPreview ? (
                <div className="relative h-36 w-full overflow-hidden rounded-md">
                  <Image
                    src={coverPreview}
                    alt="Cover Preview"
                    fill
                    className="object-contain transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      <UploadCloud className="h-3.5 w-3.5" /> Ganti Cover
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-2">
                  <UploadCloud className="mx-auto h-8 w-8 text-gray-400 transition group-hover:text-brand-500" />
                  <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Klik untuk memilih cover
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Format JPG, PNG, WEBP (Maks. 5MB)
                  </p>
                </div>
              )}

              {isCoverUploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
                  <Loader2 className="h-5 w-5 animate-spin text-brand-600 dark:text-brand-400" />
                </div>
              )}
            </div>

            {coverError && (
              <p className="mt-1.5 text-xs text-rose-500">{coverError}</p>
            )}
            <input
              type="hidden"
              {...register("coverImageKey")}
              value={coverImageKey}
            />
          </div>

          {/* Foto Album */}
          <div>
            <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-white/5">
              <div className="flex items-center gap-2">
                <ImagePlus className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Foto Album
                </h3>
              </div>
              <button
                type="button"
                onClick={handleAddImage}
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                + Tambah Foto
              </button>
            </div>

            {fields.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-200 py-6 text-center dark:border-white/10">
                <p className="text-sm text-gray-400">Belum ada foto album.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {fields.map((field, index) => {
                  const preview = imagePreviews[field._tempId];
                  const isUploadingThis = uploadingImageId === field._tempId;

                  return (
                    <div
                      key={field.id}
                      className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white p-2 transition dark:border-white/10 dark:bg-white/[0.02]"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
                        {preview ? (
                          <Image
                            src={preview}
                            alt=""
                            fill
                            className="object-contain"
                          />
                        ) : (
                          <label className="flex h-full w-full cursor-pointer items-center justify-center text-gray-400 hover:text-gray-600">
                            <UploadCloud className="h-4 w-4" />
                          </label>
                        )}
                        {isUploadingThis && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={(e) =>
                            handleAlbumFileChange(field._tempId, index, e)
                          }
                          className="absolute inset-0 cursor-pointer opacity-0"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <Input
                          placeholder="Keterangan foto..."
                          className="h-9 rounded border-gray-200 text-sm focus:ring-1 dark:border-white/10 dark:bg-transparent"
                          {...register(`images.${index}.caption` as const)}
                        />
                      </div>

                      <div className="flex shrink-0 items-center gap-0.5">
                        <div className="flex flex-col">
                          <button
                            type="button"
                            onClick={() => handleMoveImage(index, index - 1)}
                            disabled={index === 0}
                            className="flex size-6 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-20 dark:hover:bg-white/5 dark:hover:text-white"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveImage(index, index + 1)}
                            disabled={index === fields.length - 1}
                            className="flex size-6 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-20 dark:hover:bg-white/5 dark:hover:text-white"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveImage(field._tempId, index)
                          }
                          className="flex size-8 items-center justify-center rounded text-gray-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
          className="rounded-lg border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
        >
          Batal
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={isBusy}
          className="rounded-lg bg-brand-600 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <Check className="mr-1.5 h-3.5 w-3.5" />
              {isEdit ? "Simpan Perubahan" : "Simpan Album"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
