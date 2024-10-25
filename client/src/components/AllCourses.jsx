import React from "react";
import EachCourse from "./EachCourse";
import { courses } from "../data.js";
import "./Courses.css";

export default function AllCourses() {
  return (
    <section className="all-courses">
      {/* <div className="beginner"> */}
      <div className="course-box">
        {courses[0].map((course) => {
          return <EachCourse {...course} key={course.id} />;
        })}
        {/* </div> */}
        {/* </div> */}
        {/* <div className="intermediate"> */}
        {/* <div className="course-box"> */}
        {courses[1].map((course) => {
          return <EachCourse {...course} key={course.id} />;
        })}
      </div>
      {/* </div> */}
      {/* <div className="advance"> */}
      <div className="course-box">
        {courses[2].map((course) => {
          return <EachCourse {...course} key={course.id} />;
        })}
      </div>
      {/* </div> */}
    </section>
  );
}
