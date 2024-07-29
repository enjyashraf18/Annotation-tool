import React from 'react';

const SelectedAreaDisplay = ({ selectedArea, imageData }) => {
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
        <img
          src={imageData}
          alt="Selected Area"
          style={{
            position: 'absolute',
            left: -selectedArea.x,
            top: -selectedArea.y,
            width: 'auto',
            height: 'auto',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
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
