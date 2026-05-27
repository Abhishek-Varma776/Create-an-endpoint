@echo off
echo ================================
echo MERN Image Upload - Quick Start
echo ================================
echo.

echo Step 1: Installing backend dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    exit /b 1
)

echo.
echo Step 2: Installing frontend dependencies...
cd client
call npm install
if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    exit /b 1
)
cd ..

echo.
echo ✅ Installation complete!
echo.
echo Next steps:
echo 1. Start MongoDB: mongod (in new command prompt)
echo 2. Terminal 1: npm run dev (backend)
echo 3. Terminal 2: cd client ^&^& npm start (frontend)
echo 4. Open http://localhost:3000
echo.
pause
