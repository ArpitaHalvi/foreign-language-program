import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import baseUrl from "../config";

const courseData = {
  title: "",
  fee: "",
  duration: "",
};

export default function AddCourse() {
  const [course, setCourse] = useState(courseData);
  const { authorizationToken } = useAuth();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensuring the fee is of type number
      const dataToSend = {
        ...course,
        fee: Number(course.fee),
      };
      console.log("Sending data: ", dataToSend);
      const response = await fetch(`${baseUrl}admin/courses/add`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      console.log(response);
      const res_data = await response.json();
      if (response.ok) {
        setCourse(courseData);
        toast.success("Course Added!");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (e) {
      toast.error(e);
    }
  };
  return (
    <section className="update-section">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor=""></label>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="title"
            id="title"
            name="title"
            value={course.title}
            onChange={handleInput}
            placeholder="Give your course a title"
          />
        </div>
        <div>
          <label htmlFor="fee">Fee</label>
          <input
            type="number"
            id="fee"
            name="fee"
            value={course.fee}
            onChange={handleInput}
            placeholder="Add a fee"
          />
        </div>
        <div>
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={course.duration}
            onChange={handleInput}
            placeholder="e.g., 2 months"
          />
        </div>
        <button className="add-btn" type="submit">
          ADD
        </button>
      </form>
    </section>
  );
}
