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
<pre><code>
your-app/
├── 📁 component                # Reusable UI components
│   ├── customHeader.tsx       # Custom header for screens
│   ├── renderVideoCard.tsx    # Renders individual video cards
│   ├── videoDownloadUi.tsx    # UI for download button or progress
│
├── 📁 navigation               # React Navigation stack & tab configs
│   ├── bottomNavigation.tsx   # Bottom tab navigator
│   ├── homeStack.tsx          # Task-related screens stack
│   ├── videoStack.tsx         # Video-related screens stack
│
├── 📁 Screens                  # Main app screens
│   ├── Dashbord.tsx           # App home/dashboard screen
│   ├── TaskScreen.tsx         # Task list and add screen
│   ├── TaskDetails.tsx        # Task detail view
│   ├── Videos.tsx             # Online video listing
│   ├── offLineVideoList.tsx   # Shows downloaded/offline videos
│
├── 📁 store                    # Zustand global state management
│   ├── useFormStore.ts        # Form/task state (persisted)
│   ├── useVideoStore.ts       # Video state (persisted)
│
├── App.tsx                    # Entry point of the app
├── app.json                   # Expo configuration
├── README.md                  # This file
</code></pre>
<h2>🧠 Notes on Potential Improvements and Future Work</h2>

<p>Here are a few enhancements planned for future versions of the app:</p>

<ul>
 
  <li>
    <strong>Persistence After Hard Reload:</strong>
    <br />
    Although AsyncStorage is used, improvements can be made to ensure that all data persists reliably even after a full reload or app reinstall.
  </li>
  <li>
 
</ul>

## 📦 Installation

### Step 1: Clone the Repo
```bash
git clone https://github.com/shashikumarverma1/delas
cd delas
