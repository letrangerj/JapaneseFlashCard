# Kotoba Vault (Local) - Local Japanese Flashcard Learning App

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PWA](https://img.shields.io/badge/PWA-enabled-green.svg)
![Offline](https://img.shields.io/badge/offline-ready-orange.svg)
![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)

> **🇯🇵 A pure local flashcard app designed specifically for Japanese learners**

A completely localized Japanese vocabulary flashcard learning application that requires **no internet connection, no account registration, and keeps 100% of your data private**. Built with modern PWA technology to provide a native app-like learning experience.

[🌟 **Live Demo**](http://localhost:5175/) | [📖 **User Guide**](./USAGE.md) | [🇨🇳 **中文版**](./README.md)

## ✨ Core Features

### 🔒 Privacy Protection
- **100% Local Storage**: All data stored in browser IndexedDB, never uploaded
- **No Registration**: No accounts or login required
- **Completely Offline**: Supports full offline usage, protecting learning privacy

### 📱 PWA Experience
- **Installable App**: Supports installation to desktop and mobile home screen
- **Native Experience**: Runs in standalone window without browser interface interference
- **Fast Launch**: Instant loading with native app-like performance

### 🎯 Learning Features
- **3D Card Flip**: Smooth flip animations simulating real flashcards
- **Japanese Speech**: Built-in TTS pronunciation for words and example sentences
- **Smart Shuffle**: Randomized learning order to avoid memorizing positions
- **Learning Progress**: Real-time display of current progress and remaining cards
- **Furigana Support**: Perfect display of Ruby annotations for pronunciation help

### 🎨 User Experience
- **Dark Mode**: Light/dark theme switching to protect eyes
- **Responsive Design**: Perfect adaptation to mobile, tablet, and desktop devices
- **Smooth Animations**: Carefully designed transitions for enhanced user experience
- **Professional Fonts**: Uses Google Fonts' Noto Sans JP/SC fonts

### 📊 Data Management
- **Markdown Import**: Supports standard Markdown format card data
- **Batch Management**: Create and manage multiple card decks
- **Data Export**: One-click export of all data, supports backup and migration
- **Safe Deletion**: Anti-misclick design, confirmation required before deleting card decks

## 🚀 Quick Start

### Method 1: Online Usage (Recommended)

1. **Access the App**
   ```
   http://localhost:5175/  (Development version)
   http://localhost:4173/  (Production version)
   ```

2. **Upload Card Deck**
   - Click upload area or drag `.md` files directly
   - System automatically parses and saves to local database
   - Supported files: `単語３.md` in the project can be used as a test file

3. **Start Learning**
   - Click "Start Learning" button on any card deck on the homepage
   - Enjoy an immersive learning experience

### Method 2: Install as Desktop App (Best Experience)

#### Install in Chrome/Edge Browser:
1. Visit the app URL
2. Find the **"Install"** icon 📥 on the right side of the address bar
3. Click install and confirm "Install"
4. The app will be added to:
   - **Windows**: Start Menu and Desktop
   - **macOS**: Applications folder and Dock
   - **Linux**: Applications menu

#### Install in Mobile Browser:
1. Open the app with mobile browser
2. **iOS Safari**: Tap share button → "Add to Home Screen"
3. **Android Chrome**: Tap menu → "Add to home screen"

### Method 3: Local Development

```bash
# 1. Clone or download project
cd kotoba-vault

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Access in browser
open http://localhost:5175
```

## 📖 Detailed Usage Instructions

### 🎮 Learning Interface Operations

#### Card Interactions
- **View Answer**: Click card front or "Show Answer" button
- **Voice Playback**: Click 🔊 icon to listen to Japanese pronunciation
- **Card Navigation**: Use "Previous"/"Next" buttons to switch cards

#### Learning Controls
- **Reshuffle**: Click 🔀 button to randomly shuffle card order
- **Progress View**: Upper right shows current progress (e.g., "5 / 20")
- **Theme Toggle**: Click 🌙/☀️ to switch light/dark mode
- **Return Home**: Click 🏠 or "End Learning" button

#### Keyboard Shortcuts
- **Spacebar**: Flip card (show/hide answer)
- **Left/Right Arrows**: Switch to previous/next card
- **ESC Key**: Return to homepage

### 📁 Data Management

#### Upload Card Decks
1. **Supported Format**: `.md` (Markdown) files
2. **Upload Methods**: 
   - Click upload area to select file
   - Drag files directly to upload area
3. **File Requirements**: Must conform to specified Markdown format

#### Manage Card Decks
- **View Details**: Each card deck shows number of cards and creation time
- **Delete Card Deck**: Click 🗑️ icon, confirm to delete
- **Data Export**: Click "📤 Export" button on homepage to backup all data

#### Data Export & Backup
1. Click "📤 Export" button on homepage
2. System generates JSON format backup file
3. File naming format: `kotoba-vault-backup-YYYY-MM-DD.json`
4. Can be saved to cloud drive or other devices as backup

## 📁 Supported File Formats

### Markdown File Structure

The app supports Markdown files in a specific format. Here's the complete format specification:

```markdown
# Lesson 3: Adjectives

---

## 厚かましい（あつかましい）
### Meaning
1. Shameless; brazen; impudent
2. Bold; audacious

### Examples
1. <ruby>厚<rt>あつ</rt></ruby>かましいにも<ruby>程<rt>ほど</rt></ruby>がある／There's a limit to shamelessness
2. <ruby>厚<rt>あつ</rt></ruby>かましくもまた<ruby>金<rt>かね</rt></ruby>を<ruby>借<rt>か</rt></ruby>りにきた／Brazenly came to borrow money again

---

## 慌しい（あわただしい）
### Meaning
1. Hurried; rushed; busy
2. Unstable; turbulent

### Examples
1. <ruby>慌<rt>あわ</rt></ruby>ただしく<ruby>旅立<rt>たびだ</rt></ruby>つ／Depart hurriedly
2. <ruby>政局<rt>せいきょく</rt></ruby>が<ruby>慌<rt>あわ</rt></ruby>ただしい／The political situation is turbulent
```

### Format Requirements

| Element | Format | Description | Example |
|---------|--------|-------------|---------|
| **Course Title** | `# Title` | Defines card deck name, displayed on homepage | `# Lesson 3: Adjectives` |
| **Word Entry** | `## Word（Reading）` | Word and its reading in hiragana | `## 厚かましい（あつかましい）` |
| **Meaning Section** | `### Meaning` | List of word meanings in target language | See example above |
| **Example Section** | `### Examples` | Example sentences with translations | See example above |
| **Furigana** | `<ruby>字<rt>音</rt></ruby>` | Pronunciation guide above kanji | `<ruby>厚<rt>あつ</rt></ruby>` |
| **Translation Separator** | `／` | Separator between Japanese and translation | `Japanese sentence／Translation` |
| **Entry Separator** | `---` | Separator between different words | Add after each word |

### File Creation Tips

1. **Consistent Format**: Strictly follow the above format to ensure successful parsing
2. **Encoding**: Save files in UTF-8 encoding
3. **File Naming**: Use meaningful names like `N1-Vocabulary-Lesson1.md`
4. **Furigana**: Add Ruby annotations for rare kanji
5. **Sentence Length**: Recommend keeping each example under 30 characters for proper card display

### Example File

The project includes `単語３.md` as a complete example. You can:
- Use this file directly to test app functionality
- Reference its format to create your own vocabulary files
- Copy its structure to create new lesson content

## 🛠 Development Guide

### Environment Requirements

- **Node.js**: 18.0+ or higher
- **Package Manager**: npm, pnpm, or yarn
- **Browser**: Modern browser with PWA support

### Local Development Workflow

```bash
# 1. Clone project
git clone <repository-url>
cd kotoba-vault

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# Visit http://localhost:5173

# 4. Build production version
npm run build

# 5. Preview production version
npm run preview
# Visit http://localhost:4173
```

### Project Scripts

| Command | Function | Usage |
|---------|----------|-------|
| `npm run dev` | Start development server | For development with hot reload |
| `npm run build` | Build production version | Generate optimized production files |
| `npm run preview` | Preview production version | Local testing of production performance |
| `npm run check` | Type checking | Check TypeScript type errors |
| `./start-demo.sh` | Demo script | One-click demo environment startup |

### Custom Configuration

#### PWA Configuration
Edit PWA settings in `vite.config.ts`:
```typescript
SvelteKitPWA({
  manifest: {
    name: 'Your App Name',
    short_name: 'Short Name',
    description: 'App Description',
    theme_color: '#YourThemeColor',
    // ... other configurations
  }
})
```

#### Theme Customization
Modify CSS variables in `src/app.css`:
```css
:root {
  --accent-color: #3498db;  /* Primary color */
  --bg-color: #f4f7f9;      /* Background color */
  /* ... other color variables */
}
```

## 🏗 Technical Architecture

### Core Technology Stack

- **Frontend Framework**: [SvelteKit](https://kit.svelte.dev/) - Modern full-stack framework
- **Development Language**: [TypeScript](https://www.typescriptlang.org/) - Type safety
- **PWA Support**: [@vite-pwa/sveltekit](https://vite-pwa-org.netlify.app/frameworks/sveltekit.html) - PWA functionality
- **Data Storage**: [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) + [Dexie.js](https://dexie.org/) - Local database
- **Build Tool**: [Vite](https://vitejs.dev/) - Fast building
- **Styling**: Pure CSS + CSS Variables - Lightweight styling

### Project Structure

```
kotoba-vault/
├── src/
│   ├── lib/
│   │   ├── components/          # Svelte components
│   │   │   ├── DashboardHeader.svelte
│   │   │   ├── FileUpload.svelte
│   │   │   ├── DeckList.svelte
│   │   │   ├── FlashCard.svelte
│   │   │   ├── StudyHeader.svelte
│   │   │   └── StudyNavigation.svelte
│   │   ├── db.ts               # Database operations
│   │   └── parser.ts           # Markdown parsing
│   ├── routes/
│   │   ├── +layout.svelte      # Global layout
│   │   ├── +page.svelte        # Homepage
│   │   └── study/[id]/         # Study page route
│   │       ├── +page.ts        # Page data loading
│   │       └── +page.svelte    # Study page
│   ├── app.html                # HTML template
│   └── app.css                 # Global styles
├── static/                     # Static assets
│   ├── icon-192.png
│   ├── icon-512.png
│   └── manifest.webmanifest
├── vite.config.ts              # Vite configuration
├── package.json                # Project configuration
└── README.md                   # Documentation
```

### Data Flow Architecture

```
User Action → Svelte Component → Data Service Layer → IndexedDB
    ↑                                                      ↓
UI Update ← Reactive State ← Data Processing ← Query Results
```

### PWA Implementation

1. **Service Worker**: Automatically caches app resources for offline access
2. **Web App Manifest**: Defines app metadata for device installation
3. **Responsive Design**: Adapts to various device sizes
4. **Local Storage**: Uses IndexedDB to store all user data

## 📱 Browser Compatibility

### Full Support
- ✅ **Chrome 80+** - Complete feature support
- ✅ **Edge 80+** - Complete feature support  
- ✅ **Firefox 75+** - Complete feature support
- ✅ **Safari 13+** - Complete feature support

### Limited Features
- ⚠️ **Safari < 13**: No PWA installation support
- ⚠️ **Firefox < 75**: Limited speech synthesis functionality
- ❌ **IE Browser**: Not supported

### Mobile Support
- ✅ **iOS Safari 13+**: Supports Add to Home Screen
- ✅ **Android Chrome 80+**: Full PWA support
- ✅ **Android Firefox 75+**: Basic functionality support

## 🔧 Uninstall Instructions

### Uninstall from Browser
1. **Chrome/Edge**: 
   - Go to `chrome://apps/` or `edge://apps/`
   - Right-click "Kotoba Vault"
   - Select "Remove from Chrome"

2. **Firefox**:
   - Go to Settings → Privacy & Security → Notifications
   - Find app domain and delete permissions

### Uninstall from Device
1. **Windows**: 
   - Find app in Start Menu, right-click and select "Uninstall"
   - Or search and uninstall in Settings → Apps

2. **macOS**: 
   - Delete from Applications folder
   - Or remove from Dock

3. **Mobile Devices**: 
   - Long press app icon and select delete/uninstall

### Clean Data
After uninstalling the app, browser data will remain. To completely clean:

1. **Chrome/Edge**:
   ```
   Settings → Privacy and Security → Site Settings → View permissions and data stored across sites
   → Find app domain → Clear data
   ```

2. **Firefox**:
   ```
   Settings → Privacy & Security → Cookies and Site Data → Manage Data
   → Search domain → Remove Selected
   ```

3. **Safari**:
   ```
   Preferences → Privacy → Manage Website Data
   → Search domain → Remove
   ```

## 🎯 Use Cases

### 👨‍🎓 Japanese Learners
- **Vocabulary Building**: Systematic learning and memorization of Japanese words
- **Exam Preparation**: N1-N5 level vocabulary review
- **Pronunciation Practice**: Master correct pronunciation through furigana and voice features
- **Contextual Learning**: Learn word usage in actual contexts through examples

### 👨‍🏫 Educators
- **Course Material Creation**: Quickly create interactive vocabulary cards
- **Teaching Aid**: Display and explain vocabulary in classroom
- **Assignment Distribution**: Students can complete vocabulary learning tasks offline
- **Progress Tracking**: Monitor student learning progress

### 📚 Personal Learning
- **Knowledge Management**: Organize and review personal vocabulary notes
- **Mobile Learning**: Anytime, anywhere fragmented learning
- **Long-term Memory**: Strengthen memory through repeated practice
- **Custom Content**: Create personalized cards based on individual needs

## 🔍 Troubleshooting

### Common Issues

#### 📁 File Upload Problems
**Issue**: File upload failure or parsing errors
**Solutions**:
1. Ensure file format is `.md` (Markdown)
2. Check file encoding is UTF-8
3. Verify file content follows specified format
4. Check browser developer tools for error messages

#### 🔊 Voice Playback Problems
**Issue**: No response when clicking voice icon
**Solutions**:
1. Ensure browser supports Web Speech API
2. Check device volume and browser volume settings
3. Some browsers require user interaction before playing audio
4. Use in HTTPS environment for best compatibility

#### 💾 Data Loss Problems
**Issue**: Data disappeared after reopening app
**Solutions**:
1. Check if using in private/incognito mode
2. Confirm browser data wasn't deleted by cleaning software
3. Recommend regular use of "Export" function to backup data
4. Avoid switching between multiple browsers

#### 📱 PWA Installation Problems
**Issue**: Browser doesn't show install prompt
**Solutions**:
1. Ensure using PWA-supported browser
2. Need to access app via HTTPS
3. Some browsers only show install option after multiple visits
4. Can manually add to home screen (mobile)

### Performance Optimization Tips

1. **Card Count**: Recommend no more than 100 cards per deck
2. **Image Content**: Avoid using many images in Markdown
3. **Browser Cache**: Regularly clear browser cache for optimal performance
4. **Device Storage**: Ensure device has sufficient storage space

## 🤝 Contributing

We welcome contributions of any kind!

### 🐛 Report Issues
- Create new issues on [Issues](../../issues) page
- Describe problem symptoms and reproduction steps in detail
- Provide browser version and operating system information
- Include error screenshots if possible

### 💡 Feature Suggestions
- Submit feature requests on [Issues](../../issues) page
- Describe use cases and expected effects of new features
- Discuss feasibility of implementation approaches

### 🛠 Code Contributions
1. Fork project to your GitHub account
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Create Pull Request

### 📝 Documentation Contributions
- Improve README and usage instructions
- Add multi-language support
- Complete API documentation

## 📄 License

This project is licensed under the [MIT License](LICENSE).

```
MIT License

Copyright (c) 2025 Kotoba Vault

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Acknowledgments

- [SvelteKit](https://kit.svelte.dev/) - Excellent full-stack framework
- [Dexie.js](https://dexie.org/) - Simplifying IndexedDB operations
- [Google Fonts](https://fonts.google.com/) - Providing quality Japanese fonts
- [Vite PWA](https://vite-pwa-org.netlify.app/) - PWA functionality support
- All users who tested and provided feedback

## 📞 Contact

- **Project Repository**: [GitHub Repository](../../)
- **Issue Reports**: [Issues](../../issues)
- **Feature Discussions**: [Discussions](../../discussions)

---

<div align="center">

**🎌 Enjoy your Japanese learning journey!**

Made with ❤️ for Japanese learners worldwide

[⬆ Back to Top](#kotoba-vault-local---local-japanese-flashcard-learning-app)

</div>
