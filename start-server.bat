@echo off
echo 🔍 Finance Tracker Troubleshooting
echo ================================

echo.
echo 📍 Current Directory: %CD%
echo.

echo 🔧 Checking Node.js and npm...
node --version
npm --version

echo.
echo 📦 Installing dependencies (if needed)...
npm install

echo.
echo 🚀 Starting development server...
echo Opening at: http://localhost:5173 or http://localhost:5174
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause
