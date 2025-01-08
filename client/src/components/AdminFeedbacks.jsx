import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export default function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const { authorizationToken } = useAuth();
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/feedbacks`,
          {
            method: "GET",
            headers: {
              Authorization: authorizationToken,
            },
          }
        );
        const res_data = await response.json();
        if (response.ok) {
          console.log(res_data);
          setFeedbacks(res_data);
        } else {
          toast.error("Error while fetching contacts");
        }
      } catch (e) {
        toast.error(e);
      }
    };
    fetchContacts();
  }, [authorizationToken]);
  return (
    <section className="admin-feedbacks">
      <h2>FEEDBACKS</h2>
      <div className="all-feedbacks">
        <table className="feedback">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Course Name</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Rating - out of 5</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((fd, index) => {
                const { _id, courseId, userId, rating, content } = fd;
                return (
                  <tr key={_id}>
                    <td>{index + 1}.</td>
                    <td>{courseId.title}</td>
                    <td>{userId.fullname}</td>
                    <td className="email-link">
                      <a href={`mailto:${userId.email}`}>{userId.email}</a>
                    </td>
                    <td>{rating}</td>
                    <td>{content}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No Feedbacks Found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
