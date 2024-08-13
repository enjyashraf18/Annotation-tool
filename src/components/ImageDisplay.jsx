import { useEffect, useRef } from "react";

const ImageDisplay = ({
  imageData,
  zoomLevel,
  onSelection,
  imageSize,
  setImageSize,
  setImageWidth,
  setImageHeight,
}) => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageData) {
      const img = new Image();
      img.onload = () => {
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = imageData;
      console.log("Test");
    }
  }, [imageData]);

  useEffect(() => {
    if (imageRef.current && imageSize.width && imageSize.height) {
      imageRef.current.style.width = `${imageSize.width * zoomLevel}px`;
      imageRef.current.style.minWidth = `${imageSize.width * zoomLevel}px`;
      imageRef.current.style.height = `${imageSize.height * zoomLevel}px`;
    }
  }, [zoomLevel, imageSize]);

  useEffect(() => {
    const handleResize = (entries) => {
      if (entries[0].contentRect) {
        setImageWidth(entries[0].contentRect.width);
        setImageHeight(entries[0].contentRect.height);
      }
    };

    const observer = new ResizeObserver((entries) => {
      handleResize(entries);
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div
      className="image-container"
      style={{
        // overflow: 'auto',
        position: "relative",
        height: "72vh",
        display: "flex",
      }}
    >
      <img
        ref={imageRef}
        src={imageData}
        alt="Uploaded"
        style={{ margin: "auto" }}
        className="img-page"
      />

      {/* <DrawingApp onSelection={onSelection} /> */}
    </div>
  );
};

export default ImageDisplay;