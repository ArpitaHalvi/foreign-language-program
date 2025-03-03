/* eslint-disable react/prop-types */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Star, StarBorder } from "@mui/icons-material";

export default function Feedback({ courseId }) {
  const [feedbacks, setFeedbacks] = useState([]);
  var settings = {
    dots: true,
    infinite: feedbacks.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/course/${courseId}/feedback`,
          {
            method: "GET",
          }
        );
        const res_data = await response.json();
        console.log(res_data);
        if (response.ok) {
          setFeedbacks(res_data);
        } else {
          toast.error("Could not load feedbacks.");
        }
      } catch (e) {
        toast.error("Error fetching the feedbacks.");
      }
    };
    fetchFeedbacks();
  }, [courseId]);
  return (
    <section className="feedback">
      <h2>Reviews</h2>
      {feedbacks.length !== 0 ? (
        <Slider {...settings}>
          {feedbacks.map((feedback) => {
            const { _id, rating, content, userId } = feedback;
            const totalStars = 5;
            return (
              <div key={_id}>
                <p className="stars">
                  {[...Array(rating)].map((_, index) => (
                    <Star className="star-styles" key={index} />
                  ))}
                  {[...Array(totalStars - rating)].map((_, index) => (
                    <StarBorder className="star-styles" key={index} />
                  ))}
                </p>
                <p className="content">{content}</p>
                <p className="user">- {userId?.fullname || "Loading..."}</p>
              </div>
            );
          })}
        </Slider>
      ) : (
        <p className="no-reviews">
          This course has no reviews. Share your thoughts after enrolling!
        </p>
      )}
    </section>
  );
}
