import Slider from "react-slick";
import { useAuth } from "../store/auth";
import Modal from "./Modal";
import Upload from "../Pages/Upload";
import { useState } from "react";
export default function Announcements() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
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
    <section className="announcements-section">
      <div className="announcements">
        <div>
          <h3>Announcements You can&apos;t miss!</h3>
          <p>
            &quot;Stay ahead with updates on courses, events, and exclusive
            opportunities- your gateway of mastering French.&quot;
          </p>
          {user.isAdmin && (
            <>
              <button
                className="upload-brochure"
                onClick={() => setIsModalOpen(true)}
              >
                Upload Brochure
              </button>
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Upload />
              </Modal>
            </>
          )}
        </div>
        <div className="announcement">
          <Slider {...settings}>
            <img src="/brochure-aloy2.jpg" alt="" />
            <img src="/brochure-podar.jpg" alt="" />
          </Slider>
        </div>
      </div>
    </section>
  );
}
