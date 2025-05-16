import { useState } from 'react';
import { FaUpload, FaTrash } from 'react-icons/fa';

export default function ImageUpload({ onImageSelected, isProcessing }) {
  const [preview, setPreview] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  
  const handleFileChange = (event) => {
    try {
      const file = event.target.files[0];
      if (!file) {
        console.log("No file selected");
        return;
      }
      
      console.log("File selected:", file.name, "type:", file.type, "size:", file.size + " bytes");
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        console.error("Invalid file type:", file.type);
        setUploadError("Please select an image file (JPEG, PNG, etc.)");
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        console.error("File too large:", file.size);
        setUploadError("Image file is too large (max 10MB)");
        return;
      }
      
      setUploadError(null);
      
      const reader = new FileReader();
      reader.onload = () => {
        console.log("File loaded successfully");
        setPreview(reader.result);
        onImageSelected(file);
      };
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        setUploadError("Error reading file. Please try another image.");
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error handling file upload:", error);
      setUploadError("An unexpected error occurred. Please try again.");
    }
  };
  
  const clearImage = () => {
    setPreview(null);
    setUploadError(null);
    onImageSelected(null);
  };

  return (
    <div className="w-full">
      <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors">
        {preview ? (
          <div className="relative w-full">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-80 max-w-full mx-auto rounded-lg object-contain"
              onError={() => {
                console.error("Error loading preview image");
                setUploadError("Error displaying image preview. Please try another image.");
                clearImage();
              }}
            />
            {!isProcessing && (
              <button 
                onClick={clearImage} 
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                type="button"
              >
                <FaTrash className="h-4 w-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Select an image to upload
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Supported formats: JPEG, PNG, GIF
            </p>
            <div className="mt-4">
              <label className="btn-primary cursor-pointer">
                Select File
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  disabled={isProcessing}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}
      </div>
      
      {uploadError && (
        <div className="mt-2 text-sm text-red-600">
          {uploadError}
        </div>
      )}
    </div>
  );
} 