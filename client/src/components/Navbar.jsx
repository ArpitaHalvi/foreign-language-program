import React from "react";
import { NavLink } from "react-router-dom";
// import { Menu } from "@mui/icons-material/Menu";
import "./Navbar.css";
import {
  HomeOutlined,
  InfoOutlined,
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
          <li>
            <HomeOutlined className="navbar-icons" />
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <InfoOutlined className="navbar-icons" />
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <SquareFootOutlined className="navbar-icons" />
            <NavLink to="/olympiads">Olympiads</NavLink>
          </li>
          <li>
            <SchoolOutlined className="navbar-icons" />
            <NavLink to="/courses">Courses</NavLink>
          </li>
        </nav>
        {/* <div className="register">
          <NavLink to="/register">
            <button id="register-btn">Enroll Now</button>
          </NavLink>
        </div> */}
        <div className="signup">
          <NavLink to="/signup">
            <button id="signup-btn">Sign Up</button>
          </NavLink>
        </div>
        {/* <div className="menu"> */}
        {/* <input type="checkbox" id="checkbox" name="checkbox" /> */}
        {/* <label htmlFor="checkbox"> */}
        {/* <Menu /> */}
        {/* Check it */}
        {/* </label> */}
        {/* </div> */}
        {/* responsive */}
        {/* <div className="res-menu">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Olympiads</li>
            <li>Contact</li>
          </ul>
        </div> */}
      </header>
      {/* <script src="./Navbar.js"></script> */}
    </>
  );
};

export default Navbar;
