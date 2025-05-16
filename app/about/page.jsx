'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FaLeaf, FaRecycle, FaTrash, FaGlobe } from 'react-icons/fa';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="title mb-2">About This Project</h1>
            <p className="text-lg text-gray-600">
              Learn more about our waste classification app and its mission
            </p>
          </div>
          
          <div className="card mb-8">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The Waste Classification App aims to help individuals properly sort their waste by leveraging 
                artificial intelligence. By correctly identifying waste materials, we can improve recycling 
                efficiency and reduce landfill waste.
              </p>
              <p>
                Our model is trained to recognize six common waste categories: cardboard, glass, metal, paper, 
                plastic, and general trash. This allows users to make more informed decisions about how to 
                dispose of their waste items.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card flex flex-col items-center text-center">
              <FaGlobe className="h-12 w-12 text-primary-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Environmental Impact</h3>
              <p className="text-gray-700">
                Proper waste sorting can significantly reduce the amount of recyclable materials that end up 
                in landfills, helping to conserve natural resources and minimize pollution.
              </p>
            </div>
            
            <div className="card flex flex-col items-center text-center">
              <FaLeaf className="h-12 w-12 text-primary-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sustainable Future</h3>
              <p className="text-gray-700">
                By promoting responsible waste management, we contribute to a more sustainable future for 
                our planet and future generations.
              </p>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Technology</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The model is implemented using TensorFlow.js, which allows it to run directly in your web 
                browser without sending your images to a server, ensuring privacy and fast performance.
              </p>
              <p>
                The web application is built using Next.js and React, with a responsive design that works 
                across desktop and mobile devices.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 