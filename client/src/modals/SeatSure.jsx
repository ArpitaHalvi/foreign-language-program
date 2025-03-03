import { CheckCircle, Close } from "@mui/icons-material";

/* eslint-disable react/prop-types */
export default function SeatSure({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="seat-sure">
      <div className="wait-a-while">
        <button className="modal-close" onClick={onClose}>
          <Close className="close-icon" />
        </button>
        <h2>
          Enrollment Confirmed! <CheckCircle className="check-icon" />
        </h2>
        <p>
          Thank you for enrolling! Your seat is secured, and we&apos;re
          processing your payment. You&apos;ll be notified once it&apos;s
          approved.
        </p>
        <p>In the meantime, feel free to explore our other courses!</p>
      </div>
    </div>
  );
}
