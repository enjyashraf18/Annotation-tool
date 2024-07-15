import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/fileUpload'; // Corrected component name

import ImageDisplay from './components/ImageDisplay'; // Corrected component name
import PDFViewer from './components/PDFViewer';


function App() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No selected file');

  const handleFileChange = ({ target: { files } }) => {
    if (files[0]) {
      setFileName(files[0].name);
      setImage(URL.createObjectURL(files[0]));
    }
  };

  return (
    <>
      <div className='maincontainer'>
        <div className='column column1'> column1</div>
        <div className='column column2'>
          <FileUpload/>
        </div>
        <div className='column column3'>column3</div>
      </div>
    </>
  );
}

export default App;