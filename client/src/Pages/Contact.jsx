import { useState } from "react";
import "./Contact.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const initialData = {
  fullname: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [contactData, setContactData] = useState(initialData);
  const [userData, setUserData] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  if (userData && user) {
    setContactData({
      fullname: user.fullname,
      email: user.email,
      message: "",
    });
    setUserData(false);
  }
  // useEffect(() => {
  //   if (user) {
  //     setContactData({
  //       fullname: user.fullname || "",
  //       email: user.email || "",
  //       message: "",
  //     });
  //   }
  // }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContactData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });
      const res_data = await response.json();
      if (response.ok) {
        setContactData(initialData);
        toast.success("Message Sent Successfully!", {
          onClose: () => navigate("/"),
        });
      } else {
        toast.error(res_data.extradetails ? res_data.extradetails : res_data.message);
      }
    } catch (err) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="contact-page">
      <div className="contact-form">
        <h2 className="contact-heading">Get in Touch</h2>
        <form method="post" onSubmit={handleSubmit}>
          <div className="form-inputs">
            <div>
              <label htmlFor="fullname">Fullname</label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                required
                value={contactData.fullname}
                onChange={handleInput}
                autoComplete="off"
                aria-required
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
                value={contactData.email}
                onChange={handleInput}
                autoComplete="off"
                aria-required
                placeholder="Your email"
              />
            </div>
          </div>
          <label htmlFor="message">Your Message</label>
          <textarea
            name="message"
            id="message"
            value={contactData.message}
            onChange={handleInput}
            autoComplete="off"
            cols="10"
            rows="5"
            placeholder="Send us a message"
            required
            aria-required
          />
          <button type="submit" className="contact-btn">
            SEND
          </button>
        </form>
      </div>
    </section>
  );
}
