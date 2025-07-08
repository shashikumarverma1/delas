import { create } from 'zustand';
import RNFS from 'react-native-fs';

export interface VideoItem {
  title: string;
  url: string;
  filePath?: string;
  isDownloaded?: boolean;
  progress?: number;
}

interface OfflineVideoStore {
  videos: VideoItem[];
  setVideos: (videos: VideoItem[]) => void;
  updateProgress: (title: string, progress: number) => void;
  markDownloaded: (title: string, filePath: string) => void;
  downloadAndTrack: (video: VideoItem) => void;
}

export const useOfflineVideoStore = create<OfflineVideoStore>((set, get) => ({
  videos: [],

  setVideos: (videos) => set({ videos }),

  updateProgress: (title, progress) =>
    set((state) => ({
      videos: state.videos.map((v) =>
        v.title === title ? { ...v, progress } : v
      ),
    })),

  markDownloaded: (title, filePath) =>
    set((state) => ({
      videos: state.videos.map((v) =>
        v.title === title
          ? { ...v, isDownloaded: true, filePath, progress: 100 }
          : v
      ),
    })),

  downloadAndTrack: async (video) => {
    const filename = `${video.title.replace(/\s/g, '_')}.mp4`;

    try {
      const dest = `${RNFS.DocumentDirectoryPath}/videos/${filename}`;
      await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/videos`);

      const options = {
        fromUrl: video.url,
        toFile: dest,
        begin: () => console.log('Download started'),
        progress: (res: any) => {
          const percent = Math.floor(
            (res.bytesWritten / res.contentLength) * 100
          );
          get().updateProgress(video.title, percent);
        },
      };

      const result = await RNFS.downloadFile(options).promise;

      if (result.statusCode === 200) {
        get().markDownloaded(video.title, dest);
      } else {
        console.error('Download failed');
      }
    } catch (err) {
      console.error('Download error:', err);
    }
  },
}));
