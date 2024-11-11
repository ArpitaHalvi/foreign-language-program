import Courses from "./Courses";
import "./Courses.scss";
import { courses } from "../data";
import { NavLink } from "react-router-dom";
import { ContactMailOutlined } from "@mui/icons-material";

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
          <div className="syllabus">
            All the above courses will have the same syllabus and can be found
            here -
            <NavLink to="/syllabus" className="syllabus-pdf">
              Syllabus
            </NavLink>
          </div>
          <NavLink to="/contact" className="contact-us">
            CONTACT US
            <ContactMailOutlined htmlColor="#050524" />
          </NavLink>
        </p>
      </section>
    </div>
  );
}
