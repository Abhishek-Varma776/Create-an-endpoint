# Setup & Installation Guide

## System Requirements

- **Node.js**: v14.0 or higher
- **npm**: v6.0 or higher (comes with Node.js)
- **MongoDB**: v4.4 or higher
- **RAM**: 2GB minimum
- **Disk Space**: 1GB minimum

## Step 1: Prerequisites Installation

### Windows

#### Install Node.js
1. Download from https://nodejs.org/ (LTS version recommended)
2. Run the installer and follow the setup wizard
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### Install MongoDB (Local)
1. Download from https://www.mongodb.com/try/download/community
2. Run the installer and follow setup wizard
3. MongoDB will run as a Windows service
4. Verify: `mongosh` command opens MongoDB shell

OR Use MongoDB Atlas (Cloud):
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `.env` file with connection string

### macOS

```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install MongoDB
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify installations
node --version
npm --version
mongo --version
```

### Linux (Ubuntu/Debian)

```bash
# Update package manager
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify installations
node --version
npm --version
mongo --version
```

---

## Step 2: Clone/Download the Project

### Option A: Clone from GitHub
```bash
git clone <your-repository-url>
cd mern-image-upload
```

### Option B: Download as ZIP
1. Download ZIP from GitHub
2. Extract to your desired location
3. Open terminal/command prompt in the extracted folder

---

## Step 3: Backend Setup

### Install Dependencies

```bash
# Navigate to project root (if not already there)
cd path/to/mern-image-upload

# Install backend dependencies
npm install
```

This installs:
- express (web framework)
- mongoose (MongoDB ODM)
- multer (file upload)
- cors (cross-origin requests)
- dotenv (environment variables)
- nodemon (auto-reload in dev)

### Configure Environment

Create/Edit `.env` file in project root:

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/mern-image-upload
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-image-upload
PORT=5000
NODE_ENV=development
```

Get your connection string from MongoDB Atlas dashboard.

---

## Step 4: Frontend Setup

### Install React Dependencies

```bash
# Navigate to client folder
cd client

# Install frontend dependencies
npm install

# Return to project root
cd ..
```

This installs:
- react (UI library)
- react-dom (DOM rendering)
- axios (HTTP client)
- react-scripts (build tools)

---

## Step 5: Start the Application

### Option A: Development Mode (Two Terminals)

**Terminal 1 - Start Backend:**
```bash
# From project root
npm run dev
```

You should see:
```
Server running on http://localhost:5000
MongoDB connected
```

**Terminal 2 - Start Frontend:**
```bash
# From project root
cd client
npm start
```

Browser automatically opens http://localhost:3000

### Option B: Production Mode

**Build Frontend:**
```bash
cd client
npm run build
cd ..
```

**Start Server:**
```bash
npm start
```

Access application at http://localhost:5000

---

## Step 6: Verify Installation

### Check Backend Health
```bash
curl http://localhost:5000/api/health
```

Expected output:
```json
{"message":"Server is running"}
```

### Check Frontend
1. Open http://localhost:3000 in browser
2. You should see the Image Upload Gallery interface
3. Try uploading a test image

---

## Troubleshooting

### MongoDB Connection Error

**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions:**
1. Ensure MongoDB is running:
   - Windows: Check Services for "MongoDB"
   - macOS: `brew services list` should show mongodb-community running
   - Linux: `sudo systemctl status mongod`

2. Start MongoDB:
   ```bash
   # Windows (as Administrator)
   net start MongoDB

   # macOS
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod
   ```

3. If using MongoDB Atlas, verify connection string in `.env`

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE :::5000`

**Solutions:**
1. Kill process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F

   # macOS/Linux
   lsof -i :5000
   kill -9 <PID>
   ```

2. Or change PORT in `.env` to different value (e.g., 5001)

### npm install Fails

**Problem:** `npm ERR! code E404 Not Found`

**Solutions:**
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete node_modules and try again:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Check internet connection

### CORS Errors

**Problem:** Request blocked by CORS policy

**Solution:** Already configured in server/index.js. If still occurs:
1. Check browser console for exact error
2. Verify frontend URL in CORS config
3. Clear browser cache

### Module Not Found Errors

**Problem:** `Cannot find module 'express'`

**Solution:**
1. Ensure you're in correct directory
2. Run `npm install` again
3. Check package.json has all dependencies

---

## Project Structure Check

After setup, your project should look like:

```
mern-image-upload/
├── server/
│   └── index.js
├── client/
│   ├── public/
│   ├── src/
│   └── package.json
├── uploads/          (created after first upload)
├── node_modules/     (created by npm install)
├── .env
├── .gitignore
├── package.json
├── README.md
├── API.md
├── TESTING.md
└── SETUP.md
```

---

## Development Tips

### Hot Reload Backend
```bash
# Uses nodemon for automatic reload on file changes
npm run dev
```

### Hot Reload Frontend
```bash
# React dev server automatically reloads on file changes
cd client && npm start
```

### View MongoDB Data

**Using MongoDB Shell:**
```bash
# Connect
mongosh

# Use database
use mern-image-upload

# View images collection
db.images.find()

# Count images
db.images.countDocuments()
```

**Using MongoDB Compass (GUI):**
1. Download from https://www.mongodb.com/products/tools/compass
2. Connect to your MongoDB instance
3. Browse databases and collections visually

---

## Next Steps

1. **Read API Documentation**: See [API.md](./API.md)
2. **Test Endpoints**: See [TESTING.md](./TESTING.md)
3. **Deploy to Production**: See [README.md](./README.md) Production section
4. **Add Features**: Implement pagination, image resizing, search, etc.

---

## Getting Help

1. Check troubleshooting section above
2. Review logs in terminal output
3. Check [API.md](./API.md) for endpoint details
4. Review [TESTING.md](./TESTING.md) for testing procedures

---

## Quick Start (30 seconds)

```bash
# 1. Install dependencies
npm install && cd client && npm install && cd ..

# 2. Start MongoDB (if local)
# Open new terminal: mongod (Windows) or brew services start mongodb-community (Mac)

# 3. Terminal 1: Start backend
npm run dev

# 4. Terminal 2: Start frontend
cd client && npm start

# 5. Open http://localhost:3000
```

✅ You're ready to upload images!
