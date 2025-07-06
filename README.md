# Feelog Frontend - 感情トラッキングアプリケーション

メンタルヘルスのための感情トラッキングアプリケーションです。日記のように感情を記録し、グラフで可視化することで、自分のメンタル状態を振り返ることができます。

## 🚀 機能

### 実装済み機能
- **日記機能**
  - 日記の作成・編集・削除・閲覧
  - メンタルスコア（1-10）の記録
  - 日付選択による過去の日記へのアクセス
  - リアルタイムバリデーション
  - トースト通知による操作フィードバック

- **グラフ機能**
  - メンタルスコアの推移グラフ表示
  - 期間選択（1週間、1ヶ月、3ヶ月、カスタム期間）
  - レスポンシブデザイン対応
  - データ読み込み状態の表示

### 開発予定機能
- 設定画面
- ユーザープロフィール管理
- データエクスポート機能
- 統計分析機能
- プッシュ通知

## 🛠 技術スタック

### フロントエンド
- **Next.js 15.3.3** - React フレームワーク（App Router）
- **React 19.0.0** - UI ライブラリ
- **TypeScript 5** - 型安全性
- **Tailwind CSS 4** - スタイリング
- **SWR 2.3.3** - データフェッチング
- **Recharts 2.15.4** - グラフ描画
- **React Toastify 11.0.5** - 通知システム
- **date-fns 4.1.0** - 日付操作
- **Axios 1.10.0** - HTTP クライアント

### 開発ツール
- **openapi-typescript 7.8.0** - OpenAPI型定義生成
- **ESLint 9** - コード品質管理・静的解析

## 📁 プロジェクト構造

```
feelog-frontend-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── diary/             # 日記機能
│   │   │   ├── DiaryForm.tsx  # 日記フォームコンポーネント
│   │   │   └── page.tsx       # 日記ページ
│   │   ├── graph/             # グラフ機能
│   │   │   ├── GraphContent.tsx      # グラフ表示コンポーネント
│   │   │   ├── MultiMetricChart.tsx  # 複数メトリクスチャート
│   │   │   ├── PeriodSelector.tsx    # 期間選択コンポーネント
│   │   │   └── page.tsx       # グラフページ
│   │   ├── layout.tsx         # ルートレイアウト
│   │   └── page.tsx           # ホームページ（リダイレクト）
│   ├── components/            # 再利用可能コンポーネント
│   │   ├── common/            # 共通コンポーネント
│   │   │   └── ErrorMessage.tsx
│   │   └── ui/                # UI コンポーネント
│   │       ├── Button.tsx
│   │       ├── DatePicker.tsx
│   │       ├── MentalScoreSlider.tsx
│   │       └── TextArea.tsx
│   ├── fetch/                 # API 通信
│   │   └── fetcher.ts
│   ├── hooks/                 # カスタムフック
│   │   ├── useDiaryForm.ts
│   │   └── useSwr.ts
│   ├── types/                 # 型定義
│   │   └── openapi.d.ts       # OpenAPI から生成された型
│   └── utils/                 # ユーティリティ
│       ├── date.ts
│       ├── dateRange.ts
│       └── endpoints.ts
├── public/                    # 静的ファイル
├── openapi.yml               # OpenAPI 仕様書
└── package.json
```

## 🚀 セットアップ

### 前提条件
- Node.js 18.17.0 以上
- npm または yarn

### インストール手順

1. **リポジトリのクローン**
   ```bash
   git clone <repository-url>
   cd feelog-frontend-nextjs
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

3. **環境変数の設定**
   ```bash
   # .env.example ファイルをコピー
   cp .env.example .env.local
   ```

4. **型定義の生成**
   ```bash
   npx openapi-typescript openapi.yml -o src/types/openapi.d.ts
   ```

5. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

   ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認。

## 📝 開発ガイド

### 利用可能なスクリプト

```bash
npm run dev          # 開発サーバー起動（Turbopack使用）
npm run build        # プロダクションビルド
npm run start        # プロダクションサーバー起動
npm run lint         # ESLint実行
npm run generate-types # OpenAPI型定義生成
```

### 開発の流れ

1. **機能開発**
   - 新しい機能は `src/app/` 配下にページとして作成
   - 再利用可能なコンポーネントは `src/components/` に配置
   - カスタムフックは `src/hooks/` に配置

2. **API との連携**
   - API エンドポイントは `src/utils/endpoints.ts` で管理
   - データフェッチングは `src/fetch/fetcher.ts` を使用
   - SWR を使用してキャッシュとエラーハンドリングを実装

3. **型安全性**
   - OpenAPI 仕様書を更新後、`npx openapi-typescript openapi.yml -o src/types/openapi.d.ts` で型定義を再生成
   - TypeScript の型チェックを活用

### コーディング規約

- **コンポーネント**: 関数コンポーネント + TypeScript
- **スタイリング**: Tailwind CSS クラス名を使用
- **状態管理**: React Hooks (useState, useEffect, useCallback)
- **データフェッチ**: SWR を使用
- **エラーハンドリング**: try-catch + エラー境界

---

## 初期構築
- [公式のGetting Started](https://nextjsjp.org/docs/app/getting-started/installation)の通りに進める
- `mkdir feelog-frontend-nextjs`
- `cd feelog-frontend-nextjs`
- `npx create-next-app@latest`


---
