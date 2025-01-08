import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Delete } from "@mui/icons-material";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const { authorizationToken } = useAuth();
  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.ok) {
        toast.success("Successfully deleted the contact.");
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
      const response = await fetch(`http://localhost:5000/api/admin/contacts`, {
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
      <h2>CONTACTS</h2>
      <div className="all-contacts">
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
            {contacts.length > 0 ? (
              contacts.map((contact, index) => {
                const { _id, fullname, email, message } = contact;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{fullname}</td>
                    <td className="email-link">
                      <a href={`mailto:${email}`}> {email}</a>
                    </td>
                    <td>{message}</td>
                    <td>
                      <button
                        onClick={() => deleteContact(_id)}
                        className="del-btn"
                      >
                        <Delete /> Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No Contacts Found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
