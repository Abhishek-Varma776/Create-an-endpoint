# Project Structure & Architecture

## Directory Layout

```
mern-image-upload/
│
├── server/
│   └── index.js                    # Main Express server & API endpoints
│
├── client/
│   ├── public/
│   │   └── index.html              # HTML entry point
│   │
│   ├── src/
│   │   ├── App.js                  # Main React component
│   │   ├── App.css                 # Component styling
│   │   └── index.js                # React DOM render
│   │
│   └── package.json                # React dependencies
│
├── uploads/                        # Image storage (created at runtime)
│
├── node_modules/                   # Backend dependencies (created by npm)
│
├── .env                            # Environment variables (DO NOT COMMIT)
├── .env.example                    # Example environment variables
├── .gitignore                      # Git ignore rules
│
├── package.json                    # Backend dependencies & scripts
│
├── README.md                       # Project overview
├── SETUP.md                        # Installation guide
├── API.md                          # API documentation
├── TESTING.md                      # Testing guide
├── ARCHITECTURE.md                 # This file
│
├── setup.sh                        # Setup script (Linux/macOS)
├── setup.bat                       # Setup script (Windows)
│
└── .git/                           # Git repository

```

---

## Technology Stack

### Backend
- **Express.js** - Web application framework
- **Node.js** - JavaScript runtime
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling (no CSS framework)

### Development Tools
- **npm** - Package manager
- **Nodemon** - Auto-reload for development
- **Git** - Version control

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    REACT FRONTEND                       │
│         (Port 3000 - Development)                       │
│                                                         │
│  App.js                                                 │
│  ├── File Input Component                               │
│  ├── Upload Handler (Axios POST)                        │
│  ├── Gallery Display Component                          │
│  └── Delete Handler (Axios DELETE)                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP/REST
                     │
┌────────────────────┴────────────────────────────────────┐
│             EXPRESS.JS SERVER                           │
│         (Port 5000 - API Server)                        │
│                                                         │
│  Routes:                                                │
│  ├── POST /api/images/upload                            │
│  ├── GET /api/images                                    │
│  ├── GET /api/images/:id                                │
│  ├── DELETE /api/images/:id                             │
│  └── GET /api/health                                    │
│                                                         │
│  Middleware:                                            │
│  ├── CORS Configuration                                 │
│  ├── Multer (File Upload)                               │
│  └── Static File Serving (/uploads)                     │
└────────┬──────────────────────────┬─────────────────────┘
         │                          │
    Database             File Storage
         │                          │
         ▼                          ▼
    ┌─────────────┐          ┌─────────────┐
    │  MongoDB    │          │  uploads/   │
    │  (Images    │          │  (Image     │
    │  Collection)│          │   Files)    │
    └─────────────┘          └─────────────┘
```

---

## Data Flow

### Image Upload Flow

```
1. User selects file in React component
   ↓
2. onChange event captured
   ↓
3. File stored in React state (selectedFile)
   ↓
4. User clicks "Upload Image" button
   ↓
5. React creates FormData with image
   ↓
6. Axios POST request to /api/images/upload
   ↓
7. Express receives multipart/form-data
   ↓
8. Multer middleware processes file
   ├── Validates file type (MIME check)
   ├── Validates file size (max 5MB)
   └── Saves to /uploads/ with unique name
   ↓
9. Express creates Image document in MongoDB
   ├── filename: generated name
   ├── originalName: original filename
   ├── filePath: URL path to file
   ├── size: file size in bytes
   └── uploadedAt: current timestamp
   ↓
10. MongoDB saves document
    ↓
11. Response sent to React with image metadata
    ↓
12. React updates gallery display
    ↓
13. User sees uploaded image in gallery
```

### Image Retrieval Flow

```
1. React mounts or page loads
   ↓
2. useEffect hook triggers
   ↓
3. Axios GET request to /api/images
   ↓
4. Express queries MongoDB for all images
   ↓
