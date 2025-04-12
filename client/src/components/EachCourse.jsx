import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import FeedbackForm from "./FeedbackForm";
import Feedback from "./Feedback";
import { CheckTwoTone } from "@mui/icons-material";
import { toast } from "react-toastify";
import StatusPage from "../Pages/StatusPage";
import { useAuth } from "../store/auth";
import UploadSyllabus from "./UploadSyllabus";
import Modal from "./Modal";
import PDFViewer from "../components/PDFViewer";

export default function EachCourse() {
  const { id } = useParams(); // Get the Id from the route
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const { user, authorizationToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPDF, setOpenPDF] = useState(false);
  const [syllabus, setSyllabus] = useState("");
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          setCourse(data);
        }
      } catch (err) {
        setError(err.message);
        toast.error("Error while loading the course content!");
      }
    };
    const fetchSyllabus = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/admin/syllabus`, {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setSyllabus(data[0].pdfLink);
        }
      } catch (err) {
        setError(err.message);
        toast.error("Error while loading the syllabus!");
      }
    };
    fetchCourse();
    fetchSyllabus();
  }, [id]);
  if (error) return <StatusPage msg={error} />;
  if (!course) return <StatusPage />;
  return (
    <section className="course-page">
      <PDFViewer
        isOpen={openPDF}
        pdfLink={syllabus}
        onClose={() => setOpenPDF(false)}
      />
      <div className="course-part">
        <h2>{course.title}</h2>
        <p>
          Duration: {course.duration} | Online | Paid (Rs.{course.fee})
        </p>
        <p>Instructor: Mrs. Sonal Chaturvedi</p>
        <div className="desc">
          <ul>
            <li>
              <CheckTwoTone className="check-icon" />
              Presentation and formal classroom equivalent instructions.
            </li>
            <li>
              <CheckTwoTone className="check-icon" />
              Home assignments and small projects for performance evaluation.
              (Including online exams and viva)
            </li>
            <li>
              <CheckTwoTone className="check-icon" />
              Textbook and workbook prescribed by the embassy (Audio/ Video)
            </li>
            <li>
              <CheckTwoTone className="check-icon" />
              Audio-visual features in interactive mode between students,
              instructors and possibly the French-speaking population.
            </li>
          </ul>
        </div>
        <div className="further-info">
          <div className="syllabus">
            All courses will have the same syllabus and can be found here -
            <NavLink className="syllabus-pdf" onClick={() => setOpenPDF(true)}>
              SYLLABUS
            </NavLink>
            {user && user.isAdmin && (
              <>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="crud-btns upload-btn"
                >
                  Upload
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="crud-btns update-btn"
                >
                  Change
                </button>
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                >
                  <UploadSyllabus />
                </Modal>
              </>
            )}
          </div>
        </div>
        <div className="course-links">
          <NavLink to="/register" className="join-btn">
            JOIN NOW
          </NavLink>
        </div>
      </div>
      <div className="feedback-part">
        <div className="review-img">
          <img src="/reviews.svg" alt="" />
        </div>
        <FeedbackForm courseId={id} />
      </div>
      <div className="feedbacks">
        <Feedback courseId={id} />
      </div>
    </section>
  );
}
