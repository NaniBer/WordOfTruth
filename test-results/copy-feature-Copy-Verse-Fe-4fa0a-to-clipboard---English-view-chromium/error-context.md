# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: copy-feature.spec.ts >> Copy Verse Feature >> should copy verse to clipboard - English view
- Location: e2e/copy-feature.spec.ts:47:7

# Error details

```
Error: locator.click: Error: strict mode violation: getByText('ENG') resolved to 2 elements:
    1) <button class="px-2.5 py-1.5 rounded-md text-[13px] font-medium text-white/70">አማ+ENG</button> aka getByRole('button', { name: 'አማ+ENG' })
    2) <button class="px-2.5 py-1.5 rounded-md text-[13px] font-medium text-white/70">ENG</button> aka getByRole('button', { name: 'ENG', exact: true })

Call log:
  - waiting for getByText('ENG')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - button "ዘፍ 1" [ref=e4]:
        - generic [ref=e5]: ዘፍ
        - generic [ref=e6]: "1"
        - img [ref=e7]
      - generic [ref=e9]:
        - generic [ref=e10]:
          - button "አማ" [ref=e11]
          - button "አማ+ENG" [ref=e12]
          - button "ENG" [ref=e13]
        - combobox [ref=e14]:
          - option "Haile Selassie" [selected]
          - option "NASB"
        - button [ref=e15]:
          - img [ref=e16]
    - generic [ref=e19]:
      - button "Prev" [ref=e20]:
        - img [ref=e21]
        - generic [ref=e23]: Prev
      - generic [ref=e24]: Chapter 1 of 50
      - button "Next" [ref=e25]:
        - generic [ref=e26]: Next
        - img [ref=e27]
    - main [ref=e29]:
      - generic [ref=e30]:
        - generic [ref=e32]:
          - generic [ref=e33]: "1"
          - paragraph [ref=e35]: በመጀመሪያ እግዚአብሔር ሰማይንና ምድርን ፈጠረ።
        - generic [ref=e37]:
          - generic [ref=e38]: "2"
          - paragraph [ref=e40]: ምድርም ባዶ ነበረች፥ አንዳችም አልነበረባትም፤ ጨለማም በጥልቁ ላይ ነበረ፤ የእግዚአብሔርም መንፈስ በውኃ ላይ ሰፍፎ ነበር።
        - generic [ref=e42]:
          - generic [ref=e43]: "3"
          - paragraph [ref=e45]: እግዚአብሔርም። ብርሃን ይሁን ኣለ፤ ብርሃንም ሆነ።
        - generic [ref=e47]:
          - generic [ref=e48]: "4"
          - paragraph [ref=e50]: እግዚአብሔርም ብርሃኑ መልካም እንደ ሆነ አየ፤ እግዚብሔርም ብርሃንንና ጨለማን ለየ።
        - generic [ref=e52]:
          - generic [ref=e53]: "5"
          - paragraph [ref=e55]: እግዚአብሔርም ብርሃኑን ቀን ብሎ ጠራው፥ ጨለማውንም ሌሊት አለው። ማታም ሆነ ጥዋትም ሆነ፥ አንድ ቀን።
        - generic [ref=e57]:
          - generic [ref=e58]: "6"
          - paragraph [ref=e60]: እግዚአብሔርም። በውኆች መካከል ጠፈር ይሁን፥ በውኃና በውኃ መካከልም ይክፈል አለ።
        - generic [ref=e62]:
          - generic [ref=e63]: "7"
          - paragraph [ref=e65]: እግዚአብሔርም ጠፈርን አደረገ፥ ከጠፈር በታችና ከጠፈር በላይ ያሉትንም ውኆች ለየ፤ እንዲሁም ሆነ።
        - generic [ref=e67]:
          - generic [ref=e68]: "8"
          - paragraph [ref=e70]: እግዚአብሔር ጠፈርን ሰማይ ብሎ ጠራው። ማታም ሆነ ጥዋትም ሆነ፥ ሁለተኛ ቀን።
        - generic [ref=e72]:
          - generic [ref=e73]: "9"
          - paragraph [ref=e75]: እግዚአብሔርም። ከሰማይ በታች ያለው ውኃ በአንድ ስፍራ ይሰብሰብ፥ የብሱም ይገለጥ አለ እንዲሁም ሆነ።
        - generic [ref=e77]:
          - generic [ref=e78]: "10"
          - paragraph [ref=e80]: እግዚአብሔርም የብሱን ምድር ብሎ ጠራው፤ የውኃ መከማቻውንም ባሕር አለው፤ እግዚእብሔርም ያ መልካም እንደ ሆነ አየ።
        - generic [ref=e82]:
          - generic [ref=e83]: "11"
          - paragraph [ref=e85]: እግዚአብሔርም። ምድር ዘርን የሚሰጥ ሣርንና ቡቃያን በምድርም ላይ እንደ ወገኑ ዘሩ ያለበትን ፍሬን የሚያፈራ ዛፍን ታብቅል አለ፤ እንዲሁም ሆነ።
        - generic [ref=e87]:
          - generic [ref=e88]: "12"
          - paragraph [ref=e90]: ምድርም ዘርን የሚሰጥ ሣርንና ቡቃያን እንደ ወገኑ ዘሩም ያለበትን ፍሬን የሚያፈራ ዛፍን እንደ ወገኑ አበቀለች። እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።
        - generic [ref=e92]:
          - generic [ref=e93]: "13"
          - paragraph [ref=e95]: ማታም ሆነ ጥዋትም ሆነ፥ ሦስተኛ ቀን።
        - generic [ref=e97]:
          - generic [ref=e98]: "14"
          - paragraph [ref=e100]: እግዚአብሔርም አለ። ቀንና ሌሊትን ይለዩ ዘንድ ብርሃናት በሰማይ ጠፈር ይሁኑ፤ ለምልክቶች ለዘመኖች ለዕለታት ለዓመታትም ይሁኑ፤
        - generic [ref=e102]:
          - generic [ref=e103]: "15"
          - paragraph [ref=e105]: በምድር ላይ ያበሩ ዘንድ በሰማይ ጠፈር ብርሃናት ይሁኑ፤ እንዲሁም ሆነ።
        - generic [ref=e107]:
          - generic [ref=e108]: "16"
          - paragraph [ref=e110]: እግዚአብሔርም ሁለት ታላላቆች ብርሃናትን አደረገ፤ ትልቁ ብርሃን በቀን እንዲሠለጥን፥ ትንሹም ብርሃን በሌሊት እንዲሰለጥን፤ ከዋክብትንም ደግሞ አደረገ።
        - generic [ref=e112]:
          - generic [ref=e113]: "17"
          - paragraph [ref=e115]: እግዚአብሔርም በምድር ላይ ያበሩ ዘንድ በሰማይ ጠፈር አኖራቸው፤
        - generic [ref=e117]:
          - generic [ref=e118]: "18"
          - paragraph [ref=e120]: በቀንም በሌሊትም እንዲሠለጥኑ፥ ብርሃንንና ጨለማንም እንዲለዩ፤ እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።
        - generic [ref=e122]:
          - generic [ref=e123]: "19"
          - paragraph [ref=e125]: ማታም ሆነ ጥዋትም ሆነ፥ አራተኛ ቀን።
        - generic [ref=e127]:
          - generic [ref=e128]: "20"
          - paragraph [ref=e130]: እግዚአብሔርም አለ። ውኃ ሕያው ነፍስ ያላቸውን ተንቀሳቃሾች ታስገኝ፥ ወፎችም ከምድር በላይ ከሰማይ ጠፈር በታች ይብረሩ።
        - generic [ref=e132]:
          - generic [ref=e133]: "21"
          - paragraph [ref=e135]: እግዚአብሔርም ታላላቆች አንበሪዎችን፥ ውኃይቱ እንደ ወገኑ ያስገኘቻቸውንም ተንቀሳቃሾቹን ሕያዋን ፍጥረታት ሁሉ፥ እንደ ወገኑ የሚበሩትንም ወፎች ሁሉ ፈጠረ፤ እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።
        - generic [ref=e137]:
          - generic [ref=e138]: "22"
          - paragraph [ref=e140]: እግዚአብሔርም እንዲህ ብሎ ባረካቸው። ብዙ ተባዙም የባሕርንም ውኃ ሙሉአት፤ ወፎችም በምድር ላይ ይብዙ።
        - generic [ref=e142]:
          - generic [ref=e143]: "23"
          - paragraph [ref=e145]: ማታም ሆነ ጥዋትም ሆነ፥ አምስተኛ ቀን።
        - generic [ref=e147]:
          - generic [ref=e148]: "24"
          - paragraph [ref=e150]: እግዚአብሔርም አለ። ምድር ሕያዋን ፍጥረታትን እንደ ወገኑ፥ እንስሳትንና ተንቀሳቃሾችን የምድር አራዊትንም እንደ ወገኑ፥ ታውጣ፤ እንዲሁም ሆነ።
        - generic [ref=e152]:
          - generic [ref=e153]: "25"
          - paragraph [ref=e155]: እግዚአብሔር የምድር አራዊትን እንደ ወገኑ አደረገ፥ እንስሳውንም እንደ ወገኑ፥ የመሬት ተንቀሳቃሾችንም እንደ ወገኑ አደረገ፤ እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።
        - generic [ref=e157]:
          - generic [ref=e158]: "26"
          - paragraph [ref=e160]: እግዚአብሔርም አለ። ሰውን በመልካችን እንደ ምሳሌአችን እንፍጠር፤ የባሕር ዓሦችንና የሰማይ ወፎችን፥ እንስሳትንና ምድርን ሁሉ፥ በምድር ላይ የሚንቀሳቀሱትንም ሁሉ ይግዙ።
        - generic [ref=e162]:
          - generic [ref=e163]: "27"
          - paragraph [ref=e165]: እግዚአብሔርም ሰውን በመልኩ ፈጠረ፤ በእግዚአብሔር መልክ ፈጠረው፤ ወንድና ሴት አድርጎ ፈጠራቸው።
        - generic [ref=e167]:
          - generic [ref=e168]: "28"
          - paragraph [ref=e170]: እግዚአብሔርም ባረካቸው፥ እንዲህም አላቸው። ብዙ፥ ተባዙ፥ ምድርንም ሙሉአት፥ ግዙአትም፤ የባሕርን ዓሦችና የሰማይን ወፎች በምድር ላይ የሚንቀሳቀሱትንም ሁሉ ግዙአቸው።
        - generic [ref=e172]:
          - generic [ref=e173]: "29"
          - paragraph [ref=e175]: እግዚአብሔርም አለ። እነሆ መብል ይሆናችሁ ዘንድ በምድር ፊት ሁሉ ላይ ዘሩ በእርሱ ያለውን ሐመልማል ሁሉ፥ የዛፍን ፍሬ የሚያፈራውንና ዘር ያለውንም ዛፍ ሁሉ ሰጠኋችሁ፤
        - generic [ref=e177]:
          - generic [ref=e178]: "30"
          - paragraph [ref=e180]: ለምድርም አራዊት ሁሉ፥ ለሰማይም ወፎች ሁሉ፥ ሕያው ነፍስ ላላቸው ለምድር ተንቀሳቃሾችም ሁሉ የሚበቅለው ሐመልማል ሁሉ መብል ይሁንላቸው፤ እንዲሁም ሆነ።
        - generic [ref=e182]:
          - generic [ref=e183]: "31"
          - paragraph [ref=e185]: እግዚአብሔርም ያደረገውን ሁሉ አየ፥ እነሆም እጅግ መልካም ነበረ። ማታም ሆነ ጥዋትም ሆነ፥ ስድስተኛ ቀን።
    - navigation [ref=e186]:
      - button "Bible" [ref=e187]:
        - img [ref=e188]
        - generic [ref=e190]: Bible
      - button "Saved" [ref=e191]:
        - img [ref=e192]
        - generic [ref=e195]: Saved
      - button "Settings" [ref=e196]:
        - img [ref=e197]
        - generic [ref=e200]: Settings
  - button "Open Next.js Dev Tools" [ref=e206] [cursor=pointer]:
    - img [ref=e207]
  - alert [ref=e210]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Copy Verse Feature', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto('/');
  6   |     await page.waitForLoadState('networkidle');
  7   |   });
  8   | 
  9   |   test('should display Copy button when verse is selected', async ({ page }) => {
  10  |     const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
  11  |     await firstVerse.click();
  12  | 
  13  |     const copyButton = page.getByText('Copy');
  14  |     await expect(copyButton).toBeVisible();
  15  |   });
  16  | 
  17  |   test('should copy verse to clipboard - Amharic view', async ({ page }) => {
  18  |     const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
  19  |     await firstVerse.click();
  20  | 
  21  |     const copyButton = page.getByText('Copy');
  22  |     await copyButton.click();
  23  | 
  24  |     const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  25  |     expect(clipboardText).toContain('ኦሪት ዘፍጥረት');
  26  |     expect(clipboardText).toContain('Genesis');
  27  |     expect(clipboardText).toContain('1:');
  28  |   });
  29  | 
  30  |   test('should copy verse to clipboard - Both translations view', async ({ page }) => {
  31  |     const bothViewButton = page.getByText('አማ+ENG');
  32  |     await bothViewButton.click();
  33  | 
  34  |     await page.waitForTimeout(500);
  35  | 
  36  |     const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
  37  |     await firstVerse.click();
  38  | 
  39  |     const copyButton = page.getByText('Copy');
  40  |     await copyButton.click();
  41  | 
  42  |     const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  43  |     expect(clipboardText).toContain('ኦሪት ዘፍጥረት');
  44  |     expect(clipboardText).toContain('Genesis');
  45  |   });
  46  | 
  47  |   test('should copy verse to clipboard - English view', async ({ page }) => {
  48  |     const englishViewButton = page.getByText('ENG');
> 49  |     await englishViewButton.click();
      |                             ^ Error: locator.click: Error: strict mode violation: getByText('ENG') resolved to 2 elements:
  50  | 
  51  |     await page.waitForTimeout(500);
  52  | 
  53  |     const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
  54  |     await firstVerse.click();
  55  | 
  56  |     const copyButton = page.getByText('Copy');
  57  |     await copyButton.click();
  58  | 
  59  |     const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  60  |     expect(clipboardText).toContain('Genesis');
  61  |     expect(clipboardText).toContain('1:');
  62  |   });
  63  | 
  64  |   test('should copy verse with correct format', async ({ page }) => {
  65  |     const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
  66  |     await firstVerse.click();
  67  | 
  68  |     const copyButton = page.getByText('Copy');
  69  |     await copyButton.click();
  70  | 
  71  |     const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  72  | 
  73  |     expect(clipboardText).toMatch(/ኦሪት ዘፍጥረት \d+:\d+/);
  74  |     expect(clipboardText).toMatch(/Genesis \d+:\d+/);
  75  |     expect(clipboardText.split('\n')).toHaveLength(5);
  76  |   });
  77  | 
  78  |   test('should copy multiple verses with correct labels', async ({ page }) => {
  79  |     const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
  80  |     await firstVerse.click();
  81  | 
  82  |     const copyButton = page.getByText('Copy').first();
  83  |     await copyButton.click();
  84  | 
  85  |     const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  86  |     expect(clipboardText).toMatch(/\d+:\d+/);
  87  |   });
  88  | 
  89  |   test('should handle clipboard permissions gracefully', async ({ page, context }) => {
  90  |     await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  91  | 
  92  |     const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
  93  |     await firstVerse.click();
  94  | 
  95  |     const copyButton = page.getByText('Copy');
  96  |     await copyButton.click();
  97  | 
  98  |     const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  99  |     expect(clipboardText).toBeTruthy();
  100 |     expect(clipboardText.length).toBeGreaterThan(0);
  101 |   });
  102 | 
  103 |   test('should copy verse from different chapters', async ({ page }) => {
  104 |     const nextButton = page.getByText('Next');
  105 |     await nextButton.click();
  106 |     await page.waitForTimeout(500);
  107 | 
  108 |     const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
  109 |     await firstVerse.click();
  110 | 
  111 |     const copyButton = page.getByText('Copy');
  112 |     await copyButton.click();
  113 | 
  114 |     const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  115 |     expect(clipboardText).toContain('2:');
  116 |   });
  117 | 
  118 |   test('should copy verse from different books', async ({ page }) => {
  119 |     const bookButton = page.locator('button').filter({ hasText: /Genesis|ዘፍ/ }).first();
  120 |     await bookButton.click();
  121 | 
  122 |     await page.waitForTimeout(300);
  123 | 
  124 |     const exodusButton = page.getByText(/Exodus|ዘጸ/);
  125 |     await exodusButton.click();
  126 | 
  127 |     await page.waitForTimeout(500);
  128 | 
  129 |     const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
  130 |     await firstVerse.click();
  131 | 
  132 |     const copyButton = page.getByText('Copy');
  133 |     await copyButton.click();
  134 | 
  135 |     const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  136 |     expect(clipboardText).toContain('Exodus') || expect(clipboardText).toContain('ዘጸ');
  137 |   });
  138 | 
  139 |   test('should copy verse after switching languages', async ({ page }) => {
  140 |     const bothViewButton = page.getByText('አማ+ENG');
  141 |     await bothViewButton.click();
  142 | 
  143 |     await page.waitForTimeout(500);
  144 | 
  145 |     const englishViewButton = page.getByText('ENG');
  146 |     await englishViewButton.click();
  147 | 
  148 |     await page.waitForTimeout(500);
  149 | 
```