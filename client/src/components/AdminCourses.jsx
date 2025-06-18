import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import baseUrl from "../config";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const { authorizationToken } = useAuth();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const openConfirmModal = (id) => {
    setIsConfirmModalOpen(true);
    setSelectedCourseId(id);
  };

  const closeConfirmModal = () => {
    setSelectedCourseId(null);
    setIsConfirmModalOpen(false);
  };
  const confirmDelete = async () => {
    if (selectedCourseId) {
      await deleteCourse(selectedCourseId);
    }
    closeConfirmModal();
  };
  const deleteCourse = async (id) => {
    try {
      const response = await fetch(`${baseUrl}admin/courses/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        toast.success("Course deleted successfully.");
        fetchCourses();
      } else {
        toast.error("Error while deleting the course.");
      }
    } catch (e) {
      toast.error(e);
    }
  };
  const fetchCourses = async () => {
    try {
      const response = await fetch(`${baseUrl}admin/courses`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        setCourses(res_data);
      } else {
        toast.error("Error while fetching courses.");
      }
    } catch (e) {
      toast.error(e);
      console.error(e);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <section className="admin-courses">
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        isClose={closeConfirmModal}
        onConfirm={confirmDelete}
      />
      <h2>COURSES</h2>
      <div className="all-courses">
        {courses.length > 0 ? (
          courses.map((course) => {
            const { _id, title, fee, duration } = course;
            return (
              <div className="course" key={_id}>
                <h3>{title}</h3>
                <div className="course-body">
                  <p>Fee - Rs. {fee}</p>
                  <p>Duration - {duration}</p>
                  <p>Mode: Online</p>
                </div>
                <div className="course-footer">
                  <button
                    className="del-btn op-btns"
                    onClick={() => openConfirmModal(_id)}
                  >
                    <Delete className="op-icons" />
                  </button>
                  <Link
                    className="edit-btn op-btns"
                    to={`/admin/courses/${_id}/edit`}
                  >
                    <Edit className="op-icons" />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p>No Courses Found.</p>
        )}
        <div className="add-course">
          <Link to="/admin/courses/add">
            <Add className="add-icon" />
            Add Course
          </Link>
        </div>
      </div>
    </section>
  );
}
