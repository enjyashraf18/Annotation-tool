import { useEffect } from "react";
import "../App.css";
import Samples from "./Samples";

function JsonData({ pageNumber, data, Samples }) {
  const selectedData = data[pageNumber] || [];

  useEffect(() => {
    // This effect runs every time the component re-renders
    console.log(`JsonData component updated. Page number: ${pageNumber}`);
  }, [pageNumber, data]);

  return (
    <div className="json-container">
      <pre>{JSON.stringify(selectedData, null, 2)}</pre>
    </div>
  );
}

export default JsonData;
