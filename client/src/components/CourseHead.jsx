import React from "react";

export default function CourseHead() {
  return (
    <div className="courses">
      <svg width="100%" height="400" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon
          // points="0,0 1366,0  1366,500 900,500"
          points="0,0 100,0 100,100 60,100"
          style={{
            fill: "#050524",
            stroke: "#050524",
            // strokeWidth: 3,
          }}
        ></polygon>
      </svg>
      <h3 class="course-section">Our Courses</h3>
    </div>
  );
}
