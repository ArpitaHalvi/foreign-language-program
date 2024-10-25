import React from "react";
import "./PageNotFound.css";

import { NavLink } from "react-router-dom";

export default function PageNotFound() {
  return (
    <section className="error-page">
      <h1>404</h1>
      <p>Sorry! This page doesn't exist.</p>
      <div className="btns">
        <NavLink to="/">RETURN TO HOME</NavLink>
      </div>
    </section>
  );
}
