import "./Auth.scss";
import { useAuth } from "../store/auth";
import { NavLink, Outlet } from "react-router-dom";
import { Female, Male } from "@mui/icons-material";
export default function UserDashboard() {
  const { user } = useAuth();
  console.log("User: ", user);
  return (
    <section className="user-dashboard">
      <aside className="side-bar">
        {/* <Person className="user-profile" /> */}
        {user && user.gender === "female" && (
          <img
            src="/female-avatar-red.svg"
            alt="Female Avatar"
            className="user-profile"
          />
        )}
        {user && user.gender === "male" && (
          <img
            src="/male-avatar-red.svg"
            alt="Female Avatar"
            className="user-profile"
          />
        )}
        <ul>
          <li className="fname">
            {user && user.fullname}
            {user && user.gender === "female" && <Female className="female" />}
            {user && user.gender === "male" && <Male className="male" />}
          </li>
          <li>{user && user.email}</li>
          <li>
            +{user && String(user.phoneNumber).slice(0, 2)}{" "}
            {user && String(user.phoneNumber).slice(-10)}
          </li>
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
