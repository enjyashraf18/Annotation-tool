import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Group } from "react-konva";
import { Html } from "react-konva-utils";
import { TbCaptureFilled } from "react-icons/tb";
import { TbCaptureOff } from "react-icons/tb";

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
  const [shapes, setShapes] = useState([]);
  const [activeShapeIndex, setActiveShapeIndex] = useState(null);
  const isDrawing = useRef(false);
  let startPoint = useRef({ x: 0, y: 0 });

  useEffect(() => {
    console.log("Image source changed:", file);
    setShapes([]);
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
    const shapesLnegth = shapes.length;

    setShapes([...shapes, { tool, x: pos.x, y: pos.y, width: 0, height: 0 }]);
    setActiveShapeIndex(shapesLnegth);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current || activeShapeIndex === null) return;

    const stage = e.target.getStage();
    let point = stage.getPointerPosition();
    const transform = stage.getAbsoluteTransform().copy();
    point = transform.invert().point(point);

    // point.x = Math.max(0, Math.max(point.x / zoomLevel, imageWidth));
    // point.y = Math.max(0, Math.max(point.y / zoomLevel, imageHeight));
    const newShapes = JSON.parse(JSON.stringify(shapes));

    newShapes[activeShapeIndex].width = point.x - startPoint.current.x;
    newShapes[activeShapeIndex].height = point.y - startPoint.current.y;

    console.log(startPoint.current.x, startPoint.current.y);

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
    onSelection(shapes[activeShapeIndex]);
  };

  const handleDelete = () => {
    const newShapes = shapes.slice();
    if (activeShapeIndex !== null) {
      newShapes.splice(activeShapeIndex, 1);
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
          {shapes.map((shape, i) => (
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
                    x={shape.x + shape.width + 10} // Adjust position as needed
                    y={shape.y - 20} // Adjust position as needed
                    width={80} // Adjust size as needed
                    height={40} // Adjust size as needed
                    fill="white"
                    stroke="black"
                  />
                  <Html>
                    <div
                      style={{
                        position: "absolute",
                        top: shape.y - 20, // Adjust positioning based on zoom
                        left: shape.x + shape.width + 10, // Adjust positioning based on zoom
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

{
  /* <Text
                                        text="Capture"
                                        fontSize={15}
                                        fill="#00f"
                                        {...adjustPosition(shape.x, shape.y, 0, -20, imageWidth, imageHeight)}
                                        onClick={handleCapture}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <Text
                                        text="Delete"
                                        fontSize={15}
                                        fill="#f00"
                                        {...adjustPosition(shape.x, shape.y, 60, -20, imageWidth, imageHeight)}
                                        onClick={handleDelete}
                                        style={{ cursor: 'pointer' }}
                                    /> */
}
