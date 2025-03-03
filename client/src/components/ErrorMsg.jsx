import { Close } from "@mui/icons-material";

/* eslint-disable react/prop-types */
export default function ErrorMsg({ msg, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="error-div">
      <p>{msg}</p>
      <button onClick={onClose} className="close-modal">
        <Close className="close-icon" />
      </button>
    </div>
  );
}
