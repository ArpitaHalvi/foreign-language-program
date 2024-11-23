import { Mail, Phone } from "@mui/icons-material";

export default function Footer() {
  return (
    <div className="footer">
      <div className="web-details">
        <div className="contact-details info">
          <ul>
            <li>
              <Phone />
              +91 7654875372
            </li>
            <li>
              <Mail />
              frenchweb@gmail.com
            </li>
          </ul>
        </div>
        <div className="info"></div>
        {/* <div className='info'></div>  */}
        {/* <div className='info'></div>  */}
      </div>
      <p className="copyright">&copy; 2024. All Rights reserved.</p>
    </div>
  );
}
