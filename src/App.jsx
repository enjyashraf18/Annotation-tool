import { useState, useEffect } from "react";
import "./App.css";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { GrFormNextLink } from "react-icons/gr";
import { CgScreen } from "react-icons/cg";
import { SlBookOpen } from "react-icons/sl";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import PDFViewer from "./components/PDFViewer";
import ImageDisplay from "./components/ImageDisplay";
import SideBar from "./components/sideBar";
import Thumbnail from "./components/Thumbnail";
import { SlNotebook } from "react-icons/sl";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./components/FileUpload.css";
import DrawingApp from "./components/DrawingApp";
import AddSample from "./components/AddSamples";
import Samples from "./components/Samples";
import { MdDraw } from "react-icons/md";
import DrawingAppPdf from "./components/DrawingAppPdf";
import axios from 'axios';
import JsonData from "./components/JsonData";
// import ClassifyComponent from "./components/ClassifyButton";
import FileClassificationComponent from "./components/FileClassificationComponent";
import PageClassificationComponent from "./components/PageClassificationComponent";



function App() {
  const [fileClassifications, setFileClassifications] = useState({});
  const [counter, setCounter] = useState(0);
  const [ccounter, setCcounter] = useState(0);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const [zoomInput, setZoomInput] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [samples, setSamples] = useState([]);
  const [data, setData] = useState([]);
  const [pageClassifications, setPageClassifications] = useState({});
  const [fileClassifications1, setFileClassifications1] = useState(null);
  const [fileClassifications2, setFileClassifications2] = useState(null);


  // const [classificationData, setClassificationData] = useState([]);

  const [selectedArea, setSelectedArea] = useState({
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    scale: 1,
  });
  const [imageData, setImageData] = useState("path_to_your_image.jpg");
  const [allowDrawing, setAllowDrawing] = useState(false);
  const [allowCapturing, setAllowCapturing] = useState(false);
  const [allowDeleting, setAllowDeleting] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [showAddSample, setShowAddSample] = useState(false);
  const [showSamples, setshowSamples] = useState(true);
  const [showJson, setshowJson] = useState(false);
  const [editingSample, setEditingSample] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [isActiveAnnotate, setIsActiveAnnotate] = useState(false);
  const [isActiveFields, setIsActiveFields] = useState(false);
  const [isActiveJson, setIsActiveJson] = useState(false);
  const [newFile, setIsNewFile] = useState(false);


  const handleClassifyFile = (file, classification) => {
    setFileClassifications(prevState => ({
      ...prevState,
      file: classification,
    }));
    console.log('Classified entire file:', file, 'as', classification);
  };

  const handleClassifyPage = (file, pageNumber, classification) => {
    setFileClassifications(prevState => ({
      ...prevState,
      pages: {
        ...prevState.pages,
        [pageNumber]: classification,
      },
    }));
    console.log(`Classified page ${pageNumber} of file:`, file, 'as', classification);
  };


  const handleToggleAnnotate = () => {
    setIsActiveAnnotate(!isActiveAnnotate);
    handleAllowingAddSample();
  };

  const handleToggleFields = () => {
    setIsActiveFields(!isActiveFields);
    setshowSamples(true);
    setIsActiveJson(false);
    setshowJson(false);
  };

  const handleToggleJson = () => {
    setIsActiveJson(!isActiveJson);
    setIsActiveFields(false);
    setshowSamples(false);
    setshowJson(true);

  };

  const loadSamples = (fileName) => {
    setSamples({});
    setData({});
    axios.get('http://localhost:5000/samples/' + fileName)
      .then(response => {
        console.log("resp", response)
        const ay_7aga = response.data;
        setSamples(ay_7aga);
        setData(ay_7aga);
        console.log('response' + ay_7aga);

      })
      .catch(error => {
        console.error('Error loading samples:', error);
        setSamples({});
      });
  };


  const saveSamples = async (sample) => {
    console.log("Test", {
      ...sample,
      id: fileName
    })

    const fileSamples = await fetch('http://localhost:5000/samples/' + fileName);

    console.log(fileSamples)
    if (fileSamples.ok) {
      axios.put('http://localhost:5000/samples/' + fileName, {
        ...sample,
        id: fileName
      })
        .then(response => {
          console.log('Sample saved:', response.data[1]);
          loadSamples(fileName);

        })
        .catch(error => {
          console.error('Error saving sample:', error);
        });
    }
    else {
      axios.post('http://localhost:5000/samples', {
        ...sample,
        id: fileName
      })
        .then(response => {
          console.log('Sample saved:', response.data[1]);
        })
        .catch(error => {
          console.error('Error saving sample:', error);
        });
    }

  };



  // const loadClassification = (fileName) => {
    
  //   setPageClassifications({});
  //   axios.get('http://localhost:5000/classification/' + fileName)

  //     .then(response => {
  //       console.log("Response Sameh22222", response);
  //       const ay_7aga = response.data;
  //       console.log("enjy" + ay_7aga.classification);
  //       setFileClassifications1(ay_7aga.classification)
  //       console.log("enjy2" + pageClassifications);

  //       setPageClassifications({ 1: ay_7aga.classification });

  //     })
  //     .catch(error => {
  //       console.error('Error loading classification:', error);
  //     });
  // };
  const loadClassification = (fileName) => {
    setFileClassifications1(''); 
    setPageClassifications({});
  
    axios.get('http://localhost:5000/classification/' + fileName)
      .then(response => {
        console.log("Response", response);
        const classificationData = response.data;
  
        if (classificationData && classificationData.classification) {
          setFileClassifications1(classificationData.classification);
          setPageClassifications({ 1: classificationData.classification });
        } else {
          // If there's no classification for the file, ensure the states are reset
          setFileClassifications1('');
          setPageClassifications({});
        }
      })
      .catch(error => {
        console.error('Error loading classification:', error);
        // Reset states on error as well
        setFileClassifications1('');
        setPageClassifications({});
      });
  };
  




  const saveClassification = async (classificationDetails, fileName) => {
    console.log("Daniel", classificationDetails)
    const fileClassification = await fetch('http://localhost:5000/classification/' + fileName);
    if (fileClassification.ok) {
      axios.put('http://localhost:5000/classification/' + fileName, {
        ...classificationDetails,
        id: fileName
      })
        .then(response => {
          console.log('Sample saved:', response.data[1]);
        })
        .catch(error => {
          console.error('Error saving sample:', error);
        });
    }
    else {
      setIsNewFile(true);
      axios.post('http://localhost:5000/classification/', {
        ...classificationDetails,
        id: fileName
      })
        .then(response => {
          console.log('Sample saved:', response.data[1]);
        })
        .catch(error => {
          console.error('Error saving sample:', error);
        });
    }
    loadClassification(fileName);
  };


  const saveClassificationPage = async (classificationDetails, fileName) => {
    console.log("Daniel", classificationDetails)
    const fileClassification = await fetch('http://localhost:5000/classificationPage/' + fileName);
    if (fileClassification.ok) {
      axios.put('http://localhost:5000/classificationPage/' + fileName, {
        ...classificationDetails,
        id: fileName
      })
        .then(response => {
          console.log('Sample saved:', response.data[1]);
        })
        .catch(error => {
          console.error('Error saving sample:', error);
        });
    }
    else {
      setIsNewFile(true);
      axios.post('http://localhost:5000/classificationPage/', {
        ...classificationDetails,
        id: fileName
      })
        .then(response => {
          console.log('Sample saved:', response.data[1]);
        })
        .catch(error => {
          console.error('Error saving sample:', error);
        });
    }
    loadClassificationPage(fileName);
  };

  const loadClassificationPage = (fileName) => {
    setPageClassifications(''); 
    setPageClassifications({});
  
    axios.get('http://localhost:5000/classificationPage/'+ fileName)
      .then(response => {
        console.log("Response", response);
        const classificationData = response.data;
  
        if (classificationData && classificationData.classification) {
          setPageClassifications(classificationData.classification);
          setPageClassifications({ 1: classificationData.classification });
        } else {
          // If there's no classification for the file, ensure the states are reset
          setPageClassifications('');
          setPageClassifications({});
        }
      })
      .catch(error => {
        console.error('Error loading classification:', error);
        // Reset states on error as well
        setPageClassifications('');
        setPageClassifications({});
      });
  };



  const handleSelection = (area) => {
    setSelectedArea({
      ...area,
      scale: zoomLevel,
    });
  };

  const handleAllowingAddSample = (sampleDetails) => {
    setAllowDrawing(!isActiveAnnotate);
    setAllowCapturing(!isActiveAnnotate);
    setAllowDeleting(!isActiveAnnotate);
  };


  const handleAddSample = (sampleDetails) => {
    console.log("Alloooo");
    setShowAddSample(false);

    if (!fileName) return;

    const updatedSamples = structuredClone(samples);

    if (editingSample) {
      if (!updatedSamples[pageNumber]) {
        updatedSamples[pageNumber] = [];
      }

      updatedSamples[pageNumber] = updatedSamples[pageNumber].map((sample) =>
        sample.id === editingSample.id
          ? { ...sampleDetails, id: editingSample.id }
          : sample
      );
    } else {
      const newSample = { ...sampleDetails, id: counter };

      if (!Array.isArray(updatedSamples[pageNumber])) {
        updatedSamples[pageNumber] = [];
      }

      updatedSamples[pageNumber].push(newSample);

      setCounter((prevCounter) => prevCounter + 1);
    }

    setSamples(updatedSamples);
    saveSamples(updatedSamples);
    setEditingSample(null);

    console.log(updatedSamples);

  };

  // const handleAddClassification = (editingClassification, classificationDetails, fileName) => {

  //   const updatedClassifications = structuredClone(classificationDetails);

  //   // if (editingClassification) {
  //   //   if (!updatedClassifications[pageNumber]) {
  //   //     updatedClassifications[pageNumber] = [];
  //   //   }

  //   //   updatedClassifications[pageNumber] = updatedClassifications[pageNumber].map((classification) =>
  //   //     classification.id === editingClassification.id
  //   //       ? { ...classificationDetails, id: editingClassification.id }
  //   //       : classification
  //   //   );
  //   // } else {
  //   //   const newClassification = { ...classificationDetails, id: ccounter };

  //   //   if (!Array.isArray(updatedClassifications[pageNumber])) {
  //   //     updatedClassifications[pageNumber] = [];
  //   //   }

  //   //   updatedClassifications[pageNumber].push(newClassification);

  //   //   setCcounter((prevCounter) => prevCounter + 1);
  //   // }


  //   // console.log("Aaaaaaaaaah Pls Work",editingClassification, classificationDetails);

  //   // setClassificationData(updatedClassifications);
  //   saveClassification(updatedClassifications, fileName);
  // };



  const handleEditSample = (sample) => {
    setSelectedArea(sample.selectedArea);
    setImageData(sample.imageData);
    setEditingSample(sample);
    setShowAddSample(true);
  };


  const handleDeleteSample = (id) => {
    if (!fileName) return;

    // Create a deep copy of the current samples to avoid mutating state directly
    const updatedSamples = structuredClone(samples);

    // Filter out the sample with the matching id on the current page
    if (updatedSamples[pageNumber]) {
      updatedSamples[pageNumber] = updatedSamples[pageNumber].filter(
        (sample) => sample.id !== id
      );
    }

    // Update the state with the new samples object
    setSamples(updatedSamples);

    // Save the updated samples to localStorage
    saveSamples(fileName, updatedSamples);
  };

  const handleCancel = () => {
    setShowAddSample(false);
    setEditingSample(null);
  };
  // const handleEditSample = (sample) => {
  //   setSelectedArea(sample.selectedArea);
  //   setImageData(sample.imageData);
  //   setEditingSample(sample);
  //   setShowAddSample(true);
  // };

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

    if (fileType === "application/pdf") {
      setFileType("pdf");
      const reader = new FileReader();
      setZoomLevel(1);
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
      loadClassification(selectedFile.name);
      loadClassificationPage(selectedFile.name);
      loadSamples(selectedFile.name);
    } else if (fileType.startsWith("image/")) {
      const objectURL = URL.createObjectURL(selectedFile);
      setFile(objectURL);
      setZoomLevel(1);
      setFileType("image");
      setNumPages(1);
      setPageNumber(1);
      setThumbnails([objectURL]);
      loadSamples(selectedFile.name);
      loadClassification(selectedFile.name);
      loadClassificationPage(selectedFile.name);
    } else {
      alert("The selected file should be an image or a PDF.");
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
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
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
    if (
      pageInput === "" ||
      isNaN(pageInput) ||
      pageInput < 1 ||
      pageInput > numPages
    ) {
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
    if (value === "" || (!isNaN(value) && value >= 10 && value <= 500)) {
      setZoomInput(value);
    }
  };

  const handleZoomInputBlur = () => {
    if (
      zoomInput === "" ||
      isNaN(zoomInput) ||
      zoomInput < 10 ||
      zoomInput > 500
    ) {
      setZoomInput(Math.round(zoomLevel * 100));
    } else {
      setZoomLevel(zoomInput / 100);
    }
  };

  const handleZoomInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleZoomInputBlur();
    }
  };

  return (
    <div className="main-container">
      <SideBar />
      {/* <div className='column column1'> column1</div> */}
      <div className="column column1">
        <header className="column1-header">
          <SlNotebook size="3rem" />
          Document Organizer
        </header>
        <div className="thumb">
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
            type="file"
            name="file"
            id="file"
            onChange={handleFile}
            style={{ display: "none" }}
          />
          <label htmlFor="file" className="fileUploadButton">
            <MdOutlineFileUpload size="2.5rem" />
            <span>Upload</span>
          </label>

          <button
            className="annotate-button"
            onClick={handleToggleAnnotate}
            style={{ backgroundColor: isActiveAnnotate ? '#d3d9e0' : 'white' }}
          >
            <MdDraw size="2.5rem" />
            <span>Annotate</span>
          </button>

          {/* <ClassifyComponent
            file={file}
            fileName={fileName}
            isPdf={fileType === "pdf"}
            pageNumber={pageNumber}
            numOfPages={numPages}
            onClassifyPage={handleClassifyPage}
            handleAddClassification = {saveClassification}
            pageClassifications={pageClassifications}
            setPageClassifications = {setPageClassifications}
          /> */}
        
          <FileClassificationComponent
            file={file}
            fileName={fileName}
            onClassifyFile={handleClassifyFile}
            handleAddClassification={saveClassification}
            fileClassifications1 = {fileClassifications1}
            newFile = {newFile}
          />

          <PageClassificationComponent
            file={file}
            fileName={fileName}
            isPdf={fileType === "pdf"}
            pageNumber={pageNumber}
            // numOfPages={numPages}
            onClassifyPage={handleClassifyPage}
            handleAddClassification={saveClassificationPage}
            pageClassifications={pageClassifications}
            setPageClassifications={setPageClassifications}
            
          />

        </header>
        <main className="App-main">
          {fileType === "pdf" && (

            <DrawingAppPdf
              file={file}
              pageNumber={pageNumber}
              zoomLevel={zoomLevel}
              setPageNumber={setPageNumber}
              allowDrawing={allowDrawing}
              onCapture={handleCapture}
              onDelete={handleDelete}
              onDocumentLoadSuccess={onDocumentLoadSuccess}
              onSelection={handleSelection}
            />
          )}
          {fileType === "image" && (
            <ImageDisplay
              imageData={file}
              zoomLevel={zoomLevel}
              setImageSize={setImageSize}
              imageSize={imageSize}
              onSelection={handleSelection}
              setImageWidth={setWidth}
              setImageHeight={setHeight}
            />
          )}


          {fileType === "image" && (
            <DrawingApp
              onSelection={handleSelection}
              zoomLevel={zoomLevel}
              allowDrawing={allowDrawing}
              onCapture={handleCapture}
              onDelete={handleDelete}
              imageWidth={width}
              imageHeight={height}
              file={file}
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
        -
      </div>
      <div className="column column3">
        <header className="samples-header">
          <button
            className="Samples-button-fields"
            onClick={handleToggleFields}
            style={{ backgroundColor: isActiveFields ? '#d3d9e0' : 'white' }}
          >
            <h3>Fields</h3>
          </button>
          <div className="vertical-line"></div>
          <button
            className="Samples-button-json"
            onClick={handleToggleJson}
            style={{
              backgroundColor: isActiveJson ? '#d3d9e0' : 'white',
            }}
          >
            <h3>Json</h3>
          </button>
        </header>


        {showSamples && (
          <Samples
            samples={samples}
            onEditSample={handleEditSample}
            onDeleteSample={handleDeleteSample}
            file={file}
            pageNumber={pageNumber}
            isPDF={fileType === "pdf"}
            fileClassifications1 = {fileClassifications1}

          />
        )}

        {showJson && (
          <JsonData
            pageNumber={pageNumber}
            data={data}
            samples={samples}
          />
        )}
        {showAddSample && (
          <AddSample
            fileName={fileName}
            selectedArea={selectedArea}
            imageData={file}
            onAddSample={handleAddSample}
            onCancel={handleCancel}
            sampleToEdit={editingSample}
            pageNumber={pageNumber}
            isPDF={fileType === "pdf"}
          />
        )}
      </div>
    </div>
  );
}

export default App;