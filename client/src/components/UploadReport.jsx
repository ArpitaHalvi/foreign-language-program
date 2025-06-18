import { useState } from "react";
import { toast } from "react-toastify";
import "../components/AdminStyles.scss";
import { useAuth } from "../store/auth";
import { FileUpload } from "@mui/icons-material";
import baseUrl from "../config";

const initialFormData = {
  title: "",
  pdfLink: null,
};

export default function UploadReport() {
  const [formData, setFormData] = useState(initialFormData);
  const { authorizationToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: files ? files[0] : value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!formData.pdfLink) {
      toast.error("Please select a file.");
      return;
    }
    if (formData.pdfLink.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB.");
      return;
    }
    try {
      setLoading(true);
      // Preparing form data
      const formPayload = new FormData();
      formPayload.append("title", formData.title);
      formPayload.append("file", formData.pdfLink);
      const response = await fetch(`${baseUrl}admin/report`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
        },
        body: formPayload,
      });
      console.log(response);
      if (response.ok) {
        setLoading(false);
        setFormData(initialFormData);
        e.target.reset();
        toast.success("Uploaded successfully.");
      } else {
        setLoading(false);
        toast.error("Error while uploading report.");
      }
    } catch (e) {
      toast.error("Error occured.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="upload-section">
      <div className="design-purpose">Quick & Secure File Upload!</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="pdfLink"
          id="pdfLink"
          accept=".pdf"
          required
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
          <FileUpload className="file-upload" />
        </button>
      </form>
    </section>
  );
}
