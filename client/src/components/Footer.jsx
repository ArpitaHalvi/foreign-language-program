import { Mail, Phone } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
// import Contact from "../Pages/Contact";

export default function Footer() {
  const year = new Date().getFullYear();
  const usefulLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Courses", link: "/courses" },
    { name: "Olympiads", link: "/olympiads" },
    { name: "Contact", link: "/contact" },
  ];
  const courses = [
    { name: "Olmpiads", link: "/courses" },
    { name: "Fast Track Course", link: "/courses" },
    { name: "DELF Junior Preparation Course", link: "/courses" },
    { name: "DELF TCF-TEF Preparation Course", link: "/courses" },
  ];
  return (
    <section className="footer">
      <section className="web-details">
        <div className="web-links">
          <h6>Useful Links</h6>
          <ul>
            {usefulLinks.map((val, index) => {
              return (
                <li key={index}>
                  <NavLink to={val.link}>{val.name}</NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="course-links">
          <h6>Courses</h6>
          <ul>
            {courses.map((c, index) => {
              return (
                <li key={index}>
                  <NavLink to="/courses">{c.name}</NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="contact-info ">
          <img src="" alt="" />
          <ul>
            <li>
              <Phone />
              <a href="tel:+919200720230">
                Call Us <span>+91 9200720230</span>
              </a>
            </li>
            <li>
              <Mail />
              <a href="mailto:sonalchaturvedi76@gmail.com">
                Mail Us <span> frenchweb@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section className="copyright">
        <p className="copy">
          &copy; {year} Foreign Language Programme. All Rights Reserved.
        </p>
      </section>
    </section>
  );
}
