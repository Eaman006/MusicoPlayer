# Musico Player

A beautiful web-based music player built with HTML, CSS, and JavaScript.

## Features

- 🎵 Play music files
- 📁 Multiple playlists/albums
- 🎚️ Volume control
- ⏯️ Play/pause, next/previous controls
- 📱 Responsive design
- 🎨 Modern UI with dark theme

## Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. Or run a local server: `python -m http.server 3000`

## Deployment to Vercel

### Method 1: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

### Method 2: Using GitHub + Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Deploy automatically

### Method 3: Drag & Drop

1. Go to [vercel.com](https://vercel.com)
2. Drag and drop your project folder
3. Vercel will automatically detect and deploy

## Project Structure

```
MusicoPlayer/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── style.css           # Main styles
├── utility.css         # Utility classes
├── Songs/              # Music files
│   ├── ncs/           # NCS songs
│   └── bol/           # Bollywood songs
└── *.svg              # Icons and assets
```

## Notes

- The player works with local MP3 files
- Songs are loaded from the `Songs/` directory
- No external dependencies required
- Compatible with all modern browsers

## License

MIT License
