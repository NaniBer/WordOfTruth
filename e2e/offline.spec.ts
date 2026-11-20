import { test, expect } from '@playwright/test';

test.describe('offline cache', () => {
  test('a service worker update keeps the downloaded Bible cache', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
      const cache = await caches.open('wordoftruth-v1');
      await cache.put('/data/keep-me.json', new Response('{"chapters":[]}'));
    });

    // Reinstall and activate the worker, which runs its cleanup of old caches.
    const state = await page.evaluate(async () => {
      // A different script URL makes the browser install a new worker. Re-registering the
      // same URL would just hand back the already-active one, and no activation would happen.
      const fresh = await navigator.serviceWorker.register(`/sw.js?reinstall=${Date.now()}`);
      const worker = fresh.installing || fresh.waiting;
      if (!worker) return 'no new worker';
      return new Promise<string>((resolve) => {
        worker.addEventListener('statechange', () => {
          if (worker.state === 'activated') resolve('activated');
        });
        setTimeout(() => resolve(worker.state), 10000);
      });
    });
    expect(state).toBe('activated');

    const kept = await page.evaluate(async () => {
      const cache = await caches.open('wordoftruth-v1');
      return (await cache.match('/data/keep-me.json')) !== undefined;
    });
    expect(kept).toBe(true);
  });

  test('the app shell still opens when offline after a visit', async ({ page, context }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.reload({ waitUntil: 'networkidle' });
    await context.setOffline(true);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).not.toContainText('This site can’t be reached');
    await expect(page.locator('body')).toBeVisible();
    await context.setOffline(false);
  });
});
