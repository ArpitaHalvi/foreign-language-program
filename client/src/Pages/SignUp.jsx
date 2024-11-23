import { useState } from "react";
import "./SignUp.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Login } from "@mui/icons-material";

const initialData = {
  fullname: "",
  email: "",
  username: "",
  password: "",
  gender: "",
};

export default function SignUp() {
  const [data, setData] = useState(initialData);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      // If status the is ok the user is registered successfully
      if (response.ok) {
        setData(initialData);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="signup-section">
      <div className="signup-greet">
        <h2>Sign Up to Unlock the world of french learning!</h2>
        <div className="acc-already">
          <p>
            Already have an account?
            <NavLink to="/login">
              <Login /> Login
            </NavLink>
          </p>
        </div>
      </div>
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullname">Fullname</label>
          <input
            type="fullname"
            id="fullname"
            name="fullname"
            className="signup-inputs"
            value={data.fullname}
            onChange={handleChange}
            required
            aria-required
            placeholder="Your fullname"
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
            placeholder="Your email"
            autoComplete="off"
          />
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            name="username"
            className="signup-inputs"
            value={data.username}
            onChange={handleChange}
            required
            aria-required
            placeholder="Your username"
            autoComplete="off"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="signup-inputs"
            value={data.password}
            onChange={handleChange}
            required
            placeholder="Your Password"
            aria-required
            autoComplete="off"
          />
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            value={data.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer not to say">Prefer not to say</option>
          </select>
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
      </div>
    </section>
  );
}
