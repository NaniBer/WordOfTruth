# Word of Truth 📖

A Progressive Web App (PWA) Bible reader with **Amharic** and **English** translations. Built with Next.js, TypeScript, and Tailwind CSS.

![Bible App](https://img.shields.io/badge/Bible-PWA-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

- 📱 **PWA Support** - Install on iPhone/Android home screen, works offline
- 🌍 **Bilingual** - Amharic (Haile Selassie 1962) + English (KJV/WEB)
- 🔍 **Search** - Search verses by keyword in both languages
- 🔖 **Bookmarks** - Save your favorite verses
- 🖍️ **Highlights** - Highlight verses with colors
- 📖 **Side-by-Side** - Compare Amharic and English translations
- 🌙 **Dark Mode** - Easy on the eyes
- ⚡ **Fast** - Local storage, instant loading

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

### 📱 Install on iPhone (No App Store needed!)

1. Open Safari on your iPhone
2. Go to your computer's IP address (e.g., `http://192.168.1.x:3000`)
3. Tap **Share** button
4. Tap **"Add to Home Screen"**
5. Open from home screen - no address bar! 🎉

## 📚 Bible Versions

### Amharic
- **Haile Selassie 1962** - The official Ethiopian Orthodox Bible

### English
- **KJV** (King James Version) - Classic English, public domain
- **WEB** (World English Bible) - Modern English, public domain

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Storage:** IndexedDB (local browser storage)
- **PWA:** next-pwa

## 📁 Project Structure

```
my-bible-pwa/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with PWA meta tags
│   │   ├── page.tsx        # Main Bible reader
│   │   └── globals.css     # Global styles
│   └── components/         # React components
├── data/
│   ├── amharic/           # Amharic Bible JSON files
│   └── english/           # English Bible JSON files
├── public/
│   ├── manifest.json      # PWA manifest
│   └── icons/             # App icons
└── next.config.ts         # Next.js + PWA config
```

## 🎯 Roadmap

- [x] Basic UI with book/chapter navigation
- [x] PWA configuration
- [ ] Add real Bible data
- [ ] Search functionality
- [ ] Bookmarks
- [ ] Verse highlighting
- [ ] Side-by-side comparison
- [ ] Reading plans
- [ ] Audio narration

## 🤝 Contributing

This project was inspired by [dagmawibabi/mybible](https://github.com/dagmawibabi/mybible) - a Flutter Bible app.

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit PRs

## 📄 License

- Code: MIT License
- Bible data: Public Domain (KJV, WEB, Haile Selassie Amharic)

## 🙏 Credits

- Bible data from [magna25/amharic-bible-json](https://github.com/magna25/amharic-bible-json)
- Inspired by [dagmawibabi/mybible](https://github.com/dagmawibabi/mybible)

---

Made with ❤️ for personal Bible study
