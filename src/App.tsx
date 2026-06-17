import { useState } from "react";
import { useSubscriptions } from "./hooks/useSubscriptions";
import { Dashboard } from "./pages/Dashboard";
import { Review } from "./pages/Review";

type Tab = "dashboard" | "review";

// 次回の見直し日＝来月の1日（やさしいリズム＝月に一度）
function nextReviewLabel(): string {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return `${next.getFullYear()}年${next.getMonth() + 1}月1日ごろ`;
}

export default function App() {
  const { items, summary, add, setStatus, remove, clearAll } =
    useSubscriptions();
  const [tab, setTab] = useState<Tab>("dashboard");
  const reviewLabel = nextReviewLabel();

  return (
    <div className="app">
      <header className="appbar">
        <div className="appbar__brand">
          <span className="appbar__logo" aria-hidden="true">
            ◍
          </span>
          <div>
            <h1 className="appbar__title">Aqua Cost</h1>
            <p className="appbar__sub">やさしい固定費の見直し</p>
          </div>
        </div>
        <nav className="tabs" aria-label="画面の切り替え">
          <button
            type="button"
            className={`tab ${tab === "dashboard" ? "is-active" : ""}`}
            aria-pressed={tab === "dashboard"}
            onClick={() => setTab("dashboard")}
          >
            ダッシュボード
          </button>
          <button
            type="button"
            className={`tab ${tab === "review" ? "is-active" : ""}`}
            aria-pressed={tab === "review"}
            onClick={() => setTab("review")}
          >
            今月の見直し
          </button>
        </nav>
      </header>

      <main className="main">
        {tab === "dashboard" ? (
          <Dashboard
            items={items}
            summary={summary}
            nextReviewLabel={reviewLabel}
            onAdd={add}
            onStatus={setStatus}
            onRemove={remove}
          />
        ) : (
          <Review
            items={items}
            summary={summary}
            nextReviewLabel={reviewLabel}
            onStatus={setStatus}
            onRemove={remove}
          />
        )}
      </main>

      <footer className="appfoot">
        <span>データはこの端末のなかだけに保存されます（送信なし）。</span>
        {items.length > 0 && (
          <button
            type="button"
            className="link-btn"
            onClick={() => {
              if (
                window.confirm(
                  "すべての項目を消します。よろしいですか？（元には戻せません）",
                )
              ) {
                clearAll();
              }
            }}
          >
            すべて消す
          </button>
        )}
      </footer>
    </div>
  );
}
