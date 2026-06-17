import { useMemo, useState } from "react";
import type { Subscription, SubscriptionStatus } from "../types";
import { STATUS_LABEL } from "../types";
import { SubscriptionCard } from "../components/SubscriptionCard";
import { SubscriptionForm } from "../components/SubscriptionForm";
import { MonthlySummary } from "../components/MonthlySummary";
import type { NewSubscriptionInput } from "../hooks/useSubscriptions";

type Filter = "all" | SubscriptionStatus;

type Props = {
  items: Subscription[];
  summary: {
    monthlyTotal: number;
    yearlyTotal: number;
    count: number;
    keep: number;
    cancel: number;
    hold: number;
  };
  nextReviewLabel: string;
  onAdd: (input: NewSubscriptionInput) => void;
  onStatus: (id: string, status: SubscriptionStatus) => void;
  onRemove: (id: string) => void;
};

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "keep", label: STATUS_LABEL.keep },
  { key: "hold", label: STATUS_LABEL.hold },
  { key: "cancel", label: STATUS_LABEL.cancel },
];

export function Dashboard({
  items,
  summary,
  nextReviewLabel,
  onAdd,
  onStatus,
  onRemove,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((s) => s.status === filter)),
    [items, filter],
  );

  return (
    <div className="page">
      <MonthlySummary {...summary} nextReviewLabel={nextReviewLabel} />

      <div className="toolbar">
        <div className="filters" role="group" aria-label="状態でしぼり込む">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`filter ${filter === f.key ? "is-active" : ""}`}
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => setShowForm((v) => !v)}
        >
          ＋ 追加
        </button>
      </div>

      {showForm && (
        <SubscriptionForm onAdd={onAdd} onClose={() => setShowForm(false)} />
      )}

      {filtered.length === 0 ? (
        <p className="empty">
          {items.length === 0
            ? "まだ何も入っていません。「＋ 追加」から、ひとつだけ入れてみましょう。"
            : "この状態のものはありません。"}
        </p>
      ) : (
        <div className="cards">
          {filtered.map((sub) => (
            <SubscriptionCard
              key={sub.id}
              sub={sub}
              onStatus={onStatus}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
