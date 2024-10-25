import React from "react";
import Courses from "./Courses";
import "./CourseDetails.css";
import { courses } from "../data";

export default function CoursesRender() {
  return (
    <div className="box">
      <section className="course-details">
        {courses[0].map((c) => {
          return <Courses {...c} key={c.id} />;
        })}
        {courses[1].map((c) => {
          return <Courses {...c} key={c.id} />;
        })}
        {courses[2].map((c) => {
          return <Courses {...c} key={c.id} />;
        })}
        <br />
        <p className="further-info">
          For further information contact us or send an email on
          <a href=""> sonalchaturvedi76@gmail.com</a>
        </p>
      </section>
    </div>
  );
}
