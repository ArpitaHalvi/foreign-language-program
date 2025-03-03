import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import { Delete, Square } from "@mui/icons-material";
import ConfirmModal from "./ConfirmModal";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const openConfirmModal = (id) => {
    setIsConfirmModalOpen(true);
    setSelectedUserId(id);
  };

  const closeConfirmModal = () => {
    setSelectedUserId(null);
    setIsConfirmModalOpen(false);
  };
  const confirmDelete = async () => {
    if (selectedUserId) {
      await deleteUser(selectedUserId);
    }
    closeConfirmModal();
  };
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.ok) {
        toast.success("User deleted successfully.");
        fetchUsers();
      } else {
        toast.error("Error while deleting user.");
      }
    } catch (e) {
      toast.error(e);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        // console.log(res_data);
        setUsers(res_data);
      } else {
        toast.error("Error while loading users.");
      }
    } catch (e) {
      toast.error(e);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <section className="admin-users">
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        isClose={closeConfirmModal}
        onConfirm={confirmDelete}
      />
      <h2>USERS</h2>
      <div className="all-users">
        <table className="user">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Enrolled Courses</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => {
                const {
                  _id,
                  fullname,
                  email,
                  phoneNumber,
                  gender,
                  enrolledCourses,
                } = user;
                return (
                  <tr key={_id}>
                    <td>{index + 1}.</td>
                    <td>{fullname}</td>
                    <td className="email-link">
                      <a href={`mailto:${email}`}>{email}</a>
                    </td>
                    <td className="ph-no">
                      {phoneNumber.length > 10
                        ? `+${
                            phoneNumber.slice(0, 2) + " " + phoneNumber.slice(2)
                          }`
                        : phoneNumber}
                    </td>
                    <td>{gender}</td>
                    {enrolledCourses && enrolledCourses.length > 0 ? (
                      <td className="enrolled-courses">
                        <ul>
                          {enrolledCourses.map((course) => {
                            return (
                              <li key={course._id}>
                                <Square className="sq-icon" /> {course.title}
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                    ) : (
                      <td>No Courses</td>
                    )}
                    <td className="buttons">
                      <button
                        className="del-btn"
                        onClick={() => openConfirmModal(_id)}
                      >
                        <Delete />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No Users Found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
