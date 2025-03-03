import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Contacts,
  HowToReg,
  MenuBook,
  Payments,
  People,
  QuestionAnswer,
} from "@mui/icons-material";
import { useAuth } from "../store/auth";

export default function AdminPanel() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isBaseAdminroute = location.pathname === "/admin";
  if (loading) {
    return <div>Loading ...</div>;
  }
  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <section className="admin-panel">
      <aside className="side-bar">
        <h2>ADMIN PANEL</h2>
        <nav className="admin-navbar">
          <ul>
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `${isActive ? "active-collection" : "a"}`
                }
              >
                <People /> Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/courses"
                className={({ isActive }) =>
                  `${isActive ? "active-collection" : "a"}`
                }
              >
                <MenuBook /> Courses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/registrations"
                className={({ isActive }) =>
                  `${isActive ? "active-collection" : "a"}`
                }
              >
                <HowToReg />
                Registrations
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/feedbacks"
                className={({ isActive }) =>
                  `${isActive ? "active-collection" : "a"}`
                }
              >
                <QuestionAnswer />
                Feedbacks
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/contacts"
                className={({ isActive }) =>
                  `${isActive ? "active-collection" : "a"}`
                }
              >
                <Contacts />
                Contacts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/payments"
                className={({ isActive }) =>
                  `${isActive ? "active-collection" : "a"}`
                }
              >
                <Payments />
                Payments
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div
        className="admin-collections"
        style={{ border: isBaseAdminroute && "none" }}
      >
        <Outlet />
      </div>
    </section>
  );
}
