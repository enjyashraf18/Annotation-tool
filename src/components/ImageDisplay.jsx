// import React, { useState, useRef } from "react";


// const ImageDisplay = ({ imageData }) => {
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const imageRef = useRef(null);

//   return (
//     <>

//         <div
//             className="image-container"
//             style={{
//               overflow: 'auto',
//               position: 'relative',
//               width: '100%',
//               height: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
            
//           >
//             <div
//               style={{
//                 transform: `scale(${zoomLevel})`,
//                 transformOrigin: 'top left',
//                 position: 'relative',
//                 width: '100%',
//                 height: '100%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <img
//               ref={imageRef}
//               src={imageData}
//               alt="Uploaded"
//               style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} 
//             />
//             </div>
//           </div>
//       <hr />
//     </>
//   );
// };

// export default ImageDisplay;

import React, { useState, useEffect, useRef } from "react";

const ImageDisplay = ({ imageData, zoomLevel}) => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.transform = `scale(${zoomLevel})`;
      imageRef.current.style.transformOrigin = 'center';
    }
  }, [zoomLevel]);

  return (
    <div
      className="image-container"
      style={{
        overflow: 'auto',
        position: 'relative',
        width: '100%',
        height: '60vh',
        display: 'flex',

      }}
    >
      <img
        ref={imageRef}
        src={imageData}
        alt="Uploaded"
        style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} 
      />
    </div>
  );
};

export default ImageDisplay;




