import { useCallback, useEffect, useMemo, useState } from "react";
import type { Subscription, SubscriptionStatus } from "../types";
import {
  hasSeeded,
  loadSubscriptions,
  markSeeded,
  saveSubscriptions,
} from "../lib/storage";
import { demoSubscriptions } from "../data/demoSubscriptions";

// 新規追加で受け取る項目（id や日時は内部で付与する）
export type NewSubscriptionInput = {
  name: string;
  price: number;
  billingDay?: number;
  category: Subscription["category"];
  memo?: string;
};

function nowISO(): string {
  return new Date().toISOString();
}

function makeId(): string {
  // crypto.randomUUID が無い環境への保険
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "id-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function useSubscriptions() {
  const [items, setItems] = useState<Subscription[]>(() => {
    const existing = loadSubscriptions();
    // 初回（まだ一度も使っていない）だけサンプルを入れる
    if (existing.length === 0 && !hasSeeded()) {
      markSeeded();
      saveSubscriptions(demoSubscriptions);
      return demoSubscriptions;
    }
    return existing;
  });

  // 変更があるたびに保存
  useEffect(() => {
    saveSubscriptions(items);
  }, [items]);

  const add = useCallback((input: NewSubscriptionInput) => {
    const ts = nowISO();
    const sub: Subscription = {
      id: makeId(),
      name: input.name.trim(),
      price: input.price,
      billingDay: input.billingDay,
      category: input.category,
      status: "keep",
      memo: input.memo?.trim() || undefined,
      createdAt: ts,
      updatedAt: ts,
    };
    setItems((prev) => [sub, ...prev]);
  }, []);

  const setStatus = useCallback((id: string, status: SubscriptionStatus) => {
    const ts = nowISO();
    setItems((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status, updatedAt: ts, lastReviewedAt: ts } : s,
      ),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
  }, []);

  // 集計（月額合計・年額見込み・状態カウント）
  const summary = useMemo(() => {
    const monthlyTotal = items.reduce((sum, s) => sum + (s.price || 0), 0);
    const keep = items.filter((s) => s.status === "keep").length;
    const cancel = items.filter((s) => s.status === "cancel").length;
    const hold = items.filter((s) => s.status === "hold").length;
    return {
      monthlyTotal,
      yearlyTotal: monthlyTotal * 12,
      count: items.length,
      keep,
      cancel,
      hold,
    };
  }, [items]);

  return { items, summary, add, setStatus, remove, clearAll };
}
