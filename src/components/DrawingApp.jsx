import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Group } from "react-konva";
import { Html } from "react-konva-utils";
import { TbCaptureFilled, TbCaptureOff } from "react-icons/tb";

const DEFAULT_PAGE_NUMBER=1;
const DrawingApp = ({
  onSelection,
  zoomLevel,
  allowDrawing,
  onCapture,
  onDelete,
  imageHeight,
  imageWidth,
  file,
}) => {
  const [tool, setTool] = useState("rectangle");
  const [shapes, setShapes] = useState({[DEFAULT_PAGE_NUMBER]: []});
  const [activeShapeIndex, setActiveShapeIndex] = useState(null);
  const isDrawing = useRef(false);
  let startPoint = useRef({ x: 0, y: 0 });

  useEffect(() => {
    console.log("Image source changed:", file);
    setShapes({[DEFAULT_PAGE_NUMBER]: []});
    setActiveShapeIndex(null);
  }, [file]);

  const handleMouseDown = (e) => {
    if (activeShapeIndex !== null || !allowDrawing) return;

    isDrawing.current = true;
    const stage = e.target.getStage();
    let pos = stage.getPointerPosition();
    const transform = stage.getAbsoluteTransform().copy();
    pos = transform.invert().point(pos);
    startPoint.current = {
      x: pos.x,
      y: pos.y,
    };

    setShapes({[DEFAULT_PAGE_NUMBER]: [...shapes[DEFAULT_PAGE_NUMBER], { tool, x: pos.x, y: pos.y, width: 0, height: 0 }]});
    setActiveShapeIndex(shapes[DEFAULT_PAGE_NUMBER].length);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current || activeShapeIndex === null) return;

    const stage = e.target.getStage();
    let point = stage.getPointerPosition();
    const transform = stage.getAbsoluteTransform().copy();
    point = transform.invert().point(point);

    const newShapes = JSON.parse(JSON.stringify(shapes));
    const activeShape = newShapes[DEFAULT_PAGE_NUMBER][activeShapeIndex];

    const width = point.x - startPoint.current.x;
    const height = point.y - startPoint.current.y;

    activeShape.x = width < 0 ? point.x : startPoint.current.x;
    activeShape.y = height < 0 ? point.y : startPoint.current.y;
    activeShape.width = Math.abs(width);
    activeShape.height = Math.abs(height);

    setShapes(newShapes);
  };

  const handleMouseUp = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    onSelection(shapes);
  };

  const handleCapture = () => {
    onCapture();
    setActiveShapeIndex(null);
    onSelection(shapes[DEFAULT_PAGE_NUMBER][activeShapeIndex]);
  };

  const handleDelete = () => {
    const newShapes = structuredClone(shapes);
    if (activeShapeIndex !== null) {
      newShapes[DEFAULT_PAGE_NUMBER].splice(activeShapeIndex, 1);
      setShapes(newShapes);
      onDelete();
    }
    setActiveShapeIndex(null);
  };

  return (
    <div className="konva-div" id="konva-container">
      <Stage
        width={imageWidth}
        height={imageHeight}
        onPointerDown={handleMouseDown}
        onPointerMove={handleMouseMove}
        onPointerUp={handleMouseUp}
        scaleX={zoomLevel}
        scaleY={zoomLevel}
      >
        <Layer>
          {shapes[DEFAULT_PAGE_NUMBER].map((shape, i) => (
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
                  const newShapes = shapes.slice();
                  newShapes[i].x = e.target.x();
                  newShapes[i].y = e.target.y();
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
                      <button className="delete-button" onClick={handleDelete}>
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
  );
};

export default DrawingApp;
//edit