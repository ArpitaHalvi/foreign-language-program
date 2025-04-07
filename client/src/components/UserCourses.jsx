import { useState } from "react";

export default function UserCourses() {
  const [courses, setCourses] = useState("");
  const fetchCourses = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/user/course/${id}`
      );
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <section className="user-courses">
      <h2>Enrolled Courses</h2>
      <div className="courses">
        <div></div>
      </div>
    </section>
  );
}
