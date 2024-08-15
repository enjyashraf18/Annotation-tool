import { createContext, useContext, useState } from "react";

const ShapeContext = createContext();


export const ShapeProvider = ({ children }) => {
  const [shapes, setShapes] = useState([]);
  const [activeShapeIndex, setActiveShapeIndex] = useState(null);

  const handleCapturee = (onCapture, onSelection) => {
    onCapture();
    setActiveShapeIndex(null);
    if (activeShapeIndex !== null) {
      onSelection(shapes[activeShapeIndex]);
    }
  };

  const handleDeletee = (onDelete) => {
    console.log('ahhhhhhhhhhh')
    const newShapes = shapes.slice();
    if (activeShapeIndex !== null) {
      newShapes.splice(activeShapeIndex, 1);
      setShapes(newShapes);
      onDelete();
    }
    setActiveShapeIndex(null);
  };

  return (
    <ShapeContext.Provider
      value={{
        shapes,
        setShapes,
        activeShapeIndex,
        setActiveShapeIndex,
        handleCapturee,
        handleDeletee,
      }}
    >
      {children}
    </ShapeContext.Provider>
  );
};

// Custom hook to use the shape context
export const useShapes = () => useContext(ShapeContext);
