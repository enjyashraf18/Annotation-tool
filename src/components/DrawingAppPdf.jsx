
import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';

const DrawingAppPdf = ({ file, onSelection, zoomLevel, allowDrawing, onCapture, onDelete, pageNumber }) => {
    const [tool, setTool] = useState('rectangle');
    const [shapes, setShapes] = useState([]);
    const [activeShapeIndex, setActiveShapeIndex] = useState(null);
    const isDrawing = useRef(false);
    const startPoint = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        if (activeShapeIndex !== null || !allowDrawing) return;

        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        startPoint.current = pos;

        setShapes([...shapes, { tool, x: pos.x, y: pos.y, width: 0, height: 0 }]);
        setActiveShapeIndex(shapes.length);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current || activeShapeIndex === null) return;

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        const newShapes = shapes.slice();
        let lastShape = newShapes[activeShapeIndex];

        // Adjusting width, height, x, and y based on the direction of drawing
        if (point.x < startPoint.current.x) {
            lastShape.x = point.x;
            lastShape.width = startPoint.current.x - point.x;
        } else {
            lastShape.width = point.x - startPoint.current.x;
        }

        if (point.y < startPoint.current.y) {
            lastShape.y = point.y;
            lastShape.height = startPoint.current.y - point.y;
        } else {
            lastShape.height = point.y - startPoint.current.y;
        }

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
            onDelete();  // Call delete handler passed from parent
        }
        setActiveShapeIndex(null);
    };

    const adjustPosition = (x, y, offsetX, offsetY, stageWidth, stageHeight) => {
        const newX = x + offsetX > stageWidth - 60 ? stageWidth - 60 : x + offsetX;
        const newY = y + offsetY > stageHeight - 20 ? stageHeight - 20 : y + offsetY;
        return { x: newX, y: newY };
    };

    return (
        <div className='konva-div' id="konva-container">
            <Stage
                // width={imageWidth}
                // height={imageHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                scaleX={zoomLevel}
                scaleY={zoomLevel}
            >
                <Layer>
                    {shapes.map((shape, i) => (
                        <Group key={i}>
                            <Rect
                                x={shape.x}
                                y={shape.y}
                                // width={shape.width}
                                // height={shape.height}
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
                                    <Text
                                        text="Capture"
                                        fontSize={15}
                                        fill="#00f"
                                        // {...adjustPosition(shape.x, shape.y, 0, -20, imageWidth, imageHeight)}
                                        onClick={handleCapture}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <Text
                                        text="Delete"
                                        fontSize={15}
                                        fill="#f00"
                                        // {...adjustPosition(shape.x, shape.y, 60, -20, imageWidth, imageHeight)}
                                        onClick={handleDelete}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </>
                            )}
                        </Group>
                    ))}
                </Layer>
            </Stage>
        </div>
    );
};

export default DrawingAppPdf;
