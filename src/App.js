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
import SideBar from './components/sideBar';
import Thumbnail from './components/Thumbnail';
import { FiHome } from "react-icons/fi";
import { SlNotebook } from "react-icons/sl";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import './components/FileUpload.css';
import DrawingApp from './components/DrawingApp';
import AddSample from './components/AddSamples';
import Samples from './components/Samples';
import { MdDraw } from "react-icons/md";

function App() {
  const [counter, setCounter] = useState(0);
  const [numSamples, setNumSamples] = useState(0);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageInput, setPageInput] = useState('');
  const [zoomInput, setZoomInput] = useState('');
  const [thumbnails, setThumbnails] = useState([]);



  const [selectedArea, setSelectedArea] = useState({
    x: 10, y: 10, width: 100, height: 100, scale: 1
  });
  const [imageData, setImageData] = useState('path_to_your_image.jpg');
  const [allowDrawing, setAllowDrawing] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [showAddSample, setShowAddSample] = useState(false);
  const [samples, setSamples] = useState([]);
  const [editingSample, setEditingSample] = useState(null);
  const [fileName, setFileName] = useState(null);


  const loadSamples = (fileName) => {
    const storedSamples = localStorage.getItem(`samples_${fileName}`);
    const storedNumSamples = localStorage.getItem(`numSamples_${fileName}`);
    if (storedSamples) {
      setSamples(JSON.parse(storedSamples));
      setNumSamples(storedNumSamples ? JSON.parse(storedNumSamples) : 0);
    } else {
      setSamples([]);
      setNumSamples(0);
    }
  };


  const saveSamples = (fileName, samples) => {
    setNumSamples(samples.length);
    localStorage.setItem(`samples_${fileName}`, JSON.stringify(samples));
    localStorage.setItem(`numSamples_${fileName}`, JSON.stringify(samples.length));
  };

  const handleSelection = (area) => {
    setSelectedArea({
      ...area,
      scale: zoomLevel
    });
  };

  const handleAllowingAddSample = (sampleDetails) => {
    setAllowDrawing(true);
  };



  const handleAddSample = (sampleDetails) => {
    if (!fileName) return;
    if (editingSample) {
      const updatedSamples = samples.map(sample =>
        sample.id === editingSample.id ? { ...sampleDetails, id: editingSample.id } : sample
      );
      setSamples(updatedSamples);
      saveSamples(fileName, updatedSamples);
    } else {
      const newSample = { ...sampleDetails, id: counter };
      const updatedSamples = [...samples, newSample];
      setSamples(updatedSamples);
      setCounter(counter + 1);
      saveSamples(fileName, updatedSamples);
    }
    setShowAddSample(false);
    setEditingSample(null);
  };
  
  const handleDeleteSample = (id) => {
    if (!fileName) return;
    const updatedSamples = samples.filter(sample => sample.id !== id);
    setSamples(updatedSamples);
    saveSamples(fileName, updatedSamples);
  };
  

  const handleCancel = () => {
    setShowAddSample(false);
    setEditingSample(null);
  };
  const handleEditSample = (sample) => {
    setSelectedArea(sample.selectedArea);
    setImageData(sample.imageData);
    setEditingSample(sample);
    setShowAddSample(true);
  };


  const handleCapture = () => {
    setCounter(counter + 1);
    setShowAddSample(true); 
  };
  const handleDelete = () => {
    setCounter(counter > 0 ? counter - 1 : 0); 
  };

  function handleFile(e) {
    const selectedFile = e.target.files[0];
    const fileType = selectedFile?.type;
  
    if (!selectedFile) return;
  
    setFileName(selectedFile.name); 
  
    if (fileType === 'application/pdf') {
      setFileType('pdf');
      const reader = new FileReader();
      setZoomLevel(1);
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
      loadSamples(selectedFile.name);
    } else if (fileType.startsWith('image/')) {
      const objectURL = URL.createObjectURL(selectedFile);
      setFile(objectURL);
      setZoomLevel(1);
      setFileType('image');
      setNumPages(1);
      setPageNumber(1);
      setThumbnails([objectURL]);
      loadSamples(selectedFile.name); 
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
      <SideBar />
      {/* <div className='column column1'> column1</div> */}
      <div className='column column1'>
        <header className='column1-header'>
          <SlNotebook size="3rem" />
          Document Organizer
        </header>
        <div className='thumb'>
          {/* {thumbnails.map((thumbnail, index) => ( */}
          <Thumbnail
            // key={index}
            thumbnail={file}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            fileType={fileType}
            selectedPage={pageNumber}
          />
          {/* ))} */}
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

          <button className="annotate-button" onClick={handleAllowingAddSample}>
            <MdDraw size="2.5rem" />
            <span>Annotate</span>
          </button>
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
              onSelection={handleSelection}
            />
          )}
          {fileType === 'image' && (
            <ImageDisplay
              imageData={file}
              zoomLevel={zoomLevel}
              setImageSize={setImageSize}
              imageSize={imageSize}
              onSelection={handleSelection}
            />
          )}

          <DrawingApp
            onSelection={handleSelection}
            imageSize={imageSize}
            zoomLevel={zoomLevel}
            setZoomLevel={setZoomLevel}
            allowDrawing={allowDrawing}
            onCapture={handleCapture}  // Pass capture handler
            onDelete={handleDelete}    // Pass delete handler
          />
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
        </footer>-
      </div>
      <div className='column column3'>
      <header className='samples-header'>
        {/* <button>
        Fields & Info
        </button> */}
        <button className='Samples-button'>
        <h3>Samples</h3>
        </button>

      </header>
        <Samples
          samples={samples}
          onEditSample={handleEditSample}
          onDeleteSample={handleDeleteSample}
          numSamples={numSamples}
          file={file}

        />
        {showAddSample && (
          <AddSample
            selectedArea={selectedArea}
            imageData={file}
            onAddSample={handleAddSample}
            onCancel={handleCancel}
            sampleToEdit={editingSample}
          />
        )}
      </div>
    </div>
  );
}

export default App;


