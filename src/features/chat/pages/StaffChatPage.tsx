"use client";

import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, MessageCircle, Send, UserRound } from "lucide-react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { chatService } from "../services/chat.service";
import type { ChatMessage } from "../chat.types";

const timeFormatter = new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" });

function ThreadBubble({ message, staffId }: { message: ChatMessage; staffId: string }) {
  const own = message.sender.id === staffId;
  return <div className={`flex ${own ? "justify-end" : "justify-start"}`}><div className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm ${own ? "rounded-br-md bg-brand-600 text-white" : "rounded-bl-md bg-gray-100 text-gray-800"}`}><p className="whitespace-pre-wrap break-words">{message.body}</p><p className={`mt-1 text-[10px] ${own ? "text-white/70" : "text-gray-400"}`}>{message.sender.name} · {timeFormatter.format(new Date(message.createdAt))}</p></div></div>;
}

export default function StaffChatPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const inbox = useQuery({ queryKey: ["chat", "inbox"], queryFn: chatService.inbox, refetchInterval: 12_000 });
  const thread = useQuery({ queryKey: ["chat", "staff", selectedId], queryFn: () => chatService.staffThread(selectedId!), enabled: !!selectedId, refetchInterval: 12_000 });

  useEffect(() => {
    if (selectedId && thread.data) {
      chatService.readStaffThread(selectedId).then(() => queryClient.invalidateQueries({ queryKey: ["chat", "inbox"] }));
    }
  }, [selectedId, thread.data, queryClient]);

  const send = useMutation({
    mutationFn: (body: string) => chatService.sendStaffMessage(selectedId!, body),
    onSuccess: () => {
      setDraft("");
      queryClient.invalidateQueries({ queryKey: ["chat"] });
    },
  });

  const sendDraft = () => {
    const body = draft.trim();
    if (body && selectedId && !send.isPending) send.mutate(body);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    sendDraft();
  };

  const selected = inbox.data?.conversations.find((conversation) => conversation.id === selectedId);

  return <main className="mx-auto flex h-[calc(100dvh-8rem)] min-h-125 w-full max-w-6xl overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-gray-900">
    <aside className={`${selectedId ? "hidden md:flex" : "flex"} w-full shrink-0 flex-col border-r border-gray-200 md:w-80 dark:border-white/[0.07]`}>
      <header className="border-b border-gray-100 px-5 py-4 dark:border-white/[0.07]"><p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Inbox Bersama</p><h1 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">Chat Pengguna</h1></header>
      <div className="flex-1 overflow-y-auto">
        {inbox.isLoading && <div className="flex justify-center py-12"><Loader2 className="size-5 animate-spin text-brand-600" /></div>}
        {inbox.isError && <div className="p-6 text-center text-sm text-gray-500">Inbox gagal dimuat.<button type="button" onClick={() => inbox.refetch()} className="ml-1 font-semibold text-brand-600">Coba lagi</button></div>}
        {!inbox.isLoading && !inbox.isError && inbox.data?.conversations.length === 0 && <div className="p-8 text-center text-sm text-gray-500"><MessageCircle className="mx-auto mb-3 size-8 text-gray-300" />Belum ada percakapan.</div>}
        {inbox.data?.conversations.map((conversation) => <button key={conversation.id} type="button" onClick={() => setSelectedId(conversation.id)} className={`flex w-full gap-3 border-b border-gray-100 p-4 text-left transition hover:bg-gray-50 dark:border-white/[0.05] dark:hover:bg-white/[0.03] ${selectedId === conversation.id ? "bg-brand-50/70 dark:bg-brand-500/10" : ""}`}><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">{conversation.user.name.slice(0, 2).toUpperCase()}</span><span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-2"><b className="truncate text-sm text-gray-800 dark:text-gray-100">{conversation.user.name}</b>{conversation.unreadCount > 0 && <i className="size-2 shrink-0 rounded-full bg-brand-500" />}</span><span className="mt-1 block truncate text-xs text-gray-500">{conversation.lastMessage?.body}</span></span></button>)}
      </div>
    </aside>

    <section className={`${selectedId ? "flex" : "hidden md:flex"} min-w-0 flex-1 flex-col`}>
      {!selectedId ? <div className="m-auto text-center text-gray-500"><MessageCircle className="mx-auto mb-3 size-10 text-gray-300" /><p>Pilih percakapan untuk mulai membalas.</p></div> : <>
        <header className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-white/[0.07]"><button type="button" onClick={() => setSelectedId(null)} className="md:hidden"><ArrowLeft className="size-5" /></button><span className="flex size-9 items-center justify-center rounded-full bg-brand-100 text-brand-700"><UserRound className="size-4" /></span><div><h2 className="font-semibold text-gray-900 dark:text-white">{selected?.user.name}</h2><p className="text-xs text-gray-500">Percakapan pengguna</p></div></header>
        <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50/60 p-5 dark:bg-gray-950/20">{thread.isLoading && <div className="flex justify-center pt-12"><Loader2 className="size-5 animate-spin text-brand-600" /></div>}{thread.isError && <div className="pt-12 text-center text-sm text-gray-500">Percakapan gagal dimuat.<button type="button" onClick={() => thread.refetch()} className="ml-1 font-semibold text-brand-600">Coba lagi</button></div>}{thread.data?.messages.map((message) => <ThreadBubble key={message.id} message={message} staffId={user!.id} />)}</div>
        <form onSubmit={submit} className="border-t border-gray-100 p-4 dark:border-white/[0.07]">{send.isError && <p className="mb-2 text-xs text-error-500">Pesan gagal dikirim. Coba lagi.</p>}<div className="flex items-end gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2 dark:border-white/10 dark:bg-white/[0.03]"><textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendDraft(); } }} maxLength={2000} rows={2} placeholder="Balas pesan..." className="min-h-10 flex-1 resize-none bg-transparent px-2 py-1 text-sm outline-none" /><button type="submit" disabled={!draft.trim() || send.isPending} className="flex size-10 items-center justify-center rounded-lg bg-brand-600 text-white disabled:opacity-50">{send.isPending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}</button></div></form>
      </>}
    </section>
  </main>;
}
