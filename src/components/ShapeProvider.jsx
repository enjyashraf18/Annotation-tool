import { createContext, useContext, useState } from "react";

const ShapeContext = createContext();


export const ShapeProvider = ({ children }) => {
  const [shapes, setShapes] = useState([]);
  const [activeShapeIndex, setActiveShapeIndex] = useState(null);

  const handleCapture = (onCapture, onSelection) => {
    onCapture();
    setActiveShapeIndex(null);
    if (activeShapeIndex !== null) {
      onSelection(shapes[activeShapeIndex]);
    }
  };

  const handleDelete = (onDelete) => {
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
        handleCapture,
        handleDelete,
      }}
    >
      {children}
    </ShapeContext.Provider>
  );
};


export const useShapes = () => useContext(ShapeContext);
