import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import {
  // AccountCircle,
  Close,
  Home,
  InfoOutlined,
  Menu,
  SchoolOutlined,
  SquareFootOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../store/auth";
// import StatusPage from "../Pages/StatusPage";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  // const { isLoggedIn, user, loading } = useAuth();
  const { isLoggedIn, user } = useAuth();
  // Show nothing until user data is loading
  // if (loading) return <StatusPage />;
  const isAdmin = user?.isAdmin;

  return (
    <>
      {/* head */}
      <header className="head">
        <div className="logo">
          <NavLink to="/">
            <img src="/logo.jpeg" alt="LOGO" />
          </NavLink>
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
                onClick={() => setIsOpen(false)}
              >
                <Home className="navbar-icons" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${isActive ? "active-link" : "a"}`
                }
                onClick={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
              >
                <SchoolOutlined className="navbar-icons" />
                Courses
              </NavLink>
            </li>
            <li className="res-nav-btns">
              {isLoggedIn ? (
                isAdmin ? (
                  <>
                    <NavLink
                      to="/admin"
                      className="nav-btns"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </NavLink>
                    <NavLink
                      to="/logout"
                      className="nav-btns"
                      onClick={() => setIsOpen(false)}
                    >
                      Logout
                    </NavLink>
                  </>
                ) : (
                  <>
                    {/* <NavLink
                      to="/user"
                      className="user-account"
                      onClick={() => setIsOpen(false)}
                    >
                      <AccountCircle className="account-icon" />
                    </NavLink> */}
                    <NavLink
                      to="/logout"
                      className="nav-btns"
                      onClick={() => setIsOpen(false)}
                    >
                      Logout
                    </NavLink>
                  </>
                )
              ) : (
                <>
                  <NavLink
                    to="/register"
                    className="register-btn"
                    onClick={() => setIsOpen(false)}
                  >
                    Enroll Now
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="signup-btn"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </li>
          </ul>
          <div className="navigation">
            {isLoggedIn ? (
              isAdmin ? (
                <>
                  <NavLink
                    to="/admin"
                    className="nav-btns"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Panel
                  </NavLink>
                  <NavLink
                    to="/logout"
                    className="nav-btns"
                    onClick={() => setIsOpen(false)}
                  >
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  {/* <NavLink
                    to="/user"
                    className="user-account"
                    onClick={() => setIsOpen(false)}
                  >
                    <AccountCircle className="account-icon" />
                  </NavLink> */}
                  <NavLink
                    to="/logout"
                    className="nav-btns"
                    id="logout-btn"
                    onClick={() => setIsOpen(false)}
                  >
                    Logout
                  </NavLink>
                </>
              )
            ) : (
              <>
                <NavLink
                  to="/register"
                  className="nav-btns"
                  id="regiter-btn"
                  onClick={() => setIsOpen(false)}
                >
                  Enroll Now
                </NavLink>
                <NavLink
                  to="/signup"
                  className="nav-btns"
                  id="signup-btn"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
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
    </>
  );
};

export default Navbar;
