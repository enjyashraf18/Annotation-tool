import React, { createContext, useContext, useState } from 'react';

const ShapeContext = createContext();

export const ShapeProvider = ({ children }) => {
    const [shapes, setShapes] = useState([]);
    const [activeShapeIndex, setActiveShapeIndex] = useState(null);

    const onCapture = () => {
        // Your capture logic here
    };

    const onSelection = (shape) => {
        // Your selection logic here
    };

    const onDelete = () => {
        // Your delete logic here
    };

    return (
        <ShapeContext.Provider value={{
            shapes,
            setShapes,
            activeShapeIndex,
            setActiveShapeIndex,
            onCapture,
            onSelection,
            onDelete,
        }}>
            {children}
        </ShapeContext.Provider>
    );
};

export const useShapeContext = () => useContext(ShapeContext);
