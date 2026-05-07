# 3D Wedding Invitation — Kristjana & Houssine

A live, interactive 3D wedding invitation that opens on any phone — no app install required. Built with Next.js, React Three Fiber and Tailwind CSS.

Currently configured for **Kristjana & Houssine · Saturday, September 19th, 2026 · Castel Toblino (Lake Toblino, Trentino, Italy)**.

## What's inside

- **Photo backdrop** — a blurred aerial shot of Castel Toblino + lake, used as the page background under a soft violet/ink tint and vignette. Swap the photo by changing `backgroundImage` in `src/lib/config.ts`.
- **Procedural 3D scene** layered on top: two interlocking gold rings, a tiny diamond sparkle, drifting rose petals, floating hearts and a starfield (no 3D model files needed). Bloom + vignette post-processing for a romantic glow.
- **Hero** with couple names, date, and venue.
- **Live countdown** to the ceremony (ticks every second).
- **"The day"** timeline — Italian wedding day schedule (welcome → ceremony → aperitivo → dinner → cake → first dance → DJ → last dance).
- **Photo gallery** of Castel Toblino with tap-to-zoom lightbox.
- **Venue map** (OpenStreetMap embed, no API key) + Google Maps & Apple Maps directions buttons.
- **Background music** (muted by default — guests tap to enable, per mobile autoplay rules).
- **Share section** with native share sheet, WhatsApp / Telegram / Email links and a **QR code** of the invitation URL.
- Mobile-first, responsive, dark elegant theme.

## Personalize it

Everything you need to edit lives in **one file**:

```
src/lib/config.ts
```

Update names (`bride`, `groom`), date (`dateISO` + `dateLabel` + `timeLabel`), venue (name/address/lat/lng), `schedule` (day-of timeline), `gallery` (photo URLs), `backgroundImage` (blurred page backdrop), `musicSrc`, and `shareUrl`.

### Background photo (the soft blurred backdrop)

Set in `src/lib/config.ts`:

```ts
backgroundImage: '/gallery/castle-aerial.png',
```

Point it at any image in `/public/gallery/` (or set to `''` to fall back to the deep-night gradient). Tuning knobs live in `src/app/globals.css` under `.photo-bg::before` — `blur(...)`, `saturate(...)`, `brightness(...)`.

### Music

Drop an MP3 at `public/music.mp3` (or change `musicSrc` in the config). The toggle button in the top-right enables/disables it.

### Photos

Either:

1. Edit the `gallery` array in `config.ts` to point at any image URLs (Unsplash works out of the box), or
2. Drop your photos into `public/gallery/` and reference them as `/gallery/photo1.jpg`, `/gallery/photo2.jpg`, etc.

### 3D models (optional upgrade)

The scene is fully procedural so it works with zero assets. When you want to swap in a real model:

1. Drop a `.glb` file in `public/models/` (e.g. `public/models/rings.glb`).
2. In `src/components/three/Rings.tsx`, replace the `<torusGeometry>` meshes with:

   ```tsx
   import { useGLTF } from '@react-three/drei';
   const { scene } = useGLTF('/models/rings.glb');
   return <primitive object={scene} />;
   ```

You can grab free wedding-related GLBs from [Sketchfab](https://sketchfab.com/3d-models/categories/jewelry?features=downloadable&licenses=322a749bcfa841b29dff1e8a1bb74b0b) or [Poly Pizza](https://poly.pizza/).

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

> Note: this project ships a portable Node.js inside `.tools/node/` (used during scaffolding). On your own machine you can ignore it — install Node 18+ from [nodejs.org](https://nodejs.org) and use `npm` normally. The `.tools/` folder is gitignored.

## Deploy to Vercel (free)

The fastest way to get a live link your guests can open on any phone:

```bash
# 1. Push to GitHub
git add . && git commit -m "Initial 3D invitation" && git branch -M main
git remote add origin git@github.com:YOUR_USER/wedding-3d-invite.git
git push -u origin main

# 2. Deploy
#    a. Go to https://vercel.com/new
#    b. Import the repo. Framework: Next.js (auto-detected). Click Deploy.
#    c. After deploy, copy the URL (e.g. https://anna-and-marco.vercel.app)
#    d. Paste it into `shareUrl` in src/lib/config.ts and redeploy — the QR code will encode it.
```

Or via CLI:

```bash
npx vercel
```

A custom domain (e.g. `anna-and-marco.com`) can be added in the Vercel dashboard once deployed.

## Sharing

Once live, just send the link or print the QR code shown in the **Share** section. Guests scan with any phone camera → invitation opens in their browser. No install, no login.

## Performance notes

- The 3D scene uses instanced petals and capped DPR (`[1, 2]`) so it runs smoothly on mid-range phones.
- All UI is plain HTML/CSS/Tailwind on top of the canvas, so even if WebGL is unavailable the invitation is still fully readable.
- Images are lazy-loaded.

## Tech

- [Next.js 14](https://nextjs.org/) (App Router)
- [React Three Fiber](https://r3f.docs.pmnd.rs/) + [drei](https://github.com/pmndrs/drei) + [postprocessing](https://github.com/pmndrs/react-postprocessing)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [qrcode.react](https://github.com/zpao/qrcode.react)
