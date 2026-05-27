import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('/api/images');
      setImages(response.data.images);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    setUploading(true);
    try {
      await axios.post('/api/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Image uploaded successfully!');
      setSelectedFile(null);
      fetchImages();
    } catch (error) {
      setMessage('Error uploading image: ' + (error.response?.data?.error || error.message));
    }
    setUploading(false);
  };

  const handleDelete = async (imageId) => {
    try {
      await axios.delete(`/api/images/${imageId}`);
      setMessage('Image deleted successfully');
      fetchImages();
    } catch (error) {
      setMessage('Error deleting image');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Image Upload Gallery</h1>
        
        <div className="upload-section">
          <h2>Upload New Image</h2>
          <div className="upload-form">
            <input 
              type="file" 
              onChange={handleFileSelect}
              accept="image/*"
              id="file-input"
            />
            <button 
              onClick={handleUpload} 
              disabled={uploading || !selectedFile}
              className="upload-btn"
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>
          {message && <p className="message">{message}</p>}
        </div>

        <div className="gallery-section">
          <h2>Gallery ({images.length})</h2>
          <div className="gallery">
            {images.map((image) => (
              <div key={image._id} className="gallery-item">
                <img src={image.filePath} alt={image.originalName} />
                <div className="image-info">
                  <p className="filename">{image.originalName}</p>
                  <p className="size">{(image.size / 1024).toFixed(2)} KB</p>
                  <button 
                    onClick={() => handleDelete(image._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {images.length === 0 && <p className="no-images">No images uploaded yet</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
