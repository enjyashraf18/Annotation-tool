import React, { useState } from 'react';
import PDFViewer from './PDFViewer';
import ImageDisplay from './ImageDisplay';
import { MdOutlineFileUpload } from "react-icons/md";
import './FileUpload.css'; 
import { IoPlayOutline } from "react-icons/io5";
import { LuFileScan } from "react-icons/lu";
import { IoFilterOutline } from "react-icons/io5";
import '../App.css';


// hana 

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
    <div>
      <header>
        <div className='fileUpload'>
          <form>
            {/* <input
              type='file'
              name='file'
              id='file'
              onChange={handleFile}
              style={{ display: 'none' }}
            />
            <label htmlFor='file' className='fileScanButton'>
              <LuFileScan size='4rem' />
              <span>Scan</span>
            </label> */}
            <input
              type='file'
              name='file'
              id='file'
              onChange={handleFile}
              style={{ display: 'none' }}
            />
            <label htmlFor='file' className='fileUploadButton'>
              <MdOutlineFileUpload size= "3rem" />
              <span>Upload</span>
            </label>
            {/* <input
              type='file'
              name='file'
              id='file'
              onChange={handleFile}
              style={{ display: 'none' }}
            />
            <label htmlFor='file' className='fileProcessingButton'>
              <IoPlayOutline  size= "4rem" />
              <span>Process</span>
            </label>
            <input
              type='file'
              name='file'
              id='file'
              onChange={handleFile}
              style={{ display: 'none' }}
            />
            <label htmlFor='file' className='fileFilterButton'>
              <IoFilterOutline  size= "4rem" />
              <span>Filter By</span>
            </label> */}
            <hr />
          </form>
        </div>
      </header>
      {fileType === 'pdf' && <PDFViewer pdfData={file} />}
      {fileType === 'image' && <ImageDisplay imageData={file} />}
    </div>
  );
}

export default FileUpload;

