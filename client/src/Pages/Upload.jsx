import { useState } from "react";
import { toast } from "react-toastify";
import "../components/AdminStyles.scss";

export default function Upload() {
  const [file, setFile] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFile((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(``);
      console.log(response);
      if (response.ok) {
        toast.success("Uploaded successfully.");
      }
    } catch (e) {
      toast.error("Error occured.");
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
          value={file}
          onChange={handleChange}
        />
        <button type="submit">Upload</button>
      </form>
    </section>
  );
}
