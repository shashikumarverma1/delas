// import { create } from 'zustand';
// import * as FileSystem from 'expo-file-system';

// export interface VideoItem {
//   title: string;
//   videoUrl: string;
//   filePath?: string;
//   isDownloaded?: boolean;
//   progress?: number;
//   // videoId?: string;
//   thumbnailUrl?: string; // Optional, if you want to store a thumbnail URL
// }

// interface OfflineVideoStore {
//   videos: VideoItem[];
//   setVideos: (videos: VideoItem[]) => void;
//   updateProgress: (title: string, progress: number , thumbnailUrl:string) => void;
//   markDownloaded: (title: string, filePath: string) => void;
//   downloadAndTrack: (video: VideoItem) => void;
// }

// export const useOfflineVideoStore = create<OfflineVideoStore>((set, get) => ({
//   videos: [],

//   setVideos: (videos) => set({ videos }),

//   updateProgress: (title, progress , thumbnailUrl) =>
//     set((state) => ({
//       videos: state.videos.map((v) =>
//         v.title === title ? { ...v, progress , thumbnailUrl } : v
//       ),
//     })),

//   markDownloaded: (title, filePath) =>
//     set((state) => ({
//       videos: state.videos.map((v) =>
//         v.title === title
//           ? { ...v, isDownloaded: true, filePath, progress: 100 }
//           : v
//       ),
//     })),

// downloadAndTrack: async (video) => {
//   const filename = `${video.title.replace(/\s/g, '_')}.mp4`;
//   const destination = FileSystem.documentDirectory + filename;
//   console.log(video , "destination");
// // return
//   try {
//     const downloadResumable = FileSystem.createDownloadResumable(
//       video.videoUrl,
//       destination,
//       {},
//       (downloadProgress) => {
        
//         const percent = Math.floor(
//           (downloadProgress.totalBytesWritten /
//             downloadProgress.totalBytesExpectedToWrite) *
//             100
//         );
//         alert(`Download progress: ${percent}%`);
//         get().updateProgress(video.title, percent , video?.thumbnailUrl);
//       }
//     );

//     const result = await downloadResumable.downloadAsync();

//     if (result?.uri) {
//       get().markDownloaded(video.title, result.uri);
//       alert( `${result.uri}`);
//       console.log('Download completed:', result.uri);
//     }
//   } catch (err) {
//     console.error('Download error:', err);
//   }
// }
// }));
