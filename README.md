# FENNJOY WORLD GALLERY

A dynamic and responsive image gallery built using React and Vite. This project focuses on reusable components, clean UI presentation, multilingual product titles, voice-powered search, and speech-based product playback.

## 🚀 Live Demo

(Insert your live link here, for example Vercel, Netlify, or GitHub Pages)

## 📌 Project Overview

FENNJOY WORLD GALLERY is a modern front-end React project that showcases:

- Dynamic image rendering using reusable React components
- Responsive gallery layout with clean card-based design
- Dark Mode and Light Mode switching
- Voice Search using the browser Speech Recognition API
- Multi-language product titles with Tamil, English, Malayalam, Hindi, and Spanish
- Speaker playback using Speech Synthesis to read product names aloud
- Interactive top navigation with glowing action icons

This project demonstrates strong fundamentals in React component structure, props handling, array-based rendering, responsive styling, and browser voice APIs.

## 🛠 Technologies Used

- React: Component-based UI development
- Vite: Fast development server and project bundling
- JavaScript (ES6+): State handling, filtering, translation logic, and voice features
- CSS3: Custom styling, responsive layout, CSS variables, and theme control
- Web Speech API:
  Speech Recognition for voice search
  Speech Synthesis for reading product names aloud

## ✨ Features

### 🔹 Dynamic Gallery Rendering

- Reusable Image Card Component: Each product is displayed through a dedicated reusable component.
- Data-Driven UI: All product details are stored in a JavaScript array of objects.
- Automatic Rendering: New product cards appear automatically when new objects are added to the image data array.

### 🔹 Top Navigation Controls

- Microphone Icon: Lets users search products by speaking product names.
- Speaker Icon: Reads the currently visible product names aloud.
- Translator Icon: Allows users to switch product titles between five languages.
- Theme Toggle: Switches instantly between light and dark appearance modes.

### 🔹 Voice Search

- Speech-Based Filtering: Saying a product name like "Snow Peaks" brings matching results to the top.
- Smart Matching: Unrelated products are hidden when a voice query is active.
- Live Feedback: Displays the detected spoken query in the UI.

### 🔹 Product Title Translation

- Five Languages:
  English
  Tamil
  Malayalam
  Hindi
  Spanish
- Real-Time Updates: Selecting a language updates all visible product titles immediately.

### 🔹 Speaker Functionality

- Spoken Product Names: Reads all currently visible product titles aloud.
- Language-Aware Output: Attempts to use a matching voice based on the selected language.
- Toggle Behavior: Clicking the speaker again stops playback.

### 🔹 Responsive UI Design

- Clean Grid Layout: Uses a responsive card grid for desktop, tablet, and mobile screens.
- Adaptive Top Bar: Navigation controls wrap properly on smaller devices.
- Visual Polish: Glowing icons, rounded cards, smooth hover effects, and modern gradients.

## 📱 Responsive Design

- Mobile-Friendly Layout: Designed to work smoothly on smaller screens
- Flexible Grid System: Automatically adjusts the number of visible columns based on screen size
- Responsive Navigation: Top-bar controls stay usable across desktop and mobile layouts

## 🧠 Development Process

- Component Architecture: Split the project into parent and child components for readability and reuse
- Data Management: Stored all image details and translated titles in a structured array
- UI Styling: Built a responsive grid and polished navigation controls using CSS
- Voice Features: Integrated voice search and speech output using browser APIs
- Theme System: Used CSS variables and React state to manage light and dark modes cleanly

## 📂 Project Structure

```text
Image gallery/
│
├── index.html                    # Main HTML entry
├── package.json                  # Project dependencies and scripts
├── vite.config.js                # Vite configuration
├── README.md                     # Project documentation
└── src/
    ├── App.jsx                   # Main app logic and top navigation controls
    ├── main.jsx                  # React root entry point
    ├── styles.css                # Global styles, layout, themes, and icon effects
    ├── components/
    │   ├── ImageGallery.jsx      # Gallery wrapper component
    │   └── ImageCard.jsx         # Reusable image card component
    └── data/
        └── images.js             # Image data and translated titles
```

## 📚 What I Learned

### Reusable React Components

Improved understanding of how to build flexible UI by separating gallery structure and card presentation into reusable components.

### Props and Dynamic Rendering

Learned how to use `map()` effectively with props to keep the UI scalable and data-driven.

### Browser Voice APIs

Gained practical experience using the Web Speech API for both speech recognition and speech synthesis.

### Theme and UI State Handling

Strengthened React state management skills by handling theme mode, selected language, voice input, and voice playback in a single interface.

### Responsive Styling

Built a more polished and adaptable grid layout that works consistently across different screen sizes.

## 🚀 How It Can Be Improved

- Add Text Search: Include a manual input field alongside voice search
- Add Image Uploads: Allow users to add custom gallery images dynamically
- Translate Descriptions: Extend language switching to image descriptions as well
- Save Preferences: Persist selected theme and language using localStorage
- Backend Integration: Load gallery data from an API or database
- Better Voice Support: Detect and recommend missing language voices for Tamil and Malayalam

## ▶ Running the Project

To run locally:

1. Open a terminal in the project folder.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## ⚠ Notes

- Voice Search works best in browsers that support the Speech Recognition API, such as Google Chrome.
- Tamil and Malayalam speaker output depends on whether the browser or operating system has those voices installed.
