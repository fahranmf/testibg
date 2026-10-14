"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  Link2,
  Phone,
  Check,
  Loader2,
} from "lucide-react";

import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

import {
  donorEventFormSchema,
  DonorEventFormValues,
  slugify,
  combineToISO,
  isoToDate,
  isoToTime,
} from "../schemas/donor-event.schema";

import { DonorEventDetail } from "../donor-event.types";
import {
  useCreateDonorEvent,
  useUpdateDonorEvent,
} from "../hooks/useDonorEventMutations";

interface Props {
  mode: "create" | "edit";
  initialData?: DonorEventDetail;
}

export default function DonorEventForm({ mode, initialData }: Props) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const createMutation = useCreateDonorEvent();
  const updateMutation = useUpdateDonorEvent();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DonorEventFormValues>({
    resolver: zodResolver(donorEventFormSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      slug: initialData?.slug ?? "",
      description: initialData?.description ?? "",
      eventDate: initialData ? isoToDate(initialData.startAt) : "",
      startTime: initialData ? isoToTime(initialData.startAt) : "",
      endTime: initialData ? isoToTime(initialData.endAt) : "",
      location: initialData?.location ?? "",
      address: initialData?.address ?? "",
      contactInfo: initialData?.contactInfo ?? "",
      registrationUrl: initialData?.registrationUrl ?? "",
    },
  });

  const descriptionValue = watch("description");

  const {
    ref: descriptionRef,
    onChange: onDescriptionChange,
    ...descriptionRegister
  } = register("description");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
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

  const onSubmit = async (data: DonorEventFormValues) => {
    const payload = {
      title: data.title,
      slug: data.slug,
      description: data.description || undefined,
      startAt: combineToISO(data.eventDate, data.startTime),
      endAt: combineToISO(data.eventDate, data.endTime),
      location: data.location,
      address: data.address || undefined,
      contactInfo: data.contactInfo || undefined,
      registrationUrl: data.registrationUrl || undefined,
    };

    try {
      if (isEdit && initialData) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }

      router.push("/donor-events");
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  const handleCancel = () => {
    router.push(
      isEdit && initialData
        ? `/donor-events/${initialData.id}`
        : "/donor-events",
    );
  };

  const isBusy = isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Kolom Kiri: Detail Informasi */}
        <div className="space-y-5 lg:col-span-7">
          {/* Informasi Utama */}
          <div>
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-white/5">
              <FileText className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Informasi Utama
              </h3>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Judul Event <span className="text-rose-500">*</span>
                </Label>
                <Input
                  placeholder="mis. Donor Darah Gratis di Balai Warga"
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
                  placeholder="donor-darah-gratis-balai-warga"
                  error={!!errors.slug}
                  className="mt-1.5 rounded-lg border-gray-200 font-mono text-sm text-gray-600 focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300"
                  {...register("slug")}
                />
                {errors.slug ? (
                  <p className="mt-1 text-xs text-rose-500">
                    {errors.slug.message}
                  </p>
                ) : (
                  <p className="mt-1 text-xs leading-5 text-gray-400 dark:text-gray-500">
                    Slug dibuat otomatis dari judul dan dapat diubah secara
                    manual.
                  </p>
                )}
              </div>

              <div>
                <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Deskripsi
                </Label>
                <textarea
                  rows={6}
                  placeholder="Tuliskan detail mengenai agenda donor event..."
                  className={`mt-1.5 min-h-[200px] w-full resize-y overflow-hidden rounded-lg border bg-transparent p-3 text-sm leading-relaxed outline-none transition placeholder:text-gray-400 focus:ring-2 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-gray-500 ${
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

          {/* Waktu & Lokasi */}
          <div>
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-white/5">
              <Calendar className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Waktu & Lokasi
              </h3>
            </div>

            <div className="mt-5 space-y-4">
              {/* Tanggal */}
              <div>
                <Label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Calendar className="h-3.5 w-3.5 text-gray-400" /> Tanggal
                  Pelaksanaan <span className="text-rose-500">*</span>
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

              {/* Jam Mulai & Selesai */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Clock className="h-3.5 w-3.5 text-gray-400" /> Jam Mulai{" "}
                    <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    type="time"
                    error={!!errors.startTime}
                    className="mt-1.5 rounded-lg border-gray-200 text-sm focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03]"
                    {...register("startTime")}
                  />
                  {errors.startTime && (
                    <p className="mt-1 text-xs text-rose-500">
                      {errors.startTime.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Clock className="h-3.5 w-3.5 text-gray-400" /> Jam
                    Selesai <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    type="time"
                    error={!!errors.endTime}
                    className="mt-1.5 rounded-lg border-gray-200 text-sm focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03]"
                    {...register("endTime")}
                  />
                  {errors.endTime && (
                    <p className="mt-1 text-xs text-rose-500">
                      {errors.endTime.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Lokasi */}
              <div>
                <Label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" /> Lokasi{" "}
                  <span className="text-rose-500">*</span>
                </Label>
                <Input
                  placeholder="mis. Balai Warga RT 04"
                  error={!!errors.location}
                  className="mt-1.5 rounded-lg border-gray-200 text-sm focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03]"
                  {...register("location")}
                />
                {errors.location && (
                  <p className="mt-1 text-xs text-rose-500">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Alamat */}
              <div>
                <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Alamat Lengkap
                </Label>
                <Input
                  placeholder="mis. Jl. Merdeka No. 10, Depok"
                  error={!!errors.address}
                  className="mt-1.5 rounded-lg border-gray-200 text-sm focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03]"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-rose-500">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Informasi Tambahan */}
          <div>
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-white/5">
              <Link2 className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Informasi Tambahan
              </h3>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <Label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Phone className="h-3.5 w-3.5 text-gray-400" /> Info Kontak
                </Label>
                <Input
                  placeholder="mis. 0812-xxxx-xxxx"
                  error={!!errors.contactInfo}
                  className="mt-1.5 rounded-lg border-gray-200 text-sm focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03]"
                  {...register("contactInfo")}
                />
                {errors.contactInfo && (
                  <p className="mt-1 text-xs text-rose-500">
                    {errors.contactInfo.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Link2 className="h-3.5 w-3.5 text-gray-400" /> URL
                  Pendaftaran (Optional)
                </Label>
                <Input
                  placeholder="https://..."
                  error={!!errors.registrationUrl}
                  className="mt-1.5 rounded-lg border-gray-200 text-sm focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03]"
                  {...register("registrationUrl")}
                />
                {errors.registrationUrl && (
                  <p className="mt-1 text-xs text-rose-500">
                    {errors.registrationUrl.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Info Ringkas */}
        <div className="self-start space-y-5 lg:sticky lg:top-25 lg:col-span-5">
          <div>
            <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-white/5">
              <FileText className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Ringkasan
              </h3>
            </div>

            <div className="space-y-3 rounded-lg border border-gray-100 bg-gray-50/50 p-4 dark:border-white/5 dark:bg-white/[0.015]">
              <div className="flex items-start gap-2.5">
                <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-400">
                    Tanggal
                  </p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {watch("eventDate")
                      ? new Date(watch("eventDate") + "T00:00:00").toLocaleDateString("id-ID", {
                          dateStyle: "full",
                        })
                      : "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-400">
                    Jam
                  </p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {watch("startTime") && watch("endTime")
                      ? `${watch("startTime")} — ${watch("endTime")}`
                      : "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-400">
                    Lokasi
                  </p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {watch("location") || "—"}
                  </p>
                </div>
              </div>
            </div>
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
              {isEdit ? "Simpan Perubahan" : "Terbitkan Event"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
