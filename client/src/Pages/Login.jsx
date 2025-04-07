import { useState } from "react";
// import "./Login.scss";
import "./Auth.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const initialData = {
  email: "",
  password: "",
};

export default function Login() {
  const [user, setUser] = useState(initialData);
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

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
      const res_data = await response.json();
      if (response.ok) {
        // Storing the token in Local Storage
        storeTokenInLS(res_data.token);
        setUser(initialData);
        toast.success("Successfully Logged In!", {
          onClose: navigate("/"),
        });
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (err) {
      toast.error("Error while logging In. Please Try again later!");
    }
  };
  return (
    <section className="login-section">
      <div className="login-part">
        <div className="welcome-back">
          <h2>Welcome Back!</h2>
          <p>Login to unlock your learning journey.</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit} method="post">
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
