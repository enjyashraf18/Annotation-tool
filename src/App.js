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
import Thumbnail from './components/Thumbnail';
import './components/FileUpload.css';

function App() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageInput, setPageInput] = useState('');
  const [zoomInput, setZoomInput] = useState('');
  const [thumbnails, setThumbnails] = useState([]);

  function handleFile(e) {
    const selectedFile = e.target.files[0];
    const fileType = selectedFile?.type;
  
    if (!selectedFile) return;
  
    if (fileType === 'application/pdf') {
      setFileType('pdf');
      const reader = new FileReader();
      setZoomLevel(1);
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else if (fileType.startsWith('image/')) {
      setFile(URL.createObjectURL(selectedFile));
      setZoomLevel(1);
      setFileType('image');
      setNumPages(1);
      setPageNumber(1);
      setThumbnails([URL.createObjectURL(selectedFile)]);
    } else {
      alert('The selected file should be an image or a PDF.');
    }
  }
  

  const onDocumentLoadSuccess = (numPages) => {
    setNumPages(numPages);
    setPageNumber(1);
    generatePDFThumbnails(numPages);
  };


  const generatePDFThumbnails = (numPages) => {
    const thumbnails = [];
    for (let i = 1; i <= numPages; i++) {
      thumbnails.push(file);
    }
    setThumbnails(thumbnails);
  };


  useEffect(() => {
    setPageInput(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    setZoomInput(Math.round(zoomLevel * 100));
  }, [zoomLevel]);

  const goToPrevPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages));
  };

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    setPageInput(value);
    const pageNumber = Number(value);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= numPages) {
      setPageNumber(pageNumber);
    }
  };

  const handlePageInputBlur = () => {
    if (pageInput === '' || isNaN(pageInput) || pageInput < 1 || pageInput > numPages) {
      setPageInput(pageNumber);
    } else {
      setPageNumber(Number(pageInput));
    }
  };

  const handleZoomIn = () => {
    if (fileType) {
      setZoomLevel(zoomLevel + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (fileType) {
      setZoomLevel(Math.max(0.1, zoomLevel - 0.1));
    }
  };

  const handleZoomInputChange = (e) => {
    const value = e.target.value;
    setZoomInput(value);
    if (value === '' || (!isNaN(value) && value >= 10 && value <= 500)) {
      setZoomInput(value);
    }
  };

  const handleZoomInputBlur = () => {
    if (zoomInput === '' || isNaN(zoomInput) || zoomInput < 10 || zoomInput > 500) {
      setZoomInput(Math.round(zoomLevel * 100));
    } else {
      setZoomLevel(zoomInput / 100);
    }
  };

  const handleZoomInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleZoomInputBlur();
    }
  };

  return (
    <div className="main-container">
      {/* <div className='column column1'> column1</div> */}
      <div className='column column1'>
      <header className='column1-head'>
          ay 7aga 
        </header>
        <div className='thumb'>
        {thumbnails.map((thumbnail, index) => (
          <Thumbnail
            key={index}
            thumbnail={thumbnail}
            pageNumber={index + 1}
            setPageNumber={setPageNumber}
            fileType={fileType}
          />
        ))}
        </div>
      </div>
      
      <div className="column column2">
        <div className="zoom-buttons">
        <button className="zoom-button" onClick={handleZoomIn}>
            <FiZoomIn size="1.3rem" />
          </button>
          <button className="zoom-button" onClick={handleZoomOut}>
            <FiZoomOut size="1.3rem" />
          </button>
        </div>
        <header className="App-header">
          <input
            type='file'
            name='file'
            id='file'
            onChange={handleFile}
            style={{ display: 'none' }}
          />
          <label htmlFor='file' className='fileUploadButton'>
            <MdOutlineFileUpload size="2.5rem" />
            <span>Upload</span>
          </label>
        </header>
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
          {fileType === 'image' && (
            <ImageDisplay
              imageData={file}
              zoomLevel={zoomLevel}
            />
          )}
        </main>
        <footer className="App-footer">
          <div>
            <p className="footer-icons">
              <CgScreen /> <span>   </span>
              <input
                type="number"
                value={zoomInput}
                onChange={handleZoomInputChange}
                onBlur={handleZoomInputBlur}
                onKeyPress={handleZoomInputKeyPress}
                min="10"
                max="500"
                className="zoom-input-footer"
              />
              % <span>      </span>
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
              onBlur={handlePageInputBlur}
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



//   useEffect(() => {
//     setPageInput(pageNumber);
//   }, [pageNumber]);

//   useEffect(() => {
//     setZoomInput(Math.round(zoomLevel * 100));
//   }, [zoomLevel]);

//   const goToPrevPage = () => {
//     setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
//   };

//   const goToNextPage = () => {
//     setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages));
//   };

//   const handlePageInputChange = (e) => {
//     const value = e.target.value;
//     setPageInput(value);
//     const pageNumber = Number(value);
//     if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= numPages) {
//       setPageNumber(pageNumber);
//     }
//   };

//   const handlePageInputBlur = () => {
//     if (pageInput === '' || isNaN(pageInput) || pageInput < 1 || pageInput > numPages) {
//       setPageInput(pageNumber);
//     } else {
//       setPageNumber(Number(pageInput));
//     }
//   };

//   const handleZoomIn = () => {
//     if (fileType) {
//       setZoomLevel(zoomLevel + 0.1);
//     }
//   };

//   const handleZoomOut = () => {
//     if (fileType) {
//       setZoomLevel(Math.max(0.1, zoomLevel - 0.1));
//     }
//   };

//   const handleZoomInputChange = (e) => {
//     const value = e.target.value;
//     setZoomInput(value);
//     if (value === '' || (!isNaN(value) && value >= 10 && value <= 500)) {
//       setZoomInput(value);
//     }
//   };

//   const handleZoomInputBlur = () => {
//     if (zoomInput === '' || isNaN(zoomInput) || zoomInput < 10 || zoomInput > 500) {
//       setZoomInput(Math.round(zoomLevel * 100));
//     } else {
//       setZoomLevel(zoomInput / 100);
//     }
//   };

//   const handleZoomInputKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleZoomInputBlur();
//     }
//   };

//   return (
//     <div className="main-container">
//       <div className='column column1'>
//         {thumbnails.map((thumbnail, index) => (
//           <Thumbnail
//             key={index}
//             thumbnail={thumbnail}
//             pageNumber={index + 1}
//             setPageNumber={setPageNumber}
//             fileType={fileType}
//           />
//         ))}
//       </div>
//       <div className="column column2">
//         <div className="zoom-buttons">
//           <button className="zoom-button" onClick={handleZoomOut}>
//             <FiZoomOut size="1.3rem" />
//           </button>
//           <button className="zoom-button" onClick={handleZoomIn}>
//             <FiZoomIn size="1.3rem" />
//           </button>
//         </div>
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
//           {fileType === 'pdf' && (
//             <PDFViewer
//               pdfData={file}
//               pageNumber={pageNumber}
//               zoomLevel={zoomLevel}
//               onDocumentLoadSuccess={onDocumentLoadSuccess}
//             />
//           )}
//           {fileType === 'image' && (
//             <ImageDisplay
//               imageData={file}
//               zoomLevel={zoomLevel}
//             />
//           )}
//         </main>
//         <footer className="App-footer">
//           <div>
//             <p className="footer-icons">
//               <CgScreen /> <span>   </span>
//               <input
//                 type="number"
//                 value={zoomInput}
//                 onChange={handleZoomInputChange}
//                 onBlur={handleZoomInputBlur}
//                 onKeyPress={handleZoomInputKeyPress}
//                 min="10"
//                 max="500"
//                 className="zoom-input-footer"
//               />
//               % <span>      </span>
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
//               onBlur={handlePageInputBlur}
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
