import { test, expect, type Page } from '@playwright/test';

// Copy a single verse from its action panel (one verse per row, identified by data-verse-num).

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

async function copyVerse(page: Page, n: number) {
  // In side-by-side view the verse appears in both columns; the first row is the Amharic one.
  const row = page.locator(`[data-verse-num="${n}"]`).first();
  await row.click();
  await row.getByRole('button', { name: 'Copy', exact: true }).click();
  return page.evaluate(() => navigator.clipboard.readText());
}

test.describe('Copy Verse Feature', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('copies the Amharic reference, English reference and both texts', async ({ page }) => {
    await openAt(page, 'Genesis', 1);
    const clip = await copyVerse(page, 1);
    const lines = clip.split('\n');
    expect(lines[0]).toBe('ኦሪት ዘፍጥረት 1:1');
    expect(lines[1]).toBe('Genesis 1:1');
    expect(lines[2]).toBe('');
    expect(lines[3].length).toBeGreaterThan(0); // Amharic verse text
    expect(lines[4]).toBe('');
    expect(lines[5]).toContain('In the beginning God created'); // NIV text
    expect(lines).toHaveLength(6);
  });

  test('copies the English text when the view is English', async ({ page }) => {
    await openAt(page, 'Genesis', 1);
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    const clip = await copyVerse(page, 1);
    expect(clip).toContain('Genesis 1:1');
    expect(clip).toContain('In the beginning God created');
  });

  test('copies from the side-by-side view', async ({ page }) => {
    await openAt(page, 'Genesis', 1);
    await page.getByRole('button', { name: 'አማ+EN', exact: true }).click();
    const clip = await copyVerse(page, 1);
    expect(clip).toContain('ኦሪት ዘፍጥረት');
    expect(clip).toContain('Genesis');
  });

  test('copies from a different book', async ({ page }) => {
    await openAt(page, 'Exodus', 1);
    const clip = await copyVerse(page, 1);
    expect(clip).toContain('Exodus 1:1');
  });

  test('copies from a different chapter', async ({ page }) => {
    await openAt(page, 'Genesis', 2);
    const clip = await copyVerse(page, 1);
    expect(clip).toContain('Genesis 2:1');
  });

  test('the copied text can be pasted into a text field', async ({ page }) => {
    await openAt(page, 'Genesis', 1);
    await copyVerse(page, 1);
    await page.evaluate(() => {
      const input = document.createElement('textarea');
      input.id = 'paste-target';
      document.body.appendChild(input);
    });
    await page.locator('#paste-target').focus();
    await page.keyboard.press('ControlOrMeta+V');
    await expect(page.locator('#paste-target')).toHaveValue(/Genesis 1:1/);
  });
});
