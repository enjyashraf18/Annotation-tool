// import React from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const Thumbnail = ({ thumbnail, pageNumber, setPageNumber, fileType }) => {
//   const handleClick = () => {
//     setPageNumber(pageNumber);
//   };

//   return (
//     <div className="thumbnail-container" onClick={handleClick}>
//       {fileType === 'pdf' && (
//         <div className="thumbnail-pdf-container">
//           <Document file={thumbnail}>
//             <Page pageNumber={pageNumber} width={100} />
//           </Document>
//         </div>
//       )}
//       {fileType === 'image' && (
//         <img src={thumbnail} alt={`Thumbnail ${pageNumber}`} className="thumbnail-image" />
//       )}
//     </div>
//   );
// };

// export default Thumbnail;


import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Thumbnail = ({ thumbnail, pageNumber, setPageNumber, fileType, selectedPage }) => {
  const handleClick = () => {
    setPageNumber(pageNumber);
  };

  return (
    <div
      className={`thumbnail-container  ${selectedPage === pageNumber ? 'selected' : ''}`}
      onClick={handleClick}
    >
      {fileType === 'pdf' && (
        <div className="thumbnail-pdf-container thumbnail-container.selected">
          <Document file={thumbnail}>
            <Page pageNumber={pageNumber} width={100} />
          </Document>
        </div>
      )}
      {fileType === 'image' && (
        <img src={thumbnail} alt={`Thumbnail ${pageNumber}`} className="thumbnail-image" />
      )}
    </div>
  );
};

export default Thumbnail;
