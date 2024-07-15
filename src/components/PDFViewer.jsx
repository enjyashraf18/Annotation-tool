import React, { useState, useEffect, useRef } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const PDFViewer = ({ pdfData }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const [verticalOffset, setVerticalOffset] = useState(0);

  const pdfRef = useRef(null);

  // Setting the workerSrc for pdfjs with local file path
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    if (pdfData) {
      setLoading(true);
      setError(null);
      setLoading(false);
    }
  }, [pdfData]);

  const goToPrevPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages));
  };

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(0.1, zoomLevel - 0.1)); 
  };

  const handleHorizontalChange = (e) => {
    setHorizontalOffset(parseInt(e.target.value));
  };

  const handleVerticalChange = (e) => {
    setVerticalOffset(parseInt(e.target.value));
  };

  return (
    <div>
      {loading && <p>Loading PDF...</p>}
      {error && (
        <p style={{ color: 'red' }}>
          {error} - Check the console for more details.
        </p>
      )}
      {pdfData && (
        <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess} >
          <div className="pdf-container column2" style={{ overflow: "hidden", position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                transform: `scale(${zoomLevel}) translate(${horizontalOffset}px, ${verticalOffset}px)`,
                transformOrigin: "center",
                position: "relative",
              }}
            >
              <Page pageNumber={pageNumber} />
            </div>
          </div>
        </Document>
      )}
      {pdfData && (
        <div>
          <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
            Previous
          </button>
          <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
            Next
          </button>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      )}
      <footer>
        <div className="slider-container">
          <div className="slider-wrapper">
            <input
              type="range"
              min={-pdfRef.current?.offsetWidth * (zoomLevel - 1)}
              max={pdfRef.current?.offsetWidth * (zoomLevel - 1)}
              value={horizontalOffset}
              onChange={handleHorizontalChange}
              className="slider"
              orient="horizontal"
            />
            <div className="slider-label">Horizontal</div>
          </div>
          <div className="slider-wrapper">
            <input
              type="range"
              min={-pdfRef.current?.offsetHeight * (zoomLevel - 1)}
              max={pdfRef.current?.offsetHeight * (zoomLevel - 1)}
              value={verticalOffset}
              onChange={handleVerticalChange}
              className="slider"
              orient="vertical"
            />
            <div className="slider-label">Vertical</div>
          </div>
        </div>
        <hr />
        <div className="zoom-buttons">
          <button onClick={handleZoomIn}>Zoom In</button>
          <button onClick={handleZoomOut}>Zoom Out</button>
          <p>Zoom Level: {Math.round(zoomLevel * 100)}%</p>
        </div>
      </footer>
    </div>
  );
};

export default PDFViewer;
