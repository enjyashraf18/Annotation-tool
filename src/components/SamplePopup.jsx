import React, { useState } from 'react';
import SelectedAreaDisplay from './SelectedAreaDisplay';

const SamplePopup = ({ selectedArea, imageData, onClose, onAddSample }) => {
    const [label, setLabel] = useState('');
    const [kind, setKind] = useState('text');
    const [language, setLanguage] = useState('Arabic');

    const handleAddSample = () => {
        const sampleDetails = {
            label,
            kind,
            language,
            imageData,
            selectedArea
        };
        onAddSample(sampleDetails);
        onClose();
    };

    return (
        <div className='popup'>
            <div className='popup-content'>
                <div className='sample-data'>
                    <div className='sample-text'>Add new sample</div>
                    <div className='sample-input'>
                        <label htmlFor="sampleLabel">Label</label>
                        <input
                            type="text"
                            id="sampleLabel"
                            name="sampleLabel"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </div>
                    <div className='sample-kind'>
                        <label htmlFor="sampleKind">Kind</label>
                        <select
                            id="sampleKind"
                            name="sampleKind"
                            value={kind}
                            onChange={(e) => setKind(e.target.value)}
                        >
                            <option value="text">Text</option>
                            <option value="object">Object</option>
                        </select>
                    </div>
                    <div className='sample-language'>
                        <label htmlFor="samplelanguage">Language</label>
                        <select
                            id="samplelanguage"
                            name="samplelanguage"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option value="Arabic">Arabic</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                </div>
                <div className='pic-display'>
                    <SelectedAreaDisplay selectedArea={selectedArea} imageData={imageData} />
                </div>
                <footer className='sample-footer'>
                    <button onClick={handleAddSample}>Add</button>
                    <button onClick={onClose}>Cancel</button>
                </footer>
            </div>
        </div>
    );
};

export default SamplePopup;
