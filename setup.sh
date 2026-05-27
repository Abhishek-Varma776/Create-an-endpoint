#!/bin/bash

echo "================================"
echo "MERN Image Upload - Quick Start"
echo "================================"
echo ""

echo "Step 1: Installing backend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

echo ""
echo "Step 2: Installing frontend dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. Start MongoDB: mongod (Windows) or brew services start mongodb-community (Mac)"
echo "2. Terminal 1: npm run dev (backend)"
echo "3. Terminal 2: cd client && npm start (frontend)"
echo "4. Open http://localhost:3000"
echo ""
