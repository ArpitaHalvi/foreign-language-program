/* eslint-disable react/prop-types */
import { Circle } from "@mui/icons-material";
export default function StatusPage({ msg }) {
  return (
    <section className="status-page">
      {msg ? (
        <div className="error-section">
          <img src="server-error.svg" alt="" />
          <p>Error: {msg}</p>
        </div>
      ) : (
        <div className="loading-section">
          <p>Please wait</p>
          <div className="loading-icon">
            <Circle className="circle" />
            <Circle className="circle" />
            <Circle className="circle" />
          </div>
        </div>
      )}
    </section>
  );
}
