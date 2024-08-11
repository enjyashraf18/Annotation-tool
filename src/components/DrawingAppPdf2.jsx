// import React, { useState, useRef, useEffect } from 'react';

// import { Stage, Layer, Rect, Group } from 'react-konva';

// import { Html } from 'react-konva-utils';

// import { TbCaptureFilled, TbCaptureOff } from "react-icons/tb";
// export function AnnotationLayerPdf ({pageDimensions, zoomLevel, allowDrawing, onSelection}) {
//     const [shapes, setShapes] = useState([]);
//     const [activeShapeIndex, setActiveShapeIndex] = useState(null);
//     const isDrawing = useRef(false);

//     const handleMouseDown = (e) => {
//         console.log(activeShapeIndex, allowDrawing)
//         if (activeShapeIndex !== null || !allowDrawing) return;

//         console.log("Alloo")

//         isDrawing.current = true;
//         const stage = e.target.getStage();
//         let pos = stage.getPointerPosition();
//         const transform = stage.getAbsoluteTransform();
//         pos = transform.invert().point(pos);

//         setShapes([...shapes, { x: pos.x, y: pos.y, width: 0, height: 0 }]);
//         setActiveShapeIndex(shapes.length);
//     };

//     const handleMouseMove = (e) => {
//         if (!isDrawing.current || activeShapeIndex === null) return;

//         const stage = e.target.getStage();
//         let pos = stage.getPointerPosition();
//         const transform = stage.getAbsoluteTransform();
//         pos = transform.invert().point(pos);

//         const newShapes = structuredClone(shapes);
//         const lastShape = newShapes[activeShapeIndex];

//         lastShape.width = pos.x - lastShape.x;
//         lastShape.height = pos.y - lastShape.y;

//         setShapes(newShapes);
//     };


//     const handleMouseUp = () => {
//         if (!isDrawing.current) return;
//         isDrawing.current = false;
//         onSelection(shapes);
//     };

//     const handleCapture = () => {
//         onCapture();
//         onSelection(shapes[activeShapeIndex]);
//         setActiveShapeIndex(null);
//     };

//     const handleDelete = () => {
//         const newShapes = shapes.slice();
//         if (activeShapeIndex !== null) {
//             newShapes.splice(activeShapeIndex, 1);
//             setShapes(newShapes);
//         }
//         setActiveShapeIndex(null);
//     };

//     return (
//         <div
//             style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 width: pageDimensions.width,
//                 height: pageDimensions.height,
//             }}
//         >
//             <Stage
//                 width={pageDimensions.width}
//                 height={pageDimensions.height}
//                 onPointerDown={handleMouseDown}
//                 onPointerMove={handleMouseMove}
//                 onPointerUp={handleMouseUp}
//                 scaleX={zoomLevel}
//                 scaleY={zoomLevel}
//             >
//                 <Layer>
//                     {shapes.map((shape, i) => (
//                         <Group key={i}>
//                             <Rect
//                                 x={shape.x}
//                                 y={shape.y}
//                                 width={shape.width}
//                                 height={shape.height}
//                                 fill="transparent"
//                                 stroke={i === activeShapeIndex ? "#00f" : "#df4b26"}
//                                 strokeWidth={2}
//                                 onClick={() => setActiveShapeIndex(i)}
//                                 draggable={i === activeShapeIndex}
//                                 onDragEnd={(e) => {
//                                     const newShapes = [...shapes];
//                                     newShapes[i].x = e.target.x();
//                                     newShapes[i].y = e.target.y();
//                                     setShapes(newShapes);
//                                 }}
//                             />
//                             {i === activeShapeIndex && (
//                                 <>
//                                     <Rect
//                                         x={shape.x + shape.width + 10}
//                                         y={shape.y - 20}
//                                         width={80}
//                                         height={40}
//                                         fill="white"
//                                         stroke="black"
//                                     />
//                                     <Html>
//                                         <div style={{
//                                             position: 'absolute',
//                                             top: shape.y - 20,
//                                             left: shape.x + shape.width + 10,
//                                             display: 'flex',
//                                             gap: '5px'
//                                         }}>
//                                             <button className='capture-button' onClick={handleCapture}>
//                                                 <TbCaptureFilled />
//                                             </button>
//                                             <button className='delete-button' onClick={handleDelete}>
//                                                 <TbCaptureOff />
//                                             </button>
//                                         </div>
//                                     </Html>
//                                 </>
//                             )}
//                         </Group>
//                     ))}
//                 </Layer>
//             </Stage>

//         </div>)

// }