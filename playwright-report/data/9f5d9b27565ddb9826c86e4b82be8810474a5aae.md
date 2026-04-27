# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: copy-feature.spec.ts >> Copy Feature Integration >> should copy and then paste in text field
- Location: e2e/copy-feature.spec.ts:186:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "ኦሪት"
Received string:    ""
```

# Page snapshot

```yaml
- generic [ref=e1]:
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
        - generic [ref=e46]:
          - generic [ref=e47]:
            - generic [ref=e48]: "4"
            - paragraph [ref=e50]: እግዚአብሔርም ብርሃኑ መልካም እንደ ሆነ አየ፤ እግዚብሔርም ብርሃንንና ጨለማን ለየ።
          - generic [ref=e51]:
            - button "Highlight" [ref=e52]:
              - img [ref=e53]
              - text: Highlight
            - button "Copy" [ref=e56]:
              - img [ref=e57]
              - text: Copy
        - generic [ref=e60]:
          - generic [ref=e61]: "5"
          - paragraph [ref=e63]: እግዚአብሔርም ብርሃኑን ቀን ብሎ ጠራው፥ ጨለማውንም ሌሊት አለው። ማታም ሆነ ጥዋትም ሆነ፥ አንድ ቀን።
        - generic [ref=e65]:
          - generic [ref=e66]: "6"
          - paragraph [ref=e68]: እግዚአብሔርም። በውኆች መካከል ጠፈር ይሁን፥ በውኃና በውኃ መካከልም ይክፈል አለ።
        - generic [ref=e70]:
          - generic [ref=e71]: "7"
          - paragraph [ref=e73]: እግዚአብሔርም ጠፈርን አደረገ፥ ከጠፈር በታችና ከጠፈር በላይ ያሉትንም ውኆች ለየ፤ እንዲሁም ሆነ።
        - generic [ref=e75]:
          - generic [ref=e76]: "8"
          - paragraph [ref=e78]: እግዚአብሔር ጠፈርን ሰማይ ብሎ ጠራው። ማታም ሆነ ጥዋትም ሆነ፥ ሁለተኛ ቀን።
        - generic [ref=e80]:
          - generic [ref=e81]: "9"
          - paragraph [ref=e83]: እግዚአብሔርም። ከሰማይ በታች ያለው ውኃ በአንድ ስፍራ ይሰብሰብ፥ የብሱም ይገለጥ አለ እንዲሁም ሆነ።
        - generic [ref=e85]:
          - generic [ref=e86]: "10"
          - paragraph [ref=e88]: እግዚአብሔርም የብሱን ምድር ብሎ ጠራው፤ የውኃ መከማቻውንም ባሕር አለው፤ እግዚእብሔርም ያ መልካም እንደ ሆነ አየ።
        - generic [ref=e90]:
          - generic [ref=e91]: "11"
          - paragraph [ref=e93]: እግዚአብሔርም። ምድር ዘርን የሚሰጥ ሣርንና ቡቃያን በምድርም ላይ እንደ ወገኑ ዘሩ ያለበትን ፍሬን የሚያፈራ ዛፍን ታብቅል አለ፤ እንዲሁም ሆነ።
        - generic [ref=e95]:
          - generic [ref=e96]: "12"
          - paragraph [ref=e98]: ምድርም ዘርን የሚሰጥ ሣርንና ቡቃያን እንደ ወገኑ ዘሩም ያለበትን ፍሬን የሚያፈራ ዛፍን እንደ ወገኑ አበቀለች። እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።
        - generic [ref=e100]:
          - generic [ref=e101]: "13"
          - paragraph [ref=e103]: ማታም ሆነ ጥዋትም ሆነ፥ ሦስተኛ ቀን።
        - generic [ref=e105]:
          - generic [ref=e106]: "14"
          - paragraph [ref=e108]: እግዚአብሔርም አለ። ቀንና ሌሊትን ይለዩ ዘንድ ብርሃናት በሰማይ ጠፈር ይሁኑ፤ ለምልክቶች ለዘመኖች ለዕለታት ለዓመታትም ይሁኑ፤
        - generic [ref=e110]:
          - generic [ref=e111]: "15"
          - paragraph [ref=e113]: በምድር ላይ ያበሩ ዘንድ በሰማይ ጠፈር ብርሃናት ይሁኑ፤ እንዲሁም ሆነ።
        - generic [ref=e115]:
          - generic [ref=e116]: "16"
          - paragraph [ref=e118]: እግዚአብሔርም ሁለት ታላላቆች ብርሃናትን አደረገ፤ ትልቁ ብርሃን በቀን እንዲሠለጥን፥ ትንሹም ብርሃን በሌሊት እንዲሰለጥን፤ ከዋክብትንም ደግሞ አደረገ።
        - generic [ref=e120]:
          - generic [ref=e121]: "17"
          - paragraph [ref=e123]: እግዚአብሔርም በምድር ላይ ያበሩ ዘንድ በሰማይ ጠፈር አኖራቸው፤
        - generic [ref=e125]:
          - generic [ref=e126]: "18"
          - paragraph [ref=e128]: በቀንም በሌሊትም እንዲሠለጥኑ፥ ብርሃንንና ጨለማንም እንዲለዩ፤ እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።
        - generic [ref=e130]:
          - generic [ref=e131]: "19"
          - paragraph [ref=e133]: ማታም ሆነ ጥዋትም ሆነ፥ አራተኛ ቀን።
        - generic [ref=e135]:
          - generic [ref=e136]: "20"
          - paragraph [ref=e138]: እግዚአብሔርም አለ። ውኃ ሕያው ነፍስ ያላቸውን ተንቀሳቃሾች ታስገኝ፥ ወፎችም ከምድር በላይ ከሰማይ ጠፈር በታች ይብረሩ።
        - generic [ref=e140]:
          - generic [ref=e141]: "21"
          - paragraph [ref=e143]: እግዚአብሔርም ታላላቆች አንበሪዎችን፥ ውኃይቱ እንደ ወገኑ ያስገኘቻቸውንም ተንቀሳቃሾቹን ሕያዋን ፍጥረታት ሁሉ፥ እንደ ወገኑ የሚበሩትንም ወፎች ሁሉ ፈጠረ፤ እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።
        - generic [ref=e145]:
          - generic [ref=e146]: "22"
          - paragraph [ref=e148]: እግዚአብሔርም እንዲህ ብሎ ባረካቸው። ብዙ ተባዙም የባሕርንም ውኃ ሙሉአት፤ ወፎችም በምድር ላይ ይብዙ።
        - generic [ref=e150]:
          - generic [ref=e151]: "23"
          - paragraph [ref=e153]: ማታም ሆነ ጥዋትም ሆነ፥ አምስተኛ ቀን።
        - generic [ref=e155]:
          - generic [ref=e156]: "24"
          - paragraph [ref=e158]: እግዚአብሔርም አለ። ምድር ሕያዋን ፍጥረታትን እንደ ወገኑ፥ እንስሳትንና ተንቀሳቃሾችን የምድር አራዊትንም እንደ ወገኑ፥ ታውጣ፤ እንዲሁም ሆነ።
        - generic [ref=e160]:
          - generic [ref=e161]: "25"
          - paragraph [ref=e163]: እግዚአብሔር የምድር አራዊትን እንደ ወገኑ አደረገ፥ እንስሳውንም እንደ ወገኑ፥ የመሬት ተንቀሳቃሾችንም እንደ ወገኑ አደረገ፤ እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።
        - generic [ref=e165]:
          - generic [ref=e166]: "26"
          - paragraph [ref=e168]: እግዚአብሔርም አለ። ሰውን በመልካችን እንደ ምሳሌአችን እንፍጠር፤ የባሕር ዓሦችንና የሰማይ ወፎችን፥ እንስሳትንና ምድርን ሁሉ፥ በምድር ላይ የሚንቀሳቀሱትንም ሁሉ ይግዙ።
        - generic [ref=e170]:
          - generic [ref=e171]: "27"
          - paragraph [ref=e173]: እግዚአብሔርም ሰውን በመልኩ ፈጠረ፤ በእግዚአብሔር መልክ ፈጠረው፤ ወንድና ሴት አድርጎ ፈጠራቸው።
        - generic [ref=e175]:
          - generic [ref=e176]: "28"
          - paragraph [ref=e178]: እግዚአብሔርም ባረካቸው፥ እንዲህም አላቸው። ብዙ፥ ተባዙ፥ ምድርንም ሙሉአት፥ ግዙአትም፤ የባሕርን ዓሦችና የሰማይን ወፎች በምድር ላይ የሚንቀሳቀሱትንም ሁሉ ግዙአቸው።
        - generic [ref=e180]:
          - generic [ref=e181]: "29"
          - paragraph [ref=e183]: እግዚአብሔርም አለ። እነሆ መብል ይሆናችሁ ዘንድ በምድር ፊት ሁሉ ላይ ዘሩ በእርሱ ያለውን ሐመልማል ሁሉ፥ የዛፍን ፍሬ የሚያፈራውንና ዘር ያለውንም ዛፍ ሁሉ ሰጠኋችሁ፤
        - generic [ref=e185]:
          - generic [ref=e186]: "30"
          - paragraph [ref=e188]: ለምድርም አራዊት ሁሉ፥ ለሰማይም ወፎች ሁሉ፥ ሕያው ነፍስ ላላቸው ለምድር ተንቀሳቃሾችም ሁሉ የሚበቅለው ሐመልማል ሁሉ መብል ይሁንላቸው፤ እንዲሁም ሆነ።
        - generic [ref=e190]:
          - generic [ref=e191]: "31"
          - paragraph [ref=e193]: እግዚአብሔርም ያደረገውን ሁሉ አየ፥ እነሆም እጅግ መልካም ነበረ። ማታም ሆነ ጥዋትም ሆነ፥ ስድስተኛ ቀን።
    - navigation [ref=e194]:
      - button "Bible" [ref=e195]:
        - img [ref=e196]
        - generic [ref=e198]: Bible
      - button "Saved" [ref=e199]:
        - img [ref=e200]
        - generic [ref=e203]: Saved
      - button "Settings" [ref=e204]:
        - img [ref=e205]
        - generic [ref=e208]: Settings
  - generic [ref=e213] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e214]:
      - img [ref=e215]
    - generic [ref=e218]:
      - button "Open issues overlay" [ref=e219]:
        - generic [ref=e220]:
          - generic [ref=e221]: "0"
          - generic [ref=e222]: "1"
        - generic [ref=e223]: Issue
      - button "Collapse issues badge" [ref=e224]:
        - img [ref=e225]
  - alert [ref=e227]
  - textbox [active] [ref=e228]
```

# Test source

```ts
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
> 208 |     expect(pastedValue).toContain('ኦሪት');
      |                         ^ Error: expect(received).toContain(expected) // indexOf
  209 |     expect(pastedValue).toContain('Genesis');
  210 |   });
  211 | });
  212 | 
```