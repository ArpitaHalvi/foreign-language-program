import IntroPart from "../components/IntroPart";
import DetailsPart from "../components/DetailsPart";
import Testimonials from "../components/Testimonials";
import Footer from "./Footer";
import "./Courses.scss";
import Services from "./Services";
import Announcements from "./Announcements";
import Eligibility from "./Eligibility";

export default function Home() {
  return (
    <>
      <IntroPart />
      <Services />
      <DetailsPart />
      <Announcements />
      <Eligibility />
      <Testimonials />
      <Footer />
    </>
  );
}
