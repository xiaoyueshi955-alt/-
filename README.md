# Phaser 3 Browser Game Starter (TypeScript + Vite)

A clean starter project for building a browser game with **Phaser 3**, **TypeScript**, and **Vite**.

## Project Structure

```text
.
├── index.html
├── package.json
├── public/
│   └── assets/
│       ├── audio/
│       ├── fonts/
│       └── images/
├── src/
│   ├── main.ts
│   ├── style.css
│   └── scenes/
│       └── MainScene.ts
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the development server

```bash
npm run dev
```

### 3) Create a production build

```bash
npm run build
```

### 4) Preview the production build locally

```bash
npm run preview
```

## Playable Demo Scene

The starter includes one simple scene (`MainScene`) where:

- A glowing orb is placed in the center of the game.
- You can move it with the arrow keys.
- The orb color animates over time.

## Assets

Use the placeholder asset directories under `public/assets`:

- `public/assets/images` for sprites/backgrounds
- `public/assets/audio` for music and SFX
- `public/assets/fonts` for bitmap/web fonts

Any files in `public` are served at the root path, e.g. `public/assets/images/player.png` becomes `/assets/images/player.png`.
