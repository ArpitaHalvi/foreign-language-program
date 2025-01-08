import { Navigate, NavLink, Outlet } from "react-router-dom";
import {
  Contacts,
  HowToReg,
  MenuBook,
  People,
  QuestionAnswer,
} from "@mui/icons-material";
import { useAuth } from "../store/auth";

export default function AdminPanel() {
  const { user, loading } = useAuth();
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
              <NavLink to="/admin/users">
                <People /> Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/courses">
                <MenuBook /> Courses
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/registrations">
                <HowToReg />
                Registrations
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/feedbacks">
                <QuestionAnswer />
                Feedbacks
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/contacts">
                <Contacts />
                Contacts
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="admin-collections">
        <Outlet />
      </div>
    </section>
  );
}
