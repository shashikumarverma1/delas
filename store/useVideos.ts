import { create } from 'zustand';
import * as FileSystem from 'expo-file-system';
export interface VideoItem {
  thumbnailUrl: any;
  title: string;
  videoUrl: string;
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
  downloadAndTrack:(video:VideoItem)=>void;
    getDownloadedVideos: () => VideoItem[];
}

export const useVideoStore = create<OfflineVideoStore>((set, get) => ({
    
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
  getDownloadedVideos: () => {
  const { videos } = get();
  return videos.filter((v) => v.isDownloaded);
},
  downloadAndTrack: async (video) => {
    const filename = `${video.title.replace(/\s/g, '_')}.mp4`;
    const destination = FileSystem.documentDirectory + filename;
    console.log(video , "destination");
  // return
    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        video.videoUrl,
        destination,
        {},
        (downloadProgress) => {
          
          const percent = Math.floor(
            (downloadProgress.totalBytesWritten /
              downloadProgress.totalBytesExpectedToWrite) *
              100
          );
          // alert(`Download progress: ${percent}%`);
          get().updateProgress(video.title, percent );
        }
      );
  
      const result = await downloadResumable.downloadAsync();
  
      if (result?.uri) {
        get().markDownloaded(video.title, result.uri);
        // alert( `${result.uri}`);
        console.log('Download completed:', result.uri);
      }
    } catch (err) {
      console.error('Download error:', err);
    }
  }
}));
