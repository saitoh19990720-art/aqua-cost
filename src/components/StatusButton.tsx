import type { SubscriptionStatus } from "../types";
import { STATUS_GLYPH, STATUS_LABEL } from "../types";

type Props = {
  status: SubscriptionStatus;
  active: boolean;
  onClick: () => void;
};

// 残す / 止める / 保留 のボタン。
// 色だけでなく「形（●◐✕）＋ラベル＋押下状態」で区別する（アクセシビリティ）。
export function StatusButton({ status, active, onClick }: Props) {
  return (
    <button
      type="button"
      className={`status-btn status-btn--${status} ${active ? "is-active" : ""}`}
      aria-pressed={active}
      onClick={onClick}
    >
      <span aria-hidden="true" className="status-btn__glyph">
        {STATUS_GLYPH[status]}
      </span>
      {STATUS_LABEL[status]}
    </button>
  );
}
