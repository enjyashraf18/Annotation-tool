import { useState, useEffect } from "react";
import "../App.css";

function JsonData({
    pageNumber,
    data,
}) {
    


  return (
    <div>
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>

    </div>
  );
}

export default JsonData;
