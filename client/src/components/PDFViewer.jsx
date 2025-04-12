/* eslint-disable react/prop-types */
import { Close } from "@mui/icons-material";

export default function PDFViewer({ isOpen, pdfLink, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="pdf-modal">
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
