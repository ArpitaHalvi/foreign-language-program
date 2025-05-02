/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Courses.scss";
import StatusPage from "../Pages/StatusPage";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
          console.log("Data from Courses component: ", data);
        }
      } catch (e) {
        setError(e.message);
      }
    };
    fetchCourses();
  }, []);
  if (error) return <StatusPage msg={error} />;
  if (!courses) return <StatusPage />;
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    cssEase: "linear",
    responsive: [
      // {
      //   breakpoint: 1400,
      //   settings: { slidesToShow: 3, centerMode: false },
      // },
      {
        breakpoint: 1200,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 1000,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  return (
    <div className="box">
      {/*  data-aos="fade-in" */}
      <section className="course-details">
        {courses.length !== 0 ? (
          <Slider {...settings}>
            {courses.map((c) => {
              return (
                <div className="course-item" key={c._id}>
                  <div className="course-img"></div>
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
                      <NavLink
                        to="/register"
                        className="join-btn"
                        state={{ title: c.title }}
                      >
                        Join Now
                      </NavLink>
                      <NavLink to={`/courses/${c._id}`} className="show-btn">
                        Show Details
                      </NavLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        ) : (
          <div className="no-courses">
            <p>No Courses Found.</p>
          </div>
        )}
      </section>
    </div>
  );
}
