# Organizzazione progetto

## Cartella archivio (backup sul Mac)

Ogni volta che vuoi uno **snapshot portabile** (senza `node_modules` / `.next`), dalla root del repo:

```bash
./scripts/export-archivio.sh "$HOME/Desktop/Projects/wedding-3d-invite-organizzato-$(date +%Y-%m-%d)"
```

Istruzioni per chi apre solo la copia: **`docs/LEGGIMI-ARCHIVIO.md`**.

## Struttura codice

| Percorso | Ruolo |
|----------|--------|
| `src/lib/config.ts` | **Unico file da personalizzare**: nomi, data, venue, scaletta (`schedule`), galleria, sfondo, musica, URL condivisione, template scena 3D. |
| `src/app/page.tsx` | Composizione pagina: ordine sezioni (Hero, Countdown, Timeline, Gallery, Mappa, Share). |
| `src/app/layout.tsx` | Metadata, lingua `it`, font, classe sfondo foto (`photo-bg`). |
| `src/app/globals.css` | Colori, grain, blur sfondo (`.photo-bg`). |
| `src/components/Hero.tsx` | Intestazione invito. |
| `src/components/Timeline.tsx` | Programma giornata (pannelli a scroll per ogni step). |
| `src/components/Scene.tsx` | Canvas 3D + template (`?template=rings` ecc.). |
| `src/components/three/*.tsx` | Anelli, petali, cuori. |
| `public/gallery/` | Foto castello + asset timeline se servono. |

## Comandi

```bash
npm install
npm run dev    # sviluppo
npm run build && npm run start   # produzione locale
```

## Deploy

Vedi `README.md` (Vercel). Dopo il deploy imposta `shareUrl` in `config.ts` per il QR corretto.
