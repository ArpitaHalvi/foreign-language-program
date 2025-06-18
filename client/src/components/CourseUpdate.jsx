import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import baseUrl from "../config";

export default function CourseUpdate() {
  const [course, setCourse] = useState({
    title: "",
    fee: "",
    duration: "",
  });
  // console.log("First course: ", course);
  const { id } = useParams();
  const { authorizationToken } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updateCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}admin/courses/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(course),
      });
      if (response.ok) {
        toast.success("Updated the course successfully.");
      } else {
        toast.error("Error while updating the course.");
      }
    } catch (e) {
      toast.error(e);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${baseUrl}admin/courses/${id}`, {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        });
        // console.log(response);
        const res_data = await response.json();
        if (response.ok) {
          setCourse(res_data);
        } else {
          toast.error("Error in fetching course data...");
        }
      } catch (e) {
        toast.error(e);
      }
    };
    fetchCourse();
  }, [id, authorizationToken]);
  return (
    <section className="update-section">
      <h2>Updating course</h2>
      <form onSubmit={updateCourse}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="title"
            id="title"
            name="title"
            value={course.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="fee">Fee</label>
          <input
            type="number"
            id="fee"
            name="fee"
            value={course.fee}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={course.duration}
            onChange={handleChange}
          />
        </div>
        <button className="update-btn" type="submit">
          UPDATE
        </button>
      </form>
    </section>
  );
}
