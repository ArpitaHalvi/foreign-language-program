import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { testimonials } from "../data";
import Slider from "react-slick";

export default function Testimonials() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };
  return (
    <div className="testimony-part">
      <h2>Testimonials</h2>
      <Slider {...settings}>
        {testimonials.map((testimony) => {
          return (
            <div className="testimony-box" key={testimony.id}>
              <div className="testimony-header"></div>
              <div className="student-testimony">
                <p className="testimony-text">
                  <span>&quot; </span>
                  {testimony.text} <span>&quot;</span>
                </p>
                <p className="student-name">- {testimony.name}</p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
