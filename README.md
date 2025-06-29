# feelog-frontend-nextjs
- メンタルヘルスのための感情トラッキングアプリケーション
- 日記のように感情を記録し、振り返ることができる
- Next.jsによるフロントエンドWebアプリケーション

## 開発予定機能
- 日記の登録、編集、削除、閲覧
- グラフによる感情の可視化
- 設定画面

## 初期構築
- (公式のGetting Started)[https://nextjsjp.org/docs/app/getting-started/installation]の通りに進める
- `mkdir feelog-frontend-nextjs`
- `cd feelog-frontend-nextjs`
- `npx create-next-app@latest`

## openapi.ymlから型定義を生成
- `npx openapi-typescript openapi.yml -o src/types/openapi.d.ts`

