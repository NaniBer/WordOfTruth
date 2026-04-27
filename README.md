# Word of Truth 📖

A Progressive Web App (PWA) Bible reader with **Amharic** and **English** translations. Built with Next.js, TypeScript, and Tailwind CSS.

![Bible App](https://img.shields.io/badge/Bible-PWA-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

### 📱 Core Reading
- **Bilingual** - Amharic (Haile Selassie 1962 + NASB) + English (NIV, NLT, CSB)
- **Three View Modes** - Amharic only, English only, or side-by-side
- **Proper Ethiopian Book Names** - Uses correct Amharic titles
- **Verse Merging** - Handles combined verses (e.g., 1-4 as one verse)

### 🔄 Navigation
- **Swipe Navigation** - Swipe left/right to change chapters
- **Book/Chapter Picker** - iOS-style bottom sheet selector
- **Previous/Next Buttons** - Easy chapter navigation

### 🔖 Bookmarks & Highlights
- **Save Verses** - Bookmark your favorite passages
- **Color Highlights** - Highlight with 5 colors (Yellow, Green, Blue, Pink, Purple)
- **Saved Verses Tab** - View all your bookmarks

### 📋 Copy & Share
- **Copy Button** - Copy any verse to clipboard
- **Formatted Output** - Includes both Amharic and English with references
- **Toast Notification** - Confirms when copied

### 📴 Offline Support
- **Works Offline** - PWA with service worker caching
- **Manual Cache** - Download all Bible data for offline use
- **Offline Indicator** - Shows when you're offline

### 🎨 UI/UX
- **Dark Theme** - Easy on the eyes
- **Bottom Navigation** - Bible, Saved, Settings tabs
- **Version Selectors** - Switch between translations
- **Responsive** - Works on mobile and desktop

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

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Storage:** localStorage (bookmarks/highlights) + Cache API (Bible data)
- **PWA:** Custom service worker

## 📁 Project Structure

```
my-bible-pwa/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with PWA setup
│   │   ├── page.tsx        # Main Bible reader app
│   │   └── globals.css     # Global styles
│   └── components/         # (future components)
├── public/
│   ├── data/              # Bible JSON files (1-66)
│   │   ├── amharic_bible/
│   │   ├── amharic_nasb/
│   │   └── english/
│   ├── sw.js              # Service worker
│   ├── manifest.json      # PWA manifest
│   └── icons/             # App icons
├── PROGRESS.md            # Development progress tracker
└── README.md              # This file
```

## 🗂️ Bible Data

Bible data is stored in `/public/data/` as numbered JSON files (1.json - 66.json):
- `amharic_bible/` - Haile Selassie 1962
- `amharic_nasb/` - Amharic NASB
- `english/niv/` - NIV
- `english/nlt/` - NLT
- `english/csb/` - CSB

> **Note:** Bible data is gitignored. You need to add your own translation files or use the cache feature in Settings to download them.

## 🎯 Roadmap

See [PROGRESS.md](./PROGRESS.md) for detailed development progress.

### ✅ Completed
- [x] Bilingual support (Amharic + English)
- [x] Swipe navigation
- [x] Bookmarks & highlights
- [x] Copy to clipboard
- [x] Offline support with PWA
- [x] Settings tab

### 🔄 In Progress / Planned
- [ ] Search functionality
- [ ] Reading plans
- [ ] Audio narration
- [ ] Font size settings
- [ ] Verse notes
- [ ] Share via native share sheet

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit PRs

## 📄 License

- Code: MIT License
- Bible data: Public Domain (where applicable)

## 🙏 Credits

Made with ❤️ for personal Bible study

---

**See [PROGRESS.md](./PROGRESS.md) for detailed feature list and development history.**
