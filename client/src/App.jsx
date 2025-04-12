import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./components/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import PageNotFound from "./Pages/PageNotFound";
import Navbar from "./components/Navbar.jsx";
import Olympiads from "./Pages/Olympiads.jsx";
import SignUp from "./Pages/SignUp.jsx";
import EachCourse from "./components/EachCourse.jsx";
import Courses from "./components/Courses.jsx";
import { ToastContainer } from "react-toastify";
import Logout from "./components/Logout.jsx";
import "react-toastify/ReactToastify.css";
import AdminPanel from "./layouts/AdminPanel.jsx";
import AdminUsers from "./components/AdminUsers.jsx";
import AdminCourses from "./components/AdminCourses.jsx";
import AdminRegistrations from "./components/AdminRegistrations.jsx";
import AdminFeedbacks from "./components/AdminFeedbacks.jsx";
import AdminContacts from "./components/AdminContacts.jsx";
import "./components/AdminStyles.scss";
import CourseUpdate from "./components/CourseUpdate.jsx";
import AddCourse from "./components/AddCourse.jsx";
import ContactLink from "./components/ContactLink.jsx";
import UploadSyllabus from "./components/UploadSyllabus.jsx";
import Payments from "./components/Payments.jsx";
// import UserDashboard from "./Pages/UserDashboard.jsx";
// import UserCourses from "./components/UserCourses.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  AOS.init({
    offset: 300,
    duration: 1000,
  });
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <ToastContainer theme="dark" draggable />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<EachCourse />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/olympiads" element={<Olympiads />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/admin" element={<AdminPanel />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="courses/:id/edit" element={<CourseUpdate />} />
            <Route path="courses/add" element={<AddCourse />} />
            <Route path="registrations" element={<AdminRegistrations />} />
            <Route path="feedbacks" element={<AdminFeedbacks />} />
            <Route path="payments" element={<Payments />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="syllabus" element={<UploadSyllabus />} />
          </Route>
          {/* <Route path="/user" element={<UserDashboard />}>
            <Route path="courses" element={<UserCourses />} />
          </Route> */}
        </Routes>
        <ContactLink />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
