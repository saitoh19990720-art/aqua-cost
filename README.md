# Aqua Cost — やさしい固定費の見直し

毎日の家計簿ではなく、**月に一度、静かに「残す／止める／保留」を決める**ためのアプリ。
サブスクや固定費を“見えるようにする”ことに絞って、入力・罪悪感・判断疲れを減らします。

## Overview

- 家計簿ではなく **固定費のコックピット**
- メインのリズムは **毎月の見直し**
- 各項目は **残す / 止める / 保留** の3択（いつでも変えられる）
- やさしい言葉づかい・淡い配色・低い認知負荷

## Tech Stack

- React + TypeScript + Vite
- 素のCSS（デザイントークン）
- localStorage（ログイン・バックエンド・外部APIなし）

## Setup

```bash
npm install
npm run dev
```

ブラウザで表示された `http://localhost:5173` を開く。

ほかのコマンド：

```bash
npm run build     # 本番ビルド（型チェック込み）
npm run preview   # ビルド結果を確認
```

## Folder Structure

```txt
src/
  components/
    SubscriptionCard.tsx   サブスク1件のカード（3択ボタン付き）
    SubscriptionForm.tsx   かんたん追加フォーム
    MonthlySummary.tsx     今月のまとめ（合計・年額・件数）
    StatusButton.tsx       残す/止める/保留ボタン
  data/
    demoSubscriptions.ts   初回だけ入るサンプル
  hooks/
    useSubscriptions.ts    一覧の状態管理＋localStorage保存＋集計
  lib/
    storage.ts             localStorage 読み書き
    formatCurrency.ts      円表示
  pages/
    Dashboard.tsx          一覧・追加・しぼり込み
    Review.tsx             今月の見直し（5つの問い）
  styles/
    tokens.css             配色トークン
    app.css                画面のスタイル
  types.ts                 データモデル
  App.tsx / main.tsx
```

## Data（localStorage）

- キー `aquacost.subscriptions.v1` … サブスク一覧（JSON配列）
- キー `aquacost.seeded.v1` … サンプル投入済みフラグ（初回だけサンプルを入れるため）

データは **この端末のなかだけ** に保存され、外部へ送信しません。
「すべて消す」で全削除できます（確認ダイアログあり・元に戻せません）。

## Features（MVP）

- サブスク一覧（名前・月額・請求日・カテゴリ・状態・メモ・最終確認日）
- かんたん追加（必須は名前と金額だけ）
- 残す／止める／保留の3択（色だけでなく形 ●✕◐ ＋ラベルで区別）
- 今月のまとめ（月額合計・年額見込み・件数）
- 今月の見直し画面（5つの問い＋気にかかっている項目だけ表示）
- 状態でしぼり込み
- localStorage保存（閉じて開いても消えない）

## Accessibility

- ボタンはキーボード操作可（`aria-pressed` で押下状態を伝達）
- 状態を **色だけに頼らない**（形＋日本語ラベル＋枠線）
- 文字コントラストを確保／動きは最小（`prefers-reduced-motion` 対応）
- スマホは1カラムで破綻しない

## Notes

- ログイン・OCR・決済・クラウド同期は **未実装**（MVPの範囲外）
- 配色は持ち込みの `CLAUDE.md` 指定トークンをそのまま採用（しずくの正本パレットとは少し違うため、揃えたい場合は差し替え可能）

## Future Improvements

- スクリーンショット入力 / OCR抽出（要・本人承認）
- Obsidian Markdown 書き出し・CSV書き出し
- 月次の見直し履歴
- カレンダーのリマインド連携
- カテゴリ別のやさしいサマリ
- Vercel デプロイ／ポートフォリオのケーススタディ化
