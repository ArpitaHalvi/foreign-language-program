import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const initialData = {
  email: "",
  password: "",
};

export default function Login() {
  const [user, setUser] = useState(initialData);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(response);
      if (response.ok) {
        setUser(initialData);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="login-section">
      <div className="login-part">
        <div className="welcome-back">
          <h2>Welcome Back!</h2>
          <p>Login to unlock your learning journey.</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>LOGIN</h2>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInput}
            autoComplete="off"
            required
            placeholder="Your Email"
            aria-required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInput}
            autoComplete="off"
            required
            placeholder="Your Password"
            aria-required
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
