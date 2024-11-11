import paris from "../assets/images/paris.jpg";

export default function Feedback() {
  return (
    <div className="feedback-part">
      <h2>WHAT OUR STUDENTS SAY</h2>
      <div className="feedback-box">
        <div className="feedback">
          <img src={paris} alt="" />
          <div className="student-feedback">
            <p className="feedback-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              recusandae itaque sint nobis totam repudiandae ratione
              necessitatibus quo voluptates laboriosam.
            </p>
            <p className="student-name">Aarti Shah (BCA Student)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
