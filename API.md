# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently, no authentication is required. (Can be added with JWT in future versions)

---

## Endpoints

### 1. Upload Image

**Endpoint:** `POST /api/images/upload`

**Description:** Upload a single image file to the server and save metadata to MongoDB.

**Content-Type:** `multipart/form-data`

**Request:**
```bash
curl -X POST http://localhost:5000/api/images/upload \
  -F "image=@/path/to/image.jpg"
```

**Request Body:**
- `image` (file, required): Image file (JPEG, PNG, GIF, WebP)

**Constraints:**
- File size: Max 5MB
- Supported formats: JPEG, PNG, GIF, WebP

**Response (201 Created):**
```json
{
  "message": "Image uploaded successfully",
  "image": {
    "id": "507f1f77bcf86cd799439011",
    "filename": "image-1716792600000-456789.jpg",
    "originalName": "test-image.jpg",
    "filePath": "/uploads/image-1716792600000-456789.jpg",
    "size": 45678,
    "uploadedAt": "2026-05-27T05:56:40.123Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "No file uploaded"
}
```

**Error Response (413 Payload Too Large):**
```json
{
  "error": "File size exceeds limit"
}
```

---

### 2. Get All Images

**Endpoint:** `GET /api/images`

**Description:** Retrieve all uploaded images sorted by latest upload first.

**Query Parameters:** None

**Request:**
```bash
curl http://localhost:5000/api/images
```

**Response (200 OK):**
```json
{
  "message": "Images retrieved successfully",
  "images": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "filename": "image-1716792600000-456789.jpg",
      "originalName": "test-image.jpg",
      "filePath": "/uploads/image-1716792600000-456789.jpg",
      "size": 45678,
      "uploadedAt": "2026-05-27T05:56:40.123Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "filename": "image-1716792500000-456790.png",
      "originalName": "another-image.png",
      "filePath": "/uploads/image-1716792500000-456790.png",
      "size": 56789,
      "uploadedAt": "2026-05-27T05:54:40.123Z"
    }
  ]
}
```

**Pagination:** Not currently implemented. All images are returned.

---

### 3. Get Image by ID

**Endpoint:** `GET /api/images/:id`

**Description:** Retrieve a single image by its MongoDB ID.

**URL Parameters:**
- `id` (string, required): MongoDB image ID

**Request:**
```bash
curl http://localhost:5000/api/images/507f1f77bcf86cd799439011
```

**Response (200 OK):**
```json
{
  "message": "Image retrieved successfully",
  "image": {
    "_id": "507f1f77bcf86cd799439011",
    "filename": "image-1716792600000-456789.jpg",
    "originalName": "test-image.jpg",
    "filePath": "/uploads/image-1716792600000-456789.jpg",
    "size": 45678,
    "uploadedAt": "2026-05-27T05:56:40.123Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Image not found"
}
```

---

### 4. Delete Image

**Endpoint:** `DELETE /api/images/:id`

**Description:** Delete an image from the server and database.

**URL Parameters:**
- `id` (string, required): MongoDB image ID

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/images/507f1f77bcf86cd799439011
```

**Response (200 OK):**
```json
{
  "message": "Image deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Image not found"
}
```

**Error Response (500 Server Error):**
```json
{
  "error": "Failed to delete image"
}
```

---

### 5. Health Check

**Endpoint:** `GET /api/health`

**Description:** Check if the server is running and responsive.

**Request:**
```bash
curl http://localhost:5000/api/health
```

**Response (200 OK):**
```json
{
  "message": "Server is running"
}
```

---

## Response Format

All API responses follow a consistent JSON format:

**Success Response:**
```json
{
  "message": "Operation completed successfully",
  "data": { /* operation specific data */ }
}
```

**Error Response:**
```json
{
  "error": "Error description"
}
```

---

## HTTP Status Codes

| Status | Meaning | Usage |
|--------|---------|-------|
| 200 | OK | Successful GET/DELETE |
| 201 | Created | Successful POST upload |
| 400 | Bad Request | Invalid input or missing file |
| 404 | Not Found | Image ID doesn't exist |
| 413 | Payload Too Large | File exceeds size limit |
| 500 | Server Error | Unexpected server error |

---

## File Access

**Uploaded files are accessible at:**
```
http://localhost:5000/uploads/{filename}
```

**Example:**
```html
<img src="http://localhost:5000/uploads/image-1716792600000-456789.jpg" alt="Uploaded Image" />
```

---

## Database Schema

**Image Collection:**
```javascript
{
  _id: ObjectId,
  filename: String,          // Generated unique filename
  originalName: String,      // Original uploaded filename
  filePath: String,         // URL path to access image
  size: Number,             // File size in bytes
  uploadedAt: Date          // Timestamp of upload
}
```

---

## Rate Limiting

Currently not implemented. Can be added with `express-rate-limit` middleware.

---

## CORS Configuration

The API accepts requests from all origins (configured in Express):
```javascript
app.use(cors());
```

For production, configure specific origins:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

---

## Error Handling

All errors include descriptive messages. Common errors:

| Error | Cause | Solution |
|-------|-------|----------|
| "No file uploaded" | Missing file in request | Include 'image' field in form-data |
| "Only image files are allowed" | Invalid file type | Upload JPEG, PNG, GIF, or WebP |
| "File size exceeds limit" | File > 5MB | Compress or reduce file size |
| "Image not found" | Invalid ID | Check image ID exists in database |
| "Failed to upload image" | Server error | Check server logs |

---

## Client Integration

### JavaScript/Fetch Example:
```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);

const response = await fetch('/api/images/upload', {
  method: 'POST',
  body: formData
});

const data = await response.json();
```

### JavaScript/Axios Example:
```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);

const response = await axios.post('/api/images/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

---

## Version History

- **v1.0.0** (2026-05-27): Initial release with core upload functionality
