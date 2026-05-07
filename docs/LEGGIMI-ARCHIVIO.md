# Invito matrimonio 3D — archivio organizzato

Questa guida vale per **qualsiasi cartella** in cui hai copiato il progetto (es. snapshot da `scripts/export-archivio.sh`).

**Coppia (config di esempio):** Kristjana & Houssine · Castel Toblino · 19 settembre 2026

La copia è il **codice sorgente** Next.js, pronto da salvare o spostare.  
**Non** include `node_modules`, `.next` né `.tools` (si rigenerano con `npm install` / build).

---

## Avvio rapido

Dalla **root** della cartella copiata:

```bash
npm install
npm run dev
```

Apri nel browser: `http://localhost:3000`

Produzione locale:

```bash
npm run build
npm run start
```

---

## Dove si modifica tutto

| Cosa | File |
|------|------|
| Nomi, data, venue, programma giornata, foto, musica, QR, scena 3D | `src/lib/config.ts` |
| Testi hero (data, location calligrafica) | `src/components/Hero.tsx` |
| Programma a pannelli (scroll per step) | `src/components/Timeline.tsx` |
| Sfondo sfocato (blur, luminosità) | `src/app/globals.css` (`.photo-bg::before`) |
| Pagina: ordine sezioni | `src/app/page.tsx` |
| Scena 3D e template (`?template=rings`) | `src/components/Scene.tsx` |
| Anelli / petali / cuori | `src/components/three/` |

Mappa progetto: `docs/ORGANIZZAZIONE.md`

---

## Cartelle importanti

- `public/gallery/` — foto del castello (incluse le due drone `castle-drone-*.png` se presenti).
- `public/music.mp3` — opzionale; se manca il player si nasconde.

---

## Rigenerare l’archivio dal progetto principale

Dal repo di lavoro:

```bash
./scripts/export-archivio.sh "/percorso/desiderato/nome-cartella"
```

Senza argomenti lo script crea una cartella sotto `~/Desktop/Projects/` con data nel nome.

---

## Deploy (promemoria)

Dopo Vercel, imposta `shareUrl` in `src/lib/config.ts` e ridistribuisci, così il QR punta al dominio reale.
