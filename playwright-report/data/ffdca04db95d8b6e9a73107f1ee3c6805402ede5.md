# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: copy-feature.spec.ts >> Copy Verse Feature >> should copy verse from different chapters
- Location: e2e/copy-feature.spec.ts:103:7

# Error details

```
Error: page.evaluate: NotAllowedError: Failed to execute 'readText' on 'Clipboard': Read permission denied.
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - button "ዘፍ 2" [ref=e4]:
        - generic [ref=e5]: ዘፍ
        - generic [ref=e6]: "2"
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
      - generic [ref=e24]: Chapter 2 of 50
      - button "Next" [ref=e25]:
        - generic [ref=e26]: Next
        - img [ref=e27]
    - main [ref=e29]:
      - generic [ref=e30]:
        - generic [ref=e32]:
          - generic [ref=e33]: "1"
          - paragraph [ref=e35]: ሰማይና ምድር ሠራዊታቸውም ሁሉ ተፈጸሙ።
        - generic [ref=e37]:
          - generic [ref=e38]: "2"
          - paragraph [ref=e40]: እግዚአብሔርም የሠራውን ሥራ በሰባተኛው ቀን ፈጸመ፤ በሰባተኛውም ቀን ከሠራው ሥራ ሁሉ ዐረፈ።
        - generic [ref=e42]:
          - generic [ref=e43]: "3"
          - paragraph [ref=e45]: እግዚአብሔርም ሰባተኛውን ቀን ባረከው ቀደሰውም፤ እግዚአብሔር ሊያደርገው ከፈጠረው ሥራ ሁሉ በእርሱ ዐርፎአልና።
        - generic [ref=e46]:
          - generic [ref=e47]:
            - generic [ref=e48]: "4"
            - paragraph [ref=e50]: እግዚአብሔር አምላክ ሰማይንና ምድርን ባደረገ አምላክ ሰማይንና ምድርን ቀን፥ በተፈጠሩ ጊዜ የሰማይና የምድር ልደት ይህ ነው።
          - generic [ref=e51]:
            - button "Highlight" [ref=e52]:
              - img [ref=e53]
              - text: Highlight
            - button "Copy" [active] [ref=e56]:
              - img [ref=e57]
              - text: Copy
        - generic [ref=e60]:
          - generic [ref=e61]: "5"
          - paragraph [ref=e63]: የሜዳ ቁጥቋጦ ሁሉ በምድር ላይ ገና አልነበረም፤ የሜዳውም ቡቃያ ሁሉ ገና አልበቀለም ነበር፤ እግዚአብሔር አምላክ ምድር ላይ አላዘነበም ነበርና፥ ምድርንም የሚሠራባት ሰው አልነበረም፤
        - generic [ref=e65]:
          - generic [ref=e66]: "6"
          - paragraph [ref=e68]: ነገር ግን ጉም ከምድር ትወጣ ነበር፥ የምድርንም ፊት ሁሉ ታጠጣ ነበር።
        - generic [ref=e70]:
          - generic [ref=e71]: "7"
          - paragraph [ref=e73]: እግዚአብሔር አምላክም ሰውን ከምድር አፈር አበጀው፤ በአፍንጫውም የሕይወት እስትንፋስን እፍ አለበት፤ ሰውም ሕያው ነፍስ ያለው ሆነ።
        - generic [ref=e75]:
          - generic [ref=e76]: "8"
          - paragraph [ref=e78]: እግዚአብሔር አምላክም በምሥራቅ በዔድን ገነትን ተከለ የፈጠረውንም ሰው ከዚያው አኖረው።
        - generic [ref=e80]:
          - generic [ref=e81]: "9"
          - paragraph [ref=e83]: እግዚአብሔር አምላክም ለማየት ደስ የሚያሰኘውን፥ ለመብላትም መልካም የሆነውን ዛፍ ሁሉ ከምድር አበቀለ፤ በገነትም መካከል የሕይወትን ዛፍ፥ መልካምንና ክፉን የሚያስታውቀውንም ዛፍ አበቀለ።
        - generic [ref=e85]:
          - generic [ref=e86]: "10"
          - paragraph [ref=e88]: ወንዝም ገነትን ያጠጣ ዘንድ ከዔድን ይወጣ ነበር፤ ከዚያም ለአራት ክፍል ይከፈል ነበር።
        - generic [ref=e90]:
          - generic [ref=e91]: "11"
          - paragraph [ref=e93]: የአንደኛው ወንዝ ስም ፊሶን ነው፤ እርሱም ወርቅ የሚገኝበትን የኤውላጥ ምድርን ይከብባል፤ የዚያም ምድር ወርቅ ጥሩ ነው፤
        - generic [ref=e95]:
          - generic [ref=e96]: "12"
          - paragraph [ref=e98]: ከዚያም ሉልና የከበረ ድንጋይ ይገኛል።
        - generic [ref=e100]:
          - generic [ref=e101]: "13"
          - paragraph [ref=e103]: የሁለተኛውም ወንዝ ስም ግዮን ነው፤ እርሱም የኢትዮጵያን ምድር ሁሉ ይከብባል።
        - generic [ref=e105]:
          - generic [ref=e106]: "14"
          - paragraph [ref=e108]: የሦስተኛውም ወንዝ ስም ጤግሮስ ነው፤ እርሱም በአሦር ምሥራቅ የሚሄድ ነው።
        - generic [ref=e110]:
          - generic [ref=e111]: "15"
          - paragraph [ref=e113]: አራተኛውም ወንዝ ኤፍራጥስ ነው። እግዚአብሔር አምላክም ሰውን ወስዶ ያበጃትም ይጠብቃትም ዘንድ በዔድን ገነት አኖረው።
        - generic [ref=e115]:
          - generic [ref=e116]: "16"
          - paragraph [ref=e118]: እግዚአብሔር አምላክም ሰውን እንዲህ ብሎ አዘዘው። ከገነት ዛፍ ሁሉ ትበላለህ፤
        - generic [ref=e120]:
          - generic [ref=e121]: "17"
          - paragraph [ref=e123]: ነገር ግን መልካምንና ክፉን ከሚያስታውቀው ዛፍ አትብላ፤ ከእርሱ በበላህ ቀን ሞትን ትሞታለህና።
        - generic [ref=e125]:
          - generic [ref=e126]: "18"
          - paragraph [ref=e128]: እግዚአብሔር አምላክም አለ። ሰው ብቻውን ይሆን ዘንድ መልካም አይደለም፤ የሚመቸውን ረዳት እንፍጠርለት።
        - generic [ref=e130]:
          - generic [ref=e131]: "19"
          - paragraph [ref=e133]: እግዚአብሔር አምላክም የምድር አራዊትንና የሰማይ ወፎችን ሁሉ ከመሬት አደረገ፤ በምን ስም እንደሚጠራቸውም ያይ ዘንድ ወደ አዳም አመጣቸው፤ አዳምም ሕያው ነፍስ ላለው ሁሉ በስሙ እንደ ጠራው ስሙ ያው ሆነ።
        - generic [ref=e135]:
          - generic [ref=e136]: "20"
          - paragraph [ref=e138]: አዳምም ለእንስሳት ሁሉ፥ ለሰማይ ወፎችም ሁሉ፥ ለምድር አራዊትም ሁሉ ስም አወጣላቸው፤ ነገር ግን ለአዳም እንደ እርሱ ያለ ረዳት አልተገኘለትም ነበር።
        - generic [ref=e140]:
          - generic [ref=e141]: "21"
          - paragraph [ref=e143]: እግዚአብሔር አምላክም በአዳም ከባድ እንቅልፍን ጣለበት፥ አንቀላፋም፤ ከጎኑም አንዲት አጥንትን ወስዶ ስፍራውን በሥጋ ዘጋው።
        - generic [ref=e145]:
          - generic [ref=e146]: "22"
          - paragraph [ref=e148]: እግዚአብሔር አምላክም ከአዳም የወሰዳትን አጥንት ሴት አድርጎ ሠራት፤ ወደ አዳምም አመጣት።
        - generic [ref=e150]:
          - generic [ref=e151]: "23"
          - paragraph [ref=e153]: አዳምም አለ። ይህች አጥንት ከአጥንቴ ናት፥ ሥጋም ከሥጋዬ ናት፤ እርስዋ ከወንድ ተገኝታለችና ሴት ትባል።
        - generic [ref=e155]:
          - generic [ref=e156]: "24"
          - paragraph [ref=e158]: ስለዚህ ሰው አባቱንና እናቱን ይተዋል፥ በሚስቱም ይጣበቃል፤ ሁለቱም አንድ ሥጋ ይሆናሉ።
        - generic [ref=e160]:
          - generic [ref=e161]: "25"
          - paragraph [ref=e163]: አዳምና ሚስቱ ሁለቱም ዕራቁታቸውን ነበሩ፥ አይተፋፈሩም ነበር።
    - navigation [ref=e164]:
      - button "Bible" [ref=e165]:
        - img [ref=e166]
        - generic [ref=e168]: Bible
      - button "Saved" [ref=e169]:
        - img [ref=e170]
        - generic [ref=e173]: Saved
      - button "Settings" [ref=e174]:
        - img [ref=e175]
        - generic [ref=e178]: Settings
  - generic [ref=e183] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e184]:
      - img [ref=e185]
    - generic [ref=e188]:
      - button "Open issues overlay" [ref=e189]:
        - generic [ref=e190]:
          - generic [ref=e191]: "0"
          - generic [ref=e192]: "1"
        - generic [ref=e193]: Issue
      - button "Collapse issues badge" [ref=e194]:
        - img [ref=e195]
  - alert [ref=e197]
```

