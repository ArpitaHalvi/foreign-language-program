import Slider from "react-slick";
import { useAuth } from "../store/auth";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import UploadBrochure from "../components/UploadBrochure";
import { Error } from "@mui/icons-material";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";
import ShowImage from "./ShowImage";
import baseUrl from "../config";

export default function Announcements() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, authorizationToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [brochureUrl, setBrochureUrl] = useState("");
  const [error, setError] = useState(false);
  const [brochures, setBrochures] = useState([]);
  const [openBrochureModal, setOpenBrochureModal] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedBrochureId, setSelectedBrochureId] = useState(null);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    focusOnSelect: true,
    cssEase: "linear",
  };
  const openConfirmModal = (id) => {
    setSelectedBrochureId(id);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setSelectedBrochureId(null);
    setIsConfirmModalOpen(false);
  };

  const confirmDelete = async () => {
    if (selectedBrochureId) {
      await deleteBrochure(selectedBrochureId);
    }
    closeConfirmModal();
  };

  const deleteBrochure = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}admin/brochure/${id}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        fetchBrochures();
        setLoading(false);
        toast.success("Deleted Successfully.");
      } else {
        setLoading(false);
        setError("Failed to delete.");
      }
    } catch (e) {
      setLoading(false);
      setError("Failed to delete.");
    }
  };
  const fetchBrochures = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}admin/brochures`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        setBrochures(res_data);
        setLoading(false);
      } else {
        setLoading(false);
        setError("Failed to load.");
      }
    } catch (e) {
      setLoading(false);
      setError("Failed to load.");
    }
  };
  useEffect(() => {
    fetchBrochures();
  }, []);
  return (
    <section className="announcements-section">
      <Modal
        isOpen={openBrochureModal}
        onClose={() => setOpenBrochureModal(false)}
      >
        <ShowImage imageUrl={brochureUrl} />
      </Modal>
      {user && user.isAdmin && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <UploadBrochure />
        </Modal>
      )}
      {user && user.isAdmin && (
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          isClose={closeConfirmModal}
          onConfirm={confirmDelete}
        />
      )}
      <div className="announcements">
        <div>
          <h3>Announcements You can&apos;t miss!</h3>
          <p>
            &quot;Stay ahead with updates on courses, events, and exclusive
            opportunities- your gateway of mastering French.&quot;
          </p>
          {user && user.isAdmin && (
            <button className="upload-btn" onClick={() => setIsModalOpen(true)}>
              Upload Brochure
            </button>
          )}
        </div>
        <div className="announcement">
          {error ? (
            <div>
              <Error />
              {error}
            </div>
          ) : loading ? (
            <div className="loading-div">Loading...</div>
          ) : (
            <>
              <Slider {...settings}>
                {brochures.map((brochure) => {
                  return (
                    <div key={brochure._id} className="brochure">
                      <img
                        src={brochure.imageUrl}
                        alt="Brochure Image"
                        key={brochure._id}
                        loading="lazy"
                        onClick={() => {
                          setOpenBrochureModal(true),
                            setBrochureUrl(brochure.imageUrl);
                        }}
                      />
                      <p className="show-condition">
                        Course prices in the brochure may change without notice.
                      </p>
                      {user && user.isAdmin && (
                        <button
                          onClick={() => openConfirmModal(brochure._id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  );
                })}
              </Slider>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
