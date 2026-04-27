# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: copy-feature.spec.ts >> Copy Verse Feature >> should copy verse to clipboard - Both translations view
- Location: e2e/copy-feature.spec.ts:30:7

# Error details

```
Error: locator.click: Error: strict mode violation: getByText('Copy') resolved to 2 elements:
    1) <button class="flex-1 py-2.5 bg-[#3a3a3c] text-[#0a84ff] text-[15px] rounded-full font-medium active:bg-[#48484a] flex items-center justify-center gap-2">…</button> aka getByRole('button', { name: 'Copy' }).first()
    2) <button class="flex-1 py-2.5 bg-[#3a3a3c] text-[#0a84ff] text-[15px] rounded-full font-medium active:bg-[#48484a] flex items-center justify-center gap-2">…</button> aka getByRole('button', { name: 'Copy' }).nth(1)

Call log:
  - waiting for getByText('Copy')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - button "ዘፍ / Genesis 1" [ref=e4]:
        - generic [ref=e5]: ዘፍ / Genesis
        - generic [ref=e6]: "1"
        - img [ref=e7]
      - generic [ref=e9]:
        - generic [ref=e10]:
          - button "አማ" [ref=e11]
          - button "አማ+ENG" [ref=e12]
          - button "ENG" [ref=e13]
        - combobox [ref=e14]:
          - option "NIV" [selected]
          - option "NLT"
          - option "CSB"
        - combobox [ref=e15]:
          - option "Haile Selassie" [selected]
          - option "NASB"
        - button [ref=e16]:
          - img [ref=e17]
    - generic [ref=e20]:
      - button "Prev" [ref=e21]:
        - img [ref=e22]
        - generic [ref=e24]: Prev
      - generic [ref=e25]: Chapter 1 of 50
      - button "Next" [ref=e26]:
        - generic [ref=e27]: Next
        - img [ref=e28]
    - main [ref=e30]:
      - generic [ref=e31]:
        - generic [ref=e32]:
          - generic [ref=e33]: አማርኛ
          - generic [ref=e34]:
            - generic [ref=e36]:
              - generic [ref=e37]: "1"
              - paragraph [ref=e38]: በመጀመሪያ እግዚአብሔር ሰማይንና ምድርን ፈጠረ።
            - generic [ref=e40]:
              - generic [ref=e41]: "2"
              - paragraph [ref=e42]: ምድርም ባዶ ነበረች፥ አንዳችም አልነበረባትም፤ ጨለማም በጥልቁ ላይ ነበረ፤ የእግዚአብሔርም መንፈስ በውኃ ላይ ሰፍፎ ነበር።
            - generic [ref=e44]:
              - generic [ref=e45]: "3"
              - paragraph [ref=e46]: እግዚአብሔርም። ብርሃን ይሁን ኣለ፤ ብርሃንም ሆነ።
            - generic [ref=e47]:
              - generic [ref=e48]:
                - generic [ref=e49]: "4"
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
              - paragraph [ref=e62]: እግዚአብሔርም ብርሃኑን ቀን ብሎ ጠራው፥ ጨለማውንም ሌሊት አለው። ማታም ሆነ ጥዋትም ሆነ፥ አንድ ቀን።
            - generic [ref=e64]:
              - generic [ref=e65]: "6"
              - paragraph [ref=e66]: እግዚአብሔርም። በውኆች መካከል ጠፈር ይሁን፥ በውኃና በውኃ መካከልም ይክፈል አለ።
            - generic [ref=e68]:
              - generic [ref=e69]: "7"
              - paragraph [ref=e70]: እግዚአብሔርም ጠፈርን አደረገ፥ ከጠፈር በታችና ከጠፈር በላይ ያሉትንም ውኆች ለየ፤ እንዲሁም ሆነ።
            - generic [ref=e72]:
              - generic [ref=e73]: "8"
              - paragraph [ref=e74]: እግዚአብሔር ጠፈርን ሰማይ ብሎ ጠራው። ማታም ሆነ ጥዋትም ሆነ፥ ሁለተኛ ቀን።
            - generic [ref=e76]:
              - generic [ref=e77]: "9"
              - paragraph [ref=e78]: እግዚአብሔርም። ከሰማይ በታች ያለው ውኃ በአንድ ስፍራ ይሰብሰብ፥ የብሱም ይገለጥ አለ እንዲሁም ሆነ።
            - generic [ref=e80]:
              - generic [ref=e81]: "10"
              - paragraph [ref=e82]: እግዚአብሔርም የብሱን ምድር ብሎ ጠራው፤ የውኃ መከማቻውንም ባሕር አለው፤ እግዚእብሔርም ያ መልካም እንደ ሆነ አየ።
            - generic [ref=e84]:
              - generic [ref=e85]: "11"
              - paragraph [ref=e86]: እግዚአብሔርም። ምድር ዘርን የሚሰጥ ሣርንና ቡቃያን በምድርም ላይ እንደ ወገኑ ዘሩ ያለበትን ፍሬን የሚያፈራ ዛፍን ታብቅል አለ፤ እንዲሁም ሆነ።
            - generic [ref=e88]:
              - generic [ref=e89]: "12"
              - paragraph [ref=e90]: ምድርም ዘርን የሚሰጥ ሣርንና ቡቃያን እንደ ወገኑ ዘሩም ያለበትን ፍሬን የሚያፈራ ዛፍን እንደ ወገኑ አበቀለች። እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።
            - generic [ref=e92]:
              - generic [ref=e93]: "13"
              - paragraph [ref=e94]: ማታም ሆነ ጥዋትም ሆነ፥ ሦስተኛ ቀን።
            - generic [ref=e96]:
              - generic [ref=e97]: "14"
              - paragraph [ref=e98]: እግዚአብሔርም አለ። ቀንና ሌሊትን ይለዩ ዘንድ ብርሃናት በሰማይ ጠፈር ይሁኑ፤ ለምልክቶች ለዘመኖች ለዕለታት ለዓመታትም ይሁኑ፤
            - generic [ref=e100]:
              - generic [ref=e101]: "15"
              - paragraph [ref=e102]: በምድር ላይ ያበሩ ዘንድ በሰማይ ጠፈር ብርሃናት ይሁኑ፤ እንዲሁም ሆነ።
            - generic [ref=e104]:
              - generic [ref=e105]: "16"
              - paragraph [ref=e106]: እግዚአብሔርም ሁለት ታላላቆች ብርሃናትን አደረገ፤ ትልቁ ብርሃን በቀን እንዲሠለጥን፥ ትንሹም ብርሃን በሌሊት እንዲሰለጥን፤ ከዋክብትንም ደግሞ አደረገ።
            - generic [ref=e108]:
              - generic [ref=e109]: "17"
              - paragraph [ref=e110]: እግዚአብሔርም በምድር ላይ ያበሩ ዘንድ በሰማይ ጠፈር አኖራቸው፤
            - generic [ref=e112]:
              - generic [ref=e113]: "18"
              - paragraph [ref=e114]: በቀንም በሌሊትም እንዲሠለጥኑ፥ ብርሃንንና ጨለማንም እንዲለዩ፤ እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።
            - generic [ref=e116]:
              - generic [ref=e117]: "19"
              - paragraph [ref=e118]: ማታም ሆነ ጥዋትም ሆነ፥ አራተኛ ቀን።
            - generic [ref=e120]:
              - generic [ref=e121]: "20"
              - paragraph [ref=e122]: እግዚአብሔርም አለ። ውኃ ሕያው ነፍስ ያላቸውን ተንቀሳቃሾች ታስገኝ፥ ወፎችም ከምድር በላይ ከሰማይ ጠፈር በታች ይብረሩ።
            - generic [ref=e124]:
              - generic [ref=e125]: "21"
              - paragraph [ref=e126]: እግዚአብሔርም ታላላቆች አንበሪዎችን፥ ውኃይቱ እንደ ወገኑ ያስገኘቻቸውንም ተንቀሳቃሾቹን ሕያዋን ፍጥረታት ሁሉ፥ እንደ ወገኑ የሚበሩትንም ወፎች ሁሉ ፈጠረ፤ እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።
            - generic [ref=e128]:
              - generic [ref=e129]: "22"
              - paragraph [ref=e130]: እግዚአብሔርም እንዲህ ብሎ ባረካቸው። ብዙ ተባዙም የባሕርንም ውኃ ሙሉአት፤ ወፎችም በምድር ላይ ይብዙ።
            - generic [ref=e132]:
              - generic [ref=e133]: "23"
              - paragraph [ref=e134]: ማታም ሆነ ጥዋትም ሆነ፥ አምስተኛ ቀን።
            - generic [ref=e136]:
              - generic [ref=e137]: "24"
              - paragraph [ref=e138]: እግዚአብሔርም አለ። ምድር ሕያዋን ፍጥረታትን እንደ ወገኑ፥ እንስሳትንና ተንቀሳቃሾችን የምድር አራዊትንም እንደ ወገኑ፥ ታውጣ፤ እንዲሁም ሆነ።
            - generic [ref=e140]:
              - generic [ref=e141]: "25"
              - paragraph [ref=e142]: እግዚአብሔር የምድር አራዊትን እንደ ወገኑ አደረገ፥ እንስሳውንም እንደ ወገኑ፥ የመሬት ተንቀሳቃሾችንም እንደ ወገኑ አደረገ፤ እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።
            - generic [ref=e144]:
              - generic [ref=e145]: "26"
              - paragraph [ref=e146]: እግዚአብሔርም አለ። ሰውን በመልካችን እንደ ምሳሌአችን እንፍጠር፤ የባሕር ዓሦችንና የሰማይ ወፎችን፥ እንስሳትንና ምድርን ሁሉ፥ በምድር ላይ የሚንቀሳቀሱትንም ሁሉ ይግዙ።
            - generic [ref=e148]:
              - generic [ref=e149]: "27"
              - paragraph [ref=e150]: እግዚአብሔርም ሰውን በመልኩ ፈጠረ፤ በእግዚአብሔር መልክ ፈጠረው፤ ወንድና ሴት አድርጎ ፈጠራቸው።
            - generic [ref=e152]:
              - generic [ref=e153]: "28"
              - paragraph [ref=e154]: እግዚአብሔርም ባረካቸው፥ እንዲህም አላቸው። ብዙ፥ ተባዙ፥ ምድርንም ሙሉአት፥ ግዙአትም፤ የባሕርን ዓሦችና የሰማይን ወፎች በምድር ላይ የሚንቀሳቀሱትንም ሁሉ ግዙአቸው።
            - generic [ref=e156]:
              - generic [ref=e157]: "29"
              - paragraph [ref=e158]: እግዚአብሔርም አለ። እነሆ መብል ይሆናችሁ ዘንድ በምድር ፊት ሁሉ ላይ ዘሩ በእርሱ ያለውን ሐመልማል ሁሉ፥ የዛፍን ፍሬ የሚያፈራውንና ዘር ያለውንም ዛፍ ሁሉ ሰጠኋችሁ፤
            - generic [ref=e160]:
              - generic [ref=e161]: "30"
              - paragraph [ref=e162]: ለምድርም አራዊት ሁሉ፥ ለሰማይም ወፎች ሁሉ፥ ሕያው ነፍስ ላላቸው ለምድር ተንቀሳቃሾችም ሁሉ የሚበቅለው ሐመልማል ሁሉ መብል ይሁንላቸው፤ እንዲሁም ሆነ።
            - generic [ref=e164]:
              - generic [ref=e165]: "31"
              - paragraph [ref=e166]: እግዚአብሔርም ያደረገውን ሁሉ አየ፥ እነሆም እጅግ መልካም ነበረ። ማታም ሆነ ጥዋትም ሆነ፥ ስድስተኛ ቀን።
        - generic [ref=e167]:
          - generic [ref=e168]: English (NIV)
          - generic [ref=e169]:
            - generic [ref=e171]:
              - generic [ref=e172]: "1"
              - paragraph [ref=e173]: In the beginning God created the heavens and the earth.
            - generic [ref=e175]:
              - generic [ref=e176]: "2"
              - paragraph [ref=e177]: Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.
            - generic [ref=e179]:
              - generic [ref=e180]: "3"
              - paragraph [ref=e181]: And God said, "Let there be light," and there was light.
            - generic [ref=e182]:
              - generic [ref=e183]:
                - generic [ref=e184]: "4"
                - paragraph [ref=e185]: God saw that the light was good, and he separated the light from the darkness.
              - generic [ref=e186]:
                - button "Highlight" [ref=e187]:
                  - img [ref=e188]
                  - text: Highlight
                - button "Copy" [ref=e191]:
                  - img [ref=e192]
                  - text: Copy
            - generic [ref=e195]:
              - generic [ref=e196]: "5"
              - paragraph [ref=e197]: God called the light "day," and the darkness he called "night." And there was evening, and there was morning-the first day.
            - generic [ref=e199]:
              - generic [ref=e200]: "6"
              - paragraph [ref=e201]: And God said, "Let there be an expanse between the waters to separate water from water."
            - generic [ref=e203]:
              - generic [ref=e204]: "7"
              - paragraph [ref=e205]: So God made the expanse and separated the water under the expanse from the water above it. And it was so.
            - generic [ref=e207]:
              - generic [ref=e208]: "8"
              - paragraph [ref=e209]: God called the expanse "sky." And there was evening, and there was morning-the second day.
            - generic [ref=e211]:
              - generic [ref=e212]: "9"
              - paragraph [ref=e213]: And God said, "Let the water under the sky be gathered to one place, and let dry ground appear." And it was so.
            - generic [ref=e215]:
              - generic [ref=e216]: "10"
              - paragraph [ref=e217]: God called the dry ground "land," and the gathered waters he called "seas." And God saw that it was good.
            - generic [ref=e219]:
              - generic [ref=e220]: "11"
              - paragraph [ref=e221]: "Then God said, \"Let the land produce vegetation: seed-bearing plants and trees on the land that bear fruit with seed in it, according to their various kinds.\" And it was so."
            - generic [ref=e223]:
              - generic [ref=e224]: "12"
              - paragraph [ref=e225]: "The land produced vegetation: plants bearing seed according to their kinds and trees bearing fruit with seed in it according to their kinds. And God saw that it was good."
            - generic [ref=e227]:
              - generic [ref=e228]: "13"
              - paragraph [ref=e229]: And there was evening, and there was morning-the third day.
            - generic [ref=e231]:
              - generic [ref=e232]: "14"
              - paragraph [ref=e233]: And God said, "Let there be lights in the expanse of the sky to separate the day from the night, and let them serve as signs to mark seasons and days and years,
            - generic [ref=e235]:
              - generic [ref=e236]: "15"
              - paragraph [ref=e237]: and let them be lights in the expanse of the sky to give light on the earth." And it was so.
            - generic [ref=e239]:
              - generic [ref=e240]: "16"
              - paragraph [ref=e241]: God made two great lights-the greater light to govern the day and the lesser light to govern the night. He also made the stars.
            - generic [ref=e243]:
              - generic [ref=e244]: "17"
              - paragraph [ref=e245]: God set them in the expanse of the sky to give light on the earth,
            - generic [ref=e247]:
              - generic [ref=e248]: "18"
              - paragraph [ref=e249]: to govern the day and the night, and to separate light from darkness. And God saw that it was good.
            - generic [ref=e251]:
              - generic [ref=e252]: "19"
              - paragraph [ref=e253]: And there was evening, and there was morning-the fourth day.
            - generic [ref=e255]:
              - generic [ref=e256]: "20"
              - paragraph [ref=e257]: And God said, "Let the water teem with living creatures, and let birds fly above the earth across the expanse of the sky."
            - generic [ref=e259]:
              - generic [ref=e260]: "21"
              - paragraph [ref=e261]: So God created the great creatures of the sea and every living and moving thing with which the water teems, according to their kinds, and every winged bird according to its kind. And God saw that it was good.
            - generic [ref=e263]:
              - generic [ref=e264]: "22"
              - paragraph [ref=e265]: God blessed them and said, "Be fruitful and increase in number and fill the water in the seas, and let the birds increase on the earth."
            - generic [ref=e267]:
              - generic [ref=e268]: "23"
              - paragraph [ref=e269]: And there was evening, and there was morning-the fifth day.
            - generic [ref=e271]:
              - generic [ref=e272]: "24"
              - paragraph [ref=e273]: "And God said, \"Let the land produce living creatures according to their kinds: livestock, creatures that move along the ground, and wild animals, each according to its kind.\" And it was so."
            - generic [ref=e275]:
              - generic [ref=e276]: "25"
              - paragraph [ref=e277]: God made the wild animals according to their kinds, the livestock according to their kinds, and all the creatures that move along the ground according to their kinds. And God saw that it was good.
            - generic [ref=e279]:
              - generic [ref=e280]: "26"
              - paragraph [ref=e281]: Then God said, "Let us make man in our image, in our likeness, and let them rule over the fish of the sea and the birds of the air, over the livestock, over all the earth, and over all the creatures that move along the ground."
            - generic [ref=e283]:
              - generic [ref=e284]: "27"
              - paragraph [ref=e285]: So God created man in his own image, in the image of God he created him; male and female he created them.
            - generic [ref=e287]:
              - generic [ref=e288]: "28"
              - paragraph [ref=e289]: God blessed them and said to them, "Be fruitful and increase in number; fill the earth and subdue it. Rule over the fish of the sea and the birds of the air and over every living creature that moves on the ground."
            - generic [ref=e291]:
              - generic [ref=e292]: "29"
              - paragraph [ref=e293]: Then God said, "I give you every seed-bearing plant on the face of the whole earth and every tree that has fruit with seed in it. They will be yours for food.
            - generic [ref=e295]:
              - generic [ref=e296]: "30"
              - paragraph [ref=e297]: And to all the beasts of the earth and all the birds of the air and all the creatures that move on the ground-everything that has the breath of life in it-I give every green plant for food." And it was so.
            - generic [ref=e299]:
              - generic [ref=e300]: "31"
              - paragraph [ref=e301]: God saw all that he had made, and it was very good. And there was evening, and there was morning-the sixth day.
    - navigation [ref=e302]:
      - button "Bible" [ref=e303]:
        - img [ref=e304]
        - generic [ref=e306]: Bible
      - button "Saved" [ref=e307]:
        - img [ref=e308]
        - generic [ref=e311]: Saved
      - button "Settings" [ref=e312]:
        - img [ref=e313]
        - generic [ref=e316]: Settings
  - button "Open Next.js Dev Tools" [ref=e322] [cursor=pointer]:
    - generic [ref=e325]:
      - text: Compiling
      - generic [ref=e326]:
        - generic [ref=e327]: .
        - generic [ref=e328]: .
        - generic [ref=e329]: .
  - alert [ref=e330]
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
> 40  |     await copyButton.click();
      |                      ^ Error: locator.click: Error: strict mode violation: getByText('Copy') resolved to 2 elements:
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
  133 |     await copyButton.click();
  134 | 
  135 |     const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  136 |     expect(clipboardText).toContain('Exodus') || expect(clipboardText).toContain('ዘጸ');
  137 |   });
  138 | 
  139 |   test('should copy verse after switching languages', async ({ page }) => {
  140 |     const bothViewButton = page.getByText('አማ+ENG');
```