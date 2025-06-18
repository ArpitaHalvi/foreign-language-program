import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Delete } from "@mui/icons-material";
import ConfirmModal from "./ConfirmModal";
import baseUrl from "../config";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const { authorizationToken } = useAuth();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const openConfirmModal = (id) => {
    setIsConfirmModalOpen(true);
    setSelectedContactId(id);
  };

  const closeConfirmModal = () => {
    setSelectedContactId(null);
    setIsConfirmModalOpen(false);
  };
  const confirmDelete = async () => {
    if (selectedContactId) {
      await deleteContact(selectedContactId);
    }
    closeConfirmModal();
  };
  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${baseUrl}admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        toast.success("Successfully deleted contact.");
        fetchContacts();
      } else {
        toast.error("Error while deleting the contact.");
      }
    } catch (e) {
      toast.error(e);
    }
  };
  const fetchContacts = async () => {
    try {
      const response = await fetch(`${baseUrl}admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        // console.log(res_data);
        setContacts(res_data);
      } else {
        toast.error("Error while fetching contacts");
      }
    } catch (e) {
      toast.error(e);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, [authorizationToken]);
  return (
    <section className="admin-contacts">
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        isClose={closeConfirmModal}
        onConfirm={confirmDelete}
      />
      <h2>CONTACTS</h2>
      <div className="all-contacts">
        {contacts.length > 0 ? (
          <table className="contact">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Message</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => {
                const { _id, fullname, email, message } = contact;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{fullname}</td>
                    <td className="email-link">
                      <a href={`mailto:${email}`} className="email-link">
                        {email}
                      </a>
                    </td>
                    <td className="user-msg">{message}</td>
                    <td>
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
          <p>No Contacts Found.</p>
        )}
      </div>
    </section>
  );
}
