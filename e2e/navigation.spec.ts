import { test, expect } from '@playwright/test';

test.describe('ナビゲーション', () => {
  test.beforeEach(async ({ page }) => {
    // 各テスト前にログインする
    await page.goto('/login');
    await page.check('input[type="checkbox"]');
    await page.click('button:has-text("ゲストとして使い始める")');
  });

  test('ハンバーガーメニューが表示される（モバイル）', async ({ page }) => {
    // モバイルビューに設定
    await page.setViewportSize({ width: 375, height: 667 });
    
    // ハンバーガーメニューボタンが存在することを確認
    const hamburgerButton = page.locator('button[aria-label="メニュー"]');
    await expect(hamburgerButton).toBeVisible();
    
    // ハンバーガーメニューをクリック
    await hamburgerButton.click();
    
    // メニューが開くことを確認
    await expect(page.locator('text=お知らせ')).toBeVisible();
    await expect(page.locator('text=使い方')).toBeVisible();
    await expect(page.locator('text=利用規約')).toBeVisible();
    await expect(page.locator('text=お問い合わせ')).toBeVisible();
  });

  test('デスクトップナビゲーションが表示される', async ({ page }) => {
    // デスクトップビューに設定
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // デスクトップナビゲーションリンクが表示されることを確認（hidden md:flex クラスを持つnav内のリンク）
    await expect(page.locator('nav.hidden.md\\:flex a[href="/diary"]:has-text("記録")')).toBeVisible();
    await expect(page.locator('nav.hidden.md\\:flex a[href="/graph"]:has-text("グラフ")')).toBeVisible();
    await expect(page.locator('nav.hidden.md\\:flex a[href="/settings"]:has-text("設定")')).toBeVisible();
  });

  test('デスクトップでグラフページに移動できる', async ({ page }) => {
    // デスクトップビューに設定
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // デスクトップナビゲーションのグラフリンクをクリック
    const graphLink = page.locator('nav.hidden.md\\:flex a[href="/graph"]:has-text("グラフ")');
    await graphLink.click();
    
    // グラフページに移動することを確認
    await expect(page).toHaveURL('/graph');
  });

  test('デスクトップで設定ページに移動できる', async ({ page }) => {
    // デスクトップビューに設定
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // デスクトップナビゲーションの設定リンクをクリック
    const settingsLink = page.locator('nav.hidden.md\\:flex a[href="/settings"]:has-text("設定")');
    await settingsLink.click();
    
    // 設定ページに移動することを確認
    await expect(page).toHaveURL('/settings');
  });

  test('モバイルでボトムナビゲーションが表示される', async ({ page }) => {
    // モバイルビューに設定
    await page.setViewportSize({ width: 375, height: 667 });
    
    // ボトムナビゲーションが表示されることを確認
    await expect(page.locator('nav[class*="fixed bottom-0"] a[href="/diary"]')).toBeVisible();
    await expect(page.locator('nav[class*="fixed bottom-0"] a[href="/graph"]')).toBeVisible();
    await expect(page.locator('nav[class*="fixed bottom-0"] a[href="/settings"]')).toBeVisible();
  });

  test('モバイルでボトムナビゲーションからグラフページに移動できる', async ({ page }) => {
    // モバイルビューに設定
    await page.setViewportSize({ width: 375, height: 667 });
    
    // ボトムナビゲーションのグラフリンクをクリック
    const graphLink = page.locator('nav[class*="fixed bottom-0"] a[href="/graph"]');
    await graphLink.click();
    
    // グラフページに移動することを確認
    await expect(page).toHaveURL('/graph');
  });

  test('モバイルでボトムナビゲーションから設定ページに移動できる', async ({ page }) => {
    // モバイルビューに設定
    await page.setViewportSize({ width: 375, height: 667 });
    
    // ボトムナビゲーションの設定リンクをクリック
    const settingsLink = page.locator('nav[class*="fixed bottom-0"] a[href="/settings"]');
    await settingsLink.click();
    
    // 設定ページに移動することを確認
    await expect(page).toHaveURL('/settings');
  });
});
