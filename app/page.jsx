'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageUpload from '../components/ImageUpload';
import ClassificationResults from '../components/ClassificationResults';
import LoadingIndicator from '../components/LoadingIndicator';
import { loadModel, classifyImage } from '../utils/modelLoader';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Load the model on component mount
  useEffect(() => {
    async function initModel() {
      try {
        console.log("Initializing model...");
        await loadModel();
        console.log("Model initialization completed");
        setModelLoaded(true);
      } catch (err) {
        console.error('Failed to load model:', err);
        setError('Failed to load the classification model. Please try refreshing the page.');
      }
    }

    initModel();
  }, []);

  const handleImageSelected = (file) => {
    console.log("Image selected in page component:", file);
    setSelectedImage(file);
    setResults(null);
    setError(null);
  };

  const handleClassify = async () => {
    if (!selectedImage) {
      console.log("No image selected");
      setError("Please select an image first");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      console.log("Starting classification process");

      // Create an image element
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = async () => {
        try {
          console.log("Image loaded successfully");
          console.log("Image dimensions:", img.width, "x", img.height);
          
          // Simple check to ensure image has loaded properly
          if (img.width === 0 || img.height === 0) {
            throw new Error("Image failed to load properly - zero dimensions");
          }
          
          console.log("Classifying image...");
          try {
            const classificationResults = await classifyImage(img);
            console.log("Classification complete:", classificationResults);
            setResults(classificationResults);
          } catch (modelError) {
            console.error("Model classification error:", modelError);
            setError("Error using the classification model. Please check that model files are correctly placed in the public directory. Error: " + modelError.message);
          }
          
          // Cleanup object URL
          URL.revokeObjectURL(img.src);
          
        } catch (err) {
          console.error('Classification error:', err);
          setError('Error classifying the image. Please try a different image format or check that model files are correctly placed.');
        } finally {
          setIsLoading(false);
        }
      };
      
      img.onerror = (e) => {
        console.error("Error loading image:", e);
        setError('Failed to load the image. Please try a different image format (JPG or PNG recommended).');
        setIsLoading(false);
        // Cleanup object URL on error too
        URL.revokeObjectURL(img.src);
      };
      
      // Create an object URL for the file
      const objectUrl = URL.createObjectURL(selectedImage);
      console.log("Created object URL for image:", objectUrl);
      img.src = objectUrl;
      
    } catch (err) {
      console.error('Error processing image:', err);
      setError('An error occurred while processing the image. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="title mb-2">Waste Classification</h1>
            <p className="text-lg text-gray-600">
              Upload a photo of waste to find out how to properly dispose of it
            </p>
          </div>
          
          <div className="card mb-8">
            <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
            <ImageUpload 
              onImageSelected={handleImageSelected} 
              isProcessing={isLoading}
            />
            
            {selectedImage && !isLoading && (
              <div className="mt-4 flex justify-center">
                <button 
                  onClick={handleClassify}
                  className="btn-primary"
                >
                  Classify Waste
                </button>
              </div>
            )}
            
            {isLoading && <LoadingIndicator />}
            
            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            
            {results && <ClassificationResults results={results} />}
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                This app uses a machine learning model trained to recognize different types of waste materials.
                The model can identify the following categories:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Cardboard</li>
                <li>Glass</li>
                <li>Metal</li>
                <li>Paper</li>
                <li>Plastic</li>
                <li>Trash - Non-recyclable items</li>
              </ul>
              <p>
                To get started, simply upload a clear image of the waste item you want to classify.
                The AI model will analyze the image and provide a classification result.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 