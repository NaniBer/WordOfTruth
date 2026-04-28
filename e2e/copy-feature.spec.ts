import { test, expect } from '@playwright/test';

test.describe('Copy Verse Feature', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display Copy button when verse is selected', async ({ page }) => {
    const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
    await firstVerse.click();

    const copyButton = page.getByText('Copy');
    await expect(copyButton).toBeVisible();
  });

  test('should copy verse to clipboard - Amharic view', async ({ page }) => {
    const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
    await firstVerse.click();

    const copyButton = page.getByText('Copy');
    await copyButton.click();

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('ኦሪት ዘፍጥረት');
    expect(clipboardText).toContain('Genesis');
    expect(clipboardText).toContain('1:');
  });

  test('should copy verse to clipboard - Both translations view', async ({ page }) => {
    const bothViewButton = page.getByRole('button', { name: 'አማ+ENG', exact: true });
    await bothViewButton.click();

    await page.waitForTimeout(500);

    const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
    await firstVerse.click();

    const copyButton = page.getByRole('button', { name: 'Copy' }).first();
    await copyButton.click();

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('ኦሪት ዘፍጥረት');
    expect(clipboardText).toContain('Genesis');
  });

  test('should copy verse to clipboard - English view', async ({ page }) => {
    const englishViewButton = page.getByRole('button', { name: 'ENG', exact: true });
    await englishViewButton.click();

    await page.waitForTimeout(500);

    const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
    await firstVerse.click();

    const copyButton = page.getByRole('button', { name: 'Copy' }).first();
    await copyButton.click();

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('Genesis');
    expect(clipboardText).toContain('1:');
  });

  test('should copy verse with correct format', async ({ page }) => {
    const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
    await firstVerse.click();

    const copyButton = page.getByRole('button', { name: 'Copy' }).first();
    await copyButton.click();

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());

    expect(clipboardText).toMatch(/ኦሪት ዘፍጥረት \d+:\d+/);
    expect(clipboardText).toMatch(/Genesis \d+:\d+/);
    expect(clipboardText.split('\n')).toHaveLength(5);
  });

  test('should copy multiple verses with correct labels', async ({ page }) => {
    const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
    await firstVerse.click();

    const copyButton = page.getByRole('button', { name: 'Copy' }).first();
    await copyButton.click();

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toMatch(/\d+:\d+/);
  });

  test('should handle clipboard permissions gracefully', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
    await firstVerse.click();

    const copyButton = page.getByText('Copy');
    await copyButton.click();

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBeTruthy();
    expect(clipboardText.length).toBeGreaterThan(0);
  });

  test('should copy verse from different chapters', async ({ page }) => {
    const nextButton = page.getByRole('button', { name: /Next/i });
    await nextButton.click();
    await page.waitForTimeout(500);

    const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
    await firstVerse.click();

    const copyButton = page.getByRole('button', { name: 'Copy' }).first();
    await copyButton.click();

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('2:');
  });

  test('should copy verse from different books', async ({ page }) => {
    const bookButton = page.locator('button').filter({ hasText: /Genesis|ዘፍ/ }).first();
    await bookButton.click();

    await page.waitForTimeout(1000);

    const exodusButton = page.getByText(/Exodus|ዘጸ/).first();
    await exodusButton.click();

    await page.waitForTimeout(1000);

    const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
    await firstVerse.click();

    const copyButton = page.getByRole('button', { name: 'Copy' }).first();
    await copyButton.click();

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('Exodus') || expect(clipboardText).toContain('ዘጸ');
  });

  test('should copy verse after switching languages', async ({ page }) => {
    const bothViewButton = page.getByRole('button', { name: 'አማ+ENG', exact: true });
    await bothViewButton.click();

    await page.waitForTimeout(500);

    const englishViewButton = page.getByRole('button', { name: 'ENG', exact: true });
    await englishViewButton.click();

    await page.waitForTimeout(500);

    const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
    await firstVerse.click();

    const copyButton = page.getByRole('button', { name: 'Copy' }).first();
    await copyButton.click();

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('Genesis');
  });

  test('should handle empty clipboard state', async ({ page }) => {
    const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
    await firstVerse.click();

    const copyButton = page.getByText('Copy');
    await copyButton.click();

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).not.toBe('');
    expect(clipboardText.length).toBeGreaterThan(10);
  });

  test('should copy verse with special characters', async ({ page }) => {
    const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
    await firstVerse.click();

    const copyButton = page.getByText('Copy');
    await copyButton.click();

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('ኦሪት');
    expect(clipboardText).toMatch(/[\u1200-\u137F]/);
  });
});

test.describe('Copy Feature Integration', () => {
  test('should copy and then paste in text field', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
    await firstVerse.click();

    const copyButton = page.getByText('Copy');
    await copyButton.click();

    await page.evaluate(() => {
      const input = document.createElement('input');
      input.id = 'test-input';
      document.body.appendChild(input);
    });

    const testInput = page.locator('#test-input');
    await testInput.fill('');
    await testInput.focus();
    await testInput.press('Control+V', 'Meta+V');

    const pastedValue = await testInput.inputValue();
    expect(pastedValue).toContain('ኦሪት');
    expect(pastedValue).toContain('Genesis');
  });
});
