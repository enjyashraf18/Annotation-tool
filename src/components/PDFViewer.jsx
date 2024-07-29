import React, { useState, useEffect, useRef } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import DrawingComponent from './DrawingComponent'; // Adjust the path if needed

const PDFViewer = ({ pdfData, pageNumber, zoomLevel, onSelection }) => {
  const [numPages, setNumPages] = useState(null);
  const pdfRef = useRef(null);

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  const handleSelection = (area) => {
    // Adjust the coordinates as per your requirement
    onSelection(area);
  };

  return (
    <div ref={pdfRef} className="pdf-container" style={{ height: '72vh', overflow: 'auto', margin: 'auto' }}>
      {pdfData && (
        <Document
          file={pdfData}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          className="pdf-document"
        >
          <Page pageNumber={pageNumber} scale={zoomLevel} className="pdf-page" />
        </Document>
      )}
      <DrawingComponent onSelection={handleSelection} />
    </div>
  );
};

export default PDFViewer;
