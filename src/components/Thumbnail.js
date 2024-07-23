

import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useState, useEffect, useRef } from "react";


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Thumbnail = ({ thumbnail, pageNumber, setPageNumber, fileType, selectedPage, imageData }) => {
  const handleClick = () => {
    setPageNumber(pageNumber);
  };

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (imageData) {
      const img = new Image();
      img.onload = () => {
        setImageSize({ width: 10, height:10});
      };
      img.src = imageData;
    }
  }, [imageData]);

  return (
    <div
      className={`thumbnail-container ${selectedPage === pageNumber ? 'selected' : ''}`}
      onClick={handleClick}
    >
      {fileType === 'pdf' && (
        <div className={`thumbnail-pdf-container ${selectedPage === pageNumber ? 'selected' : ''}`}>
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

