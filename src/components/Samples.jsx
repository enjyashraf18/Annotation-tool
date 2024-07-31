import React from "react";
import SelectedAreaDisplay from './SelectedAreaDisplay';

function Samples({ selectedArea, file, counter }) {
  return (
    <div>
      <header>Samples</header>
      <p>Total uploaded samples: {counter}</p>
      <div>
        <main className='column3-main'>
          {selectedArea && (
            <SelectedAreaDisplay selectedArea={selectedArea} imageData={file} />
          )}
        </main>
        <footer className='column3-footer'>
          <button className='Add'>+ ADD SAMPLES</button>
        </footer>
      </div>
    </div>
  );
}
//dddd

export default Samples;
