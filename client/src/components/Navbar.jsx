import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import {
  HomeOutlined,
  InfoOutlined,
  Menu,
  SchoolOutlined,
  SquareFootOutlined,
} from "@mui/icons-material";

const Navbar = () => {
  return (
    <>
      {/* head */}
      <header className="head">
        <div className="logo">
          {/* <img src="" alt="LOGO" /> */}
          <h1>flp</h1>
        </div>
        {/* nav menus */}
        <nav className="navbar">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? "active-link" : "a"}`
                }
              >
                <HomeOutlined className="navbar-icons" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${isActive ? "active-link" : "a"}`
                }
              >
                <InfoOutlined className="navbar-icons" />
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/olympiads"
                className={({ isActive }) =>
                  `${isActive ? "active-link" : "a"}`
                }
              >
                <SquareFootOutlined className="navbar-icons" />
                Olympiads
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `${isActive ? "active-link" : "a"}`
                }
              >
                <SchoolOutlined className="navbar-icons" />
                Courses
              </NavLink>
            </li>
          </ul>
          <div className="navigation register">
            <NavLink to="/register">
              <button id="register-btn">Enroll Now</button>
            </NavLink>
            <NavLink to="/signup">
              <button id="signup-btn">Sign Up</button>
            </NavLink>
          </div>
          <div className="menu">
            <button>
              <Menu className="menu-icon" />
            </button>
          </div>
        </nav>
      </header>
      {/* <script src="./Navbar.js"></script>  */}
    </>
  );
};

export default Navbar;
