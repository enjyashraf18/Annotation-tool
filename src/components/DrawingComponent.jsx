// src/components/DrawingComponent.jsx
import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

const DrawingComponent = ({ onSelection }) => {
  const [rectangles, setRectangles] = useState([]);
  const [newRect, setNewRect] = useState(null);
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const { x, y } = e.target.getStage().getPointerPosition();
    setNewRect({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const { x, y } = e.target.getStage().getPointerPosition();
    const width = x - newRect.x;
    const height = y - newRect.y;
    setNewRect({ ...newRect, width, height });
  };

  const handleMouseUp = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    setRectangles([...rectangles, newRect]);
    onSelection(newRect);
    setNewRect(null);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}
    >
      <Layer>
        {rectangles.map((rect, i) => (
          <Rect
            key={i}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            stroke="red"
          />
        ))}
        {newRect && (
          <Rect
            x={newRect.x}
            y={newRect.y}
            width={newRect.width}
            height={newRect.height}
            stroke="red"
          />
        )}
      </Layer>
    </Stage>
  );
};

export default DrawingComponent;
