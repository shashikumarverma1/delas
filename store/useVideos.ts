import { create } from 'zustand';

export interface VideoItem {
  thumbnailUrl: any;
  title: string;
  url: string;
  filePath?: string;       // after download
  isDownloaded?: boolean;
  progress?: number;
}

interface OfflineVideoStore {
  videos: VideoItem[];
  setVideos: (videos: VideoItem[]) => void;
  fetchVideos: () => Promise<void>;
  updateProgress: (title: string, progress: number) => void;
  markDownloaded: (title: string, filePath: string) => void;
  clearAll: () => void;
}

export const useVideoStore = create<OfflineVideoStore>((set) => ({
    
  videos: [],

  setVideos: (videos) => set({ videos }),

  fetchVideos: async () => {
    try {
      const res = await fetch(
        'https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json'
      );
      const data: VideoItem[] = await res.json();
      set({ videos: data });
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    }
  },

  updateProgress: (title, progress) =>
    set((state) => ({
      videos: state.videos.map((v) =>
        v.title === title ? { ...v, progress } : v
      ),
    })),

  markDownloaded: (title, filePath) =>
    set((state) => ({
      videos: state.videos.map((v) =>
        v.title === title ? { ...v, isDownloaded: true, filePath } : v
      ),
    })),

  clearAll: () => set({ videos: [] }),
}));
