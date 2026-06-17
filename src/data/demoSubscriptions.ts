import type { Subscription } from "../types";

// サンプルデータ。初回だけ表示し、自分のものに置き換えられる。
// （プライバシー：実データとサンプルは分ける。これは“雰囲気を見せる”ためだけ）
const now = "2026-06-01T00:00:00.000Z";

export const demoSubscriptions: Subscription[] = [
  {
    id: "demo-1",
    name: "デザインツール",
    price: 1180,
    billingDay: 3,
    category: "creative",
    status: "keep",
    memo: "制作の主軸。今のところ手放せない。",
    createdAt: now,
    updatedAt: now,
    lastReviewedAt: now,
  },
  {
    id: "demo-2",
    name: "動画サブスク",
    price: 990,
    billingDay: 15,
    category: "entertainment",
    status: "hold",
    memo: "最近あまり見ていない。来月もう一度考える。",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "demo-3",
    name: "クラウド保存",
    price: 1300,
    billingDay: 20,
    category: "storage",
    status: "keep",
    memo: "写真のバックアップ用。",
    createdAt: now,
    updatedAt: now,
    lastReviewedAt: now,
  },
  {
    id: "demo-4",
    name: "使っていない音楽アプリ",
    price: 580,
    billingDay: 8,
    category: "entertainment",
    status: "cancel",
    memo: "別のに移行済み。次回で止める。",
    createdAt: now,
    updatedAt: now,
  },
];
