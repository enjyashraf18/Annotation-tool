import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import { Html } from 'react-konva-utils';
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
    file
}) => {
    const [tool, setTool] = useState('rectangle');
    const [shapes, setShapes] = useState([]);
    const [activeShapeIndex, setActiveShapeIndex] = useState(null);
    const isDrawing = useRef(false);
    const startPoint = useRef({ x: 0, y: 0 });

    useEffect(() => {
        console.log("Image source changed:", file);
        setShapes([]);
        setActiveShapeIndex(null);
    }, [file]);

    const handleMouseDown = (e) => {
        if (activeShapeIndex !== null || !allowDrawing) return;

        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        startPoint.current = {
            x: pos.x / zoomLevel,
            y: pos.y / zoomLevel
        };

        setShapes([...shapes, { tool, x: startPoint.current.x, y: startPoint.current.y, width: 0, height: 0 }]);
        setActiveShapeIndex(shapes.length);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current || activeShapeIndex === null) return;

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        const newShapes = shapes.slice();
        let lastShape = newShapes[activeShapeIndex];

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

    const adjustPosition = (x, y, offsetX, offsetY, stageWidth, stageHeight) => {
        const newX = x + offsetX > stageWidth - 60 ? stageWidth - 60 : x + offsetX;
        const newY = y + offsetY > stageHeight - 20 ? stageHeight - 20 : y + offsetY;
        return { x: newX, y: newY };
    };

    return (
        <div className='konva-div' id="konva-container">
            <Stage
                width={imageWidth}
                height={imageHeight}
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
                                    {/* <Text
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
                                    /> */}
                                    <Html>
                                        <div style={{
                                            position: 'absolute',
                                            top: shape.y * zoomLevel - 20,
                                            left: shape.x * zoomLevel,
                                            display: 'flex',
                                            gap: '5px'
                                        }}>
                                            <button className ='capture-button'onClick={handleCapture}>
                                                <TbCaptureFilled />
                                            </button>
                                            <button className ='capture-button' onClick={handleDelete}>
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
