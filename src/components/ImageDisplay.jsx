// import React, { useState, useRef } from "react";
// import { FiZoomIn, FiZoomOut } from "react-icons/fi";
// import { CgScreen } from "react-icons/cg";


// const ImageDisplay = ({ imageData }) => {
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [horizontalOffset, setHorizontalOffset] = useState(0);
//   const [verticalOffset, setVerticalOffset] = useState(0);

//   const imageRef = useRef(null);

//   const handleZoomIn = () => {
//     setZoomLevel(zoomLevel + 0.1);
//   };

//   const handleZoomOut = () => {
//     setZoomLevel(Math.max(0.1, zoomLevel - 0.1)); // Ensure zoom level doesn't go below 0.1
//   };

//   const handleHorizontalChange = (e) => {
//     setHorizontalOffset(parseInt(e.target.value));
//   };

//   const handleVerticalChange = (e) => {
//     setVerticalOffset(parseInt(e.target.value));
//   };

//   return (
//     <>
//       <div>
//         <div className="image-container" style={{ overflow: "auto", height: "80vh", width: "100%",  alignItems: "center", justifyContent: "center" }}>
//           <div
//             style={{
//               transform: `scale(${zoomLevel}) translate(${horizontalOffset}px, ${verticalOffset}px)`,
//               transformOrigin: "center",
//               position: "absolute",
//               down: "25%",
//               right: "25%",
//               left: "25%",
//               top: "25%",
//               marginLeft: `-${(imageRef.current ? imageRef.current.width * zoomLevel : 0) / 2}px`,
//               marginTop: `-${(imageRef.current ? imageRef.current.height * zoomLevel : 0) / 2}px`,
//             }}
//           >
//             <img
//               ref={imageRef}
//               src={imageData}
//               alt="Uploaded"
//               style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
//             />
//           </div>
//         </div>
//         <div className="zoom-buttons">
//         <button onClick={handleZoomOut}>
//           <FiZoomOut />
//         </button>
//         <button onClick={handleZoomIn}>
//           <FiZoomIn />
//         </button>
//       </div>
      
//       <hr />

//       <footer className="footer">
//         <div>

//           <p className="footer-icons">
//             <CgScreen /> <span>&nbsp;&nbsp;&nbsp;</span>
//             {Math.round(zoomLevel * 100)}% <span>&nbsp; &nbsp; &nbsp; </span>
//           </p>
//         </div>
      
//       </footer>
//     </div>
//     </>
//   );
// };

// export default ImageDisplay;

import React, { useState, useRef } from "react";


const ImageDisplay = ({ imageData }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const imageRef = useRef(null);

  // const handleZoomIn = () => {
  //   setZoomLevel(zoomLevel + 0.1);
  // };

  // const handleZoomOut = () => {
  //   setZoomLevel(Math.max(0.1, zoomLevel - 0.1)); 
  // };

  return (
    <>
      <div>
        <div
            className="image-container"
            style={{
              overflow: 'auto',
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            
          >
            <div
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'top left',
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
              ref={imageRef}
              src={imageData}
              alt="Uploaded"
              style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
            </div>
          </div>
      <hr />
    </div>
    </>
  );
};

export default ImageDisplay;

