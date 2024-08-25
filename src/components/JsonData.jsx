import { useEffect } from "react";
import "../App.css";

function JsonData({ pageNumber, data }) {
  const selectedData = data[pageNumber] || [];

  useEffect(() => {
    console.log(`JsonData component updated. Page number: ${pageNumber}`);
  }, [pageNumber, data]);


  return (
    <div className="jsonData">
      <pre>{JSON.stringify(selectedData, null, 2)}</pre>
    </div>
  );
}

export default JsonData;

