import "./Olympiads.scss";
import { NavLink } from "react-router-dom";

export default function Olympiads() {
  return (
    <section className="olympiads-section">
      <div className="olympiad-part">
        <h2 className="olym-heading">Welcome Students!</h2>
        <div className="olym-info">
          <div>
            <p>
              If You are a student studying in 5th, 6th, 7th or 8th standard
              then you must try our olympiad preparation course.
            </p>
            <blockquote>
              &quot;From Bonjour to Victory - Your Olympiad Starts Here!&quot;
              <br />- Foreign Language Program
            </blockquote>
          </div>
          <div className="olympiad">
            <div className="olym-img">
              {/* <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#0F62FE"
                  d="M43.6,-58.3C50.9,-45.9,47.4,-26.8,49.5,-9.5C51.6,7.8,59.4,23.3,56,35.4C52.6,47.4,38.1,56.1,24.3,56.9C10.5,57.6,-2.6,50.4,-16.9,45.5C-31.1,40.7,-46.5,38.2,-59.3,28.3C-72.1,18.4,-82.3,1,-79.6,-14C-76.9,-29,-61.3,-41.8,-45.9,-52.8C-30.5,-63.8,-15.2,-73.1,1.5,-74.9C18.2,-76.6,36.3,-70.8,43.6,-58.3Z"
                  transform="translate(100 100)"
                /> */}
              <NavLink to="/register">
                Start Now <span>&raquo;</span>
              </NavLink>
              {/* </svg> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
