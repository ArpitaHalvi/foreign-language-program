import { useState } from "react";
import { toast } from "react-toastify";
import "../components/AdminStyles.scss";
import { useAuth } from "../store/auth";
import { FileUpload } from "@mui/icons-material";
import baseUrl from "../config";

export default function UploadBrochure() {
  const [file, setFile] = useState(null);
  const { authorizationToken } = useAuth();
  const [loading, setLoading] = useState(false);
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
      const response = await fetch(`${baseUrl}admin/brochure`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });
      console.log(response);
      if (response.ok) {
        toast.success("Uploaded successfully.");
        setFile("");
        setLoading(false);
      } else {
        toast.error("Error while uploading brochure.");
        setLoading(false);
      }
    } catch (e) {
      toast.error("Error occured.");
      setLoading(false);
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