5. MongoDB returns sorted list (newest first)
   ↓
6. React receives response
   ↓
7. React updates state with images array
   ↓
8. Component re-renders with gallery items
   ↓
9. Each image displayed with:
   - Thumbnail preview (img src = filePath)
   - Original filename
   - File size
   - Delete button
```

### Image Deletion Flow

```
1. User clicks delete button on image
   ↓
2. handleDelete triggered with imageId
   ↓
3. Axios DELETE request to /api/images/:id
   ↓
4. Express receives delete request
   ↓
5. Queries MongoDB for image document
   ↓
6. Deletes file from /uploads/ directory
   ↓
7. Deletes document from MongoDB
   ↓
8. Response sent to React
   ↓
9. React refreshes gallery (calls fetchImages)
   ↓
10. Gallery updated without deleted image
```

---

## Component Breakdown

### Backend (server/index.js)

**Responsibilities:**
- Express app initialization
- MongoDB connection
- CORS middleware setup
- Static file serving
- Multer configuration
- API route handlers

**Key Functions:**
```javascript
// File upload handling
app.post('/api/images/upload', upload.single('image'), async handler)

// Fetch operations
app.get('/api/images', async handler)
app.get('/api/images/:id', async handler)

// Delete operation
app.delete('/api/images/:id', async handler)

// Health check
app.get('/api/health', handler)
```

### Frontend (client/src/)

**App.js:**
- State management (selectedFile, uploading, images, message)
- useEffect for initial data load
- fetchImages() - GET all images
- handleFileSelect() - File input change
- handleUpload() - POST image upload
- handleDelete() - DELETE image

**App.css:**
- Responsive grid gallery
- Form styling
- Gradient background
- Hover effects
- Mobile responsive

---

## Database Schema

### Image Collection

```javascript
{
  "_id": ObjectId,                    // Auto-generated MongoDB ID
  "filename": String,                 // e.g., "image-1716792600000-456789.jpg"
  "originalName": String,             // e.g., "photo.jpg"
  "filePath": String,                 // e.g., "/uploads/image-1716792600000-456789.jpg"
  "size": Number,                     // File size in bytes
  "uploadedAt": Date,                 // ISO 8601 timestamp
  "__v": Number                       // Mongoose version field
}
```

**Indexes:**
- Primary: `_id` (auto-indexed by MongoDB)
- Suggested: `uploadedAt` for sorting

---

## File Storage

### Directory Structure

```
uploads/
├── image-1716792600000-456789.jpg
├── image-1716792500000-456790.png
├── image-1716792400000-456791.gif
└── image-1716792300000-456792.webp
```

### Filename Convention

```
image-{timestamp}-{randomNumber}.{originalExtension}

Example: image-1716792600000-456789.jpg
         ├─ "image" = field name from form
         ├─ "1716792600000" = Date.now() timestamp
         ├─ "456789" = Random number to prevent collisions
         └─ ".jpg" = Original file extension
```

---

## Request/Response Examples

### Upload Request

```
POST /api/images/upload HTTP/1.1
Content-Type: multipart/form-data

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="image"; filename="photo.jpg"
Content-Type: image/jpeg

[binary image data]
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

### Upload Response

```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "message": "Image uploaded successfully",
  "image": {
    "id": "507f1f77bcf86cd799439011",
    "filename": "image-1716792600000-456789.jpg",
    "originalName": "photo.jpg",
    "filePath": "/uploads/image-1716792600000-456789.jpg",
    "size": 45678,
    "uploadedAt": "2026-05-27T05:56:40.123Z"
  }
}
```

