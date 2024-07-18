import React, { useState, useEffect, useRef } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
// import { FiZoomIn, FiZoomOut } from "react-icons/fi";
// import { GrFormNextLink } from "react-icons/gr";
// import { IoMdArrowBack } from "react-icons/io";
// import { SlBookOpen } from "react-icons/sl";
// import { CgScreen } from "react-icons/cg";
// import { MdHeight } from 'react-icons/md';

const PDFViewer = ({
  pdfData,
  pageNumber,
  zoomLevel,
  onDocumentLoadSuccess,
}) => {
  const [numPages, setNumPages] = useState(null);
  const pdfRef = useRef(null);

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  useEffect(() => {
    if (pdfData) {
      setNumPages(null); // Reset numPages when pdfData changes
    }
  }, [pdfData]);

  // const goToPrevPage = () => {
  //   setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  // };

  // const goToNextPage = () => {
  //   setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages));
  // };

  // const handleZoomIn = () => {
  //   setZoomLevel(zoomLevel + 0.1);
  // };

  // const handleZoomOut = () => {
  //   setZoomLevel(Math.max(0.1, zoomLevel - 0.1));
  // };

  return (
    <div className='pdf-container' style={{height: '60vh', overflow: 'auto'}}>
      {pdfData && (
        <Document
          file={pdfData}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
            onDocumentLoadSuccess(numPages); 
          }}
        >
              <Page pageNumber={pageNumber} scale={zoomLevel} />
        </Document>
      )}
    </div>
  );
};

export default PDFViewer;


/* style={{height: '60vh', overflow: 'auto'}}*/