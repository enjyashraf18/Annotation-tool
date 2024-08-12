import { useState, useEffect } from "react";
import SelectedAreaDisplay from "./SelectedAreaDisplay";

const AddSample = ({
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
  // const [pageNumber, setPageNumber] = useState(1); 


  useEffect(() => {
    console.log(isPDF);
    if (sampleToEdit) {
      setLabel(sampleToEdit.label);
      setKind(sampleToEdit.kind);
      setLanguage(sampleToEdit.language);
    }
  }, [sampleToEdit]);

  // const handleSubmit = () => {
  //   const sampleDetails = { label, kind, language, selectedArea, imageData };
  //   onAddSample(sampleDetails);
  // };

  const handleSubmit = () => {
    if (!label || kind === 'None' || language === 'None') {
      alert('Label, Kind, and Language are required fields.');
      return;
    }

    const sampleDetails = { label, kind, language, selectedArea, imageData };
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
            <div className="sample-language">
              <label htmlFor="samplelanguage">
                Language<span> </span>
              </label>
              <select
                id="samplelanguage"
                name="samplelanguage"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
              >
                <option value="None">Select a language</option>
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
            <button onClick={handleSubmit}>Add</button>
            <span> </span>
            <button onClick={onCancel}>Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AddSample;
