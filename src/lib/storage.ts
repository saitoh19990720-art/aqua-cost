// localStorage の薄いラッパー。MVPはローカル保存のみ・送信なし。
import type { Subscription } from "../types";

const KEY = "aquacost.subscriptions.v1";
const SEEDED_KEY = "aquacost.seeded.v1";

export function loadSubscriptions(): Subscription[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Subscription[];
  } catch {
    // 壊れたデータでもアプリは落とさない
    return [];
  }
}

export function saveSubscriptions(items: Subscription[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // 保存できなくても黙って続行（プライベートモード等）
  }
}

export function hasSeeded(): boolean {
  return localStorage.getItem(SEEDED_KEY) === "1";
}

export function markSeeded(): void {
  try {
    localStorage.setItem(SEEDED_KEY, "1");
  } catch {
    /* noop */
  }
}
