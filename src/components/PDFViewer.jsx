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
  const [pageInput, setPageInput] = useState(pageNumber);

  const pdfRef = useRef(null);

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

  useEffect(() => {
    setPageInput(pageNumber);
  }, [pageNumber]);

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

  const handlePageInputChange = (event) => {
    const value = event.target.value;
    setPageInput(value);
    if (value) {
      const newPageNumber = Math.min(Math.max(Number(value), 1), numPages);
      setPageNumber(newPageNumber);
    }
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
        <div style={{
          position: "relative",
          overflow: "auto"
        }}>
          <div style={{
            margin: "auto auto",
            position: "relative"
          }}>
  <div style={{
            height: "min-content",
            width: "min-content"
          }}>
        <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
          <div
            className="pdf-container"
            style={{
              overflow: 'auto',
              position: 'relative',
              width: 'min-content',
              height: 'min-content',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflowY: 'auto',
              overflowX: 'auto'
            }}
            ref={pdfRef}
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
              <Page pageNumber={pageNumber} />
        

            </div>
          </div>
        </Document>
        </div>

        </div>
        
    </div>
      )}

      <div className="zoom-buttons">
        <button className="zoom-button" onClick={handleZoomOut}>
          <FiZoomOut />
        </button>
        <button className="zoom-button" onClick={handleZoomIn}>
          <FiZoomIn />
        </button>
      </div>
      
      <hr />

      <footer className="footer">
        <div>
          <p className="footer-icons">
            <SlBookOpen /> <span>&nbsp; &nbsp;</span>
            {pageNumber} of {numPages} <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
          <input 
            type="number" 
            value={pageInput} 
            onChange={handlePageInputChange} 
            min="1" 
            max={numPages} 
            className="page-input"
          />
          <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
            <GrFormNextLink />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PDFViewer;

