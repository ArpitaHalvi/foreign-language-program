import { useState } from "react";
// import "./SignUp.scss";
import "./Auth.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Login } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const initialData = {
  fullname: "",
  email: "",
  phoneNumber: "",
  password: "",
  gender: "",
};

const cleanPhNum = (phone) => {
  return phone.replace(/[^0-9]/g, "");
};

export default function SignUp() {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
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
    // Cleaning up the phone number
    const phNumber = cleanPhNum(data.phoneNumber);
    const dataToSend = {
      ...data,
      phoneNumber: phNumber,
    };
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const res_data = await response.json();
      console.log("Data from server: ", res_data);
      // If status is ok the user is registered successfully
      if (response.ok) {
        // Storing the token in Local Storage
        storeTokenInLS(res_data.token);
        setData(initialData);
        toast.success("Signed Up Successfully.", {
          onClose: navigate("/"),
        });
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (err) {
      setError(err.message);
      toast.error(error);
    }
  };

  return (
    <section className="signup-section">
      <div className="signup-greet">
        <h2>Sign Up to Unlock the world of french learning!</h2>
        <div className="acc-already">
          <p>
            Already have an account ?
            <NavLink to="/login">
              <Login /> Login
            </NavLink>
          </p>
        </div>
      </div>
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullname" aria-label="Your Fullname">
            Fullname
          </label>
          <input
            type="text"
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
          <label htmlFor="email" aria-label="Your Email">
            Email
          </label>
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
          <label htmlFor="phoneNumber" aria-label="Your Phone Number">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="signup-inputs"
            value={data.phoneNumber}
            onChange={handleChange}
            required
            aria-required
            placeholder="e.g., +91 9999999999"
            autoComplete="off"
          />
          <label htmlFor="password" aria-label="Your Password">
            Password
          </label>
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
          <label htmlFor="gender" aria-label="Your gender">
            Gender
          </label>
          <select
            id="gender"
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
      </div>
    </section>
  );
}
