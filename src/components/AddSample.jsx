// import React, { useEffect, useRef } from 'react';
// import SelectedAreaDisplay from './SelectedAreaDisplay';
// const AddSample = ({ selectedArea, imageData }) => {

//     return (
//         <div className='sample'>
//             <div className='sample-data'>
//                 <div className='sample-text'>
//                     Add new sample
//                 </div>


//             </div>
//             <div className='pic-display'>
//                 <SelectedAreaDisplay selectedArea={selectedArea} imageData={imageData} />
//             </div>
//             <footer className='sample-footer'>
//                 <button>Add</button>
//                 <button>cancel</button>
//             </footer>

//         </div>


//     )
// }

// export default AddSample;

import React from 'react';
import SelectedAreaDisplay from './SelectedAreaDisplay';

const AddSample = ({ selectedArea, imageData }) => {
    return (
        <div className='sample'>
            <div className='sample-data'>
                <div className='sample-text'>
                    Add new sample
                </div>
                <div className='sample-input'>
                    <label htmlFor="sampleLabel">Label  <span>    </span></label>
                    <input type="text" id="sampleLabel" name="sampleLabel" />
                </div>
                <div className='sample-kind'>
                    <label htmlFor="sampleKind">Kind <span>    </span></label>
                    <select id="sampleKind" name="sampleKind">
                        <option value="text">Text</option>
                        <option value="object">Object</option>
                    </select>
                </div>
                <div className='sample-language'>
                    <label htmlFor="samplelanguage"> Language<span>    </span></label>
                    <select id="samplelanguage" name="samplelanguage">
                        <option value="text">Arabic</option>
                        <option value="object">English</option>
                    </select>
                </div>
            </div>
            <div className='pic-display'>
                <SelectedAreaDisplay selectedArea={selectedArea} imageData={imageData} />
            </div>
            <footer className='sample-footer'>
                <button>Add</button>
                <span>    </span>
                <button>Cancel</button>
            </footer>
        </div>
    )
}

export default AddSample;
