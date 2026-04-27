# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: copy-feature.spec.ts >> Copy Verse Feature >> should copy verse from different books
- Location: e2e/copy-feature.spec.ts:118:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText('Copy')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - button "ዘጸ 8" [ref=e4]:
        - generic [ref=e5]: ዘጸ
        - generic [ref=e6]: "8"
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
      - generic [ref=e24]: Chapter 8 of 40
      - button "Next" [ref=e25]:
        - generic [ref=e26]: Next
        - img [ref=e27]
    - main [ref=e29]:
      - generic [ref=e30]:
        - generic [ref=e32]:
          - generic [ref=e33]: "1"
          - paragraph [ref=e35]: እግዚአብሔርም ሙሴን ተናገረው። ወደ ፈርዖን ግባ እንዲህም በለው። እግዚአብሔር እንዲህ ይላል። ያገለግለኝ ዘንድ ሕዝቤን ልቀቅ።
        - generic [ref=e37]:
          - generic [ref=e38]: "2"
          - paragraph [ref=e40]: ለመልቀቅ እንቢ ብትል ግን እነሆ እኔ አገርህን ሁሉ በጓጕንቸሮች እመታለሁ፤
        - generic [ref=e42]:
          - generic [ref=e43]: "3"
          - paragraph [ref=e45]: ወንዙም ጓጕንቸሮችን ያፈላል፥ ወጥተውም ወደ ቤትህ፥ ወደ መኝታ ቤትህ፥ ወደ አልጋህም፥ ወደ ባሪያዎችህም ቤት፥ በሕዝብህም ላይ፥ ወደ ምድጆችህም፥ ወደ ቡሃቃዎችህም ይገባሉ፤
        - generic [ref=e47]:
          - generic [ref=e48]: "4"
          - paragraph [ref=e50]: ጓጕንቸሮችም በአንተ በሕዝብህም በባሪያዎችም ሁሉ ላይ ይወጣሉ።
        - generic [ref=e52]:
          - generic [ref=e53]: "5"
          - paragraph [ref=e55]: እግዚአብሔርም ሙሴን አለው። አሮንን። በትርህን ይዘህ በወንዞቹና በመስኖቹ በውኃ ማከማቻዎቹም ላይ እጅህን ዘርጋ፥ በግብፅም አገር ላይ ጓጕንቸሮችን አውጣ በለው።
        - generic [ref=e57]:
          - generic [ref=e58]: "6"
          - paragraph [ref=e60]: አሮንም በግብፅ ውኆች ላይ እጁን ዘረጋ፤ ጓጕንቸሮቹም ወጡ፥ የግብፅንም አገር ሸፈኑ።
        - generic [ref=e62]:
          - generic [ref=e63]: "7"
          - paragraph [ref=e65]: ጠንቋዮችም በአስማታቸው እንዲህ አደረጉ፥ በግብፅም አገር ላይ ጓጕንቸሮችን አወጡ።
        - generic [ref=e67]:
          - generic [ref=e68]: "8"
          - paragraph [ref=e70]: ፈርዖንም ሙሴንና አሮንን ጠርቶ። ጓጕንቸሮቹን ከእኔ ከሕዝቤም እንዲያርቅ ወደ እግዚአብሔር ጸልዩልኝ፤ ለእግዚአብሔርም ይሠዋ ዘንድ ሕዝቡን እለቅቃለሁ አላቸው።
        - generic [ref=e72]:
          - generic [ref=e73]: "9"
          - paragraph [ref=e75]: ሙሴም ፈርዖንን። ጓጕንቸሮቹ ከአንተ ከቤቶችህም እንዲጠፉ፥ በወንዙም ብቻ እንዲቀሩ፥ ለአንተ ለባሪያዎችህም ለሕዝብህም መቼ እንድጸልይ አስታውቀኝ አለው። እርሱም። ነገ አለ።
        - generic [ref=e77]:
          - generic [ref=e78]: "10"
          - paragraph [ref=e80]: ሙሴም። አምላካችንን እግዚአብሔርን የሚመስል እንደሌለ ታውቅ ዘንድ እንደ ቃልህ ይሁን።
        - generic [ref=e82]:
          - generic [ref=e83]: "11"
          - paragraph [ref=e85]: ጓጕንቸሮቹም ከአንተ ከቤቶችህም ከባርያዎችህም ከሕዝብህም ይሄዳሉ፤ በወንዙም ብቻ ይቀራሉ አለ።
        - generic [ref=e87]:
          - generic [ref=e88]: "12"
          - paragraph [ref=e90]: ሙሴና አሮንም ከፈርዖን ዘንድ ወጡ፤ ሙሴም በፈርዖን ላይ ስላመጣቸው ጓጕንቸሮች ወደ እግዚአብሔር ጮኸ።
        - generic [ref=e92]:
          - generic [ref=e93]: "13"
          - paragraph [ref=e95]: እግዚአብሔርም ሙሴ እንዳለ አደረገ፤ ጓጕንቸሮቹም ከቤት ከወጀድም ከሜዳም ሞቱ።
        - generic [ref=e97]:
          - generic [ref=e98]: "14"
          - paragraph [ref=e100]: እንደ ክምርም አድርገው ሰበሰቡአቸው፤ ምድርም ገማች።
        - generic [ref=e102]:
          - generic [ref=e103]: "15"
          - paragraph [ref=e105]: ፈርዖንም ጸጥታ እንደሆነ ባየ ጊዜ ልቡን አደነደነ፤ እግዚአብሔርም እንደተናገረ አልሰማቸውም።
        - generic [ref=e107]:
          - generic [ref=e108]: "16"
          - paragraph [ref=e110]: እግዚአብሔርም ሙሴን አለው። አሮንን። በትርህን ዘርጋ፥ በግብፅም አገር ሁሉ ቅማል እንዲሆን የምድሩን ትቢያ ምታ በለው።
        - generic [ref=e112]:
          - generic [ref=e113]: "17"
          - paragraph [ref=e115]: እንዲሁም አደረጉ፤ አሮንም እጁን ዘረጋ፥ በበትሩም የምድሩን ትቢያ መታው፥ በሰውና በእንስሳም ላይ ቅማል ሆነ፤ በግብፅ አገር ሁሉ የምድር ትቢያ ሁሉ ቅማል ሆነ።
        - generic [ref=e117]:
          - generic [ref=e118]: "18"
          - paragraph [ref=e120]: ጠንቋዮችም በአስማታቸው ያወጡ ዘንድ እንዲሁ አደረጉ፥ ነገር ግን አልቻሉም፤ ቅማሉም በሰውና በእንስሳ ላይ ነበረ።
        - generic [ref=e122]:
          - generic [ref=e123]: "19"
          - paragraph [ref=e125]: ጠንቋዮችም ፈርዖንን። ይህስ የእግዚአብሔር ጣት ነው አሉት፤ የፈርዖን ልብ ግን ጸና፥ እግዚአብሔርም እንደ ተናገረ አልሰማቸውም።
        - generic [ref=e127]:
          - generic [ref=e128]: "20"
          - paragraph [ref=e130]: እግዚአብሔርም ሙሴን አለው። ማልደህ ተነሣ፥ በፈርዖንም ፊት ቁም፤ እነሆ እርሱ ወደ ውኃ ይወርዳል፤ እንዲህም በለው። እግዚአብሔር እንዲህ ይላል። እንዲያገለግለኝ ሕዝቤን ልቀቅ።
        - generic [ref=e132]:
          - generic [ref=e133]: "21"
          - paragraph [ref=e135]: ሕዝቤንም ባትለቅቅ፥ እነሆ በአንተ በባሪያዎችህም በሕዝብህም በቤቶችህም ላይ የዝንብ መንጎች እሰድዳለሁ፤ የግብፃውያን ቤቶች የሚኖሩባትም ምድር ሁሉ በዝንብ መንጎች ይሞላሉ።
        - generic [ref=e137]:
          - generic [ref=e138]: "22"
          - paragraph [ref=e140]: በዚያን ቀን በምድር መካከል እኔ እግዚአብሔር እንደሆንሁ ታውቅ ዘንድ፥ በዚያ የዝንብ መንጋ እንዳይሆን ሕዝቤ የሚቀመጥባትን የጌሤምን ምድር እለያለሁ።
        - generic [ref=e142]:
          - generic [ref=e143]: "23"
          - paragraph [ref=e145]: በሕዝቤና በሕዝብህ መካከል እለያለሁ፤ ይህም ተአምራት ነገ ይሆናል።
        - generic [ref=e147]:
          - generic [ref=e148]: "24"
          - paragraph [ref=e150]: እግዚአብሔርም እንዲሁ አደረገ፤ በፈርዖንም ቤት በባሪያዎቹም ቤቶች ውስጥ ብዙ የዝንብ መንጋ መጣ፤ በግብፅም አገር ሁሉ ላይ ከዝንቡ መንጋ የተነሣ ምድር ጠፋች።
        - generic [ref=e152]:
          - generic [ref=e153]: "25"
          - paragraph [ref=e155]: ፈርዖንም ሙሴንና አሮንን ጠርቶ። ሂዱ፥ በአገሩ ውስጥ ለአምላካችሁ ሠዉ አላቸው።
        - generic [ref=e157]:
          - generic [ref=e158]: "26"
          - paragraph [ref=e160]: ሙሴም። ለእግዚአብሔር ለአምላካችን የግብፃውያንን ርኵሰት እንሰዋለንና እንዲህ ይደረግ ዘንድ አይገባም፤ እነሆ እኛ የግብፃውያንን ርኵሰት በፊታቸው ብንሠዋ አይወግሩንምን?
        - generic [ref=e162]:
          - generic [ref=e163]: "27"
          - paragraph [ref=e165]: እኛስ ለእግዚአብሔር ለአምላካችን እንሠዋ ዘንድ እንደሚያዝዘን የሦስት ቀን መንገድ ወደ ምድረ በዳ እንሄዳለን አለ።
        - generic [ref=e167]:
          - generic [ref=e168]: "28"
          - paragraph [ref=e170]: ፈርዖንም። ለእግዚአብሔር ለአምላካችሁ በምድረ በዳ ትሠዉ ዘንድ እለቅቃችኋለሁ፤ ነገር ግን ርቃችሁ አትሂዱ፥ ጸልዩልኝ አለ።
        - generic [ref=e172]:
          - generic [ref=e173]: "29"
          - paragraph [ref=e175]: ሙሴም። እነሆ ከአንተ ዘንድ እወጣለሁ፥ የዝንቡም መንጎች ከፈርዖን ከባሪያዎቹም ከሕዝቡም ነገ እንዲሄዱ ወደ እግዚአብሔር እጸልያለሁ፤ ነገር ግን ለእግዚአብሔር ይሠዋ ዘንድ ሕዝቡን እንዳይለቅቅ ፈርዖን እንደገና አያታልለን አለ።
        - generic [ref=e177]:
          - generic [ref=e178]: "30"
          - paragraph [ref=e180]: ሙሴም ከፈርዖን ዘንድ ወጣ፥ ወደ እግዚአብሔርም ጸለየ።
        - generic [ref=e182]:
          - generic [ref=e183]: "31"
          - paragraph [ref=e185]: እግዚአብሔርም ሙሴ እንዳለ አደረገ፤ የዝንቡንም መንጎች ከፈርዖን ከባሪያዎቹም ከህዝቡም አስነሣ፤ አንድ ስንኳ አልቀረም።
        - generic [ref=e187]:
          - generic [ref=e188]: "32"
          - paragraph [ref=e190]: ፈርዖንም በዚህ ጊዜ ደግሞ ልቡን አደነደነ፥ ሕዝቡንም አልለቀቀም።
    - navigation [ref=e191]:
      - button "Bible" [ref=e192]:
        - img [ref=e193]
        - generic [ref=e195]: Bible
      - button "Saved" [ref=e196]:
        - img [ref=e197]
        - generic [ref=e200]: Saved
      - button "Settings" [ref=e201]:
        - img [ref=e202]
        - generic [ref=e205]: Settings
  - button "Open Next.js Dev Tools" [ref=e211] [cursor=pointer]:
    - img [ref=e212]
  - alert [ref=e215]
```

# Test source

```ts
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
> 133 |     await copyButton.click();
      |                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
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