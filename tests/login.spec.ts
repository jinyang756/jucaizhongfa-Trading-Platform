import { test, expect } from '@playwright/test';

test('should display login form', async ({ page }) => {
  await page.goto('/login');

  // 检查页面标题
  await expect(page).toHaveTitle(/聚财众发量化平台/);

  // 检查登录表单元素
  await expect(page.locator('input[name="username"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeVisible();

  // 检查用户类型切换按钮
  await expect(page.locator('text=用户登录')).toBeVisible();
  await expect(page.locator('text=管理员登录')).toBeVisible();
});

test('should login successfully with valid credentials', async ({ page }) => {
  await page.goto('/login');

  // 填写用户登录信息
  await page.locator('input[name="username"]').fill('testuser01');
  await page.locator('input[name="password"]').fill('8a3k7z9x');

  // 提交表单
  await page.locator('button[type="submit"]').click();

  // 检查是否跳转到首页
  await expect(page).toHaveURL('/');
});

test('should show error with invalid credentials', async ({ page }) => {
  await page.goto('/login');

  // 填写错误的登录信息
  await page.locator('input[name="username"]').fill('invaliduser');
  await page.locator('input[name="password"]').fill('wrongpassword');

  // 提交表单
  await page.locator('button[type="submit"]').click();

  // 检查是否显示错误消息
  await expect(page.locator('.toast-error')).toBeVisible();
});
