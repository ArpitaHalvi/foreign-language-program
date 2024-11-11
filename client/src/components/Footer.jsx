import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="web-details">
        <div className="contact-details info">
          <ul>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="28px"
                viewBox="200 -1200 1000 1100"
                width="34px"
                fill="#e8eaed"
              >
                <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
              </svg>
              +91 7654875372
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="28px"
                viewBox="200 -1270 1000 1100"
                width="34px"
                fill="#e8eaed"
              >
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
              </svg>
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
