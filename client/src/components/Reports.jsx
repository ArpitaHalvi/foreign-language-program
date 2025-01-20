import { ArrowForward, Delete, Error } from "@mui/icons-material";
import { useAuth } from "../store/auth";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import UploadReport from "./UploadReport";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

export default function Reports() {
  const { user, authorizationToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);

  const openConfirmModal = (id) => {
    setSelectedReportId(id);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setSelectedReportId(null);
    setIsConfirmModalOpen(false);
  };

  const confirmDelete = async () => {
    if (selectedReportId) {
      await deleteReport(selectedReportId);
    }
    closeConfirmModal();
  };

  const deleteReport = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/admin/reports/${id}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.ok) {
        fetchReports();
        setLoading(false);
        toast.success("Deleted Successfully.");
      } else {
        setError("Failed to delete.");
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setError("Error occured.");
    }
  };
  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/admin/reports`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      console.log("Reports data: ", response);
      const res_data = await response.json();
      if (response.ok) {
        setReports(res_data);
        setLoading(false);
      } else {
        setError(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setError("Error occured.");
    }
  };
  useEffect(() => {
    fetchReports();
  }, []);
  return (
    <section className="reports-section">
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        isClose={closeConfirmModal}
        onConfirm={confirmDelete}
      />
      <div>
        <h2>Have a look through our work.</h2>
        <h3>Explore our work through detailed reports.</h3>
        {user.isAdmin && (
          <>
            <button className="upload-btn" onClick={() => setIsModalOpen(true)}>
              Upload Report
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <UploadReport />
            </Modal>
          </>
        )}
      </div>
      <div className="reports">
        {error ? (
          <p className="error-container">
            <Error /> {error}
          </p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {reports.map((report) => {
              const { _id, title, pdfLink } = report;
              return (
                <li key={_id}>
                  <Link to={pdfLink} className="pdf-link">
                    {title}
                    <ArrowForward />
                  </Link>
                  {user.isAdmin && (
                    <button
                      onClick={() => openConfirmModal(_id)}
                      title="Delete?"
                    >
                      <Delete className="del-icon" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
