import { BrowserRouter, Route, Routes } from "react-router-dom";
// import './App.scss';
// import AOS from "aos";
// import "aos/dist/aos.css";
import Home from "./components/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import CoursesRender from "./components/CoursesRender";
import PageNotFound from "./Pages/PageNotFound";
import Navbar from "./components/Navbar.jsx";
import Olympiads from "./Pages/Olympiads.jsx";
import SignUp from "./Pages/SignUp.jsx";

function App() {
  // ********* WON'T NEED IT MAY BE ****************
  // AOS.init({
  //   offset: 300,
  //   duration: 700,
  // });
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<CoursesRender />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/olympiads" element={<Olympiads />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
