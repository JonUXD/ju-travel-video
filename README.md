# 🎬 Travel Video Portfolio

A cinematic portfolio showcasing travel videos with YouTube embeds, photo carousels, and detailed metadata. Built with Astro + Tailwind CSS.

## 🚀 Live Demo
[Add your deployed URL here]

## ✨ Features
- **YouTube Integration**: Embed videos with custom styling
- **Photo Carousels**: Scrollable stills with hover effects  
- **Smart Metadata**: Location, gear, music links in 4x2 grid
- **Responsive Design**: Mobile-first, works on all devices
- **Automated Workflow**: Script updates JSON when adding new images
- **White Frame Design**: Clean, cinematic containers for each video

## 📁 Project Structure

```text
ju-travel-video/
├── public/images/stills/      # Screenshots for each video
├── scripts/                   # Utility scripts
├── src/
│   ├── components/           # UI components
│   ├── data/videos/         # Video metadata (JSON files)
│   ├── layouts/             # Page layouts
│   ├── pages/               # Website pages
│   └── styles/              # Global styles

## Upload New videos

### Step 1: Prepare the video description. Recommendation: use AI steps below

Prepare prompt:

chat.deepseek.com

```
I have a new video to upload and the description needs to be like the one below. The new video is a video I did with my friends to Iceland in october 2019. Using the Olympus EM5 Mark II and the Olympus 12-40 Pro 2.8. We visited the capital and we did the ring road. Coordinates you can use the capital. Music is Welcome Home, Son by Radical Face. Youtube link https://www.youtube.com/watch?v=P8a4iiOnzsc spotify link https://open.spotify.com/track/6HTVZeVQ9J6Uiq6tHESxU9?si=61da5b5d62134b88

please provide the youtube description with the same format as the below youtube description. Ask me any question if there is something not clear. Provide in a code snippet so I can copy paste.


Youtube description:

A travel film from my trip to Greece with some friends (Athens and Crete) in August 2016.

Music:
Alle Farben feat. YouNotUs – Please Tell Rosie
Spotify: https://open.spotify.com/track/5gF9zOYM9TmSzKHukbNjpB
YouTube: https://www.youtube.com/watch?v=TQLgLcU81e4

Gear:
GoPro Hero 3

---meta---
country: Greece
region: Europe
places: Athens, Crete
date: 2016-08-15
coordinates: [35.3387, 25.1442]
slug: greece-2016
camera: GoPro Hero 3
gear: 
music:
  artist: Alle Farben feat. YouNotUs
  title: Please Tell Rosie
  spotify: https://open.spotify.com/track/5gF9zOYM9TmSzKHukbNjpB
  youtube: https://www.youtube.com/watch?v=TQLgLcU81e4
```

### Step 2: Upload new video file to https://www.youtube.com/@JUTravelVideo


### Step 3: extract some screenshots from the video and upload them to public/images/stills

format example greece-2016-stills-01.png


### Step 4: Create the json file in src/data/videos with the slug given by the prompt above. Recommendation: use AI with this prompt

chat.deepseek.com

```
I have this description for my youtube video:


A travel film from my trip to Iceland with some friends (Reykjavík and the Ring Road) in October 2019.

Music:
Radical Face – Welcome Home, Son
Spotify: https://open.spotify.com/track/6HTVZeVQ9J6Uiq6tHESxU9?si=61da5b5d62134b88
YouTube: https://www.youtube.com/watch?v=P8a4iiOnzsc

Gear:
Olympus OM-D E-M5 Mark II
Olympus M.Zuiko 12-40mm f/2.8 PRO

---meta---
country: Iceland
region: Europe
places: Reykjavík, Ring Road
date: 2019-10-01
coordinates: [64.1466, -21.9426]
slug: iceland-2019
camera: Olympus OM-D E-M5 Mark II
gear: Olympus M.Zuiko 12-40mm f/2.8 PRO
music:
  artist: Radical Face
  title: Welcome Home, Son
  spotify: https://open.spotify.com/track/6HTVZeVQ9J6Uiq6tHESxU9?si=61da5b5d62134b88
  youtube: https://www.youtube.com/watch?v=P8a4iiOnzsc


plesae create a json file with the same structure as below. Please ask me any question is not clear.

Example json:

{
  "id": "greece-2016",
  "title": "Greece | 2016",
  "slug": "greece-2016",
  "youtubeId": "Cfc8_m17rHc",
  "description": "A travel film from my trip to Greece with some friends (Athens and Crete) in August 2016.",
  "metadata": {
    "country": "Greece",
    "region": "Europe",
    "places": [
      "Athens",
      "Crete"
    ],
    "date": "2016-08-15",
    "coordinates": [
      35.3387,
      25.1442
    ],
    "camera": "GoPro Hero 3",
    "gear": "",
    "music": {
      "artist": "Alle Farben feat. YouNotUs",
      "title": "Please Tell Rosie",
      "spotify": "https://open.spotify.com/track/5gF9zOYM9TmSzKHukbNjpB",
      "youtube": "https://www.youtube.com/watch?v=TQLgLcU81e4"
    }
  },
  "stills": [
    "/images/stills/greece-2016/greece-2016-stills-01.png",
    "/images/stills/greece-2016/greece-2016-stills-02.png",
    "/images/stills/greece-2016/greece-2016-stills-03.png",
    "/images/stills/greece-2016/greece-2016-stills-04.png",
    "/images/stills/greece-2016/greece-2016-stills-05.png"
  ]
}


```

### Step 5: update the jsons with the newly uploaded stills

Run: npm run update-stills