/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import { Star } from "@mui/icons-material";
import baseUrl from "../config";

const initialFeedback = {
  rating: "",
  content: "",
};

export default function FeedbackForm({ courseId }) {
  const [feedback, setFeedback] = useState(initialFeedback);
  const { authorizationToken } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}course/${courseId}/feedback`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });
      // console.log("Response from feedback: ", res);
      const res_data = await res.json();
      if (res.ok) {
        toast.success("Feedback Sent successfully!");
        setFeedback(initialFeedback);
        e.target.reset();
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (e) {
      toast.error("An error occurred please try again later!");
    }
  };
  return (
    <div className="feedback-form" id="feedback-form">
      <form onSubmit={handleSubmit}>
        <h2>Leave your Feedback!</h2>
        <div className="rating-box">
          {[1, 2, 3, 4, 5].map((value) => {
            return (
              <div key={value}>
                <input
                  type="radio"
                  name="rating"
                  id={`rating${value}`}
                  value={value}
                  onChange={handleChange}
                  required
                  aria-required
                />
                <label htmlFor={`rating${value}`}>
                  <Star className="star-icon" />
                </label>
              </div>
            );
          })}
        </div>
        <div className="feedback-box">
          <textarea
            name="content"
            id="review-text"
            value={feedback.content}
            onChange={handleChange}
            placeholder="Write your review."
            rows="5"
            required
            aria-required
          ></textarea>
        </div>
        <button type="submit" className="feedback-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
