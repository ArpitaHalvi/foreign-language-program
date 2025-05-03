import { NavLink } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

export default function IntroPart() {
  return (
    <section className="intro-part">
      <div className="motive" data-aos="slide-right">
        <div className="main-heading">
          <p>For Learners and Professionals</p>
          <h1>Foreign Language Programme</h1>
        </div>
        <div className="desc">
          <p className="aim">
            {/* Unlock opportunities with French - Interactive courses designed for
            students, professionals, and enthusiasts. */}
            Master French, Ace DELF, TCF, & TEF, Olympiad-Ready Training at a
            Pocket-Friendly Price
          </p>
          <NavLink to="/courses">
            Get Started <ArrowForward className="arrow-icon" />
          </NavLink>
        </div>
      </div>
      <div className="explore-france">
        <img src="intro3.svg" alt="INTRO IMAGE" />
      </div>
    </section>
  );
}
