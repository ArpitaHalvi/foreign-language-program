/* eslint-disable react/prop-types */
import {
  LiveTv,
  School,
  ChecklistRounded,
  Language,
} from "@mui/icons-material";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ScrollResponsiveService = ({ service, index }) => {
  const ref = useRef(null);

  // Watch scroll progress for this element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Map scroll progress to x and opacity
  const x = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className="service"
      style={{ x, opacity }}
      key={index + 2}
    >
      {service.icon}
      <h3>{service.title}</h3>
      <p>
        <ChecklistRounded className="check-icon" />
        {service.text}
      </p>
    </motion.div>
  );
};

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
        {/* {services.map((service, index) => {
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
        })} */}
        {services.map((service, index) => (
          <ScrollResponsiveService
            service={service}
            key={index}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
