

// import React, { useState, useRef, useEffect } from 'react';
// import './App.css';
// import { MdOutlineFileUpload } from "react-icons/md";
// import { IoArrowBack } from 'react-icons/io5';
// import { GrFormNextLink } from "react-icons/gr";
// import { CgScreen } from "react-icons/cg";
// import { SlBookOpen } from "react-icons/sl";
// import PDFViewer from './components/PDFViewer';
// import ImageDisplay from './components/ImageDisplay';
// import './components/FileUpload.css';

// function App() {
//   const [error, setError] = useState(null); // Added error state

//   const [file, setFile] = useState(null);
//   const [fileType, setFileType] = useState(null);
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [numPages, setNumPages] = useState(1);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageInput, setPageInput] = useState(1);

//   const handleZoomIn = () => {
//     setZoomLevel(zoomLevel + 0.1);
//   };

//   const handleZoomOut = () => {
//     setZoomLevel(Math.max(0.1, zoomLevel - 0.1)); 
//   };

//   function handleFile(e) {
//     const selectedFile = e.target.files[0];
//     const fileType = selectedFile.type;

//     if (fileType === 'application/pdf') {
//       setFileType('pdf');
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setFile(e.target.result);
//       };
//       reader.readAsDataURL(selectedFile);
//     } else if (fileType.startsWith('image/')) {
//       setFileType('image');
//       setFile(URL.createObjectURL(selectedFile));
//     } else {
//       setFileType(null);
//       setFile(null);
//     }
//   }

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   useEffect(() => {
//     if (fileType === 'pdf') {
//       setError(null);
//     }
//   }, [fileType]);

//   useEffect(() => {
//     setPageInput(pageNumber);
//   }, [pageNumber]);

//   useEffect(() => {
//     setZoomLevel(1); // Reset zoom level to 100% whenever file changes
//   }, [file]);

//   const goToPrevPage = () => {
//     setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
//   };

//   const goToNextPage = () => {
//     setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages));
//   };

//   const handlePageInputChange = (e) => {
//     const pageNumber = Number(e.target.value);
//     if (pageNumber >= 1 && pageNumber <= numPages) {
//       setPageNumber(pageNumber);
//     }
//   };

//   return (
//     <div className="main-container">
//       <div className='column column1'> column1</div>
//       <div className="column column2">
//         <header className="App-header">
//           <input
//             type='file'
//             name='file'
//             id='file'
//             onChange={handleFile}
//             style={{ display: 'none' }}
//           />
//           <label htmlFor='file' className='fileUploadButton'>
//             <MdOutlineFileUpload size="3rem" />
//             <span>Upload</span>
//           </label>
//         </header>
//         <main className="App-main">
//           {fileType === 'pdf' && <PDFViewer pdfData={file} />}
//           {fileType === 'image' && <ImageDisplay imageData={file} />}
//         </main>
//         <footer className="App-footer">
//           <div>
//             <p className="footer-icons">
//               <CgScreen /> <span>   </span>
//               {Math.round(zoomLevel * 100)}% <span>      </span>
//             </p>
//             <p className="footer-icons">
//               <SlBookOpen /> <span>   </span>
//               {pageNumber} of {numPages} <span>    </span>
//             </p>
//           </div>
//           <div className="footer-icons-right">
//             <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
//               <IoArrowBack />
//             </button>
//             <input 
//               type="number" 
//               value={pageInput} 
//               onChange={handlePageInputChange} 
//               min="1" 
//               max={numPages} 
//               className="page-input"
//             />
//             <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
//               <GrFormNextLink />
//             </button>
//           </div>
//         </footer>
//       </div>
//       <div className='column column3'>column3</div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import './App.css';
import { MdOutlineFileUpload } from "react-icons/md";
import { IoArrowBack } from 'react-icons/io5';
import { GrFormNextLink } from "react-icons/gr";
import { CgScreen } from "react-icons/cg";
import { SlBookOpen } from "react-icons/sl";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import PDFViewer from './components/PDFViewer';
import ImageDisplay from './components/ImageDisplay';
import './components/FileUpload.css';

function App() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInput, setPageInput] = useState(1);

  function handleFile(e) {
    const selectedFile = e.target.files[0];
    const fileType = selectedFile.type;

    if (fileType === 'application/pdf') {
      setFileType('pdf');
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else if (fileType.startsWith('image/')) {
      setFileType('image');
      setFile(URL.createObjectURL(selectedFile));
    } else {
      setFileType(null);
      setFile(null);
    }
  }

  const onDocumentLoadSuccess = (numPages) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    setPageInput(pageNumber);
  }, [pageNumber]);

  const goToPrevPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages));
  };

  const handlePageInputChange = (e) => {
    const pageNumber = Number(e.target.value);
    if (pageNumber >= 1 && pageNumber <= numPages) {
      setPageNumber(pageNumber);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(0.1, zoomLevel - 0.1));
  };


  return (
    <div className="main-container">
      <div className='column column1'> column1</div>
      <div className="column column2">
      <div className="zoom-buttons">
        <button className="zoom-button" onClick={handleZoomOut}>
          <FiZoomOut />
        </button>
        <button className="zoom-button" onClick={handleZoomIn}>
          <FiZoomIn />
        </button>
      </div>
      <div>
        <header className="App-header">
          <input
            type='file'
            name='file'
            id='file'
            onChange={handleFile}
            style={{ display: 'none' }}
          />
          <label htmlFor='file' className='fileUploadButton'>
            <MdOutlineFileUpload size="3rem" />
            <span>Upload</span>
          </label>
        </header>
        </div>
        <main className="App-main">
          {fileType === 'pdf' && (
            <PDFViewer
              pdfData={file}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              zoomLevel={zoomLevel}
              setZoomLevel={setZoomLevel}
              onDocumentLoadSuccess={onDocumentLoadSuccess}
            />
          )}
          {fileType === 'image' && <ImageDisplay imageData={file} />}
        </main>
        <footer className="App-footer">
          <div>
            <p className="footer-icons">
              <CgScreen /> <span>   </span>
              {Math.round(zoomLevel * 100)}% <span>      </span>
            </p>
            <p className="footer-icons">
              <SlBookOpen /> <span>   </span>
              {pageNumber} of {numPages} <span>    </span>
            </p>
          </div>
          <div className="footer-icons-right">
            <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
              <IoArrowBack />
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
      <div className='column column3'>column3</div>
    </div>
  );
}

export default App;

