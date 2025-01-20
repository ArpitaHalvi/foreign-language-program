/* eslint-disable react/prop-types */
export default function ConfirmModal({ isOpen, isClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <p>Are you sure you want to delete this item?</p>
        <div className="button-group">
          <button className="confirm-btn btn-look" onClick={onConfirm}>
            Confirm
          </button>
          <button className="cancel-btn btn-look" onClick={isClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
