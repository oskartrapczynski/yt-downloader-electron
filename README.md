# yt-downloader-electron

A desktop YouTube downloader built with **Electron**, **React**, and **TypeScript**. Paste a YouTube URL, pick your format and quality, and download audio or video straight to your machine.

## Features

- **Audio downloads** — MP3, WAV, AIFF, FLAC with selectable quality (low / medium / high / best)
- **Video downloads** — MP4, AVI, MOV with resolution options from 240p up to 4K
- **Combined video + audio** — download both in a single pass
- **Metadata preview** — fetches title, channel, and thumbnail via YouTube oEmbed before downloading
- **Cross-platform** — builds for Windows, macOS, and Linux

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Electron](https://www.electronjs.org/) + [electron-vite](https://electron-vite.org/) |
| Frontend | [React 18](https://react.dev/) · [Chakra UI](https://chakra-ui.com/) · [Framer Motion](https://www.framer.com/motion/) |
| Backend | [yt-dlp](https://github.com/yt-dlp/yt-dlp) (bundled binary) · [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) |
| Language | TypeScript |

## Project Structure

```
src/
├── main/               # Electron main process
│   ├── handlers/        # IPC handlers (fetch metadata, download)
│   └── helpers/         # yt-dlp commands, ffmpeg, binary resolution
├── preload/             # Context bridge / preload scripts
├── renderer/            # React UI
│   └── src/
│       └── components/
│           ├── Downloader/   # URL input, card, footer, error states
│           └── Select/       # Format & quality selectors
└── shared/              # Types, constants, and enums shared across processes
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
