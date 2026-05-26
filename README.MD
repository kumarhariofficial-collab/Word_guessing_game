# 🎮 LEXICON — Modern Word Guessing Game

Welcome to **LEXICON**, a highly interactive, responsive, and visually stunning web-based Word Guessing Game. Developed with modern web standards, it offers a polished, responsive gaming experience with dark/light themes, synthesized retro audio effects, dynamic timers, and responsive layouts.

Live Repository: [kumarhariofficial-collab/Word_guessing_game](https://github.com/kumarhariofficial-collab/Word_guessing_game)

---

## ✨ Features

- **🎨 Modern Premium UI/UX:** Dark and light mode settings, beautiful typography (using Orbitron and Space Mono from Google Fonts), micro-animations, and smooth transitions.
- **⚡ Dynamic Particle FX:** Dynamic canvas-based confetti celebration upon winning!
- **🔊 Programmatic Audio:** Nostalgic synthesized sound effects (correct, wrong, win, lose, countdown ticks) generated programmatically using the browser's `AudioContext`—no external audio files required.
- **🏆 Leaderboard & Score Tracking:** Top 10 high-scores saved persistently in your browser's local storage with custom rank medals (🥇, 🥈, 🥉).
- **⏱️ Timer Challenges & Multipliers:** Time-limit challenges based on difficulty. Win streak multipliers increase score outputs.
- **💡 Hint & Skip System:** Reveal a letter at the cost of score points, or skip words to keep playing.
- **🏷️ Extensive Word Base:** 6 diverse categories (Technology, Animals, Countries, Movies, Sports, Food) across 3 difficulty levels (Easy, Medium, Hard).

---

## 🛠️ Tech Stack

- **Core:** React (v18.2.0)
- **Tooling:** Vite (v5)
- **Styling:** Custom Modern Vanilla CSS (with CSS variables for dynamic dark/light theme switching)
- **Audio:** Web Audio API (`AudioContext`)

---

## 🚀 How to Run Locally

Follow these quick steps to get the game running locally on your computer:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 16 or newer recommended).

### 2. Clone the Repository
```bash
git clone https://github.com/kumarhariofficial-collab/Word_guessing_game.git
cd Word_guessing_game
```

### 3. Install Dependencies
Install all required package dependencies:
```bash
npm install
```

### 4. Start the Development Server
Launch the local development server:
```bash
npm run dev
```
Once started, open your web browser and navigate to the local server address (usually `http://localhost:5173`).

### 5. Build for Production
To build a production-ready optimized version of the app:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 📂 Project Structure

```text
├── index.html          # Entry HTML page (loads Orbitron/Space Mono fonts)
├── package.json        # Project scripts & dependencies
├── vite.config.js      # Vite build configuration
├── .gitignore          # Git exclusion rules (ignores node_modules and builds)
└── src/
    ├── main.jsx        # App entry point
    ├── index.css       # Complete modern glassmorphic design system
    ├── App.jsx         # Core game logic, state, and timers
    ├── components/     # Modulalized React Components
    │   ├── GameBoard.jsx   # Word blocks, hints, remaining hearts
    │   ├── Header.jsx      # Navigation, mute toggles, theme switcher
    │   ├── Keyboard.jsx    # On-screen custom virtual keyboard
    │   ├── Leaderboard.jsx # High scores display
    │   ├── Overlay.jsx     # Game Over and Win screen layouts
    │   ├── ScoreBoard.jsx  # Score, Best and Streak bars
    │   ├── SetupPanel.jsx  # Difficulty and category configuration
    │   └── Toast.jsx       # Floating feedback alerts
    └── utils/          # Helpers & data
        ├── audio.js    # Synthesized audio effects & canvas confetti
        └── words.js    # Multi-category vocabulary database
```

---

## 🏆 Scoring Rules

- **Point Multipliers:** 
  - **Easy:** 10 points per letter (+5 points per remaining second)
  - **Medium:** 20 points per letter (+10 points per remaining second)
  - **Hard:** 35 points per letter (+20 points per remaining second)
- **Lives:**
  - **Easy:** 8 hearts (120s timer)
  - **Medium:** 6 hearts (90s timer)
  - **Hard:** 4 hearts (60s timer)
- **Hints:** Revealing a random letter costs **50 points** (max 3 hints per word).
- **Skips:** Skipping a word costs **100 points** and resets your win streak.
- **Streak Bonus:** Each consecutive win adds a `+10%` cumulative score multiplier!