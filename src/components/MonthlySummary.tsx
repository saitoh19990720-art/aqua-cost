import { formatCurrency } from "../lib/formatCurrency";

type Props = {
  monthlyTotal: number;
  yearlyTotal: number;
  count: number;
  keep: number;
  cancel: number;
  hold: number;
  nextReviewLabel: string;
};

// 今月のまとめカード。やさしい言葉で。
export function MonthlySummary({
  monthlyTotal,
  yearlyTotal,
  count,
  keep,
  cancel,
  hold,
  nextReviewLabel,
}: Props) {
  return (
    <section className="summary" aria-label="今月のまとめ">
      <div className="summary__main">
        <p className="summary__eyebrow">今月の固定費</p>
        <p className="summary__total">{formatCurrency(monthlyTotal)}</p>
        <p className="summary__yearly">
          年間で見ると約 {formatCurrency(yearlyTotal)}
        </p>
      </div>

      <div className="summary__counts">
        <div className="count count--keep">
          <span className="count__num">{keep}</span>
          <span className="count__label">残す</span>
        </div>
        <div className="count count--cancel">
          <span className="count__num">{cancel}</span>
          <span className="count__label">止める</span>
        </div>
        <div className="count count--hold">
          <span className="count__num">{hold}</span>
          <span className="count__label">保留</span>
        </div>
        <div className="count count--all">
          <span className="count__num">{count}</span>
          <span className="count__label">全部</span>
        </div>
      </div>

      <p className="summary__note">
        今月の固定費が見えるようになりました。今日は、気になるものだけ見直せば大丈夫です。
      </p>
      <p className="summary__next">次回の見直し：{nextReviewLabel}</p>
    </section>
  );
}
