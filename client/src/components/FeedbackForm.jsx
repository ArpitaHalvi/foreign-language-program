import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const initialFeedback = {
  rating: "",
  content: "",
};

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState(initialFeedback);
  const { id } = useParams();
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
      const res = await fetch(
        `http://localhost:5000/api/courses/${id}/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedback),
        }
      );
      if (res.ok) {
        setFeedback(initialFeedback);
        toast.success("Feedback Sent successfully!");
      } else {
        toast.error("Error while submitting feedback!");
      }
    } catch (e) {
      toast.error("An error occurred please try again later!");
    }
  };
  return (
    <div className="feedback-form" id="feedback-form">
      <form method="post" onSubmit={handleSubmit}>
        <h2>Leave your Feedback!</h2>
        <div className="rating-box">
          <div>
            <input
              type="radio"
              name="rating"
              id="rating1"
              onChange={handleChange}
              value={feedback.rating}
              title="Terrible"
              required
              aria-required
            />
            <label htmlFor="rating1">1 star</label>
          </div>
          <div>
            <input
              type="radio"
              name="rating"
              id="rating2"
              onChange={handleChange}
              value={feedback.rating}
              title="Not Good"
              required
              aria-required
            />
            <label htmlFor="rating2">2 stars</label>
          </div>
          <div>
            <input
              type="radio"
              name="rating"
              id="rating3"
              onChange={handleChange}
              value={feedback.rating}
              title="Average"
              required
              aria-required
            />
            <label htmlFor="rating3">3 stars</label>
          </div>
          <div>
            <input
              type="radio"
              name="rating"
              id="rating4"
              onChange={handleChange}
              value={feedback.rating}
              title="Very Good"
              required
              aria-required
            />
            <label htmlFor="rating4">4 stars</label>
          </div>
          <div>
            <input
              type="radio"
              name="rating"
              id="rating5"
              onChange={handleChange}
              value={feedback.rating}
              title="Amazing"
              required
              aria-required
            />
            <label htmlFor="rating5">5 stars</label>
          </div>
        </div>
        <div className="feedback-box">
          <textarea
            name="content"
            id="review-text"
            onChange={handleChange}
            value={feedback.content}
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