### Get All Images Response

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Images retrieved successfully",
  "images": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "filename": "image-1716792600000-456789.jpg",
      "originalName": "photo.jpg",
      "filePath": "/uploads/image-1716792600000-456789.jpg",
      "size": 45678,
      "uploadedAt": "2026-05-27T05:56:40.123Z"
    }
  ]
}
```

---

## Security Considerations

### File Upload Security

✅ **MIME Type Validation**: Check file type before accepting
- Allowed: image/jpeg, image/png, image/gif, image/webp

✅ **File Size Limit**: Max 5MB to prevent abuse

✅ **Unique Filenames**: Prevent directory traversal attacks

✅ **Static File Serving**: /uploads served via Express.static()

✅ **Input Sanitization**: Mongoose schema validation

### Additional Considerations

⚠️ **Authentication**: Not implemented (add JWT in future)

⚠️ **Rate Limiting**: Not implemented (add in production)

⚠️ **HTTPS**: Use in production with SSL/TLS

⚠️ **CORS**: Currently open (configure for specific origins in production)

---

## Performance Considerations

### Optimization Opportunities

1. **Image Resizing**: Use Sharp to create thumbnails
2. **Compression**: Compress images before storage
3. **Pagination**: Implement for large galleries
4. **Caching**: Add Redis for metadata cache
5. **CDN**: Serve images through CDN for production
6. **Lazy Loading**: Load images on scroll in React

### Current Bottlenecks

- No pagination (all images loaded at once)
- No compression (original files stored)
- No caching (database queried each time)
- Synchronous file operations

---

## Deployment Considerations

### Environment Variables

```
Development:
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-image-upload

Production:
NODE_ENV=production
PORT=80 or 443
MONGODB_URI=mongodb+srv://[SECURE_URI]
```

### File Storage in Production

**Current Approach (Local Disk):**
- Suitable for single server
- Issue: Not scalable across multiple instances

**Recommended Approach:**
- AWS S3 or similar cloud storage
- Azure Blob Storage
- Google Cloud Storage

### Reverse Proxy

Recommended: Nginx or Apache
```nginx
upstream nodejs {
  server 127.0.0.1:5000;
}

server {
  listen 80;
  server_name yourdomain.com;

  location / {
    proxy_pass http://nodejs;
  }
}
```

---

## Monitoring & Logging

### Current State

- Console logging for errors
- No centralized logging
- No performance monitoring

### Recommendations

- Use Winston or Bunyan for logging
- Implement Sentry for error tracking
- Add application performance monitoring (APM)
- Monitor file system usage

---

## Future Enhancements

### Features

- [ ] Image metadata extraction (EXIF, dimensions)
- [ ] Image search functionality
- [ ] User authentication & authorization
- [ ] Image sharing links
- [ ] Image editing tools
- [ ] Batch upload
- [ ] Image tagging/categorization
- [ ] Download image functionality

### Scalability

- [ ] Pagination
- [ ] Image compression
- [ ] CDN integration
- [ ] Multi-region deployment
- [ ] Database replication

### Security

- [ ] JWT authentication
- [ ] Rate limiting
- [ ] CSRF protection
- [ ] Input validation
- [ ] SQL injection prevention

---

## Development Workflow

### Making Changes

1. Create feature branch: `git checkout -b feature/xyz`
2. Make changes to backend OR frontend
3. Test changes locally
4. Commit changes: `git commit -m "descriptive message"`
5. Push to GitHub: `git push origin feature/xyz`
6. Create pull request
7. Merge to main after review

### Git Workflow

```
master (production)
   ↑
   └── develop (integration)
        ↑
        └── feature/xyz (development)
```

---

## Testing Checklist

- [ ] Upload image via React UI
- [ ] Upload image via cURL
- [ ] View gallery
- [ ] Fetch specific image
- [ ] Delete image
- [ ] Test with large file (>5MB)
- [ ] Test with invalid file type
- [ ] Test with slow network
- [ ] Test error handling
- [ ] Test concurrent uploads

---

## Troubleshooting Guide

See [SETUP.md](./SETUP.md) and [TESTING.md](./TESTING.md) for detailed troubleshooting.

---

## Resources & Documentation

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Multer Documentation](https://github.com/expressjs/multer)
- [Mongoose Documentation](https://mongoosejs.com/)
