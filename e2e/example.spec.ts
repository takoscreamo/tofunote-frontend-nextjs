import { test, expect } from '@playwright/test';

test('ホームページが正しく表示される', async ({ page }) => {
  await page.goto('/');
  
  // ログインしていない場合、ログインページにリダイレクトされる
  await expect(page).toHaveURL('/login');
});

test('ログインページが正しく表示される', async ({ page }) => {
  await page.goto('/login');
  
  // ページタイトルとロゴが表示される
  await expect(page.locator('h1')).toContainText('TOFU NOTE');
  await expect(page.locator('img[alt="TOFU NOTE"]')).toBeVisible();
  
  // 利用規約のチェックボックスが表示される
  await expect(page.locator('input[type="checkbox"]')).toBeVisible();
  
  // ゲストログインボタンが表示される（利用規約に同意していない場合は無効）
  const loginButton = page.locator('button:has-text("ゲストとして使い始める")');
  await expect(loginButton).toBeVisible();
  await expect(loginButton).toBeDisabled();
});

test('利用規約に同意してゲストログインができる', async ({ page }) => {
  await page.goto('/login');
  
  // 利用規約に同意
  await page.check('input[type="checkbox"]');
  
  // ゲストログインボタンが有効になる
  const loginButton = page.locator('button:has-text("ゲストとして使い始める")');
  await expect(loginButton).toBeEnabled();
  
  // ログインボタンをクリック
  await loginButton.click();
  
  // ログイン後、日記ページにリダイレクトされる
  await expect(page).toHaveURL('/diary');
});

test('日記ページが正しく表示される', async ({ page }) => {
  // まずログインする
  await page.goto('/login');
  await page.check('input[type="checkbox"]');
  await page.click('button:has-text("ゲストとして使い始める")');
  
  // 日記ページが表示される
  await expect(page).toHaveURL('/diary');
  await expect(page.locator('h1')).toContainText('記録する');
});

test('日記フォームの基本操作ができる', async ({ page }) => {
  // ログイン
  await page.goto('/login');
  await page.check('input[type="checkbox"]');
  await page.click('button:has-text("ゲストとして使い始める")');
  
  // 日記ページでフォーム要素が表示される
  await expect(page.locator('h1')).toContainText('記録する');
  
  // メンタルスコアスライダーが存在することを確認
  const slider = page.locator('input[type="range"]');
  await expect(slider).toBeVisible();
  
  // テキストエリアが存在することを確認
  const textarea = page.locator('textarea');
  await expect(textarea).toBeVisible();
});
