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
              <NavLink to="/register">
                Start Now <span>&raquo;</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
