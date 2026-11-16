# ★ JoJo's Bizarre Adventure — Interactive Manga Hub ★
> **ジョジョの奇妙な冒険 • Interactive Web Experience**

An interactive, anime & manga web application dedicated to Hirohiko Araki’s legendary masterpiece *JoJo's Bizarre Adventure*. Built with React, Tailwind CSS, Vite, and Web Audio API synthesis.

---

## 🌟 Key Features

- **Stand & Lore Database (Parts 1–9)**: Browse canon Stands and characters from *Phantom Blood* to *The JOJOLands*. Filter by Part, Type, and Alignment, with tarot/music references and voice lines.
- **Interactive 6-Axis Stand Radar Chart**: Custom SVG radar wheel displaying Destructive Power, Speed, Range, Durability, Precision, and Growth Potential (ranked A to E).
- **Custom Stand Forge / Creator**: Craft your own custom Stand with live stat allocation, custom battle cry, archetype selection, and exportable Stand card.
- **Web Audio FX & Retro Soundboard**: Instant browser-synthesized audio effects without heavy audio downloads:
  - ⏳ *ZA WARUDO!* (Sub-bass sweep, freeze ring, ticking clocks)
  - ⏱️ *Time Resumes* (Toki wa ugokidasu)
  - 👊 *ORA ORA ORA!* (Star Platinum rapid punch rush)
  - ⚡ *MUDA MUDA MUDA!* (The World / GER barrage & Wryyy)
  - ➡️ *"To Be Continued..."* (Roundabout harmonic intro & slap bass)
  - 👁️ *Menacing Rumble* (ゴゴゴゴ ambient detuned drone)
- **Araki Pop-Art Aesthetic & Effects**:
  - Click anywhere on the page to spawn animated Japanese onomatopoeia particles (*ゴゴゴゴ*, *ドドドド*, *ズキューン*, *メメタァ*).
  - Fullscreen 5-second *ZA WARUDO* chromatic inversion time-freeze.
  - Araki Palette Switcher (*Original*, *Morioh Sunset*, *Golden Wind*, *Vampire DIO*).
- **Joestar Bloodline Family Tree**: Explore the star-marked lineage across both the **Original Universe** (Jonathan to Jolyne) and the **SBR Multiverse** (Johnny to Jodio).
- **Stand Clash Battle Arena**: Tactical round-by-round combat simulation matching up canon Stands or your own custom creations.
- **"What is your Stand?" Personality Quiz**: 6 psychological scenario questions with dynamic scoring and dramatic Stand reveal.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4, custom Araki pop-art comic borders and halftone patterns
- **Audio**: Web Audio API (oscillators, biquad filters, synthesized rushes) + Web Speech Synthesis
- **Visuals & Effects**: Canvas Confetti, Lucide Icons, Google Fonts (*Bangers*, *Cinzel*, *Montserrat*, *Noto Sans JP*)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
```bash
git clone https://github.com/Adrien200269/jojo-bizarre-adventure.git
cd jojo-bizarre-adventure
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## 📜 Credits & Disclaimer
JoJo's Bizarre Adventure is created by Hirohiko Araki and published by Lucky Land Communications / Shueisha. This project is a non-profit fan tribute.
