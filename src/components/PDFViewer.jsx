import React, { useState, useEffect, useRef } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import { GrFormNextLink } from "react-icons/gr";
import { IoMdArrowBack } from "react-icons/io";
import { SlBookOpen } from "react-icons/sl";
import { CgScreen } from "react-icons/cg";

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
        <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
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

      <div className="zoom-buttons">
        <button onClick={handleZoomOut}>
          <FiZoomOut />
        </button>
        <button onClick={handleZoomIn}>
          <FiZoomIn />
        </button>
      </div>
      
      <hr />

      <footer className="footer">
        <div>
          <p className="footer-icons">
            <SlBookOpen /> <span>&nbsp; &nbsp;</span>
            {pageNumber}  of {numPages} <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </p>
          <p className="footer-icons">
            <CgScreen /> <span>&nbsp;&nbsp;&nbsp;</span>
            {Math.round(zoomLevel * 100)}% <span>&nbsp; &nbsp; &nbsp; </span>
          </p>
        </div>
        
        <div className="footer-icons-right">

          <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
            <IoMdArrowBack />
          </button>
          <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
            <GrFormNextLink />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PDFViewer;