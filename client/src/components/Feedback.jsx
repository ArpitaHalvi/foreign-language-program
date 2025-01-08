import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Feedback() {
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
    <section className="feedback">
      <h2>Reviews</h2>
      <Slider {...settings}>
        <div>
          <p>⭐⭐⭐⭐</p>
          <p className="content">
            &quot;I loved this courses. Ma&apos;am was so interactive and was
            very friendly.&quot;
          </p>
          <p className="user">- Monalisa</p>
        </div>
        <div>
          <p>⭐⭐⭐⭐</p>
          <p className="content">
            &quot;I loved this courses. Ma&apos;am was so interactive and was
            very friendly.&quot;
          </p>
          <p className="user">- Monalisa</p>
        </div>
      </Slider>
    </section>
  );
}
