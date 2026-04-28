#!/usr/bin/env bash
# Take a headless Chrome screenshot of a URL for visual QA.
# Usage: ./scripts/qa-screenshot.sh <url> [out_path] [width] [height]
# Defaults: out=/tmp/qa-<ts>.png, width=1440, height=3200.
# Tall height captures most of a typical landing page in one shot.
set -euo pipefail

URL="${1:?url required, e.g. http://localhost:3001}"
OUT="${2:-/tmp/qa-$(date +%s).png}"
W="${3:-1440}"
H="${4:-3200}"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[[ -x "$CHROME" ]] || { echo "chrome not found at $CHROME" >&2; exit 1; }

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --no-sandbox \
  --window-size="${W},${H}" \
  --virtual-time-budget=5000 \
  --screenshot="$OUT" \
  "$URL" >/dev/null 2>&1

echo "$OUT"
