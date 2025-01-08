/* eslint-disable react/prop-types */
import { Circle, Error } from "@mui/icons-material";
export default function StatusPage({ msg }) {
  return (
    <section className="status-page">
      {msg ? (
        <div className="error-section">
          <Error className="error-icon" />
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
