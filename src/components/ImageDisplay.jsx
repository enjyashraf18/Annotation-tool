import React, { useState, useRef } from "react";

const ImageDisplay = ({ imageData }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const [verticalOffset, setVerticalOffset] = useState(0);

  const imageRef = useRef(null);

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(0.1, zoomLevel - 0.1)); // Ensure zoom level doesn't go below 0.1
  };

  const handleHorizontalChange = (e) => {
    setHorizontalOffset(parseInt(e.target.value));
  };

  const handleVerticalChange = (e) => {
    setVerticalOffset(parseInt(e.target.value));
  };

  return (
    <>
      <div>
        <div className="image-container" style={{ overflow: "hidden", position: "relative", width: "500px", height: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              transform: `scale(${zoomLevel}) translate(${horizontalOffset}px, ${verticalOffset}px)`,
              transformOrigin: "center",
              position: "absolute",
              down: "25%",
              right: "25%",
              left: "25%",
              top: "25%",
              marginLeft: `-${(imageRef.current ? imageRef.current.width * zoomLevel : 0) / 2}px`,
              marginTop: `-${(imageRef.current ? imageRef.current.height * zoomLevel : 0) / 2}px`,
            }}
          >
            <img
              ref={imageRef}
              src={imageData}
              alt="Uploaded"
              style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          </div>
        </div>
        <footer>
          <div className="slider-container">
            <div className="slider-wrapper">
              <input
                type="range"
                min={-imageRef.current?.width * (zoomLevel - 1)}
                max={imageRef.current?.width * (zoomLevel - 1)}
                value={horizontalOffset}
                onChange={handleHorizontalChange}
                className="slider"
                orient="horizontal"
              />
              <div className="slider-label">Horizontal</div>
            </div>
            <div className="slider-wrapper">
              <input
                type="range"
                min={-imageRef.current?.height * (zoomLevel - 1)}
                max={imageRef.current?.height * (zoomLevel - 1)}
                value={verticalOffset}
                onChange={handleVerticalChange}
                className="slider"
                orient="vertical"
              />
              <div className="slider-label">Vertical</div>
            </div>
          </div>
          <hr />
          <div className="zoom-buttons">
            <button onClick={handleZoomIn}>Zoom In</button>
            <button onClick={handleZoomOut}>Zoom Out</button>
            <p>Zoom Level: {Math.round(zoomLevel * 100)}%</p>
            </div>
        </footer>
      </div>
    </>
  );
};

export default ImageDisplay;
