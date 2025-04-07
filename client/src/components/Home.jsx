import IntroPart from "../components/IntroPart";
import DetailsPart from "../components/DetailsPart";
import Testimonials from "../components/Testimonials";
import "./Courses.scss";
import Services from "./Services";
import Announcements from "./Announcements";
import Eligibility from "./Eligibility";
import EditorsDesk from "./EditorsDesk";

export default function Home() {
  return (
    <>
      <IntroPart />
      <EditorsDesk />
      <Services />
      <DetailsPart />
      <Announcements />
      <Eligibility />
      <Testimonials />
    </>
  );
}
