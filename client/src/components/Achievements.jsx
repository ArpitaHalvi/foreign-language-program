/* eslint-disable react/prop-types */
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const SlideInOnScroll = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{
        y: springY,
        opacity: springOpacity,
      }}
    >
      {children}
    </motion.div>
  );
};

export default function Achievements() {
  const achievers = [
    {
      name: "Errin Mathew",
      exam: "DELF 2025",
      img: "/achiever1.jpg",
      testimony:
        "Giving the DELF A1 exam at Alliance Française Bhopal was a unique and enriching experience. The exam tested my basic French skills in listening, reading, writing, and speaking. While some sections, like listening, were a bit challenging due to the speed of native speakers, I found the writing and reading parts manageable. The speaking test was both exciting and nerve-wracking, as I had to interact with an examiner in French. The atmosphere at Alliance Française was welcoming, and the staff was helpful, which made the experience smoother. Overall, it was a great opportunity to assess my progress and gain confidence in using French in real-life situations.",
    },
    {
      name: "Errin Mathew",
      exam: "DELF 2025",
      img: "/achiever1.jpg",
      testimony:
        "Giving the DELF A1 exam at Alliance Française Bhopal was a unique and enriching experience. The exam tested my basic French skills in listening, reading, writing, and speaking. While some sections, like listening, were a bit challenging due to the speed of native speakers, I found the writing and reading parts manageable. The speaking test was both exciting and nerve-wracking, as I had to interact with an examiner in French. The atmosphere at Alliance Française was welcoming, and the staff was helpful, which made the experience smoother. Overall, it was a great opportunity to assess my progress and gain confidence in using French in real-life situations.",
    },
  ];

  return (
    <section className="achievements-section">
      <h2>Empowering Fluency: Students who took the leap</h2>
      <p>
        These students started their French journey with us and confidently
        appeared for prestigious French exams like DELF, TEF, and TCF.
      </p>
      {/* <div className="achievers" data-aos="slide-right">
        {achievers.map((achiever, index) => {
          const { name, exam, testimony, img } = achiever;
          return (
            <div className="achiever" key={`achiever-${index}`}>
              <img src={img} alt="" />
              <div className="about-achiever">
                <h3>{name}</h3>
                <p>{exam}</p>
                <p>{testimony}</p>
              </div>
            </div>
          );
        })}
      </div> */}
      <div className="achievers">
        {achievers.map((achiever, index) => {
          const { img, name, exam } = achiever;
          return (
            <SlideInOnScroll key={index * 3}>
              <div className="achiever" key={`achiever-${index + 3}`}>
                <div className="img">
                  <img src={img} alt="Student Image" />
                </div>
                <div className="about">
                  <h3>{name}</h3>
                  <p>{exam}</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dignissimos optio, vitae soluta neque libero adipisci
                    doloremque quidem laboriosam sapiente! Eligendi.
                  </p>
                </div>
              </div>
            </SlideInOnScroll>
          );
        })}
      </div>
    </section>
  );
}
