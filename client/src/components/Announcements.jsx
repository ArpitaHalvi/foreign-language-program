import Slider from "react-slick";
import { useAuth } from "../store/auth";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import UploadBrochure from "../components/UploadBrochure";
import { Error } from "@mui/icons-material";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";

export default function Announcements() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, authorizationToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [brochures, setBrochures] = useState([]);
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
      const response = await fetch(
        `http://localhost:5000/api/admin/brochure/${id}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
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
      const response = await fetch(
        `http://localhost:5000/api/admin/brochures`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      console.log("Brochures data: ", response);
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
      {user.isAdmin && (
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
          {user.isAdmin && (
            <>
              <button
                className="upload-btn"
                onClick={() => setIsModalOpen(true)}
              >
                Upload Brochure
              </button>
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <UploadBrochure />
              </Modal>
            </>
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
                    <>
                      {user.isAdmin && (
                        <>
                          <button
                            onClick={() => openConfirmModal(brochure._id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </>
                      )}
                      <img
                        src={brochure.imageUrl}
                        alt="Brochure Image"
                        key={brochure._id}
                        loading="lazy"
                      />
                    </>
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
