# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: copy-feature.spec.ts >> Copy Verse Feature >> should copy verse after switching languages
- Location: e2e/copy-feature.spec.ts:139:7

# Error details

```
Error: locator.click: Error: strict mode violation: getByText('ENG') resolved to 3 elements:
    1) <button class="px-2.5 py-1.5 rounded-md text-[13px] font-medium bg-[#0a84ff] text-white">አማ+ENG</button> aka getByRole('button', { name: 'አማ+ENG' })
    2) <button class="px-2.5 py-1.5 rounded-md text-[13px] font-medium text-white/70">ENG</button> aka getByRole('button', { name: 'ENG', exact: true })
    3) <div class="text-[#8e8e93] text-[12px] font-medium uppercase tracking-wide px-2 py-2 sticky top-0 bg-[#000] z-10">English (NIV)</div> aka getByText('English (NIV)')

Call log:
  - waiting for getByText('ENG')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - button "ዘፍ / Genesis 1" [ref=e4]:
        - generic [ref=e5]: ዘፍ / Genesis
        - generic [ref=e6]: "1"
        - img [ref=e7]
      - generic [ref=e9]:
        - generic [ref=e10]:
          - button "አማ" [ref=e11]
          - button "አማ+ENG" [active] [ref=e12]
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
            - generic [ref=e48]:
              - generic [ref=e49]: "4"
              - paragraph [ref=e50]: እግዚአብሔርም ብርሃኑ መልካም እንደ ሆነ አየ፤ እግዚብሔርም ብርሃንንና ጨለማን ለየ።
            - generic [ref=e52]:
              - generic [ref=e53]: "5"
              - paragraph [ref=e54]: እግዚአብሔርም ብርሃኑን ቀን ብሎ ጠራው፥ ጨለማውንም ሌሊት አለው። ማታም ሆነ ጥዋትም ሆነ፥ አንድ ቀን።
            - generic [ref=e56]:
              - generic [ref=e57]: "6"
              - paragraph [ref=e58]: እግዚአብሔርም። በውኆች መካከል ጠፈር ይሁን፥ በውኃና በውኃ መካከልም ይክፈል አለ።
            - generic [ref=e60]:
              - generic [ref=e61]: "7"
              - paragraph [ref=e62]: እግዚአብሔርም ጠፈርን አደረገ፥ ከጠፈር በታችና ከጠፈር በላይ ያሉትንም ውኆች ለየ፤ እንዲሁም ሆነ።
            - generic [ref=e64]:
              - generic [ref=e65]: "8"
              - paragraph [ref=e66]: እግዚአብሔር ጠፈርን ሰማይ ብሎ ጠራው። ማታም ሆነ ጥዋትም ሆነ፥ ሁለተኛ ቀን።
            - generic [ref=e68]:
              - generic [ref=e69]: "9"
              - paragraph [ref=e70]: እግዚአብሔርም። ከሰማይ በታች ያለው ውኃ በአንድ ስፍራ ይሰብሰብ፥ የብሱም ይገለጥ አለ እንዲሁም ሆነ።
            - generic [ref=e72]:
              - generic [ref=e73]: "10"
              - paragraph [ref=e74]: እግዚአብሔርም የብሱን ምድር ብሎ ጠራው፤ የውኃ መከማቻውንም ባሕር አለው፤ እግዚእብሔርም ያ መልካም እንደ ሆነ አየ።
            - generic [ref=e76]:
              - generic [ref=e77]: "11"
              - paragraph [ref=e78]: እግዚአብሔርም። ምድር ዘርን የሚሰጥ ሣርንና ቡቃያን በምድርም ላይ እንደ ወገኑ ዘሩ ያለበትን ፍሬን የሚያፈራ ዛፍን ታብቅል አለ፤ እንዲሁም ሆነ።
            - generic [ref=e80]:
              - generic [ref=e81]: "12"
              - paragraph [ref=e82]: ምድርም ዘርን የሚሰጥ ሣርንና ቡቃያን እንደ ወገኑ ዘሩም ያለበትን ፍሬን የሚያፈራ ዛፍን እንደ ወገኑ አበቀለች። እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።
            - generic [ref=e84]:
              - generic [ref=e85]: "13"
              - paragraph [ref=e86]: ማታም ሆነ ጥዋትም ሆነ፥ ሦስተኛ ቀን።
            - generic [ref=e88]:
              - generic [ref=e89]: "14"
              - paragraph [ref=e90]: እግዚአብሔርም አለ። ቀንና ሌሊትን ይለዩ ዘንድ ብርሃናት በሰማይ ጠፈር ይሁኑ፤ ለምልክቶች ለዘመኖች ለዕለታት ለዓመታትም ይሁኑ፤
            - generic [ref=e92]:
              - generic [ref=e93]: "15"
              - paragraph [ref=e94]: በምድር ላይ ያበሩ ዘንድ በሰማይ ጠፈር ብርሃናት ይሁኑ፤ እንዲሁም ሆነ።
            - generic [ref=e96]:
              - generic [ref=e97]: "16"
              - paragraph [ref=e98]: እግዚአብሔርም ሁለት ታላላቆች ብርሃናትን አደረገ፤ ትልቁ ብርሃን በቀን እንዲሠለጥን፥ ትንሹም ብርሃን በሌሊት እንዲሰለጥን፤ ከዋክብትንም ደግሞ አደረገ።
            - generic [ref=e100]:
              - generic [ref=e101]: "17"
              - paragraph [ref=e102]: እግዚአብሔርም በምድር ላይ ያበሩ ዘንድ በሰማይ ጠፈር አኖራቸው፤
            - generic [ref=e104]:
              - generic [ref=e105]: "18"
              - paragraph [ref=e106]: በቀንም በሌሊትም እንዲሠለጥኑ፥ ብርሃንንና ጨለማንም እንዲለዩ፤ እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።
            - generic [ref=e108]:
              - generic [ref=e109]: "19"
              - paragraph [ref=e110]: ማታም ሆነ ጥዋትም ሆነ፥ አራተኛ ቀን።
            - generic [ref=e112]:
              - generic [ref=e113]: "20"
              - paragraph [ref=e114]: እግዚአብሔርም አለ። ውኃ ሕያው ነፍስ ያላቸውን ተንቀሳቃሾች ታስገኝ፥ ወፎችም ከምድር በላይ ከሰማይ ጠፈር በታች ይብረሩ።
            - generic [ref=e116]:
              - generic [ref=e117]: "21"
              - paragraph [ref=e118]: እግዚአብሔርም ታላላቆች አንበሪዎችን፥ ውኃይቱ እንደ ወገኑ ያስገኘቻቸውንም ተንቀሳቃሾቹን ሕያዋን ፍጥረታት ሁሉ፥ እንደ ወገኑ የሚበሩትንም ወፎች ሁሉ ፈጠረ፤ እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።
            - generic [ref=e120]:
              - generic [ref=e121]: "22"
              - paragraph [ref=e122]: እግዚአብሔርም እንዲህ ብሎ ባረካቸው። ብዙ ተባዙም የባሕርንም ውኃ ሙሉአት፤ ወፎችም በምድር ላይ ይብዙ።
            - generic [ref=e124]:
              - generic [ref=e125]: "23"
              - paragraph [ref=e126]: ማታም ሆነ ጥዋትም ሆነ፥ አምስተኛ ቀን።
            - generic [ref=e128]:
              - generic [ref=e129]: "24"
              - paragraph [ref=e130]: እግዚአብሔርም አለ። ምድር ሕያዋን ፍጥረታትን እንደ ወገኑ፥ እንስሳትንና ተንቀሳቃሾችን የምድር አራዊትንም እንደ ወገኑ፥ ታውጣ፤ እንዲሁም ሆነ።
            - generic [ref=e132]:
              - generic [ref=e133]: "25"
              - paragraph [ref=e134]: እግዚአብሔር የምድር አራዊትን እንደ ወገኑ አደረገ፥ እንስሳውንም እንደ ወገኑ፥ የመሬት ተንቀሳቃሾችንም እንደ ወገኑ አደረገ፤ እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።
            - generic [ref=e136]:
              - generic [ref=e137]: "26"
              - paragraph [ref=e138]: እግዚአብሔርም አለ። ሰውን በመልካችን እንደ ምሳሌአችን እንፍጠር፤ የባሕር ዓሦችንና የሰማይ ወፎችን፥ እንስሳትንና ምድርን ሁሉ፥ በምድር ላይ የሚንቀሳቀሱትንም ሁሉ ይግዙ።
            - generic [ref=e140]:
              - generic [ref=e141]: "27"
              - paragraph [ref=e142]: እግዚአብሔርም ሰውን በመልኩ ፈጠረ፤ በእግዚአብሔር መልክ ፈጠረው፤ ወንድና ሴት አድርጎ ፈጠራቸው።
            - generic [ref=e144]:
              - generic [ref=e145]: "28"
              - paragraph [ref=e146]: እግዚአብሔርም ባረካቸው፥ እንዲህም አላቸው። ብዙ፥ ተባዙ፥ ምድርንም ሙሉአት፥ ግዙአትም፤ የባሕርን ዓሦችና የሰማይን ወፎች በምድር ላይ የሚንቀሳቀሱትንም ሁሉ ግዙአቸው።
            - generic [ref=e148]:
              - generic [ref=e149]: "29"
              - paragraph [ref=e150]: እግዚአብሔርም አለ። እነሆ መብል ይሆናችሁ ዘንድ በምድር ፊት ሁሉ ላይ ዘሩ በእርሱ ያለውን ሐመልማል ሁሉ፥ የዛፍን ፍሬ የሚያፈራውንና ዘር ያለውንም ዛፍ ሁሉ ሰጠኋችሁ፤
            - generic [ref=e152]:
              - generic [ref=e153]: "30"
              - paragraph [ref=e154]: ለምድርም አራዊት ሁሉ፥ ለሰማይም ወፎች ሁሉ፥ ሕያው ነፍስ ላላቸው ለምድር ተንቀሳቃሾችም ሁሉ የሚበቅለው ሐመልማል ሁሉ መብል ይሁንላቸው፤ እንዲሁም ሆነ።
            - generic [ref=e156]:
              - generic [ref=e157]: "31"
              - paragraph [ref=e158]: እግዚአብሔርም ያደረገውን ሁሉ አየ፥ እነሆም እጅግ መልካም ነበረ። ማታም ሆነ ጥዋትም ሆነ፥ ስድስተኛ ቀን።
        - generic [ref=e159]:
          - generic [ref=e160]: English (NIV)
          - generic [ref=e161]:
            - generic [ref=e163]:
              - generic [ref=e164]: "1"
              - paragraph [ref=e165]: In the beginning God created the heavens and the earth.
            - generic [ref=e167]:
              - generic [ref=e168]: "2"
              - paragraph [ref=e169]: Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.
            - generic [ref=e171]:
              - generic [ref=e172]: "3"
              - paragraph [ref=e173]: And God said, "Let there be light," and there was light.
            - generic [ref=e175]:
              - generic [ref=e176]: "4"
              - paragraph [ref=e177]: God saw that the light was good, and he separated the light from the darkness.
            - generic [ref=e179]:
              - generic [ref=e180]: "5"
              - paragraph [ref=e181]: God called the light "day," and the darkness he called "night." And there was evening, and there was morning-the first day.
            - generic [ref=e183]:
              - generic [ref=e184]: "6"
              - paragraph [ref=e185]: And God said, "Let there be an expanse between the waters to separate water from water."
            - generic [ref=e187]:
              - generic [ref=e188]: "7"
              - paragraph [ref=e189]: So God made the expanse and separated the water under the expanse from the water above it. And it was so.
            - generic [ref=e191]:
              - generic [ref=e192]: "8"
              - paragraph [ref=e193]: God called the expanse "sky." And there was evening, and there was morning-the second day.
            - generic [ref=e195]:
              - generic [ref=e196]: "9"
              - paragraph [ref=e197]: And God said, "Let the water under the sky be gathered to one place, and let dry ground appear." And it was so.
            - generic [ref=e199]:
              - generic [ref=e200]: "10"
              - paragraph [ref=e201]: God called the dry ground "land," and the gathered waters he called "seas." And God saw that it was good.
            - generic [ref=e203]:
              - generic [ref=e204]: "11"
              - paragraph [ref=e205]: "Then God said, \"Let the land produce vegetation: seed-bearing plants and trees on the land that bear fruit with seed in it, according to their various kinds.\" And it was so."
            - generic [ref=e207]:
              - generic [ref=e208]: "12"
              - paragraph [ref=e209]: "The land produced vegetation: plants bearing seed according to their kinds and trees bearing fruit with seed in it according to their kinds. And God saw that it was good."
            - generic [ref=e211]:
              - generic [ref=e212]: "13"
              - paragraph [ref=e213]: And there was evening, and there was morning-the third day.
            - generic [ref=e215]:
              - generic [ref=e216]: "14"
              - paragraph [ref=e217]: And God said, "Let there be lights in the expanse of the sky to separate the day from the night, and let them serve as signs to mark seasons and days and years,
            - generic [ref=e219]:
              - generic [ref=e220]: "15"
              - paragraph [ref=e221]: and let them be lights in the expanse of the sky to give light on the earth." And it was so.
            - generic [ref=e223]:
              - generic [ref=e224]: "16"
              - paragraph [ref=e225]: God made two great lights-the greater light to govern the day and the lesser light to govern the night. He also made the stars.
            - generic [ref=e227]:
              - generic [ref=e228]: "17"
              - paragraph [ref=e229]: God set them in the expanse of the sky to give light on the earth,
            - generic [ref=e231]:
              - generic [ref=e232]: "18"
              - paragraph [ref=e233]: to govern the day and the night, and to separate light from darkness. And God saw that it was good.
            - generic [ref=e235]:
              - generic [ref=e236]: "19"
              - paragraph [ref=e237]: And there was evening, and there was morning-the fourth day.
            - generic [ref=e239]:
              - generic [ref=e240]: "20"
              - paragraph [ref=e241]: And God said, "Let the water teem with living creatures, and let birds fly above the earth across the expanse of the sky."
            - generic [ref=e243]:
              - generic [ref=e244]: "21"
              - paragraph [ref=e245]: So God created the great creatures of the sea and every living and moving thing with which the water teems, according to their kinds, and every winged bird according to its kind. And God saw that it was good.
            - generic [ref=e247]:
              - generic [ref=e248]: "22"
              - paragraph [ref=e249]: God blessed them and said, "Be fruitful and increase in number and fill the water in the seas, and let the birds increase on the earth."
            - generic [ref=e251]:
              - generic [ref=e252]: "23"
              - paragraph [ref=e253]: And there was evening, and there was morning-the fifth day.
            - generic [ref=e255]:
              - generic [ref=e256]: "24"
              - paragraph [ref=e257]: "And God said, \"Let the land produce living creatures according to their kinds: livestock, creatures that move along the ground, and wild animals, each according to its kind.\" And it was so."
            - generic [ref=e259]:
              - generic [ref=e260]: "25"
              - paragraph [ref=e261]: God made the wild animals according to their kinds, the livestock according to their kinds, and all the creatures that move along the ground according to their kinds. And God saw that it was good.
            - generic [ref=e263]:
              - generic [ref=e264]: "26"
              - paragraph [ref=e265]: Then God said, "Let us make man in our image, in our likeness, and let them rule over the fish of the sea and the birds of the air, over the livestock, over all the earth, and over all the creatures that move along the ground."
            - generic [ref=e267]:
              - generic [ref=e268]: "27"
              - paragraph [ref=e269]: So God created man in his own image, in the image of God he created him; male and female he created them.
            - generic [ref=e271]:
              - generic [ref=e272]: "28"
              - paragraph [ref=e273]: God blessed them and said to them, "Be fruitful and increase in number; fill the earth and subdue it. Rule over the fish of the sea and the birds of the air and over every living creature that moves on the ground."
            - generic [ref=e275]:
              - generic [ref=e276]: "29"
              - paragraph [ref=e277]: Then God said, "I give you every seed-bearing plant on the face of the whole earth and every tree that has fruit with seed in it. They will be yours for food.
            - generic [ref=e279]:
              - generic [ref=e280]: "30"
              - paragraph [ref=e281]: And to all the beasts of the earth and all the birds of the air and all the creatures that move on the ground-everything that has the breath of life in it-I give every green plant for food." And it was so.
            - generic [ref=e283]:
              - generic [ref=e284]: "31"
              - paragraph [ref=e285]: God saw all that he had made, and it was very good. And there was evening, and there was morning-the sixth day.
    - navigation [ref=e286]:
      - button "Bible" [ref=e287]:
        - img [ref=e288]
        - generic [ref=e290]: Bible
      - button "Saved" [ref=e291]:
        - img [ref=e292]
        - generic [ref=e295]: Saved
      - button "Settings" [ref=e296]:
        - img [ref=e297]
        - generic [ref=e300]: Settings
  - button "Open Next.js Dev Tools" [ref=e306] [cursor=pointer]:
    - img [ref=e307]
  - alert [ref=e310]
```

# Test source

```ts
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
  141 |     await bothViewButton.click();
  142 | 
  143 |     await page.waitForTimeout(500);
  144 | 
  145 |     const englishViewButton = page.getByText('ENG');
> 146 |     await englishViewButton.click();
      |                             ^ Error: locator.click: Error: strict mode violation: getByText('ENG') resolved to 3 elements:
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