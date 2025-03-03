import { Mail, Phone } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Contact from "../Pages/Contact";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <section className="footer">
      <section className="web-details">
        <div className="contact-info ">
          <ul>
            <li>
              <Phone />
              +91 9200720230
            </li>
            <li>
              <Mail />
              frenchweb@gmail.com
            </li>
          </ul>
        </div>
        <div className="web-links">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/olympiads">Olympiads</NavLink>
            </li>
            <li>
              <NavLink to="/courses">Courses</NavLink>
            </li>
          </ul>
        </div>
      </section>
      <section className="copyright">
        <section className="query">
          <p>
            If you have any questions or need assistance, feel free to contact
            us!
          </p>
          <Contact />
        </section>
        <p className="copy">
          &copy; {year} Foreign Language Programme. All Rights reserved.
        </p>
      </section>
    </section>
  );
}
