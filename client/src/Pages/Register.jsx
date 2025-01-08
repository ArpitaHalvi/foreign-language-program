import { useState } from "react";
import "./Register.scss";
import { toast } from "react-toastify";

const initialData = {
  fullname: "",
  email: "",
  enrolledCourses: "",
};

export default function Register() {
  const [user, setUser] = useState(initialData);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(response);
      if (response.ok) {
        setUser(initialData);
        toast.success("Enrollment Completed Successfully!");
      } else {
        toast.error("Error while enrolling try again!");
      }
    } catch (err) {
      toast.error(err.message, "An error occured. Try Again!");
    }
  };

  return (
    <section className="register-page">
      <div className="register-form">
        <h2 className="register-heading">REGISTER NOW</h2>
        <form method="post" onSubmit={handleSubmit}>
          <div className="form-inputs">
            <div>
              <label htmlFor="fullname">Fullname</label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                required
                value={user.fullname}
                onChange={handleInput}
                autoComplete="off"
                placeholder="Your fullname"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={user.email}
                onChange={handleInput}
                autoComplete="off"
                placeholder="Your email"
              />
            </div>
          </div>
          {/* $$$$$$$$$$$$$$$$$$$$$$$$$$ EMAIL CONFIRMATION FUNCTIONALITY $$$$$$$$$$$$$$$$$$$$$$$$$$$*/}
          <label htmlFor="enrolledCourses" id="select-label">
            Select your course
          </label>
          <select
            name="enrolledCourses"
            id="enrolledCourses"
            required
            value={user.enrolledCourses}
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
      {/* <div className="qr-part">
        <div className="qr-code">
          <p>Fill the form and pay the fees.</p>
        </div>
      </div> */}
    </section>
  );
}
