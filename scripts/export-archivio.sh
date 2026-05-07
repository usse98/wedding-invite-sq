#!/usr/bin/env bash
# Crea una cartella archivio sul Desktop con il progetto (senza node_modules, .next, .tools).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${1:-$HOME/Desktop/Projects/wedding-3d-invite-archivio-$(date +%Y-%m-%d)}"
mkdir -p "$DEST"
rsync -a \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.tools' \
  "$ROOT/" "$DEST/"
echo "Archivio creato in: $DEST"
echo "Poi: cd \"$DEST\" && npm install && npm run dev"
