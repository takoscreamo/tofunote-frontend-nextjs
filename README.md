# TOFU NOTE Frontend - 豆腐メンタルを可視化するアプリケーション

豆腐メンタルの可視化・記録アプリケーション。日々のメンタルスコアや日記を記録し、グラフで振り返ることができます。

---
## 画面サンプル
<img width="956" height="712" alt="Image" src="https://github.com/user-attachments/assets/a40b8bcd-e2c5-4045-b87f-e97b636151cd" />

---

## 主な機能

- **日記機能**
  - 日記の作成・編集・削除・閲覧
  - メンタルスコア（1-10）の記録
  - 日付選択による過去の日記へのアクセス
  - 入力バリデーション・トースト通知

- **グラフ機能**
  - メンタルスコア推移のグラフ表示
  - 期間選択（1週間、2週間、1ヶ月、3ヶ月、6ヶ月、1年、カスタム）
  - 期間平均スコア表示
  - レスポンシブ対応・ローディング表示

- **設定**
  - ユーザー設定画面
  - 退会（全データ削除）

- **サブページ**
  - **お知らせページ**（/notices）
    - お知らせ一覧を表示
  - **使い方ページ**（/howto）
    - サンプル画像のカルーセル（左右ボタン・ドット付き）＋説明
    - 画像クリックでモーダル拡大表示
    - ログイン前後どちらからもアクセス可能
  - **利用規約ページ**（/terms）
    - TermsModalで利用規約を表示
    - ×ボタンで「前のページに戻る」挙動
  - **お問い合わせページ**（/contact）
    - 独立したページで案内文付き
    - 設定画面下部から独立

- **認証・ゲストログイン**
  - ゲストユーザー自動ログイン（refresh_token管理）
  - 未ログイン時は/loginへリダイレクト
  - ログアウト不可（refresh_tokenはlocalstorageに保持）

---

## 技術スタック

- **Next.js 15.3.3**（App Router）
- **React 19.0.0**
- **TypeScript 5**
- **Tailwind CSS 4**
- **SWR 2.3.3**
- **Recharts 2.15.4**
- **React Toastify 11.0.5**
- **date-fns 4.1.0**
- **Axios 1.10.0**
- **Jotai**（グローバル状態管理）
- **openapi-typescript 7.8.0**
- **ESLint 9**

---

## ディレクトリ構成（2024/06時点）

```
tofunote-frontend-nextjs/
├── src/
│   ├── app/
│   │   ├── (app)/
│   │   │   ├── contact/         # お問い合わせページ
│   │   │   ├── diary/           # 日記機能
│   │   │   ├── graph/           # グラフ機能
│   │   │   ├── howto/           # 使い方ページ（カルーセル）
│   │   │   ├── notices/         # お知らせ
│   │   │   ├── settings/        # 設定
│   │   │   └── terms/           # 利用規約
│   │   ├── (auth)/
│   │   │   └── login/           # 認証・ログイン
│   │   ├── globals.css
│   │   ├── layout.tsx           # ルートレイアウト
│   │   └── not-found.tsx
│   ├── atoms/                   # Jotaiアトム
│   ├── components/
│   │   ├── common/              # 共通コンポーネント（AuthGuard, HamburgerMenu, TermsModal等）
│   │   └── ui/                  # UIパーツ（Button, DatePicker, MentalScoreSlider等）
│   ├── fetch/                   # API通信
│   ├── hooks/                   # カスタムフック
│   ├── types/                   # 型定義
│   └── utils/                   # ユーティリティ
├── public/                      # 静的ファイル・SVGアイコン
├── openapi.yml                  # OpenAPI仕様
└── package.json
```

---

## セットアップ

### 前提

- Node.js 18.17.0 以上
- npm または yarn

### 手順

1. リポジトリのクローン
   ```bash
   git clone <repository-url>
   cd tofunote-frontend-nextjs
   ```

2. 依存関係のインストール
   ```bash
   npm install
   ```

3. 環境変数の設定
   ```bash
   cp .env.example .env.local
   ```

4. OpenAPI型定義の生成
   ```bash
   npm run generate-types
   # または
   npx openapi-typescript openapi.yml -o src/types/openapi.d.ts
   ```

5. 開発サーバー起動
   ```bash
   npm run dev
   ```

   ブラウザで [http://localhost:3000](http://localhost:3000) を開く

---

## 開発ガイド

### コマンド一覧

- `npm run dev` : 開発サーバー起動
- `npm run build` : プロダクションビルド
- `npm run lint` : ESLint実行
- `npm run generate-types` : OpenAPI型定義生成

### 開発フロー

- 新機能は `src/app/(app)/` 配下にページとして作成
- 再利用可能なUIは `src/components/` へ
- カスタムフックは `src/hooks/` へ
- APIエンドポイントは `src/utils/endpoints.ts` で管理
- データ取得は `src/fetch/fetcher.ts` + SWR
- API型定義は`openapi.yml`を元にコマンドで`src/types/openapi.d.ts`を自動生成
- グローバル状態はJotaiで管理
- SVGアイコンは`public/`配下に配置

### コーディング規約

- 関数コンポーネント + TypeScript
- スタイリングはTailwind CSS
- 状態管理はReact Hooks
- エラーハンドリングはtry-catch + エラー境界

---

## ゲストログイン・認証仕様

- ゲストログイン時、refresh_tokenをlocalStorageに保存
- 以降は同じゲストユーザーで自動ログイン
- refresh_tokenが存在する場合、新規ゲスト発行不可
- ゲストユーザーの切り替え・リセット不可
- ログアウト不可（refresh_tokenは削除しない）
- 認証状態はJotaiで管理
- 未ログイン時のみ `/login` へリダイレクト

---

## その他

- OpenAPI仕様変更時は `npm run generate-types` を必ず実行
- デプロイは`tofunote-infra`のリポジトリにて管理

---
