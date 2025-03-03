/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import "../components/AdminStyles.scss";
import { useAuth } from "../store/auth";
import { FileUpload } from "@mui/icons-material";

export default function UploadPaymentSS({ setPaymentStatus, courseId }) {
  const [file, setFile] = useState(null);
  const { authorizationToken } = useAuth();
  const [loading, setLoading] = useState(false);
  console.log("CourseId: ", courseId, typeof courseId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file.");
      return;
    }
    try {
      setLoading(true);
      // Preparing form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("courseId", courseId);
      console.log("Form data: ", formData);
      const response = await fetch(
        `http://localhost:5000/api/admin/paymentScreenShot`,
        {
          method: "POST",
          headers: {
            Authorization: authorizationToken,
          },
          body: formData,
        }
      );
      console.log(response);
      const res_data = await response.json();
      if (response.ok) {
        toast.success("Uploaded successfully.");
        setFile("");
        setPaymentStatus(true);
        e.target.reset();
        setLoading(false);
      } else {
        toast.error(res_data.message);
        setLoading(false);
        setPaymentStatus(false);
      }
    } catch (e) {
      toast.error("Error occured.");
      setLoading(false);
      setPaymentStatus(false);
    }
  };
  return (
    <section className="upload-section">
      <div className="design-purpose">Quick & Secure File Upload!</div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
          <FileUpload className="file-upload" />
        </button>
      </form>
    </section>
  );
}
