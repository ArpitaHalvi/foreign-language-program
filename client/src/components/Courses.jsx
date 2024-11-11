/* eslint-disable react/prop-types */
import "./Courses.scss";
import study from "../assets/images/study.jpg";
import { NavLink } from "react-router-dom";

export default function Courses({ title, eligibility, fees, mode, duration }) {
  return (
    <div className="course-item">
      <div className="course-img">
        <img src={study} alt="course-img" />
      </div>
      <div className="course-info">
        <div className="course-data">
          <h2 className="course-name">{title}</h2>
          <p className="age-group">
            <span>{eligibility}</span>
            <span className="fee">Rs {fees}/-</span>
          </p>
          <p className="duration">Duration - {duration}</p>
          <p className="mode">{mode}</p>
        </div>
        <div className="join-btn-container">
          <button className="join-btn">
            <NavLink to="/register" className="join-link">
              JOIN NOW
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
}
