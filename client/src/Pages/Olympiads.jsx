import "./Olympiads.scss";
import globe from "../assets/images/study.jpg";
import { NavLink } from "react-router-dom";

export default function Olympiads() {
  return (
    <section className="olympiads-section">
      <div className="olympiad-part">
        <h2 className="olym-heading">Welcome Students!</h2>
        <div className="olym-info">
          <p>
            If You are a student studying in 5th, 6th, 7th or 8th standard then
            you must try our olympiad.
          </p>
          <div className="olympiad">
            <div className="olym-img">
              <img src={globe} alt="" />
            </div>
            <button className="join-btn">
              <NavLink to="/register" className="">
                JOIN NOW
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
