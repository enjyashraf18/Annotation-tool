

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassifyComponent = ({ file, fileName, isPdf, pageNumber, onClassifyFile, onClassifyPage, handleAddClassification ,pageClassifications, setPageClassifications, numOfPages}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [customOption, setCustomOption] = useState('');
  const [classificationTarget, setClassificationTarget] = useState(null);
  // const [fileClassification, setFileClassification] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const classification = customOption || selectedOption;

  useEffect(() => {
    // setFileClassification('');
    setPageClassifications({});
  }, [file]);


  const handleSubmit = () => {
    const classification = customOption || selectedOption
    const classificationDetails = {classification, fileName, pageNumber};
    // onSaveClassification(classificationDetails);
  };

  const handleOpenModal = (target) => {
    setClassificationTarget(target);
    setIsModalOpen(true);
  };

/*
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

*/
  const handleSaveClassification = () => {
    const classification = customOption || selectedOption;

    if (classificationTarget === 'file') {
      // setFileClassification(classification);

      setPageClassifications(Array(numOfPages).reduce((prev, i) => {
        prev[i] =classification
      }, {}))
      onClassifyFile(file, classification);
    } else if (classificationTarget === 'page') {
      setPageClassifications((prev) => ({
        ...prev,
        [pageNumber]: classification,
      }));
      onClassifyPage(file, pageNumber, classification);
    }

    setIsEditing(false);
    const classificationDetails = {classification, fileName, pageNumber};
    handleAddClassification(classificationDetails, fileName);
    // onSaveClassification(classificationDetails, fileName);
    handleCloseModal();
  };

  const handleEditClassification = (target) => {
    setIsEditing(true);
    setClassificationTarget(target);
    setIsModalOpen(true);
  };

  const handleDeleteClassification = (target) => {
    if (target === 'file') {
      // setFileClassification();
      onClassifyFile(file, null);
    } else if (target === 'page') {
      setPageClassifications((prev) => {
        const newPageClassifications = { ...prev };
        delete newPageClassifications[pageNumber];
        return newPageClassifications;
      });
      onClassifyPage(file, pageNumber, null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOption('');
    setCustomOption('');
    setClassificationTarget(null);
  };

  return (
    <>
      <div>
        {fileName && (
          <button className="action-button" onClick={() => handleOpenModal('file')} disabled={!fileName}>
            Classify Entire File
          </button>
        )}
      </div>
      <span>    </span>
      <div>
        {!pageClassifications[pageNumber] && fileName && isPdf && (
          <button className="action-button" onClick={() => handleOpenModal('page')} disabled={!isPdf}>
            Classify Specific Page
          </button>
        )}
      </div>
      
      <div className="classification-container">
        {fileClassification && (
          <div className="classification-box">
            <p>File Classification: {fileClassification}</p>
            <div className="button-group">
              <button className="edit-button" onClick={() => handleEditClassification('file')}>Edit</button>
              <button className="delete-button" onClick={() => handleDeleteClassification('file')}>Delete</button>
            </div>
          </div>
        )}
        
        {pageClassifications[pageNumber] && (
          <div className="classification-box">
            <p>Page {pageNumber} Classification: {pageClassifications[pageNumber]}</p>
            <div className="button-group">
              <button className="edit-button" onClick={() => handleEditClassification('page')}>Edit</button>
              <button className="delete-button" onClick={() => handleDeleteClassification('page')}>Delete</button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Classify {classificationTarget === 'file' ? 'Entire File' : `Page ${pageNumber}`}</h2>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select Classification</option>
              <option value="ID">ID</option>
              <option value="Passport">Passport</option>
              <option value="Document">Document</option>
            </select>
            <span>    </span>
            <input
              type="text"
              placeholder="Or add your own"
              value={customOption}
              onChange={(e) => setCustomOption(e.target.value)}
            />
            <span>    </span>
            <button className="modal-button save-button" onClick={handleSaveClassification} disabled={!(customOption || selectedOption)}>
              Save
            </button>
            <button className="modal-button cancel-button" onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ClassifyComponent;
