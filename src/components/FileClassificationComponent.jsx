// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';


// // const FileClassificationComponent = ({ file, fileName, onClassifyFile, handleAddClassification, fileClassifications1 }) => {
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedOption, setSelectedOption] = useState('');
// //   const [customOption, setCustomOption] = useState('');
// //   const [fileClassification, setFileClassification] = useState('');
// //   const [isEditing, setIsEditing] = useState(false);

// //   useEffect(() => {
// //     setFileClassification('');
// //   }, [file]);

// //   const handleOpenModal = () => {
// //     setIsModalOpen(true);
// //   };

// //   const handleSaveClassification = () => {
// //     const classification = customOption || selectedOption;
// //     setFileClassification(classification);
// //     onClassifyFile(file, classification);
// //     setIsEditing(false);

// //     const classificationDetails = { classification, fileName, pageNumber: null };
// //     handleAddClassification(classificationDetails, fileName);
// //     handleCloseModal();
// //   };

// //   const handleEditClassification = () => {
// //     setIsEditing(true);
// //     setIsModalOpen(true);
// //   };

// //   const handleDeleteClassification = () => {
// //     setFileClassification('');
// //     onClassifyFile(file, null);
// //   };

// //   const handleCloseModal = () => {
// //     setIsModalOpen(false);
// //     setSelectedOption('');
// //     setCustomOption('');
// //   };

// //   return (
// //     <>
// //       <div>
// //         {!fileClassification && fileName && (
// //           <button className="action-button" onClick={handleOpenModal} disabled={!fileName}>
// //             Classify Entire File
// //           </button>
// //         )}
// //       </div>

// //       {fileClassification && (
// //         <div className="classification-container">
// //           <div className="classification-box">
// //             <p>File Classification: {fileClassification}</p>
// //             <div className="button-group">
// //               <button className="edit-button" onClick={handleEditClassification}>Edit</button>
// //               <button className="delete-button" onClick={handleDeleteClassification}>Delete</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {isModalOpen && (
// //         <div className="modal">
// //           <div className="modal-content">
// //             <h2>Classify Entire File</h2>
// //             <select
// //               value={selectedOption}
// //               onChange={(e) => setSelectedOption(e.target.value)}
// //             >
// //               <option value="">Select Classification</option>
// //               <option value="ID">ID</option>
// //               <option value="Passport">Passport</option>
// //               <option value="Document">Document</option>
// //             </select>
// //             <input
// //               type="text"
// //               placeholder="Or add your own"
// //               value={customOption}
// //               onChange={(e) => setCustomOption(e.target.value)}
// //             />
// //             <button className="modal-button save-button" onClick={handleSaveClassification} disabled={!(customOption || selectedOption)}>
// //               Save
// //             </button>
// //             <button className="modal-button cancel-button" onClick={handleCloseModal}>Cancel</button>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default FileClassificationComponent;


// import React, { useState, useEffect } from 'react';

// const FileClassificationComponent = ({ file, fileName, onClassifyFile, handleAddClassification, fileClassifications1 }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [allowClassification, setAllowClassification] = useState(true);
//   const [allowEditing, setAllowEditing] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [customOption, setCustomOption] = useState('');
//   const [fileClassification, setFileClassification] = useState(fileClassifications1 || '');
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     setFileClassification(fileClassifications1 || '');
//   }, [file, fileClassifications1]);

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleSaveClassification = () => {
//     setAllowEditing(true);
//     setAllowClassification(false);
//     const classification = customOption || selectedOption;
//     setFileClassification(classification);
//     onClassifyFile(file, classification);
//     setIsEditing(false);

//     const classificationDetails = { classification, fileName, pageNumber: null };
//     handleAddClassification(classificationDetails, fileName);
//     handleCloseModal();
//   };

//   const handleEditClassification = () => {
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleDeleteClassification = () => {
//     setFileClassification('');
//     onClassifyFile(file, null);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedOption('');
//     setCustomOption('');
//   };

//   return (
//     <>
//       <div>
//         {fileName && allowClassification && (
//           <button className="action-button" onClick={handleOpenModal} disabled={!fileName}>
//             Classify Entire File
//           </button>
//         )}
//       </div>

//       <div>
//         {fileName && allowEditing && (
//           <button className="action-button" onClick={handleOpenModal} disabled={!fileName}>
//             Edit File Classification
//           </button>
//         )}
//       </div>

//       {/* {fileClassification && (
//         <div className="classification-container">
//           <div className="classification-box">
//             <p>File Classification: {fileClassification}</p>
//             <div className="button-group">
//               <button className="edit-button" onClick={handleEditClassification}>Edit</button>
//               <button className="delete-button" onClick={handleDeleteClassification}>Delete</button>
//             </div>
//           </div>
//         </div>
//       )} */}

//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Classify Entire File</h2>
//             <select
//               value={selectedOption}
//               onChange={(e) => setSelectedOption(e.target.value)}
//             >
//               <option value="">Select Classification</option>
//               <option value="ID">ID</option>
//               <option value="Passport">Passport</option>
//               <option value="Document">Document</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Or add your own"
//               value={customOption}
//               onChange={(e) => setCustomOption(e.target.value)}
//             />
//             <button className="modal-button save-button" onClick={handleSaveClassification} disabled={!(customOption || selectedOption)}>
//               Save
//             </button>
//             <button className="modal-button cancel-button" onClick={handleCloseModal}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FileClassificationComponent;

import React, { useState, useEffect } from 'react';

const FileClassificationComponent = ({ file, fileName, onClassifyFile, handleAddClassification, fileClassifications1 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allowClassification, setAllowClassification] = useState(true);
  const [allowEditing, setAllowEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [customOption, setCustomOption] = useState('');
  const [fileClassification, setFileClassification] = useState(fileClassifications1 || '');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFileClassification(fileClassifications1 || '');
    setAllowClassification(!fileClassifications1);
    setAllowEditing(!!fileClassifications1);
  }, [file, fileClassifications1]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSaveClassification = () => {
    const classification = customOption || selectedOption;
    setFileClassification(classification);
    onClassifyFile(file, classification);
    
    const classificationDetails = { classification, fileName, pageNumber: null };
    handleAddClassification(classificationDetails, fileName);
    
    setAllowClassification(false);
    setAllowEditing(true);
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleEditClassification = () => {
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClassification = () => {
    setFileClassification('');
    onClassifyFile(file, null);
    setAllowClassification(true);
    setAllowEditing(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOption('');
    setCustomOption('');
  };

  return (
    <>
      <div>
        {fileName && allowClassification && (
          <button className="action-button" onClick={handleOpenModal} disabled={!fileName}>
            Classify Entire File
          </button>
        )}
      </div>

      {/* <div>
        {fileName && allowEditing && (
          <button className="action-button" onClick={handleEditClassification} disabled={!fileName}>
            Edit File Classification
          </button>
        )}
      </div> */}

      {fileClassification && (
        <div className="classification-container">
          <div className="classification-box">
            <p>File Classification: {fileClassification}</p>
            <div className="button-group">
              <button className="edit-button" onClick={handleEditClassification}>Edit</button>
              <button className="delete-button" onClick={handleDeleteClassification}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditing ? 'Edit Classification' : 'Classify Entire File'}</h2>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select Classification</option>
              <option value="ID">ID</option>
              <option value="Passport">Passport</option>
              <option value="Document">Document</option>
            </select>
            <input
              type="text"
              placeholder="Or add your own"
              value={customOption}
              onChange={(e) => setCustomOption(e.target.value)}
            />
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

export default FileClassificationComponent;
