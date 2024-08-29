import { useEffect } from "react";
import "../App.css";

function JsonData({ pageNumber, data, classFile, classPage }) {
  const selectedData = data[pageNumber] || [];
  const pageData = classPage[pageNumber] || [];



  useEffect(() => {
    console.log(`JsonData component updated. Page number: ${pageNumber}`);
  }, [pageNumber, data]);


  return (
    <div className="jsonData">
      <pre>{JSON.stringify(selectedData, null, 2)}</pre>
      <span>  </span>
      <pre> File Classification: {JSON.stringify(classFile, null, 2)}</pre>
      <pre> Page Classification: {JSON.stringify(pageData, null, 2)}</pre>
    </div>
  );
}

export default JsonData;

