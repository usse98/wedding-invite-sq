#!/usr/bin/env bash
# Wrapper so the preview tool finds the portable Node in .tools/node/.
set -e
DIR="$(cd "$(dirname "$0")/.." && pwd)"
export PATH="$DIR/.tools/node/bin:$PATH"
cd "$DIR"
exec npm run dev
