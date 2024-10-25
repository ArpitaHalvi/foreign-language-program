import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...prevUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <section className="login-section">
      <div className="login-container">
        <form action="" className="login-form" onSubmit={handleSubmit}>
          <h2>LOGIN</h2>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInput}
            autoComplete="off"
            required
            aria-required
          />
          <label htmlFor="username">Password</label>
          <input
            type="text"
            name="username"
            value={user.password}
            onChange={handleInput}
            autoComplete="off"
            required
            aria-required
          />
          <button type="submit" className="login-btn">
            LOGIN
          </button>
        </form>
      </div>
    </section>
  );
}
