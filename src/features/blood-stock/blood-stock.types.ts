export type BloodType = "A" | "B" | "AB" | "O";

export type Rhesus = "POSITIVE" | "NEGATIVE";

export const BLOOD_TYPE_LABELS: Record<BloodType, string> = {
  A: "A",
  B: "B",
  AB: "AB",
  O: "O",
};

export const RHESUS_LABELS: Record<Rhesus, string> = {
  POSITIVE: "Rh+",
  NEGATIVE: "Rh-",
};

// Shape returned by bloodStockDetailMapper (admin list) — field names match persis
export interface BloodStock {
  bloodStockId: string;
  bloodType: BloodType;
  rhesus: Rhesus;
  stock: number;
  updatedAt: string;
  updatedby: { userId: string; name: string } | null;
}

export interface BloodStockListParams {
  type?: BloodType | "all";
  rhesus?: Rhesus | "all";
  sortOrder?: "asc" | "desc";
}