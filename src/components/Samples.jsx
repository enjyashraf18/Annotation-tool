import React, { useState, useEffect } from 'react';
import { HiDotsHorizontal } from "react-icons/hi";



const Samples = ({ samples, onEditSample, onDeleteSample, numSamples }) => {
  if (!samples) {
    return null; 
  }

  return (
    <div className="samples">
      <div className='samples-counter'>
      <h5>Total uploaded samples</h5>
      <span>{numSamples}</span>
      </div>

      <ul className='samples-content'>
        {samples.map(sample => (
          <li className ='one-sample'key={sample.id}>
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
    </div>
  );
};

export default Samples;
