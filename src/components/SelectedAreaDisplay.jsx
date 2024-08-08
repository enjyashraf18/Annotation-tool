import { useEffect, useRef } from "react";

const SelectedAreaDisplay = ({ selectedArea, imageData }) => {
  const destRef = useRef(null);

  useEffect(() => {
    if (selectedArea && imageData) {
      const img = new Image();
      img.src = imageData;
      img.onload = () => {
        const context = destRef.current.getContext("2d");
        const scale = selectedArea.scale || 1;

        destRef.current.width = selectedArea.width * scale;
        destRef.current.height = selectedArea.height * scale;

        context.clearRect(0, 0, destRef.current.width, destRef.current.height);

        context.drawImage(
          img,
          selectedArea.x,
          selectedArea.y,
          selectedArea.width,
          selectedArea.height,
          0,
          0,
          selectedArea.width * scale,
          selectedArea.height * scale
        );
      };
    }
  }, [selectedArea, imageData]);

  if (!selectedArea || !imageData) return null;

  return (
    <div className="selected-area-display">
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "auto",
          height: "auto",
        }}
      >
        <canvas
          ref={destRef}
          style={{
            width: "100%",
            height: "230px",
          }}
        />
      </div>
    </div>
  );
};

export default SelectedAreaDisplay;
