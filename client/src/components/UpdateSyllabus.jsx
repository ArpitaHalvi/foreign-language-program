import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { FileUpload } from "@mui/icons-material";

export default function UpdateSyllabus() {
  const [file, setFile] = useState("");
  const { authorizationToken } = useAuth();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/syllabus`,
          {
            method: "GET",
            headers: {
              Authorization: authorizationToken,
            },
          }
        );
        console.log(response);
        const res_data = await response.json();
        if (response.ok) {
          setFile(res_data);
        } else {
          toast.error("Error in fetching course data...");
        }
      } catch (e) {
        toast.error(e);
      }
    };
    fetchSyllabus();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB.");
      return;
    }
    try {
      setLoading(true);
      // Preparing form data
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`http://localhost:5000/api/admin/syllabus`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });
      console.log(response);
      if (response.ok) {
        setLoading(false);
        setFile("");
        e.target.reset();
        toast.success("Uploaded successfully.");
      } else {
        setLoading(false);
        toast.error("Error while uploading syllabus.");
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
          type="file"
          name="pdfLink"
          id="pdfLink"
          accept=".pdf"
          value={file}
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
          <FileUpload className="file-upload" />
        </button>
      </form>
    </section>
  );
}
