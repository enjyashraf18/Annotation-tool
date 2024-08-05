import React, { useState } from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import SelectedAreaDisplay from './SelectedAreaDisplay';
import SelectedAreaSample from './SelectedAreaSample';

const Samples = ({ samples, onEditSample, onDeleteSample, numSamples, file }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleDropdownAction = (sampleId, action) => {
    const sample = samples.find(s => s.id === sampleId);
    if (action === 'edit') {
      onEditSample(sample);
    } else if (action === 'delete') {
      onDeleteSample(sampleId);
    }
    setDropdownOpen(null); // Close the dropdown after action
  };

  const toggleDropdown = (sampleId) => {
    if (dropdownOpen === sampleId) {
      setDropdownOpen(null); // Close the dropdown
    } else {
      setDropdownOpen(sampleId); // Open the dropdown
    }
  };

  return (
    <div className="samples">
      <div className='samples-counter'>
        <h5>Total uploaded samples</h5>
        <span>{numSamples}</span>
      </div>

      <ul className='samples-content'>
        {samples.map(sample => (
          <li className='one-sample' key={sample.id}>
            <div className='sample-thumbnail'>
              <SelectedAreaSample selectedArea={sample.selectedArea} imageData={file} />
            </div>
            <div className='sample-info'>
              <div>
                <strong>Label:</strong> {sample.label}
              </div>
              <div>
                <strong>Kind:</strong> {sample.kind}
              </div>
              <div>
                <strong>Language:</strong> {sample.language}
              </div>
              <div className="dropdown">
                <button className="dropdown-toggle" onClick={() => toggleDropdown(sample.id)}>
                  <HiDotsHorizontal />
                </button>
                {dropdownOpen === sample.id && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleDropdownAction(sample.id, 'edit')}>Edit</button>
                    <button onClick={() => handleDropdownAction(sample.id, 'delete')}>Delete</button>
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
