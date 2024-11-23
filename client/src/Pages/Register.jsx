import { useState } from "react";
import "./Register.scss";

export default function Register() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    courses: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <section className="register-page">
      <div className="register-form">
        <form action="/register" method="post" onSubmit={handleSubmit}>
          <h2 className="register-heading">REGISTER NOW</h2>
          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            required
            value={user.fullname}
            onChange={handleInput}
            autoComplete="off"
          />
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={user.email}
            onChange={handleInput}
            autoComplete="off"
          />

          {/* $$$$$$$$$$$$$$$$$$$$$$$$$$ CONFIRMATION EMAIL FUNCTIONALITY $$$$$$$$$$$$$$$$$$$$$$$$$$$*/}
          <label htmlFor="courses" id="select-label">
            Select your course
          </label>
          <select
            name="courses"
            id="courses"
            required
            value={user.courses}
            onChange={handleInput}
            autoComplete="off"
          >
            <option value="">Choose a course</option>
            <option value="olympiad">Olympiad</option>
            <option value="fast-track course">Fast-Track Course</option>
            <option value="delf junior">DELF Junior</option>
            <option value="delf tcf-tef">DELF TCF TEF Preparation</option>
          </select>
          <button type="submit" className="register-btn">
            REGISTER
          </button>
        </form>
      </div>
      <div className="qr-part">
        <div className="qr-code">
          <p>Fill the form and pay the fees.</p>
        </div>
      </div>
    </section>
  );
}
