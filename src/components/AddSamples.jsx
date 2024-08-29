import { useState, useEffect } from "react";
import SelectedAreaDisplay from "./SelectedAreaDisplay";
import "./css/samples.css";
import "./css/button.css";
import "./css/thumbnail.css";
const AddSample = ({
  fileName,
  selectedArea,
  imageData,
  onAddSample,
  onCancel,
  sampleToEdit,
  pageNumber,
  isPDF,
  
}) => {
  const [label, setLabel] = useState("");
  const [kind, setKind] = useState("None");
  const [language, setLanguage] = useState("None");
  const [description, setDescription] = useState(""); 
  const [objectType, setObjectType] = useState("None"); // New state for object type

  useEffect(() => {
    if (sampleToEdit) {
      setLabel(sampleToEdit.label);
      setKind(sampleToEdit.kind);
      setLanguage(sampleToEdit.language);
      setDescription(sampleToEdit.description || "");
      setObjectType(sampleToEdit.objectType || "None"); // Update for object type
    }
  }, [sampleToEdit]);

  const handleSubmit = () => {
    if (!label || kind === 'None') {
      alert('Label and Kind are required fields.');
      return;
    }

    const sampleDetails = { fileName, pageNumber, label, kind, language, description, selectedArea, objectType };
    onAddSample(sampleDetails);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="sample">
          <div className="sample-data">
            <div className="sample-text">Add new sample</div>
            <div className="sample-input">
              <label htmlFor="sampleLabel">
                Label <span> </span>
              </label>
              <input
                type="text"
                id="sampleLabel"
                name="sampleLabel"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </div>
            <div className="sample-kind">
              <label htmlFor="sampleKind">
                Kind <span> </span>
              </label>
              <select
                id="sampleKind"
                name="sampleKind"
                value={kind}
                onChange={(e) => setKind(e.target.value)}
                required
              >
                <option value="None">Select a kind</option>
                <option value="Object">Object</option>
                <option value="Text">Text</option>
              </select>
            </div>
            {kind === "Object" && (
              <div className="object-type">
                <label htmlFor="objectType">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object
                  Type <span> </span>
                </label>
                <select
                  className="object-input"
                  id="objectType"
                  name="objectType"
                  value={objectType}
                  onChange={(e) => setObjectType(e.target.value)}
                >
                  <option value="None">Select an object type</option>
                  <option value="ID">ID</option>
                  <option value="Passport">Passport</option>
                  <option value="Cover">Cover</option>
                  <option value="Logo">Logo</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            )}
            <div className="sample-language">
              <label htmlFor="samplelanguage">
                Language<span> </span>
              </label>
              <select
                id="samplelanguage"
                name="samplelanguage"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="None">Select a language (optional)</option>
                <option value="Arabic">Arabic</option>
                <option value="English">English</option>
              </select>
            </div>

            <div className="sample-description">
            <label htmlFor="sampleDescription">
            Description
            <span> </span>   </label>
      <textarea
                id="sampleDescription"
                name="sampleDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              />
            </div>
            
          </div>
          <div className="pic-display">
            <SelectedAreaDisplay
              selectedArea={selectedArea}
              imageData={imageData}
              isPDF={isPDF}
              pdfPageNumber={pageNumber}
            />
          </div>
          <footer className="sample-footer">
            <button className='popup-buttons-cancel' onClick={onCancel}>CANCEL</button>
            <span> </span>
            <button className='popup-buttons' onClick={handleSubmit}>ADD</button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AddSample;
