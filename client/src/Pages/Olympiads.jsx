import { useState, useEffect } from "react";
import "./Olympiads.scss";
import { NavLink } from "react-router-dom";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";

export default function Olympiads() {
  const [olympiadFee, setOlympiadFee] = useState("");
  useEffect(() => {
    const fetchOlympiad = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/olympiad`, {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          setOlympiadFee(data[0].fee);
        }
      } catch (e) {
        console.error("Error while fetching olympiad fee", e);
      }
    };
    fetchOlympiad();
  }, []);
  return (
    <section className="olympiads-section">
      <div className="olympiad-part">
        <h2 className="olym-heading">Crack the Oympiads with Confidence!</h2>
        <div className="olym-info">
          <h3 className="grades-heading">Open to students of Grades</h3>
          <div className="criteria">
            <div className="grades grade5">5th</div>
            <div className="grades grade6">6th</div>
            <div className="grades grade7">7th</div>
            <div className="grades grade8">8th</div>
          </div>
          <p>Enroll now for just Rs.{olympiadFee}/-</p>
          <blockquote>
            &quot;From Bonjour to Victory - Your Olympiad Starts Here!&quot;
            <br />- Foreign Language Program
          </blockquote>
        </div>
        <NavLink to="/register" state={{ title: "olympiad" }}>
          Start Now <KeyboardDoubleArrowRight className="dbl-right" />
        </NavLink>
      </div>
      <div className="olym-decor">
        <img src="intro2.svg" alt="" />
      </div>
    </section>
  );
}
