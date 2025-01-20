import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import {
  Close,
  HomeOutlined,
  InfoOutlined,
  Menu,
  SchoolOutlined,
  SquareFootOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../store/auth";
import StatusPage from "../Pages/StatusPage";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { isLoggedIn, user, loading } = useAuth();
  // Show nothing until user data is loading
  if (loading) return <StatusPage />;
  const isAdmin = user?.isAdmin;

  return (
    <>
      {/* head */}
      <header className="head">
        <div className="logo">
          <img src="/logo.jpeg" alt="LOGO" />
          {/* <h1>flp</h1> */}
        </div>
        {/* nav menus */}
        <nav className="navbar">
          <ul className={`nav-links ${isOpen && "open"}`}>
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
            <li className="res-nav-btns">
              {isLoggedIn ? (
                isAdmin ? (
                  <>
                    <NavLink to="/admin">
                      <button className="nav-btns" id="admin-btn">
                        Admin Panel
                      </button>
                    </NavLink>
                    <NavLink to="/logout">
                      <button id="logout-btn" className="nav-btns">
                        Logout
                      </button>
                    </NavLink>
                  </>
                ) : (
                  <NavLink to="/logout">
                    <button id="logout-btn" className="nav-btns">
                      Logout
                    </button>
                  </NavLink>
                )
              ) : (
                <>
                  <NavLink to="/register">
                    <button className="register-btn">Enroll Now</button>
                  </NavLink>
                  <NavLink to="/signup">
                    <button className="signup-btn">Sign Up</button>
                  </NavLink>
                </>
              )}
            </li>
          </ul>
          <div className="navigation">
            {isLoggedIn ? (
              isAdmin ? (
                <>
                  <NavLink to="/admin">
                    <button className="nav-btns" id="admin-btn">
                      Admin Panel
                    </button>
                  </NavLink>
                  <NavLink to="/logout">
                    <button id="logout-btn" className="nav-btns">
                      Logout
                    </button>
                  </NavLink>
                </>
              ) : (
                <NavLink to="/logout">
                  <button id="logout-btn" className="nav-btns">
                    Logout
                  </button>
                </NavLink>
              )
            ) : (
              <>
                <NavLink to="/register">
                  <button id="register-btn" className="nav-btns">
                    Enroll Now
                  </button>
                </NavLink>
                <NavLink to="/signup">
                  <button id="signup-btn" className="nav-btns">
                    Sign Up
                  </button>
                </NavLink>
              </>
            )}
          </div>
          <div onClick={toggleMenu} className="menu">
            {isOpen ? (
              <Close className="menu-icon" />
            ) : (
              <Menu className="menu-icon" />
            )}
          </div>
        </nav>
      </header>
      {/* <script src="./Navbar.js"></script>  */}
    </>
  );
};

export default Navbar;
