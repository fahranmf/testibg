"use client";

import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, LogOut, Send } from "lucide-react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { chatService } from "../services/chat.service";
import type { ChatMessage } from "../chat.types";

const timeFormatter = new Intl.DateTimeFormat("id-ID", {
  hour: "2-digit",
  minute: "2-digit",
});

function Avatar({ name }: { name: string }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white p-1">
      <img
        src="/images/logo/logo-icon.svg"
        alt={name}
        className="size-full object-contain"
      />
    </span>
  );
}

function Bubble({ message, own }: { message: ChatMessage; own: boolean }) {
  return (
    <div className={`flex gap-2.5 ${own ? "justify-end" : "justify-start"}`}>
      {!own && <Avatar name="PMI" />}
      <div
        className={`min-w-0 max-w-[78%] ${own ? "items-end" : "items-start"}`}
      >
        {!own && (
          <p className="mb-1 text-[11px] font-semibold text-gray-600">
            UDD PMI Depok
          </p>
        )}
        <div
          className={`rounded-lg px-3 py-2 text-[13px] leading-5 ${own ? "rounded-br-sm bg-brand-600 text-white" : "rounded-bl-sm bg-white text-gray-800 ring-1 ring-gray-200"}`}
        >
          <p className="whitespace-pre-wrap break-words">{message.body}</p>
        </div>
        <p
          className={`mt-1 text-[10px] ${own ? "text-right text-gray-400" : "text-gray-400"}`}
        >
          {timeFormatter.format(new Date(message.createdAt))}
          {own && message.readAt ? " · Dibaca" : ""}
        </p>
      </div>
    </div>
  );
}

export default function UserChatPage() {
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState("");
  const thread = useQuery({
    queryKey: ["chat", "me"],
    queryFn: chatService.myThread,
    refetchInterval: 12_000,
  });

  useEffect(() => {
    if (thread.data?.conversation.id) {
      chatService.readMyThread();
    }
  }, [thread.data?.conversation.id]);

  const send = useMutation({
    mutationFn: chatService.sendMyMessage,
    onSuccess: () => {
      setDraft("");
      queryClient.invalidateQueries({ queryKey: ["chat", "me"] });
    },
  });

  const sendDraft = () => {
    const body = draft.trim();
    if (body && !send.isPending) send.mutate(body);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    sendDraft();
  };

  return (
    <main className="flex h-dvh min-h-0 overflow-hidden bg-gray-100 p-0 sm:p-5">
      <section className="mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col overflow-hidden bg-white sm:rounded-xl sm:border sm:border-gray-200 sm:shadow-theme-lg">
        <header className="flex h-15 shrink-0 items-center justify-between border-b border-gray-200 px-4 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <Avatar name="PMI" />
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold text-gray-900">
                Bantuan UDD PMI Depok
              </h1>
              <p className="truncate text-[11px] text-gray-500">
                Pesan bantuan
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => logout()}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            aria-label="Keluar dari akun"
          >
            <LogOut className="size-3.5" /> Keluar
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto bg-gray-50 px-4 py-5 sm:px-6">
          {thread.isLoading && (
            <div className="flex justify-center py-16">
              <Loader2 className="size-5 animate-spin text-brand-600" />
            </div>
          )}
          {thread.isError && (
            <div className="mx-auto max-w-sm rounded-lg border border-error-200 bg-error-50 p-3 text-center text-sm text-error-700">
              Pesan gagal dimuat.
              <button
                type="button"
                className="ml-2 font-semibold underline"
                onClick={() => thread.refetch()}
              >
                Coba lagi
              </button>
            </div>
          )}
          {!thread.isLoading &&
            !thread.isError &&
            thread.data?.messages.length === 0 && (
              <div className="mx-auto flex max-w-sm flex-col items-center pt-20 text-center">
                <Avatar name="PMI" />
                <h2 className="mt-3 text-sm font-semibold text-gray-800">
                  Mulai percakapan
                </h2>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Kirim pesan untuk menghubungi tim PMI Depok.
                </p>
              </div>
            )}
          {thread.data?.messages.length ? (
            <div className="space-y-4">
              {thread.data.messages.map((message) => (
                <Bubble
                  key={message.id}
                  message={message}
                  own={message.sender.id === user?.id}
                />
              ))}
            </div>
          ) : null}
        </div>

        <form
          onSubmit={submit}
          className="shrink-0 border-t border-gray-200 bg-white p-3 sm:px-5"
        >
          {send.isError && (
            <p className="mb-2 text-xs text-error-600">
              Pesan belum terkirim. Coba kirim kembali.
            </p>
          )}
          <div className="flex items-end gap-2 rounded-lg border border-gray-300 bg-white p-1.5 transition focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendDraft();
                }
              }}
              maxLength={2000}
              rows={1}
              placeholder="Tulis pesan..."
              className="max-h-28 min-h-8 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm leading-5 text-gray-800 outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              disabled={!draft.trim() || send.isPending}
              className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-600 text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Kirim pesan"
            >
              {send.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
            </button>
          </div>
          <div className="mt-1.5 flex justify-between px-0.5 text-[10px] text-gray-400">
            <span>Enter kirim · Shift + Enter baris baru</span>
            <span>{draft.length}/2000</span>
          </div>
        </form>
      </section>
    </main>
  );
}
