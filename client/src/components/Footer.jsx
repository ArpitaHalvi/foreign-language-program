import { LinkedIn, Mail, Phone } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  const usefulLinks1 = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Courses", link: "/courses" },
  ];
  const usefulLinks2 = [
    { name: "Contact", link: "/contact" },
    { name: "Olympiads", link: "/olympiads" },
    { name: "Privacy Policy", link: "/privacy-policy" },
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
          <div className="useful-links">
            <ul>
              {usefulLinks1.map((val, index) => {
                return (
                  <li key={index}>
                    <NavLink to={val.link}>{val.name}</NavLink>
                  </li>
                );
              })}
            </ul>
            <ul>
              {usefulLinks2.map((val, index) => {
                return (
                  <li key={index}>
                    <NavLink to={val.link}>{val.name}</NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
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
          <img src="/logo.jpeg" alt="LOGO" />
          <ul className="contact-link">
            <li>
              <Link to="tel:+919200720230">
                <Phone className="phone-icon contact-icon" />
                <span>Call Us</span>
              </Link>
            </li>
            <li>
              <Link to="mailto:sonalchaturvedi76@gmail.com">
                <Mail className="mail-icon contact-icon" />
                <span>Mail Us</span>
              </Link>
            </li>
            <li>
              <Link to="https://www.linkedin.com/in/sonal-chaturvedi-937648239?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                <LinkedIn className="linkedin-icon contact-icon" />
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="copyright">
        <p className="copy">
          &copy; {year} Foreign Language Programmme. All Rights Reserved.
        </p>
      </section>
    </section>
  );
}
