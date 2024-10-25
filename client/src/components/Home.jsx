import React from "react";
import "./Home.css";
import IntroPart from "../components/IntroPart";
import DetailsPart from "../components/DetailsPart";
import CourseHead from "../components/CourseHead";
import Feedback from "../components/Feedback";
import AllCourses from "./AllCourses";

export default function Home() {
  return (
    <>
      <IntroPart />
      <CourseHead />
      <AllCourses />
      <hr />
      <DetailsPart />
      <hr />
      <Feedback />
    </>
  );
}
