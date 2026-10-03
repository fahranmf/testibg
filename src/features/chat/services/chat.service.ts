import { api } from "@/lib/axios";
import type { ChatInboxResponse, ChatMessage, ChatThreadResponse } from "../chat.types";

const data = <T>(response: { data: { data: T } }) => response.data.data;

export const chatService = {
  myThread: () => api.get<{ data: ChatThreadResponse }>("/chat/me").then(data),
  sendMyMessage: (body: string) =>
    api.post<{ data: ChatMessage }>("/chat/me/messages", { body }).then(data),
  readMyThread: () => api.patch("/chat/me/read"),
  inbox: () => api.get<{ data: ChatInboxResponse }>("/admin/chat").then(data),
  staffThread: (id: string) =>
    api.get<{ data: ChatThreadResponse }>(`/admin/chat/${id}`).then(data),
  sendStaffMessage: (id: string, body: string) =>
    api.post<{ data: ChatMessage }>(`/admin/chat/${id}/messages`, { body }).then(data),
  readStaffThread: (id: string) => api.patch(`/admin/chat/${id}/read`),
};
