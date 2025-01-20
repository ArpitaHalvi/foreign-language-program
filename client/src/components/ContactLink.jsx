import { NavLink } from "react-router-dom";
import { QuestionAnswer } from "@mui/icons-material";
export default function ContactLink() {
  return (
    <div className="contact-us">
      <NavLink to="/contact">
        <QuestionAnswer />
      </NavLink>
    </div>
  );
}
