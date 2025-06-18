import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import baseUrl from "../config";

export default function UserCourses() {
  const [courses, setCourses] = useState([]);
  const { user, authorizationToken } = useAuth();
  // if (!user || !authorizationToken) {
  //   return <p>Loading...</p>;
  // }
  // const userCourses = user.enrolledCourses || [];
  const userId = user && user._id;
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${baseUrl}auth/user/${userId}/courses`, {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
          // body: JSON.stringify(userCourses),
        });
        const res_data = await response.json();
        if (response.ok) {
          console.log(res_data);
          setCourses(res_data);
        } else {
          console.error("Unable to fetch courses.");
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchCourses();
  }, []);
  return (
    <section className="user-courses">
      <h2>Enrolled Courses</h2>
      <div className="courses">
        {courses.map((c) => {
          return <div key={c._id}></div>;
        })}
      </div>
    </section>
  );
}
