import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import SelectedAreaSample from "./SelectedAreaSample";

const Samples = ({
  samples,
  onEditSample,
  onDeleteSample,
  file,
  pageNumber,
  isPDF,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);


  const currentPageSamples = Array.isArray(samples[pageNumber])
    ? samples[pageNumber]
    : [];

  const handleDropdownAction = (sampleId, action) => {
    const sample = currentPageSamples.find((s) => s.id === sampleId);
    if (action === "edit") {
      onEditSample(sample);
    } else if (action === "delete") {
      onDeleteSample(sampleId);
    }
    setDropdownOpen(null); 
  };

  const toggleDropdown = (sampleId) => {
    setDropdownOpen(dropdownOpen === sampleId ? null : sampleId); 
  };

  return (
    <div className="samples">
      <div className="samples-counter">
        <h5>Total uploaded samples</h5>
        <span>{currentPageSamples.length}</span>
      </div>

      <ul className="samples-content">
        {currentPageSamples.map((sample) => (
          <li className="one-sample" key={sample.id}>
            <div className="sample-thumbnail">
              <SelectedAreaSample
                selectedArea={sample.selectedArea}
                imageData={file}
                isPDF={isPDF} 
                pdfPageNumber={pageNumber} 
              />
            </div>
            <div className="sample-info">
              <div>
                <strong>Label</strong> {sample.label}
              </div>
              <div>
                <strong>Kind</strong> {sample.kind}
              </div>
              <div>
                <strong>Language</strong> {sample.language}
              </div>
              <div className="dropdown">
                <button
                  className="dropdown-toggle"
                  onClick={() => toggleDropdown(sample.id)}
                >
                  <HiDotsHorizontal />
                </button>
                {dropdownOpen === sample.id && (
                  <div className="dropdown-menu">
                    <button
                      onClick={() => handleDropdownAction(sample.id, "edit")}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDropdownAction(sample.id, "delete")}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Samples;