import type { Subscription, SubscriptionStatus } from "../types";
import { CATEGORY_LABEL, STATUS_GLYPH, STATUS_LABEL } from "../types";
import { formatCurrency } from "../lib/formatCurrency";
import { StatusButton } from "./StatusButton";

type Props = {
  sub: Subscription;
  onStatus: (id: string, status: SubscriptionStatus) => void;
  onRemove: (id: string) => void;
};

const STATUSES: SubscriptionStatus[] = ["keep", "cancel", "hold"];

function formatReviewed(iso?: string): string {
  if (!iso) return "まだ見直していません";
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日に確認`;
}

export function SubscriptionCard({ sub, onStatus, onRemove }: Props) {
  return (
    <article className={`card card--${sub.status}`}>
      <div className="card__top">
        <div>
          <h3 className="card__name">{sub.name}</h3>
          <p className="card__meta">
            <span className="chip">{CATEGORY_LABEL[sub.category]}</span>
            {sub.billingDay ? (
              <span className="card__billing">毎月{sub.billingDay}日</span>
            ) : (
              <span className="card__billing card__billing--none">請求日 未設定</span>
            )}
          </p>
        </div>
        <p className="card__price">
          {formatCurrency(sub.price)}
          <span className="card__price-unit">/月</span>
        </p>
      </div>

      <p className="card__status-line">
        <span aria-hidden="true">{STATUS_GLYPH[sub.status]}</span>
        いまの判断：<strong>{STATUS_LABEL[sub.status]}</strong>
      </p>

      {sub.memo && <p className="card__memo">{sub.memo}</p>}

      <div className="card__decisions" role="group" aria-label={`${sub.name} の判断`}>
        {STATUSES.map((st) => (
          <StatusButton
            key={st}
            status={st}
            active={sub.status === st}
            onClick={() => onStatus(sub.id, st)}
          />
        ))}
      </div>

      <div className="card__foot">
        <span className="card__reviewed">{formatReviewed(sub.lastReviewedAt)}</span>
        <button
          type="button"
          className="link-btn"
          onClick={() => onRemove(sub.id)}
          aria-label={`${sub.name} を一覧から消す`}
        >
          消す
        </button>
      </div>
    </article>
  );
}
