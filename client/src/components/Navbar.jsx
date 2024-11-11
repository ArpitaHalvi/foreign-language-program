import { NavLink } from "react-router-dom";
// import { Menu } from "@mui/icons-material/Menu";
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
              <HomeOutlined className="navbar-icons" />
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? "active-link" : "a"}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <InfoOutlined className="navbar-icons" />
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${isActive ? "active-link" : "a"}`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <SquareFootOutlined className="navbar-icons" />
              <NavLink
                to="/olympiads"
                className={({ isActive }) =>
                  `${isActive ? "active-link" : "a"}`
                }
              >
                Olympiads
              </NavLink>
            </li>
            <li>
              <SchoolOutlined className="navbar-icons" />
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `${isActive ? "active-link" : "a"}`
                }
              >
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