# Test source

```ts
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
  49  |     await englishViewButton.click();
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
> 114 |     const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
      |                                      ^ Error: page.evaluate: NotAllowedError: Failed to execute 'readText' on 'Clipboard': Read permission denied.
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
  150 |     const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
  151 |     await firstVerse.click();
  152 | 
  153 |     const copyButton = page.getByText('Copy');
  154 |     await copyButton.click();
  155 | 
  156 |     const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  157 |     expect(clipboardText).toContain('Genesis');
  158 |   });
  159 | 
  160 |   test('should handle empty clipboard state', async ({ page }) => {
  161 |     const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
  162 |     await firstVerse.click();
  163 | 
  164 |     const copyButton = page.getByText('Copy');
  165 |     await copyButton.click();
  166 | 
  167 |     const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  168 |     expect(clipboardText).not.toBe('');
  169 |     expect(clipboardText.length).toBeGreaterThan(10);
  170 |   });
  171 | 
  172 |   test('should copy verse with special characters', async ({ page }) => {
  173 |     const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
  174 |     await firstVerse.click();
  175 | 
  176 |     const copyButton = page.getByText('Copy');
  177 |     await copyButton.click();
  178 | 
  179 |     const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  180 |     expect(clipboardText).toContain('ኦሪት');
  181 |     expect(clipboardText).toMatch(/[\u1200-\u137F]/);
  182 |   });
  183 | });
  184 | 
  185 | test.describe('Copy Feature Integration', () => {
  186 |   test('should copy and then paste in text field', async ({ page }) => {
  187 |     await page.goto('/');
  188 |     await page.waitForLoadState('networkidle');
  189 | 
  190 |     const firstVerse = page.locator('div').filter({ hasText: /1/ }).first();
  191 |     await firstVerse.click();
  192 | 
  193 |     const copyButton = page.getByText('Copy');
  194 |     await copyButton.click();
  195 | 
  196 |     await page.evaluate(() => {
  197 |       const input = document.createElement('input');
  198 |       input.id = 'test-input';
  199 |       document.body.appendChild(input);
  200 |     });
  201 | 
  202 |     const testInput = page.locator('#test-input');
  203 |     await testInput.fill('');
  204 |     await testInput.focus();
  205 |     await testInput.press('Control+V', 'Meta+V');
  206 | 
  207 |     const pastedValue = await testInput.inputValue();
  208 |     expect(pastedValue).toContain('ኦሪት');
  209 |     expect(pastedValue).toContain('Genesis');
  210 |   });
  211 | });
  212 | 
```