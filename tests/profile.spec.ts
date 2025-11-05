import { test, expect } from '@playwright/test';

test('should display profile page', async ({ page }) => {
  // 首先登录
  await page.goto('/login');
  await page.locator('input[name="username"]').fill('testuser01');
  await page.locator('input[name="password"]').fill('8a3k7z9x');
  await page.locator('button[type="submit"]').click();

  // 导航到个人中心页面
  await page.goto('/profile');

  // 检查个人中心页面元素
  await expect(page).toHaveURL('/profile');
  await expect(page.locator('text=个人中心')).toBeVisible();
});

test('should display user dashboard', async ({ page }) => {
  // 首先登录
  await page.goto('/login');
  await page.locator('input[name="username"]').fill('testuser01');
  await page.locator('input[name="password"]').fill('8a3k7z9x');
  await page.locator('button[type="submit"]').click();

  // 导航到用户仪表板页面
  await page.goto('/dashboard');

  // 检查用户仪表板页面元素
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('text=账户概览')).toBeVisible();
  await expect(page.locator('text=交易功能菜单')).toBeVisible();
});
