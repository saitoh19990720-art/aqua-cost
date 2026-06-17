import { useState } from "react";
import type { SubscriptionCategory } from "../types";
import { CATEGORY_LABEL } from "../types";
import type { NewSubscriptionInput } from "../hooks/useSubscriptions";

type Props = {
  onAdd: (input: NewSubscriptionInput) => void;
  onClose: () => void;
};

const CATEGORIES = Object.keys(CATEGORY_LABEL) as SubscriptionCategory[];

// かんたん追加フォーム。必須はサービス名と金額だけ。
export function SubscriptionForm({ onAdd, onClose }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [billingDay, setBillingDay] = useState("");
  const [category, setCategory] = useState<SubscriptionCategory>("other");
  const [memo, setMemo] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const priceNum = Number(price);
    if (!name.trim()) {
      setError("サービス名を入れてください");
      return;
    }
    if (!price || Number.isNaN(priceNum) || priceNum < 0) {
      setError("金額を数字で入れてください");
      return;
    }
    const dayNum = billingDay ? Number(billingDay) : undefined;
    onAdd({
      name,
      price: priceNum,
      billingDay:
        dayNum && dayNum >= 1 && dayNum <= 31 ? dayNum : undefined,
      category,
      memo,
    });
    onClose();
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">かんたん追加</h2>
      <p className="form__hint">必須はサービス名と金額だけ。あとは後からでも大丈夫です。</p>

      <label className="field">
        <span className="field__label">サービス名 *</span>
        <input
          className="field__input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例：動画サブスク"
          autoFocus
        />
      </label>

      <div className="field-row">
        <label className="field">
          <span className="field__label">月額（円）*</span>
          <input
            className="field__input"
            type="number"
            inputMode="numeric"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="例：990"
          />
        </label>

        <label className="field">
          <span className="field__label">請求日（任意）</span>
          <input
            className="field__input"
            type="number"
            inputMode="numeric"
            min="1"
            max="31"
            value={billingDay}
            onChange={(e) => setBillingDay(e.target.value)}
            placeholder="1〜31"
          />
        </label>
      </div>

      <label className="field">
        <span className="field__label">カテゴリ（任意）</span>
        <select
          className="field__input"
          value={category}
          onChange={(e) => setCategory(e.target.value as SubscriptionCategory)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABEL[c]}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field__label">メモ（任意）</span>
        <textarea
          className="field__input field__input--area"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="例：最近あまり使っていない"
          rows={2}
        />
      </label>

      {error && (
        <p className="form__error" role="alert">
          {error}
        </p>
      )}

      <div className="form__actions">
        <button type="button" className="btn btn--ghost" onClick={onClose}>
          やめる
        </button>
        <button type="submit" className="btn btn--primary">
          追加する
        </button>
      </div>
    </form>
  );
}
