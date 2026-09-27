# 🎬 Vibe Coding: Add a New Travel Video

Copy this entire prompt into DeepSeek (or any AI). The AI will guide you step by step. After each step, reply **"done"** to continue.

---

## INSTRUCTIONS FOR THE AI

You are helping me add a new video to my Astro + Tailwind travel video portfolio. I already have:

- The video uploaded to YouTube
- Screenshots extracted from the video

Guide me through these 6 steps. After each step, wait for me to reply **"done"** before proceeding to the next step.

### Step 1: Collect video information

Ask me for these details:

- YouTube URL
- Trip date (YYYY-MM-DD)
- Country
- Region
- Places (comma separated)
- Camera used
- Gear/Lens
- Music artist
- Music title
- Spotify URL
- YouTube music URL
- Short description (1 sentence)

### Step 2: Generate the JSON file

Create the JSON file content using my answers. Tell me to save it as `src/data/videos/{slug}.json` (slug is lowercase with hyphens, e.g., `fez-2025`).

### Step 3: Update index.ts

Tell me exactly what to add to `src/data/index.ts`:

- The import line
- Where to add the video in the `allVideos` array (newest first)

### Step 4: Prepare screenshots

Tell me to:

- Create folder `staging/{slug}/`
- Copy my screenshots there (any filenames are fine)

### Step 5: Run optimization

Tell me to run:

```bash
npm run optimize-images {slug}

Ask me to share the output.

Step 6: Test and deploy

Tell me to:

Run npm run dev to test locally
Push to GitHub: git add . && git commit -m "Add {slug}" && git push
PROJECT STRUCTURE REFERENCE

text
ju-travel-video/
├── staging/           # Put raw screenshots here
├── public/images/stills/  # Optimized images go here
├── src/
│   ├── data/
│   │   ├── index.ts   # Import all videos here
│   │   └── videos/    # JSON files here
│   └── pages/
│       └── index.astro
├── scripts/
│   ├── optimize-images.js  # Run this after adding screenshots
│   └── update-stills.js
└── package.json
Example JSON structure:

json
{
  "id": "fez-2025",
  "title": "Fez | 2025",
  "slug": "fez-2025",
  "youtubeId": "z8haKLdIOFo",
  "description": "A travel film from my trip to Fez in November 2025.",
  "metadata": {
    "country": "Morocco",
    "region": "Africa",
    "places": ["Fez"],
    "date": "2025-11-15",
    "coordinates": [34.0181, -5.0078],
    "camera": "Olympus OM-D E-M5 Mark II",
    "gear": "7 Artisans 35mm f/1.2",
    "music": {
      "artist": "Noah Kahan",
      "title": "Carlo's Song",
      "spotify": "https://open.spotify.com/track/...",
      "youtube": "https://www.youtube.com/watch?v=..."
    }
  },
  "stills": []
}
START HERE

Ask me for Step 1: my video details.

text

---

## How to use this:

1. **Copy the entire Markdown block above**
2. **Paste into DeepSeek (or Claude, ChatGPT, etc.)**
3. **The AI will ask you for your video details**
4. **Reply with your details, then "done"**
5. **Follow each step the AI gives you**

The AI will handle:
- Creating the JSON file content
- Telling you exactly what to add to `index.ts`
- Generating the correct slug from your video title
- Providing the exact commands to run

Want me to save this as a file you can download?
i need a standalone md file careful with the formatting
Here's your standalone Markdown file. Copy the entire block below:

markdown
# 🎬 Vibe Coding: Add a New Travel Video

Copy this entire prompt into DeepSeek (or any AI). The AI will guide you step by step. After each step, reply **"done"** to continue.

---

## INSTRUCTIONS FOR THE AI

You are helping me add a new video to my Astro + Tailwind travel video portfolio. I already have:

- The video uploaded to YouTube
- Screenshots extracted from the video

Guide me through these 6 steps. After each step, wait for me to reply **"done"** before proceeding to the next step.

### Step 1: Collect video information

Ask me for these details:

- YouTube URL
- Trip date (YYYY-MM-DD)
- Country
- Region
- Places (comma separated)
- Camera used
- Gear/Lens
- Music artist
- Music title
- Spotify URL
- YouTube music URL
- Short description (1 sentence)

### Step 2: Generate the JSON file

Create the JSON file content using my answers. Tell me to save it as `src/data/videos/{slug}.json` (slug is lowercase with hyphens, e.g., `fez-2025`).

### Step 3: Update index.ts

Tell me exactly what to add to `src/data/index.ts`:

- The import line
- Where to add the video in the `allVideos` array (newest first)

### Step 4: Prepare screenshots

Tell me to:

- Create folder `staging/{slug}/`
- Copy my screenshots there (any filenames are fine)

### Step 5: Run optimization

Tell me to run:

```bash
npm run optimize-images {slug}
Ask me to share the output.

Step 6: Test and deploy

Tell me to:

Run npm run dev to test locally
Push to GitHub: git add . && git commit -m "Add {slug}" && git push
PROJECT STRUCTURE REFERENCE

text
ju-travel-video/
├── staging/              # Put raw screenshots here
├── public/images/stills/ # Optimized images go here
├── src/
│   ├── data/
│   │   ├── index.ts      # Import all videos here
│   │   └── videos/       # JSON files here
│   └── pages/
│       └── index.astro
├── scripts/
│   ├── optimize-images.js
│   └── update-stills.js
└── package.json
EXAMPLE JSON STRUCTURE

json
{
  "id": "fez-2025",
  "title": "Fez | 2025",
  "slug": "fez-2025",
  "youtubeId": "z8haKLdIOFo",
  "description": "A travel film from my trip to Fez in November 2025.",
  "metadata": {
    "country": "Morocco",
    "region": "Africa",
    "places": ["Fez"],
    "date": "2025-11-15",
    "coordinates": [34.0181, -5.0078],
    "camera": "Olympus OM-D E-M5 Mark II",
    "gear": "7 Artisans 35mm f/1.2",
    "music": {
      "artist": "Noah Kahan",
      "title": "Carlo's Song",
      "spotify": "https://open.spotify.com/track/...",
      "youtube": "https://www.youtube.com/watch?v=..."
    }
  },
  "stills": []
}
START HERE

Ask me for Step 1: my video details.

text

---

**Save this as `add-video-prompt.md`** and copy-paste it into DeepSeek when you're ready to add your next video.