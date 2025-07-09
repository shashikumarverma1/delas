# 📱 React Native Task & Video App

A powerful mobile app built with **React Native**, allowing users to manage daily tasks and watch videos offline. It uses **Zustand** for global state management and **AsyncStorage** for local persistence.

---

## 🚀 Features

### ✅ Task Management
- Add, edit, or delete tasks
- Mark tasks as completed/incomplete
- Set priority and due date
- View task details

### 🎥 Video Section
- List online videos
- Download videos for offline access
- Show download progress
- Offline video playback using local file path

---

## 🛠 Tech Stack

- **React Native** (Expo)
- **Zustand** – State Management
- **AsyncStorage** – Persistent Local Storage
- **Expo FileSystem** – Video download and storage
- **React Navigation** – Navigation
- **TypeScript** – Type safety

---
📦 your-app
  📁 component
 ┃ ┣ 📄 customHeader.tsx
 ┃ ┣ 📄 renderVideoCard.tsx
 ┃ ┣ 📄 videoDownloadUi.tsx
    📁navigation
 ┃ ┣ 📄 bottomNavigation
 ┃ ┣ 📄 homeStack
 ┃ ┣ 📄 videoStack
 ┣ 📁 Screens
 ┃ ┣ 📄 Dashbord.tsx
 ┃ ┣ 📄 TaskScreen.tsx
 ┃ ┣ 📄 TaskDetails.tsx
 ┃ ┣ 📄 Videos.tsx
 ┃ ┣ 📄 offLineVideoList.tsx
 ┣ 📁 store
 ┃ ┣ 📄 useFormStore.ts
 ┃ ┣ 📄 useVideoStore.ts
 ┣ 📄 App.tsx
 ┣ 📄 README.md
 ┣ 📄 app.json

## 📦 Installation

### Step 1: Clone the Repo
```bash
git clone https://github.com/shashikumarverma1/delas
cd delas
