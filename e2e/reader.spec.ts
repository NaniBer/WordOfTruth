import { test, expect, type Page } from '@playwright/test';

// These tests need the Bible data available at /data (see DATA_SETUP.md). Genesis and Exodus
// are used. Run against a build without NEXT_PUBLIC_DATA_URL, or with the CDN reachable.

const chapterLabel = (page: Page) => page.locator('text=/^Ch\\. \\d+ \\/ \\d+$/').first().innerText();
const headerBook = (page: Page) => page.locator('header button').first().innerText();
const verse = (page: Page, n: number) => page.locator(`[data-verse-num="${n}"]`).first();

async function openAt(page: Page, bookName: string, chapter: number) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(
    ([b, c]) => {
      localStorage.clear();
      localStorage.setItem('bible-last-location', JSON.stringify({ bookName: b, chapter: c }));
    },
    [bookName, chapter],
  );
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('[data-verse-num]');
}

test.describe('reader', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('opens at the saved chapter with verses', async ({ page }) => {
    await openAt(page, 'Genesis', 1);
    expect(await chapterLabel(page)).toBe('Ch. 1 / 50');
    expect(await page.locator('[data-verse-num]').count()).toBeGreaterThan(20);
  });

  test('Next walks Genesis 50 into Exodus 1 (book boundary)', async ({ page }) => {
    await openAt(page, 'Genesis', 50);
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    await expect(page.getByText('Ch. 1 / 40')).toBeVisible();
    expect(await headerBook(page)).toContain('ዘጸ');
  });

  test('Prev disabled at Genesis 1, Next disabled at Revelation 22', async ({ page }) => {
    await openAt(page, 'Genesis', 1);
    await expect(page.getByRole('button', { name: 'Prev', exact: true })).toBeDisabled();
    await openAt(page, 'Revelation', 22);
    await expect(page.getByRole('button', { name: 'Next', exact: true })).toBeDisabled();
  });

  test('a highlight persists across reload and clears from Saved', async ({ page }) => {
    await openAt(page, 'Genesis', 50);
    await verse(page, 1).click();
    await verse(page, 1).locator('button').first().click();
    const stored = await page.evaluate(() => localStorage.getItem('bible-highlights-v3'));
    expect(stored).toContain('"genesis-50-1"');

    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForSelector('[data-verse-num]');
    await verse(page, 1).click();
    await expect(page.getByRole('button', { name: 'Clear', exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Saved', exact: true }).click();
    await expect(page.getByText('Saved Verses (1)')).toBeVisible();
    await page.getByRole('button', { name: 'Remove', exact: true }).click();
    await expect(page.getByText('Saved Verses (0)')).toBeVisible();
  });

  test('tapping the active highlight color clears it', async ({ page }) => {
    await openAt(page, 'Genesis', 1);
    await verse(page, 1).click();
    await verse(page, 1).locator('button').first().click();
    await verse(page, 1).locator('button').first().click();
    const stored = await page.evaluate(() => localStorage.getItem('bible-highlights-v3'));
    expect(stored === null || !stored.includes('genesis-1-1')).toBe(true);
  });

  test('multi-verse copy puts the selected verses on the clipboard in order', async ({ page }) => {
    await openAt(page, 'Genesis', 1);
    await verse(page, 3).click();
    await verse(page, 1).click();
    await expect(page.getByText('2 selected')).toBeVisible();
    await page.getByRole('button', { name: 'Copy', exact: true }).click();
    await expect(page.getByText('Copied 2 verses')).toBeVisible();
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip.indexOf('Genesis 1:1')).toBeGreaterThanOrEqual(0);
    expect(clip.indexOf('Genesis 1:1')).toBeLessThan(clip.indexOf('Genesis 1:3'));
    expect(clip).not.toContain('Genesis 1:2');
  });

  test('backing out of the book picker keeps the current chapter', async ({ page }) => {
    await openAt(page, 'Psalms', 62);
    await page.locator('header button').first().click();
    await page.getByRole('button', { name: /ሩት/ }).click(); // Ruth has only 4 chapters
    await page.getByRole('button', { name: 'Back', exact: true }).click();
    await page.mouse.click(20, 20); // tap outside the book list to close it
    await expect(page.getByText('Ch. 62 / 150')).toBeVisible();
    expect(await headerBook(page)).toContain('መዝ');
  });

  test('changing chapter clears the selection', async ({ page }) => {
    await openAt(page, 'Genesis', 1);
    await verse(page, 1).click();
    await verse(page, 2).click();
    await expect(page.getByText('2 selected')).toBeVisible();
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    await expect(page.getByText('Ch. 2 / 50')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Copy', exact: true })).toHaveCount(0);
  });

  test('search finds a verse and jumps to it', async ({ page }) => {
    await openAt(page, 'Genesis', 1);
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    await page.getByPlaceholder('Search verses...').fill('እግዚአብሔር');
    await expect(page.getByText(/^\d+ results?$/)).toBeVisible({ timeout: 15000 });
    await page.locator('button', { hasText: 'Genesis 1:' }).first().click();
    await expect(page.getByPlaceholder('Search verses...')).toHaveCount(0);
  });

  test('English view shows the NIV text', async ({ page }) => {
    await openAt(page, 'Genesis', 1);
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await expect(verse(page, 1)).toContainText('In the beginning God created');
  });

  test('theme choice persists across reload', async ({ page }) => {
    await openAt(page, 'Genesis', 1);
    await page.getByRole('button', { name: 'Settings', exact: true }).click();
    await page.getByRole('button', { name: /Midnight$/ }).click();
    await page.reload({ waitUntil: 'networkidle' });
    const bg = await page.evaluate(() => document.documentElement.style.getPropertyValue('--theme-bg'));
    expect(bg).toBe('#030712');
  });

  test('no uncaught page errors while navigating', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await openAt(page, 'Genesis', 1);
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    await page.getByRole('button', { name: 'Saved', exact: true }).click();
    await page.getByRole('button', { name: 'Settings', exact: true }).click();
    expect(errors).toEqual([]);
  });
});
