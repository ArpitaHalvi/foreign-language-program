import { NavLink } from "react-router-dom";
// import MapComponent from "./MapComponent";
import { ArrowForward } from "@mui/icons-material";

export default function IntroPart() {
  return (
    <section className="intro-part">
      <div className="motive" data-aos="slide-right">
        <div className="intro-flp">
          <h1>FLP</h1>
          <div>
            <h2>Foreign</h2>
            <h2>Language</h2>
            <h2>Programme</h2>
          </div>
        </div>
        <div className="desc">
          <p className="aim">
            Unlock opportunities with French - Interactive courses designed for
            students, professionals, and enthusiasts.
          </p>
          <NavLink to="/courses">
            Get Started <ArrowForward className="arrow-icon" />
          </NavLink>
        </div>
      </div>
      <div className="explore-france">
        {/* <div className="map" id="map"> */}
        {/* <MapComponent /> */}
        {/* </div> */}
        <img src="intro3.svg" alt="INTRO IMAGE" />
      </div>
    </section>
  );
}
