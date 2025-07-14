import { useEffect, useState } from "react";
import "./Auth.scss";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { ArrowForward, CheckCircle } from "@mui/icons-material";
import Modal from "../components/Modal";
import UploadPaymentSS from "../components/UploadPaymentSS";
import SeatSure from "../modals/SeatSure";
import baseUrl from "../config";

const initialData = {
  fullname: "",
  email: "",
  courseName: "",
};

export default function Register() {
  const [userData, setUserData] = useState(initialData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [courseId, setCourseId] = useState("");
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSeatSure, setOpenSeatSure] = useState(false);
  const [wasSeatSureOpen, setWasSeatSureOpen] = useState(false);
  const [title, setTitle] = useState("");
  const location = useLocation();

  console.log("Course Id: ", courseId);

  useEffect(() => {
    const changeTitle = () => {
      const { title, courseId } = location.state || "";
      if (title && courseId) {
        setTitle(title);
        // added now
        setCourseId(courseId);
        setUserData((prev) => ({ ...prev, courseName: title }));
      }
    };
    changeTitle();
  }, [title, courseId, location.state]);

  const handleTransitionEnd = () => {
    if (cardFlipped) {
      setShowQr(true);
    } else {
      setShowQr(false);
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // Registration Problem - If user has already enrolled
  const checkHasUserPaid = async (data, paymentDetails) => {
    try {
      if (data.paymentStatus === "pending") {
        setFormSubmitted(true);
        setProgress(50);
      }
      if (paymentDetails) {
        navigate("/courses");
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userData);
    try {
      const response = await fetch(`${baseUrl}auth/enroll`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log("Response from register component: ", response);
      if (response.status === 401) {
        toast.error("Please login!", { onClose: navigate("/login") });
        return;
      }
      const res_data = await response.json();
      console.log(res_data);
      // Handle user registration problem (If enrolled but not paid)
      if (
        response.status === 400 &&
        res_data.message === "You have already enrolled in this course."
      ) {
        checkHasUserPaid(
          res_data.existingRegistration,
          res_data.userPaymentDetails
        );
      }

      if (response.ok) {
        setUserData(initialData);
        setFormSubmitted(true);
        setCourseId(res_data.newRegistration.courseId);
        setProgress(50);
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (err) {
      toast.error(err.message, "An error occured. Try Again!");
    }
  };
  const handlePaymentCompletion = () => {
    setProgress(100);
    setPaymentDone(true);
    setIsModalOpen(false);
    setOpenSeatSure(true);
  };

  useEffect(() => {
    if (wasSeatSureOpen && !openSeatSure) {
      navigate(`/courses/${courseId}`);
    }
  }, [openSeatSure, courseId, navigate, wasSeatSureOpen]);

  const handleCloseSeatSure = () => {
    setWasSeatSureOpen(true);
    setOpenSeatSure(false);
  };

  return (
    <section className="register-page">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      {!formSubmitted ? (
        <div className="register-form">
          <h2 className="register-heading">REGISTER NOW</h2>
          <form method="post" onSubmit={handleSubmit}>
            <div className="form-inputs">
              <div>
                <label htmlFor="fullname">Fullname</label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  required
                  value={userData.fullname}
                  onChange={handleInput}
                  autoComplete="off"
                  placeholder="Your fullname"
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={userData.email}
                  onChange={handleInput}
                  autoComplete="off"
                  placeholder="Your email"
                />
              </div>
            </div>
            {/* $$$$$$$$$$$$$$$ EMAIL CONFIRMATION FUNCTIONALITY $$$$$$$$$$$$$$$$$$*/}
            <label htmlFor="courseName" id="select-label">
              Select your course
            </label>
            <select
              name="courseName"
              id="courseName"
              required
              value={userData.courseName}
              onChange={handleInput}
              autoComplete="off"
            >
              <option value="">Choose a course</option>
              <option value="olympiad">Olympiad</option>
              <option value="fast-track course">Fast-Track Course</option>
              <option value="delf junior">DELF Junior</option>
              <option value="delf tcf-tef">DELF TCF TEF Preparation</option>
            </select>
            <button type="submit" className="register-btn">
              REGISTER
            </button>
          </form>
        </div>
      ) : (
        <div className="qr-part">
          <p>
            You&apos;re almost there! Just one step left - complete the payment
            by scanning the QR code.
          </p>
          <div className="payment-container">
            <div
              onClick={() => setCardFlipped(!cardFlipped)}
              className={`qr-code ${cardFlipped && "flip-card"}`}
              onTransitionEnd={handleTransitionEnd}
            >
              <div className={`${showQr && "show-qr"}`}>
                {!cardFlipped && (
                  <p>
                    TAP TO SEE QR <ArrowForward />
                  </p>
                )}
              </div>
            </div>
            <div className="payment-confirmation">
              <button
                className="upload-btn"
                onClick={() => setIsModalOpen(true)}
              >
                Upload Screenshot
              </button>
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <UploadPaymentSS
                  setPaymentStatus={setPaymentDone}
                  courseId={courseId}
                />
              </Modal>
              <button
                onClick={handlePaymentCompletion}
                className={`payment-btn ${!paymentDone && "not-allowed"}`}
                disabled={!paymentDone}
              >
                Confirm Payment <CheckCircle className="check-icon" />
              </button>
              <SeatSure isOpen={openSeatSure} onClose={handleCloseSeatSure} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
