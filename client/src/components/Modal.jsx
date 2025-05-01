/* eslint-disable react/prop-types */
import { Close } from "@mui/icons-material";
import "./AdminStyles.scss";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <Close className="close-icon" />
        </button>
        {children}
      </div>
    </div>
  );
}
