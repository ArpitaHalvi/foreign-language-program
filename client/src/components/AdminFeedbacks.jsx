import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Delete } from "@mui/icons-material";
import ConfirmModal from "./ConfirmModal";
import baseUrl from "../config";

export default function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const { authorizationToken } = useAuth();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const openConfirmModal = (id) => {
    setIsConfirmModalOpen(true);
    setSelectedFeedbackId(id);
  };

  const closeConfirmModal = () => {
    setSelectedFeedbackId(null);
    setIsConfirmModalOpen(false);
  };
  const confirmDelete = async () => {
    if (selectedFeedbackId) {
      await deleteFeedback(selectedFeedbackId);
    }
    closeConfirmModal();
  };
  const deleteFeedback = async (id) => {
    try {
      const response = await fetch(`${baseUrl}admin/feedbacks/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        toast.success("Successfully deleted the feedback.");
        fetchFeedbacks();
      } else {
        toast.error("Error while deleting the feedback.");
      }
    } catch (e) {
      toast.error(e);
    }
  };
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(`${baseUrl}admin/feedbacks`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      // console.log("Feedback data:", response);
      const res_data = await response.json();
      if (response.ok) {
        setFeedbacks(res_data);
        // console.log(res_data);
      } else {
        response.status !== 404 && toast.error(res_data.message);
      }
    } catch (e) {
      console.log("Error: ", e);
      toast.error(e.message);
    }
  };
  useEffect(() => {
    fetchFeedbacks();
  }, [authorizationToken]);
  return (
    <section className="admin-feedbacks">
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        isClose={closeConfirmModal}
        onConfirm={confirmDelete}
      />
      <h2>FEEDBACKS</h2>
      <div className="all-feedbacks">
        {feedbacks.length > 0 ? (
          <table className="feedback">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Course Name</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Rating - out of 5</th>
                <th>Content</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fd, index) => {
                const { _id, courseId, userId, rating, content } = fd;
                return (
                  <tr key={_id}>
                    <td>{index + 1}.</td>
                    {userId && courseId ? (
                      <>
                        <td>{courseId.title}</td>
                        <td>{userId.fullname}</td>
                        <td className="email-link">
                          <a
                            href={`mailto:${userId.email}`}
                            className="email-link"
                          >
                            {userId.email}
                          </a>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>Not found.</td>
                        <td>Not found.</td>
                        <td>Not found.</td>
                      </>
                    )}
                    <td>{rating}</td>
                    <td className="content">{content}</td>
                    <td>
                      <button
                        className="del-btn"
                        onClick={() => openConfirmModal(_id)}
                      >
                        <Delete />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No Feedbacks Found.</p>
        )}
      </div>
    </section>
  );
}
