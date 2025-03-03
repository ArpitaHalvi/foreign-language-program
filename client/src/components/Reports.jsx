import { ArrowForward, Delete, Error } from "@mui/icons-material";
import { useAuth } from "../store/auth";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import UploadReport from "./UploadReport";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import PDFViewer from "./PDFViewer";
// import ErrorMsg from "./ErrorMsg";

export default function Reports() {
  const { user, authorizationToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [selectedPdfLink, setSelectedPdfLink] = useState(null);
  const [openPDF, setOpenPDF] = useState(false);

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

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/admin/reports`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      // console.log("Reports data: ", response);
      const res_data = await response.json();
      // console.log("Reports data: ", res_data);
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

  const deleteReport = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/admin/report/${id}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      console.log(response);
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

  const openPdfViewer = (pdfLink) => {
    setOpenPDF(true);
    setSelectedPdfLink(pdfLink);
  };

  return (
    <section className="reports-section">
      {/* {error && <ErrorMsg msg={error} />} */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        isClose={closeConfirmModal}
        onConfirm={confirmDelete}
      />
      <div>
        <h2>Have a look through our work.</h2>
        <h3>Explore our work through detailed reports.</h3>
        {user && user.isAdmin && (
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
                  <Link
                    className="pdf-link"
                    onClick={() => openPdfViewer(pdfLink)}
                  >
                    {title}
                    <ArrowForward />
                  </Link>
                  {user?.isAdmin && (
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
      {selectedPdfLink && (
        <PDFViewer
          isOpen={openPDF}
          pdfLink={selectedPdfLink}
          onClose={() => setOpenPDF(false)}
        />
      )}
    </section>
  );
}
