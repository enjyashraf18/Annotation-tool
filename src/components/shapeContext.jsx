import React, { createContext, useContext, useState } from 'react';

// Create the context
const ShapeContext = createContext();

// Create the provider component
export const ShapeProvider = ({ children }) => {
    const [shapes, setShapes] = useState([]);

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
        <ShapeContext.Provider value={{ handleCapturee, handleDeletee, shapes, setShapes }}>
            {children}
        </ShapeContext.Provider>
    );
};

// Custom hook to use the ShapeContext
export const useShapeContext = () => useContext(ShapeContext);
