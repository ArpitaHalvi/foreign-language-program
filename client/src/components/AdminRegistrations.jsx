import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const { authorizationToken } = useAuth();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/registrations",
          {
            method: "GET",
            headers: {
              Authorization: authorizationToken,
            },
          }
        );
        // console.log(response);
        if (response.ok) {
          const res_data = await response.json();
          // console.log(res_data);
          setRegistrations(res_data);
        } else {
          toast.error("Error while loading registrations.");
        }
      } catch (e) {
        toast.error(e);
      }
    };
    fetchUsers();
  }, [authorizationToken]);
  return (
    <section className="admin-registrations">
      <h2>REGISTRATIONS</h2>
      <div className="all-registrations">
        <table className="registration">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Enrolled User</th>
              <th>Enrolled Course</th>
              <th>Completed</th>
              <th>Payment Status</th>
              <th>Registered On</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length > 0 ? (
              registrations.map((enroll, index) => {
                const {
                  _id,
                  userId,
                  courseId,
                  isCompleted,
                  paymentStatus,
                  registrationDate,
                } = enroll;
                return (
                  <tr key={_id}>
                    <td>{index + 1}.</td>
                    <td>
                      {userId.fullname} <br />
                      <span>
                        <a href={`mailto:${userId.email}`}>{userId.email}</a>
                      </span>
                    </td>
                    <td>{courseId.title}</td>
                    <td
                      className={`${isCompleted === "Yes" ? "green" : "red"}`}
                    >
                      {isCompleted ? "Yes" : "No"}
                    </td>
                    <td>{paymentStatus}</td>
                    <td>{new Date(registrationDate).toLocaleDateString()}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No Registrations Found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
