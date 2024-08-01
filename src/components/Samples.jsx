import React from 'react';

const Samples = ({ samples, onEditSample, onDeleteSample, onAddSample }) => {
  if (!samples) {
    return null; // Prevents the map error if samples is undefined
  }

  return (
    <div className="samples">
      <h3>Saved Samples</h3>
      <ul>
        {samples.map(sample => (
          <li key={sample.id}>
            <div>
              <strong>Label:</strong> {sample.label}
            </div>
            <div>
              <strong>Kind:</strong> {sample.kind}
            </div>
            <div>
              <strong>Language:</strong> {sample.language}
            </div>
            <button onClick={() => onEditSample(sample)}>Edit</button>
            <button onClick={() => onDeleteSample(sample.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <footer className='sample-footer'>
        <button onClick={onAddSample}>+ ADD SAMPLES</button>
      </footer>
    </div>
  );
};

export default Samples;
