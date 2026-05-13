// src/data/index.ts - FIXED
import london2017 from './videos/london-2017.json';
import venice2018 from './videos/venice-2018.json';
import croatia2015 from './videos/croatia-2015.json';
import greece2016 from './videos/greece-2016.json';
import iceland2019 from './videos/iceland-2019.json';
import luxembourg2018 from './videos/luxembourg-2018.json';
import marrakesh2019 from './videos/marrakesh-2019.json';
import menorca2023 from './videos/menorca-2023.json';
import tenerife2024 from './videos/tenerife-2024.json';
import tokyo2025 from './videos/tokyo-2025.json';
import colombia2026 from './videos/colombia-2026.json';


export interface Video {
  id: string;
  title: string;
  slug: string;
  youtubeId: string;
  description: string;
  stills: string[];
  metadata: {
    country: string;
    region: string;
    places: string[];
    date: string;
    coordinates: number[];
    camera: string;
    gear: string;
    music: {
      artist: string;
      title: string;
      spotify: string;
      youtube: string;
    };
  };
}

// All videos in an array
export const allVideos: Video[] = [
  venice2018,
  london2017,
  greece2016,
  croatia2015,
  iceland2019,
  luxembourg2018,
  marrakesh2019,
  menorca2023,
  tenerife2024,
  tokyo2025,
  colombia2026
];

// Sorted by date (newest first)
export const sortedVideos = [...allVideos].sort(
  (a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
);

// Helper to get a video by slug
export function getVideoBySlug(slug: string): Video | undefined {
  return allVideos.find(video => video.slug === slug);
}