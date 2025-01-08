import {
  LiveTv,
  School,
  Feedback,
  ChecklistRounded,
} from "@mui/icons-material";
export default function Services() {
  return (
    <section className="service-section">
      <h2>What we provide</h2>
      <div className="services">
        <div className="service" data-aos="slide-right">
          <LiveTv className="service-icon" />
          <h3>Interactive Live Classes</h3>
          <p>
            <ChecklistRounded className="check-icon" />
            Live sessions with skilled instructor for real-time learning and
            interactive discussions.
          </p>
        </div>
        <div className="service" data-aos="slide-right">
          <School className="service-icon" />
          <h3>Easy Course Enrollment</h3>
          <p>
            <ChecklistRounded className="check-icon" />
            Simplified process to explore courses, enroll, and access courses
            instantly after payment.
          </p>
        </div>
        <div className="service" data-aos="slide-right">
          <Feedback className="service-icon" />
          <h3>Feedback for Improvement</h3>
          <p>
            <ChecklistRounded className="check-icon" />
            Allow students to share their learning experience to help improve
            the course quality.
          </p>
        </div>
      </div>
    </section>
  );
}
