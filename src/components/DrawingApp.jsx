import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import Konva from 'konva';


const DrawingApp = ({ onSelection, imageSize = { width: 800, height: 600 }, zoomLevel, allowDrawing, onCapture, onDelete, imageHeight, imageWidth }) => {
    const [tool, setTool] = useState('rectangle');
    const [shapes, setShapes] = useState([]);
    const [activeShapeIndex, setActiveShapeIndex] = useState(null);
    const isDrawing = useRef(false);
    const startPoint = useRef({ x: 0, y: 0 });
    var width = window.innerWidth;
    var height = window.innerHeight;



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

        lastShape.width = point.x - startPoint.current.x;
        lastShape.height = point.y - startPoint.current.y;

        setShapes(newShapes);
    };

    const handleMouseUp = () => {
        if (!isDrawing.current) return;

        const newShapes = shapes.slice();
        isDrawing.current = false;
        onSelection(newShapes);
    };

    const handleCapture = () => {
        onCapture();
        // setActiveShapeIndex(null);
        setActiveShapeIndex(null);
        onSelection(shapes[activeShapeIndex])
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

    // useEffect(() => {
    //     // console.log('zoooooooom');
    //     const stage = document.getElementsByClassName('konva-div')[0]?.children[1];
    //     // const stage = document.getElementsByClassName('konva-div')[0];
    //     console.log(stage);
    //     if (stage) {
    //         console.log('zoooooooom');
    //         stage.scale({ x: zoomLevel, y: zoomLevel });
    //         stage.draw();
    //     }
    // }, [zoomLevel]);

    // useEffect(() => {
    //     // console.log('zoooooooom');
    //     var stage = new Konva.Stage({
    //         container: 'konva-container',
    //         width: width,
    //         height: height,
    //     });
    //     // const stage = document.getElementsByClassName('konva-div')[0];
    //     console.log(stage);
    //     if (stage) {
    //         console.log('zoooooooom');
    //         stage.scale({ x: zoomLevel, y: zoomLevel });
    //         stage.draw();
    //     }
    // }, [zoomLevel]);

    console.log(zoomLevel)
    return (
        <div className='konva-div'
            id="konva-container"
        >
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
                        <Group key={i}      >
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
                                    <Text
                                        text="Capture"
                                        fontSize={15}
                                        fill="#00f"
                                        x={shape.x}
                                        y={shape.y - 20}
                                        onClick={handleCapture}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <Text
                                        text="Delete"
                                        fontSize={15}
                                        fill="#f00"
                                        x={shape.x + 60}
                                        y={shape.y - 20}
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

export default DrawingApp;



