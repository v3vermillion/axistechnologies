import { test, expect } from '@playwright/test';

/**
 * Verification suite for the production artifact (index.html).
 *
 * Every test runs at phone (393 px), tablet (834 px), and desktop (1440 px)
 * viewports — see playwright.config.ts. These checks back the
 * "Quality & Verification" table in the README.
 */

test('renders the hero and captures a full-page screenshot', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Vermillion Axis Technologies/);
  await expect(page.locator('.hero h1')).toBeVisible();

  const shot = await page.screenshot({ fullPage: true });
  await testInfo.attach(`full-page-${testInfo.project.name}`, {
    body: shot,
    contentType: 'image/png',
  });
});

test('has zero horizontal overflow, at load and after a full scroll', async ({ page }) => {
  await page.goto('/');

  const overflow = () =>
    page.evaluate(() => {
      const d = document.documentElement;
      return d.scrollWidth - d.clientWidth;
    });

  expect(await overflow(), 'overflow at load').toBeLessThanOrEqual(1);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  expect(await overflow(), 'overflow after full scroll').toBeLessThanOrEqual(1);
});

test('loads and scrolls with zero console or page errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const url = msg.location()?.url ?? '';
    // A missing favicon is a hosting nicety, not a page defect.
    if (url.includes('favicon') || msg.text().includes('favicon')) return;
    errors.push(`[console] ${msg.text()}`);
  });
  page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));

  await page.goto('/');

  // Walk the whole page so every scroll-driven code path executes.
  await page.evaluate(async () => {
    const height = document.body.scrollHeight;
    const step = Math.max(200, Math.round(innerHeight * 0.8));
    for (let y = 0; y <= height; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  await page.waitForTimeout(400);

  expect(errors).toEqual([]);
});

test('marquees are populated from their data-mq lists', async ({ page }) => {
  await page.goto('/');

  const tracks = page.locator('.track[data-mq]');
  expect(await tracks.count()).toBeGreaterThan(0);

  const first = tracks.first();
  await expect(first.locator('span').first()).toHaveText(/\S/);

  // Items are duplicated 6x so the loop never shows a gap.
  const itemCount = (await first.getAttribute('data-mq'))!.split(',').length;
  expect(await first.locator('span').count()).toBe(itemCount * 6);
});

test('stat counters animate to their exact targets', async ({ page }) => {
  await page.goto('/');
  await page.locator('.sgrid').scrollIntoViewIfNeeded();

  const stats = page.locator('.sgrid [data-count]');
  await expect(stats).toHaveCount(4);

  // Count-up runs for 1.2 s once the grid enters view; assertions retry.
  await expect(stats.nth(0)).toHaveText('100+', { timeout: 10_000 });
  await expect(stats.nth(1)).toHaveText('<72hr', { timeout: 10_000 });
  await expect(stats.nth(2)).toHaveText('3–21', { timeout: 10_000 });
  await expect(stats.nth(3)).toHaveText('100%', { timeout: 10_000 });
});

test('FAQ accordion is exclusive and reflects state via aria-expanded', async ({ page }) => {
  await page.goto('/');

  const buttons = page.locator('.faq .qa button');
  expect(await buttons.count()).toBeGreaterThanOrEqual(6);

  await buttons.first().scrollIntoViewIfNeeded();
  await buttons.first().click();
  await expect(buttons.first()).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('.faq .qa').first()).toHaveClass(/open/);

  // Opening a second entry closes the first.
  await buttons.nth(1).click();
  await expect(buttons.nth(1)).toHaveAttribute('aria-expanded', 'true');
  await expect(buttons.first()).toHaveAttribute('aria-expanded', 'false');

  // Clicking the open entry closes it.
  await buttons.nth(1).click();
  await expect(buttons.nth(1)).toHaveAttribute('aria-expanded', 'false');
});

test('mobile menu opens, locks body scroll, and closes', async ({ page }) => {
  await page.goto('/');

  const burger = page.locator('.burger');
  if (!(await burger.isVisible())) {
    test.skip(true, 'burger menu is not rendered at this viewport');
  }

  await burger.click();
  await expect(page.locator('.menu')).toHaveClass(/open/);
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');

  await page.locator('.menu .close').click();
  await expect(page.locator('.menu')).not.toHaveClass(/open/);
  // overflow-x stays hidden by design (anti-overflow guard); vertical scroll must unlock.
  await expect(page.locator('body')).toHaveCSS('overflow-y', 'auto');
});

test('contact form blocks empty submission via native validation', async ({ page }) => {
  await page.goto('/');

  const form = page.locator('#projectForm');
  await form.scrollIntoViewIfNeeded();
  await form.locator('button[type="submit"]').click();

  // Required fields hold the line — no mailto navigation happened.
  expect(page.url()).toContain('http');
  expect(
    await form
      .locator('input[name="name"]')
      .evaluate((el) => (el as HTMLInputElement).matches(':invalid')),
  ).toBe(true);

  // Filling the required fields clears validity.
  await form.locator('input[name="name"]').fill('Test User');
  await form.locator('input[name="email"]').fill('test@example.com');
  await form.locator('textarea[name="message"]').fill('A short project brief.');
  expect(
    await form
      .locator('input[name="name"]')
      .evaluate((el) => (el as HTMLInputElement).matches(':invalid')),
  ).toBe(false);
});

test('back-to-top appears mid-page and hands off to the top', async ({ page }) => {
  await page.goto('/');

  await page.locator('#pricing').scrollIntoViewIfNeeded();
  await page.evaluate(() => window.dispatchEvent(new Event('scroll')));

  const toTop = page.locator('button.toTop');
  await expect(toTop).toHaveClass(/show/);

  await toTop.click();
  await expect
    .poll(() => page.evaluate(() => window.scrollY), { timeout: 8_000 })
    .toBeLessThan(80);
});

test('prefers-reduced-motion renders all content visible with animation off', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('.hero h1')).toBeVisible();

  // Reveal elements are forced visible without any scroll-triggered animation.
  const lastReveal = page.locator('.rv').last();
  expect(await lastReveal.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');

  // Marquee and plumb-line animations are disabled.
  expect(
    await page.locator('.track').first().evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none');
  expect(
    await page.locator('.plumb').first().evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none');
});
