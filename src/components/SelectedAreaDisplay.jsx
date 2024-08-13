import { useEffect, useRef } from "react";
import { pdfjs } from "react-pdf"; // Ensure you have pdfjs library available

const SelectedAreaDisplay = ({ selectedArea, imageData, isPDF, pdfPageNumber }) => {
  const destRef = useRef(null);

  useEffect(() => {
  
    if (selectedArea && (imageData || isPDF)) {
      const context = destRef.current.getContext("2d");

      // Handle PDF rendering
      if (isPDF && pdfPageNumber) {
        const renderPDFToCanvas = async () => {
          const loadingTask = pdfjs.getDocument(imageData);
          const pdf = await loadingTask.promise;
          const page = await pdf.getPage(pdfPageNumber);

          const viewport = page.getViewport({ scale: 1 });
          const canvas = document.createElement("canvas");
          const pdfContext = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext = {
            canvasContext: pdfContext,
            viewport: viewport,
          };

          await page.render(renderContext).promise;

          const scale = selectedArea.scale || 1;
          const canvasWidth = selectedArea.width * scale;
          const canvasHeight = selectedArea.height * scale;

          destRef.current.width = canvasWidth;
          destRef.current.height = canvasHeight;

          context.clearRect(0, 0, canvasWidth, canvasHeight);

          context.drawImage(
            canvas,
            selectedArea.x,
            selectedArea.y,
            selectedArea.width,
            selectedArea.height,
            0,
            0,
            canvasWidth,
            canvasHeight
          );
        };

        renderPDFToCanvas();
      } 
      // Handle image rendering
      else if (imageData) {
        const img = new Image();
        img.src = imageData;
        img.onload = () => {
          const context = destRef.current.getContext("2d");
          const scale = selectedArea.scale || 1;
  
          destRef.current.width = selectedArea.width * scale;
          destRef.current.height = selectedArea.height * scale;
  
          context.clearRect(0, 0, destRef.current.width, destRef.current.height);
  
          context.drawImage(
            img,
            selectedArea.x,
            selectedArea.y,
            selectedArea.width,
            selectedArea.height,
            0,
            0,
            selectedArea.width * scale,
            selectedArea.height * scale
          );
        };
      }
    }
  }, [selectedArea, imageData, isPDF, pdfPageNumber]);

  if (!selectedArea || !(imageData || isPDF)) return null;

  return (
    <div
      className="selected-area-display"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto', // or 'hidden' depending on your needs
        //width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          padding: '10px',
        }}
      >
        <canvas
          ref={destRef}
          style={{
            width: '60%',
            height: '230px',
            objectFit: 'contain',
            maxWidth: '100%',
          maxHeight: '100%',
          }}
        />
      </div>
    </div>
  );
  

};

export default SelectedAreaDisplay;