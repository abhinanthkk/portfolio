#!/usr/bin/env bash
set -e

cleanup() {
  echo ""
  echo "Shutting down..."
  kill $API_PID $VITE_PID 2>/dev/null
  wait $API_PID $VITE_PID 2>/dev/null
  echo "Stopped."
}
trap cleanup EXIT INT TERM

echo "Starting API server..."
node scripts/dev.js &
API_PID=$!
sleep 2

echo "Starting Vite dev server..."
npx vite &
VITE_PID=$!

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Portfolio - Development Server"
echo "  Frontend: http://localhost:5173"
echo "  API:      http://localhost:3001"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Press Ctrl+C to stop both servers."
echo ""

wait
