import axios from "axios";

import { toastBridge } from "./toastBridge";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const isSessionCheck =
      error.config?.url?.includes("/auth/me");

    if (!isSessionCheck) {
      const message =
        error.response?.data?.message ??
        "Terjadi kesalahan, coba lagi.";

      toastBridge().error(message);
    }

    return Promise.reject(error);
  },
);