import "./StatusPageStyles.scss";
import { NavLink } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

export default function PageNotFound() {
  return (
    <section className="page-not-found">
      <h2>404</h2>
      <p>Sorry! This page does not exist.</p>
      <img src="/nth-found.svg" alt="" />
      <NavLink to="/">
        Return to home <ArrowForward />
      </NavLink>
    </section>
  );
}
