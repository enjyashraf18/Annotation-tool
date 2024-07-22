

import React, { useState, useEffect, useRef } from "react";

const ImageDisplay = ({ imageData, zoomLevel }) => {
  const imageRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (imageData) {
      const img = new Image();
      img.onload = () => {
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = imageData;
    }
  }, [imageData]);

  useEffect(() => {
    if (imageRef.current && imageSize.width && imageSize.height) {
      imageRef.current.style.width = `${imageSize.width * zoomLevel}px`;
      imageRef.current.style.minWidth = `${imageSize.width * zoomLevel}px`;
      imageRef.current.style.height = `${imageSize.height * zoomLevel}px`;
    }
  }, [zoomLevel, imageSize]);

  return (
    <div
      className="image-container"
      style={{
        overflow: 'auto',
        position: 'relative',
        height: '72vh',
        display: 'flex',
      }}
    >
      <img
        ref={imageRef}
        src={imageData}
        alt="Uploaded"
        style={{ margin: "auto" }}
        className="img-page"
      />
    </div>
  );
};

export default ImageDisplay;


