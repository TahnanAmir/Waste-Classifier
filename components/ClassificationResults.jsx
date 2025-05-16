import { useState, useEffect } from 'react';
import {
  FaRecycle,
  FaGlassWhiskey,
  FaTrash,
  FaNewspaper,
  FaBoxOpen,
  FaQuestion
} from 'react-icons/fa';

const wasteTypeInfo = {
  cardboard: {
    icon: <FaBoxOpen className="h-6 w-6" />,
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Cardboard is recyclable and should be flattened before disposal.'
  },
  glass: {
    icon: <FaGlassWhiskey className="h-6 w-6" />,
    color: 'bg-blue-100 text-blue-800',
    description: 'Glass is 100% recyclable and can be recycled endlessly without loss in quality.'
  },
  metal: {
    icon: <FaRecycle className="h-6 w-6" />,
    color: 'bg-gray-100 text-gray-800',
    description: 'Metal items such as cans and foil can be recycled to save energy and resources.'
  },
  paper: {
    icon: <FaNewspaper className="h-6 w-6" />,
    color: 'bg-green-100 text-green-800',
    description: 'Paper is recyclable, but should be clean and free of food residue.'
  },
  plastic: {
    icon: <FaRecycle className="h-6 w-6" />,
    color: 'bg-purple-100 text-purple-800',
    description: 'Plastic items should be cleaned before recycling. Check your local recycling guidelines.'
  },
  trash: {
    icon: <FaTrash className="h-6 w-6" />,
    color: 'bg-red-100 text-red-800',
    description: 'General waste that cannot be recycled and should be disposed of properly.'
  }
};

export default function ClassificationResults({ results }) {
  const [sortedResults, setSortedResults] = useState([]);

  useEffect(() => {
    if (results && results.length) {
      // Sort results by confidence (highest first)
      const sorted = [...results].sort((a, b) => b.confidence - a.confidence);
      setSortedResults(sorted);
    } else {
      setSortedResults([]);
    }
  }, [results]);

  if (!results || !results.length) {
    return null;
  }

  // Safely get the top result and handle potential undefined
  const topResult = sortedResults.length > 0 ? sortedResults[0] : null;
  
  // Only proceed if we have a valid top result
  if (!topResult) {
    return (
      <div className="mt-6 w-full">
        <div className="p-4 rounded-lg bg-yellow-100 text-yellow-800">
          No classification results available. Please try again.
        </div>
      </div>
    );
  }
  
  // Now we can safely use topResult
  const wasteType = topResult.className.toLowerCase();
  const wasteInfo = wasteTypeInfo[wasteType] || {
    icon: <FaQuestion className="h-6 w-6" />,
    color: 'bg-gray-100 text-gray-800',
    description: 'Unable to determine waste type'
  };

  return (
    <div className="mt-6 w-full">
      <div className="mb-4">
        <div className={`p-4 rounded-lg ${wasteInfo.color} flex items-start`}>
          <div className="mr-3 flex-shrink-0">
            {wasteInfo.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              This is most likely: {topResult.className}
            </h3>
            <p className="text-sm mt-1">
              {wasteInfo.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 