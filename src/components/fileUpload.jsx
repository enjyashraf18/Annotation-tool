import React, { useState } from 'react';
import PDFViewer from './PDFViewer';
import ImageDisplay from './ImageDisplay';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);

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

  return (
    <div className='fileUpload'>
      <h2>Upload file</h2>
      <form>
        <input type='file' name='file' onChange={handleFile} />
      </form>
      {fileType === 'pdf' && <PDFViewer pdfData={file} />}
      {fileType === 'image' && <ImageDisplay imageData={file} />}
    </div>
  );
}

export default FileUpload;
