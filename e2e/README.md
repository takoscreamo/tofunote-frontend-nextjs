# E2Eテスト

このディレクトリには、Playwrightを使用したE2E（End-to-End）テストが含まれています。

## テストの実行

### すべてのテストを実行
```bash
npm run e2e
```

### ヘッドレスモードでテストを実行（ブラウザを表示）
```bash
npm run e2e:headed
```

### テストUIを開いてテストを実行
```bash
npm run e2e:ui
```

### テストレポートを表示
```bash
npm run e2e:report
```

## テストファイル

- `example.spec.ts` - 基本的なアプリケーション機能のテスト
  - ホームページの表示
  - ログインページの表示
  - ゲストログイン機能
  - 日記ページの表示
  - 日記フォームの基本操作

- `navigation.spec.ts` - ナビゲーション機能のテスト
  - ハンバーガーメニュー（モバイル）
  - デスクトップナビゲーション
  - モバイルボトムナビゲーション
  - ページ間の移動

## テスト環境

- **ブラウザ**: Chromium, Firefox, Mobile Chrome
- **ベースURL**: http://localhost:3000
- **自動起動**: テスト実行時に開発サーバーが自動的に起動されます

## テストの追加

新しいテストを追加する場合は、`.spec.ts`ファイルを作成し、PlaywrightのテストAPIを使用してください。

例：
```typescript
import { test, expect } from '@playwright/test';

test('新しい機能のテスト', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('期待するテキスト');
});
```

## 注意事項

- WebKitは現在macOSでの互換性の問題により無効化されています
- テストは並列実行されるため、テスト間で状態を共有しないように注意してください
- テストデータは各テストで独立して作成・削除してください
