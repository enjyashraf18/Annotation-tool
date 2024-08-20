import { useState, useEffect } from "react";
import "../App.css";

function JsonData({
    pageNumber,
    data,
}) {
    
    const selectedData = data[pageNumber] || []; 

  return (
    <div
    style = {{overflow: 'auto'}} 
    >
        <pre>
            {JSON.stringify(selectedData, null, 2)}
        </pre>

    </div>
  );
}

export default JsonData;



