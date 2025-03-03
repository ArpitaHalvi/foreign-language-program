/* eslint-disable react/prop-types */
// import { Viewer } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import { pdfjs } from "react-pdf";
// import workerSrc from "pdfjs-dist/build/pdf.worker.min.js";

import { Close } from "@mui/icons-material";

// Configuring pdf.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudfare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// console.log("pdf js: ", pdfjs.GlobalWorkerOptions.workerSrc);

export default function PDFViewer({ isOpen, pdfLink, onClose }) {
  //   const defaultLayoutPluginInstance = defaultLayoutPlugin();
  if (!isOpen) return null;
  return (
    <div className="pdf-modal">
      {/* <Viewer fileUrl={pdfLink} plugins={[defaultLayoutPluginInstance]} /> */}
      <button className="modal-close" onClick={onClose}>
        <Close />
      </button>
      {!pdfLink ? (
        <div className="loading">Loading...</div>
      ) : (
        <iframe
          src={pdfLink}
          className="pdf"
          width="1200px"
          height="100%"
        ></iframe>
      )}
    </div>
  );
}
