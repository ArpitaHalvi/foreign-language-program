import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Delete } from "@mui/icons-material";
import { useAuth } from "../store/auth";
import ConfirmModal from "./ConfirmModal";
import baseUrl from "../config";

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const { authorizationToken } = useAuth();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);
  const openConfirmModal = (id) => {
    setIsConfirmModalOpen(true);
    setSelectedRegistrationId(id);
  };

  const closeConfirmModal = () => {
    setSelectedRegistrationId(null);
    setIsConfirmModalOpen(false);
  };
  const confirmDelete = async () => {
    if (selectedRegistrationId) {
      await deleteRegistration(selectedRegistrationId);
    }
    closeConfirmModal();
  };
  const deleteRegistration = async (id) => {
    try {
      const response = await fetch(
        `${baseUrl}admin/registrations/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      console.log(response);
      if (response.ok) {
        toast.success("Successfully deleted the registration.");
        fetchUsers();
      } else {
        toast.error("Error while deleting the registration.");
      }
    } catch (e) {
      toast.error(e);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${baseUrl}admin/registrations`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      // console.log(response);
      const res_data = await response.json();
      if (response.ok) {
        // console.log(res_data);
        setRegistrations(res_data);
      } else {
        if (response.status !== 404) {
          toast.error(res_data.message);
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [authorizationToken]);
  return (
    <section className="admin-registrations">
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        isClose={closeConfirmModal}
        onConfirm={confirmDelete}
      />
      <h2>REGISTRATIONS</h2>
      <div className="all-registrations">
        {registrations.length !== 0 ? (
          <table className="registration">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Enrolled User</th>
                <th>Enrolled Course</th>
                {/* <th>Completed</th> */}
                <th>Payment Status</th>
                <th>Registered On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((enroll, index) => {
                const {
                  _id,
                  userId,
                  courseId,
                  // isCompleted,
                  paymentStatus,
                  registrationDate,
                } = enroll;
                return (
                  <tr key={_id}>
                    <td>{index + 1}.</td>
                    <td>
                      {userId.fullname} <br />
                      <span>
                        <a
                          href={`mailto:${userId.email}`}
                          className="email-link"
                        >
                          {userId.email}
                        </a>
                      </span>
                    </td>
                    <td>{courseId.title}</td>
                    {/* <td
                      className={`${isCompleted === "Yes" ? "green" : "red"}`}
                      >
                      {isCompleted ? "Yes" : "No"}
                      </td> */}
                    <td
                      className={`${paymentStatus === "pending" && "pending"} ${
                        paymentStatus === "paid" && "paid"
                      }`}
                    >
                      {paymentStatus}
                    </td>
                    <td>{new Date(registrationDate).toLocaleDateString()}</td>
                    <td className="operation">
                      <button
                        onClick={() => openConfirmModal(_id)}
                        className="del-btn"
                      >
                        <Delete /> Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No registrations Found.</p>
        )}
      </div>
    </section>
  );
}
