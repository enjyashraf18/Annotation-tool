import { useState, useEffect } from "react";
import SelectedAreaDisplay from "./SelectedAreaDisplay";

const ViewSample = ({
  fileName,
  selectedArea,
  imageData,
  onCancel,
  sampleToEdit,
  pageNumber,
  isPDF,
}) => {
  const [label, setLabel] = useState("");
  const [kind, setKind] = useState("None");
  const [language, setLanguage] = useState("None");
  const [objectType, setObjectType] = useState("None"); // Added state for objectType

  useEffect(() => {
    if (sampleToEdit) {
      setLabel(sampleToEdit.label);
      setKind(sampleToEdit.kind);
      setLanguage(sampleToEdit.language);
      if (sampleToEdit.kind === "Object") {
        setObjectType(sampleToEdit.objectType || "None"); // Load object type if editing
      }
    }
  }, [sampleToEdit]);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="sample">
          <div className="sample-data">
            <div className="sample-text">View Sample</div>
            <div className="sample-input">
              <label htmlFor="sampleLabel">
                Label <span> </span>
              </label>
              <input
                type="text"
                id="sampleLabel"
                name="sampleLabel"
                value={label}
                readOnly // Make input read-only
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
                  readOnly
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
                readOnly // Make select read-only
              >
                <option value="None">Select a language (optional)</option>
                <option value="Arabic">Arabic</option>
                <option value="English">English</option>
              </select>
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
            <button
              className="popup-buttons-cancel"
              onClick={onCancel}
            >
              CANCEL
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ViewSample;

