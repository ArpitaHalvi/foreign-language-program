import React from "react";

export default function CourseHead() {
  return (
    <div className="courses">
      <svg width="100%" height="60vh">
        <polygon
          points="0,0 1366,0  1366,500 900,500"
          style={{
            fill: "rgb(5, 5, 35)",
            stroke: "rgb(5, 5, 35)",
            strokeWidth: 3,
          }}
        ></polygon>
      </svg>
      <p id="course-section">
        Our <br /> Courses
      </p>
    </div>
  );
}
