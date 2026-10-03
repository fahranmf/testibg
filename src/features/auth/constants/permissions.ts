export const PERMISSIONS = {
  DASHBOARD_VIEW: "dashboard.view",

  NEWS_VIEW: "news.view",
  NEWS_CREATE: "news.create",
  NEWS_UPDATE: "news.update",
  NEWS_DELETE: "news.delete",
  NEWS_PUBLISH: "news.publish",
  
  ACTIVITY_PUBLISH: "activity.publish",
  GALLERY_PUBLISH: "gallery.publish",
  DONOR_EVENT_PUBLISH: "donor-event.publish",

  USER_VIEW: "user.view",
  USER_CREATE: "user.create",
  USER_UPDATE: "user.update",
  USER_DELETE: "user.delete",

  BLOOD_STOCK_VIEW: "blood-stock.view",
  BLOOD_STOCK_CREATE: "blood-stock.create",
  BLOOD_STOCK_UPDATE: "blood-stock.update",
  BLOOD_STOCK_DELETE: "blood-stock.delete",

  DONOR_EVENT_VIEW: "donor-event.view",
  DONOR_EVENT_CREATE: "donor-event.create",
  DONOR_EVENT_UPDATE: "donor-event.update",
  DONOR_EVENT_DELETE: "donor-event.delete",

  ACTIVITY_VIEW: "activity.view",
  ACTIVITY_CREATE: "activity.create",
  ACTIVITY_UPDATE: "activity.update",
  ACTIVITY_DELETE: "activity.delete",

  GALLERY_VIEW: "gallery.view",
  GALLERY_CREATE: "gallery.create",
  GALLERY_UPDATE: "gallery.update",
  GALLERY_DELETE: "gallery.delete",

  CONTACT_MESSAGE_VIEW: "contact-message.view",
  CONTACT_MESSAGE_CREATE: "contact-message.create",
  CONTACT_MESSAGE_UPDATE: "contact-message.update",
  CONTACT_MESSAGE_DELETE: "contact-message.delete",

  CHAT_VIEW: "chat.view",
  CHAT_REPLY: "chat.reply",

  STORAGE_UPLOAD: "storage.upload",
  STORAGE_DELETE: "storage.delete",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
