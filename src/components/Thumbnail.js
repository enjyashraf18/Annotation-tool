import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Thumbnail = ({ thumbnail, pageNumber, setPageNumber, fileType }) => {
  const handleClick = () => {
    setPageNumber(pageNumber);
  };

  return (
    <div className="thumbnail-container" onClick={handleClick}>
      {fileType === 'pdf' && (
        <Document file={thumbnail}>
          <Page pageNumber={pageNumber} scale={0.2} />
        </Document>
      )}
      {fileType === 'image' && (
        <img src={thumbnail} alt={`Thumbnail ${pageNumber}`} className="thumbnail-image" />
      )}
    </div>
  );
};

export default Thumbnail;
