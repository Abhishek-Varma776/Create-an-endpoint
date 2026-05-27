# MERN Image Upload Application

A full-stack MERN (MongoDB, Express, React, Node.js) application with image upload and storage functionality.

## Features

✅ **Image Upload**: Upload images with size validation (max 5MB)  
✅ **Image Storage**: Images stored in `uploads/` directory with database metadata  
✅ **Image Gallery**: Display all uploaded images with thumbnails  
✅ **Image Retrieval**: Fetch single or multiple images with metadata  
✅ **Image Deletion**: Delete images from both disk and database  
✅ **File Validation**: Only accept image files (JPEG, PNG, GIF, WebP)  
✅ **RESTful API**: Comprehensive API endpoints for all operations  
✅ **React Frontend**: Responsive UI for uploading and managing images  

## Tech Stack

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose
- Multer for file uploads
- CORS for cross-origin requests

**Frontend:**
- React 18
- Axios for HTTP requests
- CSS3 for styling

## Project Structure

```
mern-image-upload/
├── server/
│   └── index.js              # Express server and API endpoints
├── client/
│   ├── public/
│   │   └── index.html        # HTML entry point
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Styling
│   │   └── index.js          # React entry point
│   └── package.json          # Client dependencies
├── uploads/                  # Image storage directory
├── .env                      # Environment variables
├── .gitignore               # Git ignore rules
├── package.json             # Server dependencies
└── README.md                # This file
```

## API Endpoints

### Upload Image
```
POST /api/images/upload
Content-Type: multipart/form-data

Body: form-data with 'image' field

Response: {
  "message": "Image uploaded successfully",
  "image": {
    "id": "...",
    "filename": "...",
    "originalName": "...",
    "filePath": "/uploads/...",
    "size": 123456,
    "uploadedAt": "2026-05-27T..."
  }
}
```

### Get All Images
```
GET /api/images

Response: {
  "message": "Images retrieved successfully",
  "images": [...]
}
```

### Get Image by ID
```
GET /api/images/:id

Response: {
  "message": "Image retrieved successfully",
  "image": {...}
}
```

### Delete Image
```
DELETE /api/images/:id

Response: {
  "message": "Image deleted successfully"
}
```

### Health Check
```
GET /api/health

Response: {
  "message": "Server is running"
}
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd mern-image-upload
```

### 2. Install Server Dependencies
```bash
npm install
```

### 3. Install Client Dependencies
```bash
cd client
npm install
cd ..
```

### 4. Configure Environment
Edit `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/mern-image-upload
PORT=5000
NODE_ENV=development
```

For MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-image-upload
```

### 5. Start MongoDB
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (update MONGODB_URI in .env)
```

### 6. Run Development Server
```bash
# Terminal 1: Start backend (port 5000)
npm run dev

# Terminal 2: Start frontend (port 3000)
cd client
npm start
```

### 7. Access Application
- Frontend: http://localhost:3000
- API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

## File Upload Details

**Supported Formats:**
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

**Constraints:**
- Maximum file size: 5MB
- Storage location: `/uploads` directory
- Filename format: `image-{timestamp}-{random}.{ext}`

**Database Storage:**
- Stores image metadata in MongoDB
- Tracks: filename, original name, file path, size, upload timestamp
- Automatic indexing by upload date

## Usage Examples

### Upload Image via cURL
```bash
curl -X POST http://localhost:5000/api/images/upload \
  -F "image=@/path/to/image.jpg"
```

### Fetch All Images
```bash
curl http://localhost:5000/api/images
```

### Delete Image
```bash
curl -X DELETE http://localhost:5000/api/images/{imageId}
```

### Display Image
```
http://localhost:5000/uploads/image-{timestamp}-{random}.jpg
```

## Production Deployment

### Build Frontend
```bash
cd client
npm run build
```

### Set Environment Variables
```bash
export MONGODB_URI=your_production_mongodb_uri
export PORT=5000
export NODE_ENV=production
```

### Run Server
```bash
npm start
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Successful GET/DELETE
- `201`: Successful POST (upload)
- `400`: Bad request (missing file)
- `404`: Not found (image ID doesn't exist)
- `500`: Server error

All errors include descriptive messages in JSON format.

## Security Considerations

✅ File type validation (MIME type checking)  
✅ File size limits (5MB max)  
✅ Unique filename generation (prevents overwrites)  
✅ CORS configuration  
✅ Input sanitization via Mongoose  

## Performance Features

- Grid storage for images with unique names
- Indexed MongoDB queries by upload date
- Static file serving for fast image retrieval
- Multer disk storage for efficient file handling


