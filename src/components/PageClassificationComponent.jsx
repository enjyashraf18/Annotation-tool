

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PageClassificationComponent = ({ file, fileName, isPdf, pageNumber, onClassifyFile, onClassifyPage, handleAddClassification, pageClassifications, setPageClassifications }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [customOption, setCustomOption] = useState('');
  const [classificationTarget, setClassificationTarget] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setPageClassifications({});
  }, [file]);

  const handleOpenModal = (target) => {
    setClassificationTarget(target);
    setIsModalOpen(true);
  };


  const handleSaveClassification = () => {
    const classification = customOption || selectedOption;

    setPageClassifications((prev) => ({
      ...prev,
      [pageNumber]: classification,
    }));
    onClassifyPage(file, pageNumber, classification);


    setIsEditing(false);
    const classificationDetails = { classification, fileName, pageNumber };
    handleAddClassification(classificationDetails, fileName);
    handleCloseModal();
  };

  const handleEditClassification = (target) => {
    setIsEditing(true);
    setClassificationTarget(target);
    setIsModalOpen(true);
  };

  const handleDeleteClassification = (target) => {
    setPageClassifications((prev) => {
      const newPageClassifications = { ...prev };
      delete newPageClassifications[pageNumber];
      return newPageClassifications;
    });
    onClassifyPage(file, pageNumber, null);
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
        {!pageClassifications[pageNumber] && fileName && isPdf && (
          <button className="action-button" onClick={() => handleOpenModal('page')} disabled={!isPdf}>
            Classify Specific Page
          </button>
        )}
      </div>

      <div className="classification-container">

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
            <h2>Classify Page {pageNumber}</h2>
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

export default PageClassificationComponent;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PageClassificationComponent = ({ file, fileName, isPdf, pageNumber, onClassifyFile, onClassifyPage, handleAddClassification, pageClassifications1}) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [customOption, setCustomOption] = useState('');
//   const [classificationTarget, setClassificationTarget] = useState(null);
//   const [pageClassifications, setPageClassifications] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     setPageClassifications(pageClassifications1 || '');
//   }, [file, pageClassifications1]);

//   useEffect(() => {
//     setPageClassifications({});
//   }, [file]);

//   const handleOpenModal = (target) => {
//     setClassificationTarget(target);
//     setIsModalOpen(true);
//   };


//   const handleSaveClassification = () => {
//     const classification = customOption || selectedOption;

//     setPageClassifications((prev) => ({
//       ...prev,
//       [pageNumber]: classification,
//     }));
//     onClassifyPage(file, pageNumber, classification);


//     setIsEditing(false);
//     const classificationDetails = { classification, fileName, pageNumber };
//     handleAddClassification(classificationDetails, fileName);
//     handleCloseModal();
//   };

//   const handleEditClassification = (target) => {
//     setIsEditing(true);
//     setClassificationTarget(target);
//     setIsModalOpen(true);
//   };

//   const handleDeleteClassification = (target) => {
//     setPageClassifications((prev) => {
//       const newPageClassifications = { ...prev };
//       delete newPageClassifications[pageNumber];
//       return newPageClassifications;
//     });
//     onClassifyPage(file, pageNumber, null);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedOption('');
//     setCustomOption('');
//     setClassificationTarget(null);
//   };

//   return (
//     <>
//       <div>
//         {!pageClassifications[pageNumber] && fileName && isPdf && (
//           <button className="action-button" onClick={() => handleOpenModal('page')} disabled={!isPdf}>
//             Classify Specific Page
//           </button>
//         )}
//       </div>

//       <div className="classification-container">

//         {pageClassifications[pageNumber] && (
//           <div className="classification-box">
//             <p>Page {pageNumber} Classification: {pageClassifications[pageNumber]}</p>
//             <div className="button-group">
//               <button className="edit-button" onClick={() => handleEditClassification('page')}>Edit</button>
//               <button className="delete-button" onClick={() => handleDeleteClassification('page')}>Delete</button>
//             </div>
//           </div>
//         )}
//       </div>

//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Classify Page {pageNumber}</h2>
//             <select
//               value={selectedOption}
//               onChange={(e) => setSelectedOption(e.target.value)}
//             >
//               <option value="">Select Classification</option>
//               <option value="ID">ID</option>
//               <option value="Passport">Passport</option>
//               <option value="Document">Document</option>
//             </select>
//             <span>    </span>
//             <input
//               type="text"
//               placeholder="Or add your own"
//               value={customOption}
//               onChange={(e) => setCustomOption(e.target.value)}
//             />
//             <span>    </span>
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

// export default PageClassificationComponent;
