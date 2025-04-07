/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Courses.scss";
import StatusPage from "../Pages/StatusPage";

export default function Courses() {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses`);
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        }
      } catch (e) {
        setError(e.message);
      }
    };
    fetchCourses();
  }, []);
  if (error) return <StatusPage msg={error} />;
  if (!courses) return <StatusPage />;
  return (
    <div className="box">
      <section className="course-details" data-aos="fade-in">
        {courses.map((c) => {
          return (
            <div className="course-item" key={c._id}>
              <div className="course-img">
                <h3>Start Now!</h3>
                {/* <img src="books.svg" alt="" /> */}
                {/* <img src="girl-reading-book.svg" alt="" /> */}
              </div>
              <div className="course-info">
                <div className="course-data">
                  <h2 className="course-name">{c.title}</h2>
                  <p className="age-group">
                    <span>Eligibility - 18+</span>
                    <span className="fee">Fees - Rs {c.fee}/-</span>
                  </p>
                  <p className="duration">Duration - {c.duration}</p>
                  <p className="mode">Online</p>
                </div>
                <div className="btn-container">
                  <NavLink to="/register" className="join-btn">
                    JOIN NOW
                  </NavLink>
                  <NavLink to={`/courses/${c._id}`} className="show-btn">
                    SHOW DETAILS
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
