interface ToastApi {
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

let handler: ToastApi | null = null;

export function registerToastHandler(
  api: ToastApi,
) {
  handler = api;
}

export function toastBridge(): ToastApi {
  return {
    success: (message) =>
      handler?.success(message),

    error: (message) =>
      handler?.error(message),

    warning: (message) =>
      handler?.warning(message),

    info: (message) =>
      handler?.info(message),
  };
}