import React, { useState } from "react";
import "./SignUp.css";
import { NavLink } from "react-router-dom";
import { Facebook, Google, LinkedIn } from "@mui/icons-material";

const initialData = {
  username: "",
  email: "",
  dob: "",
  password: "",
};

export default function SignUp() {
  const [data, setData] = useState(initialData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setData(initialData);
    console.log(data);
  };

  return (
    <section className="signup-section">
      <div className="signup-form">
        <h2>SIGN UP</h2>
        <form action="/signup" onSubmit={handleSubmit} method="post">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="signup-inputs"
            value={data.username}
            onChange={handleChange}
            required
            aria-required
            autoComplete="off"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="signup-inputs"
            value={data.email}
            onChange={handleChange}
            required
            aria-required
            autoComplete="off"
          />
          {/* <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="signup-inputs"
            value={data.dob}
            onChange={handleChange}
            required
            aria-required
            autoComplete="off"
          /> */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="signup-inputs"
            value={data.password}
            onChange={handleChange}
            required
            aria-required
            autoComplete="off"
          />
          <button type="submit" className="signup-btn">
            SIGN UP
          </button>
        </form>
        {/* <div className="other-signup-options">
          <div className="google">
            <Google />
            <LinkedIn />
            <Facebook />
          </div>
        </div> */}
        <div className="acc-already">
          <p>
            Already have an account?
            <NavLink to="/login"> Login</NavLink>
          </p>
        </div>
      </div>
    </section>
  );
}
