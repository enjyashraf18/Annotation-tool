import React, { useState } from 'react';
import DrawingApp from './DrawingApp';
import AddSample from './AddSample';

const ParentComponent = () => {
  const [selectedArea, setSelectedArea] = useState([]);
  const [isAddSampleVisible, setIsAddSampleVisible] = useState(false);
  const [imageData, setImageData] = useState(null); // You can set this to the image data if needed

  const handleSelection = (shapes) => {
    setSelectedArea(shapes);
  };

  const handleCapture = () => {
    setIsAddSampleVisible(true);
  };

  return (
    <div>
      {!isAddSampleVisible ? (
        <DrawingApp onSelection={handleSelection} onCapture={handleCapture} imageSize={{ width: 800, height: 600 }} />
      ) : (
        <AddSample selectedArea={selectedArea} imageData={imageData} />
      )}
    </div>
  );
};

export default ParentComponent;
