// データモデル（CLAUDE.md の仕様どおり・拡張しない）

export type SubscriptionStatus = "keep" | "cancel" | "hold";

export type SubscriptionCategory =
  | "ai"
  | "creative"
  | "beauty"
  | "oshi"
  | "storage"
  | "entertainment"
  | "work"
  | "other";

export type Subscription = {
  id: string;
  name: string;
  price: number;
  billingDay?: number;
  category: SubscriptionCategory;
  status: SubscriptionStatus;
  memo?: string;
  createdAt: string;
  updatedAt: string;
  lastReviewedAt?: string;
};

// UI 表示用のラベル（日本語）
export const STATUS_LABEL: Record<SubscriptionStatus, string> = {
  keep: "残す",
  cancel: "止める",
  hold: "保留",
};

// 状態を色だけに頼らないための形（アクセシビリティ）
export const STATUS_GLYPH: Record<SubscriptionStatus, string> = {
  keep: "●",
  cancel: "✕",
  hold: "◐",
};

export const CATEGORY_LABEL: Record<SubscriptionCategory, string> = {
  ai: "AI",
  creative: "創作",
  beauty: "美容",
  oshi: "推し活",
  storage: "保存・容量",
  entertainment: "娯楽",
  work: "仕事",
  other: "その他",
};
