import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Group } from "react-konva";
import { Document, Page } from "react-pdf";
import { Html } from "react-konva-utils";
import { TbCaptureFilled, TbCaptureOff } from "react-icons/tb";

let startPoint = {
  x: 0,
  y: 0,
};


const PDFDrawingApp = ({
  file,
  pageNumber,
  zoomLevel,
  setPageNumber,
  allowDrawing,
  onCapture,
  onDelete,
  onDocumentLoadSuccess,
  onSelection,
}) => {
  const [shapes, setShapes] = useState([]);
  const [activeShapeIndex, setActiveShapeIndex] = useState(null);
  const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });
  const isDrawing = useRef(false);
  const [numPages, setNumPages] = useState(null);

  // Clear shapes and reset activeShapeIndex whenever the file or pageNumber changes
  useEffect(() => {
    setShapes([]);
    setActiveShapeIndex(null);
  }, [file, pageNumber]);

  const handleMouseDown = (e) => {
    if (activeShapeIndex !== null || !allowDrawing) return;

    isDrawing.current = true;
    const stage = e.target.getStage();
    let pos = stage.getPointerPosition();
    const transform = stage.getAbsoluteTransform();
    pos = transform.invert().point(pos);

    startPoint = pos;
    const clonedShapes = structuredClone(shapes);

    if (clonedShapes[pageNumber])
      clonedShapes[pageNumber] = [
        ...clonedShapes[pageNumber],
        { x: pos.x, y: pos.y, width: 0, height: 0 },
      ];
    else
      clonedShapes[pageNumber] = [
        { x: pos.x, y: pos.y, width: 0, height: 0 },
      ];

    setShapes(clonedShapes);
    setActiveShapeIndex(clonedShapes[pageNumber].length -1);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current || activeShapeIndex === null) return;

    const stage = e.target.getStage();
    let pos = stage.getPointerPosition();
    const transform = stage.getAbsoluteTransform();
    pos = transform.invert().point(pos);

    const newShapes = structuredClone(shapes);
    const lastShape = newShapes[pageNumber][activeShapeIndex];

    // Calculate width and height
    const width = pos.x - startPoint.x;
    const height = pos.y - startPoint.y;

    // Adjust x and y based on the direction of drawing
    lastShape.x = width < 0 ? pos.x : startPoint.x;
    lastShape.y = height < 0 ? pos.y : startPoint.y;
    lastShape.width = Math.abs(width);
    lastShape.height = Math.abs(height);

    setShapes(newShapes);
  };

  const handleMouseUp = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    onSelection(shapes);
  };

  const handleCapture = () => {
    onCapture();
    onSelection(shapes[pageNumber][activeShapeIndex]);
    setActiveShapeIndex(null);
  };

  const handleDelete = () => {
    const newShapes = structuredClone(shapes);
    if (activeShapeIndex !== null) {
      newShapes[pageNumber].splice(activeShapeIndex, 1);
      setShapes(newShapes);
      onDelete();
    }
    setActiveShapeIndex(null);
  };

  const onRenderSuccess = (pdfPage) => {
    setPageDimensions({
      width: pdfPage.originalWidth * zoomLevel,
      height: pdfPage.originalHeight * zoomLevel,
    });
  };

  return (
    <div
      className="pdf-container"
      style={{
        position: "relative",
        width: pageDimensions.width,
        height: pageDimensions.height,
      }}
    >
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => {
          setNumPages(numPages);
          onDocumentLoadSuccess(numPages);
        }}
      >
        <Page
          pageNumber={pageNumber}
          scale={zoomLevel}
          onLoadSuccess={onRenderSuccess}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          onRenderSuccess={() => {}}
        />
      </Document>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: pageDimensions.width,
          height: pageDimensions.height,
        }}
      >
        <Stage
          width={pageDimensions.width}
          height={pageDimensions.height}
          onPointerDown={handleMouseDown}
          onPointerMove={handleMouseMove}
          onPointerUp={handleMouseUp}
          scaleX={zoomLevel}
          scaleY={zoomLevel}
        >
          <Layer>
            {shapes[pageNumber]?.map((shape, i) => (
              <Group key={i}>
                <Rect
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  fill="transparent"
                  stroke={i === activeShapeIndex ? "#00f" : "#df4b26"}
                  strokeWidth={2}
                  onClick={() => setActiveShapeIndex(i)}
                  draggable={i === activeShapeIndex}
                  onDragEnd={(e) => {
                    const newShapes = [...shapes];
                    newShapes[pageNumber][i].x = e.target.x();
                    newShapes[pageNumber][i].y = e.target.y();
                    setShapes(newShapes);
                  }}
                />
                {i === activeShapeIndex && (
                  <>
                    <Rect
                      x={shape.x + shape.width + 10}
                      y={shape.y - 20}
                      width={80}
                      height={40}
                      fill="white"
                      stroke="black"
                    />
                    <Html>
                      <div
                        style={{
                          position: "absolute",
                          top: shape.y - 20,
                          left: shape.x + shape.width + 10,
                          display: "flex",
                          gap: "5px",
                        }}
                      >
                        <button
                          className="capture-button"
                          onClick={handleCapture}
                        >
                          <TbCaptureFilled />
                        </button>
                        <button
                          className="delete-button"
                          onClick={handleDelete}
                        >
                          <TbCaptureOff />
                        </button>
                      </div>
                    </Html>
                  </>
                )}
              </Group>
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default PDFDrawingApp;