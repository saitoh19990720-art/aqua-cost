import type { Subscription, SubscriptionStatus } from "../types";
import { formatCurrency } from "../lib/formatCurrency";
import { SubscriptionCard } from "../components/SubscriptionCard";

type Props = {
  items: Subscription[];
  summary: {
    monthlyTotal: number;
    count: number;
    hold: number;
  };
  nextReviewLabel: string;
  onStatus: (id: string, status: SubscriptionStatus) => void;
  onRemove: (id: string) => void;
};

// 今月の見直し画面。5つの問いに沿って、静かに1つだけ決める。
export function Review({
  items,
  summary,
  nextReviewLabel,
  onStatus,
  onRemove,
}: Props) {
  // 見直し候補＝「保留」または「止める」になっているもの（気にかかっているもの）
  const toReview = items.filter(
    (s) => s.status === "hold" || s.status === "cancel",
  );

  const questions = [
    "何にお金を払っている？",
    "今月、変わったことは？",
    "残すものは？",
    "止めるものは？",
    "あとで確認するものは？",
  ];

  return (
    <div className="page">
      <section className="review-head">
        <h2 className="review-head__title">今月の見直し</h2>
        <p className="review-head__lead">
          今日は1つ決めればOK。ここだけ見れば大丈夫です。
        </p>
        <div className="review-head__stats">
          <span>固定費 {formatCurrency(summary.monthlyTotal)}/月</span>
          <span>登録 {summary.count}件</span>
          <span>保留中 {summary.hold}件</span>
          <span>次回確認 {nextReviewLabel}</span>
        </div>
      </section>

      <ol className="steps">
        {questions.map((q, i) => (
          <li key={i} className="steps__item">
            <span className="steps__num">{i + 1}</span>
            {q}
          </li>
        ))}
      </ol>

      <h3 className="review-sub">見直し候補（保留・止める）</h3>
      {toReview.length === 0 ? (
        <p className="empty">
          いま気にかかっているものはありません。今月はこのままで大丈夫そうです。
        </p>
      ) : (
        <div className="cards">
          {toReview.map((sub) => (
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
