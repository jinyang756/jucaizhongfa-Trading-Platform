import { test, expect } from '@playwright/test';

test('should display trade dashboard', async ({ page }) => {
  // 首先登录
  await page.goto('/login');
  await page.locator('input[name="username"]').fill('testuser01');
  await page.locator('input[name="password"]').fill('8a3k7z9x');
  await page.locator('button[type="submit"]').click();

  // 导航到交易页面
  await page.goto('/trade');

  // 检查交易页面元素
  await expect(page).toHaveURL('/trade');
  await expect(page.locator('text=基金投资')).toBeVisible();
  await expect(page.locator('text=二元期权')).toBeVisible();
  await expect(page.locator('text=合约交易')).toBeVisible();
});

test('should display fund trading page', async ({ page }) => {
  // 首先登录
  await page.goto('/login');
  await page.locator('input[name="username"]').fill('testuser01');
  await page.locator('input[name="password"]').fill('8a3k7z9x');
  await page.locator('button[type="submit"]').click();

  // 导航到基金交易页面
  await page.goto('/funds');

  // 检查基金交易页面元素
  await expect(page).toHaveURL('/funds');
  await expect(page.locator('text=基金交易')).toBeVisible();
});

test('should display option trading page', async ({ page }) => {
  // 首先登录
  await page.goto('/login');
  await page.locator('input[name="username"]').fill('testuser01');
  await page.locator('input[name="password"]').fill('8a3k7z9x');
  await page.locator('button[type="submit"]').click();

  // 导航到期权交易页面
  await page.goto('/options');

  // 检查期权交易页面元素
  await expect(page).toHaveURL('/options');
  await expect(page.locator('text=二元期权交易')).toBeVisible();
});
