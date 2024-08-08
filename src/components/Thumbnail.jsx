import { Document, pdfjs, Thumbnail as ReactThumbnail } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Thumbnail = ({
  thumbnail,
  pageNumber,
  setPageNumber,
  fileType,
  selectedPage,
}) => {
  // const handleClick = () => {
  //   setPageNumber(5);
  // };

  const [noOfPages, setNoOfPages] = useState(0);

  return (
    <div
      className={`thumbnail-container`}
      // onClick={handleClick}
    >
      {fileType === "pdf" && (
        <div className={`thumbnail-pdf-container`}>
          <Document
            file={thumbnail}
            onLoadSuccess={({ numPages }) => {
              setNoOfPages(numPages);
            }}
          >
            {Array(noOfPages)
              .fill(0)
              .map((_, index) => (
                <div
                  className={`${index + 1 === pageNumber && "selected"}`}
                  key={index}
                >
                  <ReactThumbnail
                    pageNumber={index + 1}
                    width={100}
                    onClick={() => setPageNumber(index + 1)}
                  />
                </div>
              ))}
          </Document>
        </div>
      )}
      {fileType === "image" && (
        // <img src={thumbnail} alt={`Thumbnail ${pageNumber}`} className="thumbnail-image" />
        <img
          src={thumbnail}
          alt={`Thumbnail ${pageNumber}`}
          className={`thumbnail-image ${
            selectedPage === pageNumber ? "selected" : ""
          }`}
          onClick={() => setPageNumber(pageNumber)}
        />
      )}
    </div>
  );
};

export default Thumbnail;

// return (
//   <div
//     className={`thumbnail-container ${selectedPage === pageNumber ? 'selected' : ''}`}
//     onClick={handleClick}
//   >
//     {fileType === 'pdf' && (
//       <div className={`thumbnail-pdf-container ${selectedPage === pageNumber ? 'selected' : ''}`}>
//         <Document file={thumbnail}>
//           <Page pageNumber={pageNumber} width={100} />
//         </Document>
//       </div>
//     )}
//     {fileType === 'image' && (
//       <img src={thumbnail} alt={`Thumbnail ${pageNumber}`} className="thumbnail-image" />
//     )}
//   </div>
// );
// };

// export default Thumbnail;
