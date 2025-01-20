import { NavLink } from "react-router-dom";
import MapComponent from "./MapComponent";
import { ArrowForward } from "@mui/icons-material";

export default function IntroPart() {
  return (
    <section className="intro-part">
      <div className="motive" data-aos="slide-right">
        <h2 className="greeting">Bonjour, &Eacute;tudiants!</h2>
        <p className="aim">
          Unlock opportunities with French - Interactive courses designed for
          students, professionals, and enthusiasts.
        </p>
        <NavLink to="/courses">
          Get Started <ArrowForward />
        </NavLink>
      </div>
      <div className="explore-france">
        <div className="map" id="map">
          <MapComponent />
        </div>
      </div>
    </section>
  );
}
