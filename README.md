# SuRover Team Website

A modern, responsive website for the SuRover team built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd surover-website
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

## 📁 Project Structure

```
surover-website/
├── public/
│   └── assets/
│       ├── images/     # Put your team photos, rover images here
│       └── videos/     # Put your videos here
├── src/
│   ├── App.tsx         # Main application component
│   ├── index.css       # Tailwind CSS imports
│   └── main.tsx        # Application entry point
├── package.json
├── tailwind.config.js
└── README.md
```

## 🖼️ Adding Your Own Images and Videos

### Step 1: Add Your Media Files

1. **Images**: Place your images in `public/assets/images/`
   - Team photo
   - Legacy rover photo
   - Venom rover photo
   - Expo photos (SAHA, IDEF)
   - Sponsor logos

2. **Videos**: Place your videos in `public/assets/videos/`
   - Hero video (ERC opening sequence)

### Step 2: Update Image/Video Paths in App.tsx

Open `src/App.tsx` and find the ASSETS section near the top:

```typescript
// ------------------------------ ASSETS ---------------------------------------
const HERO_VIDEO = "/assets/videos/your-hero-video.mp4";  // Change this
const TEAM_PHOTO = "/assets/images/team-photo.jpg";        // Change this
const LEGACY_IMG = "/assets/images/legacy-rover.jpg";      // Change this
const VENOM_IMG = "/assets/images/venom-rover.jpg";        // Change this
const EXPO_IMAGES = {
  saha: "/assets/images/saha-expo-2024.jpg",               // Change this
  idef: "/assets/images/idef-2025.jpg",                    // Change this
};
const SPONSOR_IMAGE = "/assets/images/sponsors.jpg";       // Change this
```

### Step 3: Update Team Captain Information

In `src/App.tsx`, find the `TeamPage` function and update the `CAPTAINS` array:

```typescript
const CAPTAINS = [
  {
    name: "Your Name",
    email: "yourname@surover.org",
    img: "/assets/images/captain1.jpg",  // Add captain photo
  },
  {
    name: "Barış Bakırdöven",
    email: "baris@surover.org",
    img: "/assets/images/captain2.jpg",  // Add captain photo
  },
];
```

### Step 4: Update Social Media Links

In `src/App.tsx`, find the `Footer` function and update the social media URLs:

```typescript
<a href="https://instagram.com/your_account" ...>
<a href="https://linkedin.com/company/your_company" ...>
<a href="https://youtube.com/@your_channel" ...>
```

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      // Add your custom colors here
    },
  },
},
```

### Adding More Pages

The website uses hash-based routing. To add a new page:

1. Create a new page component in `App.tsx`
2. Add a new route in the `App()` function
3. Add a navigation link in the `NAV` array

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

The build files will be in the `dist/` folder, ready to deploy.

## 🚀 Deployment

### GitHub Pages (Recommended)

**Already configured!** Just follow these steps:

1. **Create a GitHub repository** for your project

2. **Initialize git and push** (if you haven't already):
   ```bash
   cd surover-website
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git push -u origin main
   ```

3. **Update vite.config.ts** - Uncomment and set your repo name:
   ```typescript
   base: '/YOUR-REPO-NAME/',
   ```

4. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages** in your repo settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / (root)
   - Save

6. Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### Netlify
1. Push your code to GitHub
2. Connect your repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy automatically

### Vercel
1. Push your code to GitHub
2. Import project to Vercel
3. Deploy automatically

## 📝 Pages

- **Home** - Hero video, about section, rovers showcase, systems overview
- **Expos** - Past and upcoming expos
- **Sponsors** - Sponsor logos and information
- **Programs** - Support programs
- **Team** - Team captains and subteams

## 🛠️ Technologies Used

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📄 License

© 2025 SuRover • All rights reserved.

## 🤝 Support

For questions or issues, contact the team at:
- Mahmut: mahmut@surover.org
- Barış: baris@surover.org

---

## 🔒 Privacy & Security

### Email Obfuscation
Emails are obfuscated in the code to prevent bot scraping:
```typescript
const domain = "surover.org";
const emailUser = "name";
const email = `${emailUser}@${domain}`;
```

### Analytics Setup
1. **Google Analytics**: Uncomment and add your GA_MEASUREMENT_ID in `index.html`
2. **Plausible** (privacy-friendly): Uncomment and add your domain in `index.html`

### Favicon
Replace `public/favicon.ico` with your own favicon file.

## 📋 SEO Features Included

✅ Meta description and keywords
✅ Open Graph tags for social sharing
✅ Twitter Card support
✅ Semantic HTML structure
✅ Mobile-responsive viewport
✅ Fast loading with optimized assets

---

**Note**: This website currently uses placeholder images from Unsplash. Replace them with your actual team photos, rover images, and videos for the final version.
