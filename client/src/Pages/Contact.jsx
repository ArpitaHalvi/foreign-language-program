import { useState } from "react";

export default function Contact() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    message: "",
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
        <form action="/contact" method="post" onSubmit={handleSubmit}>
          <h2 className="register-heading">Get in Touch</h2>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={user.email}
            onChange={handleInput}
            autoComplete="off"
          />
          <label htmlFor="message">Your Message</label>
          <textarea
            name="message"
            id="message"
            required
            value={user.message}
            onChange={handleInput}
            autoComplete="off"
            cols="10"
            rows="5"
            placeholder="Send us a message"
          />
          <button type="submit" className="register-btn">
            SEND
          </button>
        </form>
      </div>
    </section>
  );
}
