import {
  LiveTv,
  School,
  // Feedback,
  ChecklistRounded,
  Language,
} from "@mui/icons-material";
export default function Services() {
  const services = [
    {
      title: "Interactive Live Classes",
      text: "Live sessions with skilled instructor for real-time learning and interactive discussions.",
      icon: <LiveTv className="service-icon" />,
    },
    {
      title: "Easy Course Enrollment",
      text: "Simplified process to explore courses, enroll, and access courses instantly after payment.",
      icon: <School className="service-icon" />,
    },
    // {
    //   title: "Feedback for Improvement",
    //   text: "Allow students to share their learning experience to help improve the course quality.",
    //   icon: <Feedback className="service-icon" />,
    // },
    {
      title: "French Courses & Olympiads",
      text: "We offer courses for all levels, from DELF Junior to TEF, TCF, and Olympiads, with expert guidance.",
      icon: <Language className="service-icon" />,
    },
  ];
  return (
    <section className="service-section">
      <h2>What we provide</h2>
      <div className="services">
        {services.map((service, index) => {
          return (
            <div className="service" key={index} data-aos="slide-right">
              {service.icon}
              <h3>{service.title}</h3>
              <p>
                <ChecklistRounded className="check-icon" />
                {service.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
