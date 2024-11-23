import "./PageNotFound.scss";
import { NavLink } from "react-router-dom";

export default function PageNotFound() {
  return (
    <section className="error-page">
      <h1>404</h1>
      <p>Sorry! This page does not exist.</p>
      <div className="btns">
        <NavLink to="/">RETURN TO HOME</NavLink>
      </div>
    </section>
  );
}
