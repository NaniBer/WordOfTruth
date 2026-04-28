# Word of Truth 📖

A Progressive Web App (PWA) Bible reader with **Amharic** and **English** translations. Built with Next.js, TypeScript, and Tailwind CSS.

![Bible App](https://img.shields.io/badge/Bible-PWA-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

### 📱 Core Reading
- **Bilingual** - Amharic (Haile Selassie 1954 + NASB) + English (NIV, NLT, CSB)
- **Three View Modes** - Amharic only, English only, or dual view
- **Proper Ethiopian Book Names** - Uses correct Amharic titles with abbreviations
- **Verse Navigation** - Jump to any book/chapter with picker
- **Last Location** - Remembers where you left off

### 🔄 Navigation
- **Swipe Navigation** - Swipe left/right to change chapters
- **Book/Chapter Picker** - iOS-style bottom sheet selector
- **Previous/Next Buttons** - Easy chapter navigation

### 🔖 Bookmarks & Highlights
- **Save Verses** - Bookmark verses with Faith, Hope, Love categories
- **Color Highlights** - 3 highlight colors per theme (Faith, Hope, Love)
- **Cross-Theme Persistence** - Highlights persist across all 6 themes
- **Saved Verses Tab** - View all bookmarks organized by category
- **Quick Jump** - Tap saved verse to navigate to it

### 🔍 Search
- **Full-Text Search** - Search across all books and chapters
- **Multi-Language** - Search in Amharic, English, or both
- **Real-Time Results** - Debounced search with highlighting
- **Quick Navigation** - Tap result to jump to verse

### 📋 Copy & Share
- **Copy Button** - Copy any verse to clipboard
- **Formatted Output** - Includes book name, chapter, verse, and both translations
- **Toast Notification** - Confirms when copied

### 📴 Offline Support
- **True Offline Mode** - Works completely without internet after caching
- **IndexedDB Storage** - Bible data persists even when app is closed
- **Theme Persistence** - Your chosen theme works offline
- **Manual Cache** - Download all Bible data via Settings
- **Instant Loading** - Cached data loads immediately, no waiting

### 🎨 UI/UX
- **6 Reading Themes** - Light, Warm, Dark, Midnight, AMOLED, Ocean
- **Glassmorphism Design** - Modern frosted glass UI
- **Bottom Navigation** - Bible, Saved, Settings tabs
- **Version Selectors** - Switch translations with custom dropdown
- **Responsive** - Optimized for mobile, works on desktop
- **Custom Typography** - Adjustable font sizes
- **Persistent Theme** - Remembers your color preference

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/NaniBer/WordOfTruth.git
cd WordOfTruth

# Install dependencies
npm install

# IMPORTANT: Add your Bible data (see Bible Data section above)
# Or set up external CDN in .env.local:
# echo "NEXT_PUBLIC_DATA_URL=https://your-cdn.com/bible-data" > .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**⚠️ Note:** Without Bible data, the app will show empty verses. You must either:
1. Add JSON files to `/public/data/` (see Bible Data section)
2. Set up an external CDN with `NEXT_PUBLIC_DATA_URL`

### 📱 Install on iPhone (PWA)

1. Open Safari on your iPhone
2. Go to your hosted URL
3. Tap **Share** button
4. Tap **"Add to Home Screen"**
5. Open from home screen - works offline! 🎉

## 📚 Bible Versions

### Amharic
- **Haile Selassie 1962** - Ethiopian Orthodox Bible
- **Amharic NASB** - New American Standard Bible in Amharic

### English
- **NIV** (New International Version)
- **NLT** (New Living Translation)
- **CSB** (Christian Standard Bible)

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with glassmorphism effects
- **State:** React hooks with localStorage persistence
- **Storage:**
  - localStorage (settings, last location)
  - IndexedDB (Bible data - more reliable than Cache API on iOS)
- **PWA:** Custom service worker with offline-first architecture
- **Components:** Custom dropdowns, modals, navigation
- **Icons:** Lucide React

## 📁 Project Structure

```
my-bible-pwa/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with PWA setup
│   │   ├── page.tsx                # Main Bible reader app
│   │   ├── globals.css             # Global styles
│   │   ├── constants/
│   │   │   ├── books.ts            # Book data (names, abbreviations)
│   │   │   ├── themes.ts           # 6 theme definitions
│   │   │   └── fonts.ts            # Font size options
│   │   ├── components/
│   │   │   ├── Header.tsx          # Top navigation bar
│   │   │   ├── BottomNav.tsx       # Tab navigation
│   │   │   ├── ReaderView.tsx      # Bible content display
│   │   │   ├── CustomSelect.tsx    # Theme-aware dropdowns
│   │   │   ├── SearchModal.tsx     # Search interface
│   │   │   ├── Settings.tsx        # Settings panel
│   │   │   ├── SavedVerses.tsx     # Bookmarks view
│   │   │   └── ChapterNavigation.tsx # Prev/Next chapter
│   │   └── types/
│   │       └── book.ts             # TypeScript Book interface
│   ├── utils/
│   │   ├── highlights.ts           # Highlight CRUD operations
│   │   ├── lastLocation.ts         # Save/restore reading position
│   │   ├── viewSettings.ts         # Save/restore app settings
│   │   ├── dataUrl.ts              # CDN URL helper
│   │   ├── cacheBible.ts           # Bible data caching logic
│   │   └── indexedDb.ts            # IndexedDB wrapper (optional)
│   └── hooks/
│       └── useSwipeNavigation.ts   # Touch swipe detection
├── public/
│   ├── data/                       # Bible JSON files (gitignored)
│   │   ├── amharic_bible/
│   │   ├── amharic_nasb/
│   │   └── english/
│   ├── sw.js                       # Service worker
│   ├── manifest.json               # PWA manifest
│   └── icons/                      # App icons
├── README.md                       # This file
└── .env.local                      # Environment variables (CDN URL)
```

## 🗂️ Bible Data

> **⚠️ IMPORTANT:** This repository does NOT include Bible text files due to copyright restrictions. You must provide your own Bible translation data.

### Providing Your Own Data

Bible data should be placed in `/public/data/` as numbered JSON files (1.json - 66.json, where 1=Genesis, 66=Revelation).

**Expected structure:**
```
public/data/
├── amharic_bible/     # Amharic translations
├── amharic_nasb/      # Amharic NASB
└── english/
    ├── niv/           # English NIV
    ├── nlt/           # English NLT
    └── csb/           # English CSB
```

**JSON format for each book:**
```json
{
  "chapters": [
    {
      "chapter": "1",
      "verses": ["Verse 1 text", "Verse 2 text", "..."]
    }
  ]
}
```

### External CDN (Recommended for Production)

For production deployment, you can host Bible data on an external CDN:

1. Host your JSON files on Cloudflare Pages, GitHub Pages, or any CDN
2. Set the environment variable in Vercel:
   ```
   NEXT_PUBLIC_DATA_URL=https://your-cdn.com/bible-data
   ```

See [DATA_SETUP.md](./DATA_SETUP.md) for detailed CDN setup instructions.

### Data Sources

You can obtain Bible translations from:
- **Public Domain:** KJV, WEB (World English Bible)
- **Licensed:** Contact Bible societies for NIV, NLT, CSB permissions
- **Create Your Own:** Format your own translations in the JSON structure above

> **Note:** Bible data in `/public/data/` is gitignored to avoid copyright issues.

## 🎯 Features

### ✅ Completed
- [x] **6 Reading Themes** - Light, Warm, Dark, Midnight, AMOLED, Ocean
- [x] **Bilingual Support** - Amharic + English with dual view
- [x] **Full-Text Search** - Search across all translations
- [x] **Bookmarks & Highlights** - Save verses with color categories
- [x] **Offline Mode** - Works completely without internet
- [x] **Theme Persistence** - Colors persist when app is reopened
- [x] **Swipe Navigation** - Swipe to change chapters
- [x] **Custom Selects** - Theme-aware dropdown components
- [x] **Last Location** - Returns to where you left off
- [x] **Copy & Share** - Copy formatted verses
- [x] **PWA Support** - Installable on iOS/Android
- [x] **External CDN** - Host Bible data separately

### 🔄 Future Ideas
- [ ] **True Offline Mode** - Improve offline reliability with better data persistence
- [ ] **Native App** - Wrap as iOS/Android app using Capacitor or React Native
- [ ] Reading plans / devotionals
- [ ] Audio narration / text-to-speech
- [ ] Verse notes / personal comments
- [ ] Native share sheet integration
- [ ] Cross-device sync
- [ ] Multiple bookmark collections

## 🚀 Deployment

### Vercel (Recommended)

1. Fork this repository
2. Connect to Vercel
3. Set environment variable:
   ```
   NEXT_PUBLIC_DATA_URL=https://your-cdn.com/bible-data
   ```
4. Deploy!

### Self-Hosting

```bash
# Build for production
npm run build

# The output will be in `.next/`
# Serve with any static hosting
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Reporting Issues
- Use GitHub Issues to report bugs
- Include device info (iOS/Android, browser version)
- Describe steps to reproduce

### Suggesting Features
- Open an issue with the "feature request" label
- Describe the use case
- Mockups appreciated!

### Code Contributions
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Test on mobile devices
- Ensure offline functionality works
- Update README if adding features

## 📄 License

- Code: MIT License
- Bible data: Public Domain (where applicable)

## 🙏 Credits

Made with ❤️ for personal Bible study and the Ethiopian community.

Special thanks to:
- **[Beblia/Holy-Bible-XML-Format](https://github.com/Beblia/Holy-Bible-XML-Format/tree/master)** - For providing all the Bible translations used in this project
- **[dagmawibabi/mybible](https://github.com/dagmawibabi/mybible)** - For the inspiration and motivation to build this app
- Bible societies for English translations
- Contributors and testers

## 🆘 Troubleshooting

### "Cannot load verses" / Empty verses
- **Cause:** Bible data not found
- **Fix:** Add Bible JSON files to `/public/data/` or set `NEXT_PUBLIC_DATA_URL`

### Theme not persisting on iOS
- **Cause:** iOS Safari clears cache
- **Fix:** This should be fixed! If not, try reinstalling the PWA

### Search not working
- **Cause:** Bible data not cached
- **Fix:** Open Settings → "Cache All Bible Data" while online

### Offline mode not working
- **Cause:** Data not cached or iOS limitations
- **Fix:** 
  1. Open app while online
  2. Go to Settings → "Cache All Bible Data"
  3. Wait for all 397 files to download
  4. Try offline again

---

**Made with ❤️ in Ethiopia | [Report Bug](https://github.com/NaniBer/WordOfTruth/issues) | [Request Feature](https://github.com/NaniBer/WordOfTruth/issues)**
