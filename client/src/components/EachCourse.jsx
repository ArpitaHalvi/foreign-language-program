import React from "react";
import "./Courses.scss";
import { NavLink } from "react-router-dom";

export default function EachCourse({ title, fees, eligibility }) {
  // console.log(title, fees, eligibility);
  return (
    <div className="course">
      <NavLink to="/courses">
        <h1 className="course-title"> {title} </h1>
      </NavLink>
    </div>
  );
}
