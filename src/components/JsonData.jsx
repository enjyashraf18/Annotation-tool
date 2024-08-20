import { useEffect } from "react";
import "../App.css";

function JsonData({ pageNumber, data }) {
  const selectedData = data[pageNumber] || [];

  useEffect(() => {
    // This effect runs every time the component re-renders
    console.log(`JsonData component updated. Page number: ${pageNumber}`);
  }, [pageNumber, data]);

  return (
    <div style={{ overflow: 'auto' }}>
      <pre>{JSON.stringify(selectedData, null, 2)}</pre>
    </div>
  );
}

export default JsonData;
