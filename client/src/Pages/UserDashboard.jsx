import "./Auth.scss";
import { useAuth } from "../store/auth";
import { NavLink, Outlet } from "react-router-dom";
import { Female, Male, Person } from "@mui/icons-material";
export default function UserDashboard() {
  const { user } = useAuth();
  console.log("User: ", user);
  return (
    <section className="user-dashboard">
      <aside className="side-bar">
        <Person className="user-profile" />
        <ul>
          <li className="fname">
            {user && user.fullname}
            {user && user.gender === "female" && <Female className="female" />}
            {user && user.gender === "male" && <Male className="male" />}
          </li>
          <li>{user && user.email}</li>
          <li>+{user && user.phoneNumber}</li>
          <NavLink to="/user/courses">Enrolled courses</NavLink>
          <NavLink to="/user/notifications">Notifications</NavLink>
        </ul>
      </aside>
      <div className="main-part">
        <Outlet />
      </div>
    </section>
  );
}
