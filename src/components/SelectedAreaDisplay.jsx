import React, { useEffect, useRef } from 'react';

const SelectedAreaDisplay = ({ selectedArea, imageData }) => {

  const destRef = useRef(null);

  useEffect(() => {
    if (selectedArea && imageData) {
      const img = new Image();
      img.src = imageData;
      img.onload = () => {
        const context = destRef.current.getContext('2d');
        const scale = 1 / (selectedArea.scale || 1); 
        
        context.clearRect(0, 0, destRef.current.width, destRef.current.height);

        context.drawImage(
          img,
          selectedArea.x, selectedArea.y, selectedArea.width, selectedArea.height, 
          0, 0, destRef.current.width, destRef.current.height 
        );
      };
    }
  }, [selectedArea, imageData]);

  if (!selectedArea || !imageData) return null;

  return (
    <div className="selected-area-display">
      <h3>Selected Area</h3>
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: 'auto',
        }}
      >
        <canvas
          ref={destRef}
          width={selectedArea.width}
          height={selectedArea.height}
          style={{
            width: selectedArea.width,
            height: selectedArea.height,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: selectedArea.x,
            top: selectedArea.y,
            width: selectedArea.width,
            height: selectedArea.height,
            border: '2px solid red',
          }}
        ></div>
      </div>
    </div>
  );
};

export default SelectedAreaDisplay;
